import argparse
import os
from typing import Iterable

from google import genai
from google.genai import types
from tenacity import retry, stop_after_attempt, wait_exponential_jitter

from src.config import settings
from src.gemini.rate_limiter import SimpleRateLimiter


class GeminiEmbeddingClient:
    def __init__(self) -> None:
        self.model = settings.embedding_model
        self.limiter = SimpleRateLimiter(settings.embedding_requests_per_minute)
        self.client = self._build_client()

    def _build_client(self) -> genai.Client:
        if settings.google_use_vertex:
            if not settings.google_application_credentials:
                raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is required for service-account auth")
            if not settings.gcp_project:
                raise ValueError("GCP_PROJECT is required for Vertex auth")
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.google_application_credentials
            return genai.Client(vertexai=True, project=settings.gcp_project, location=settings.gcp_region)

        if not settings.google_api_key:
            raise ValueError("GOOGLE_API_KEY is required when GOOGLE_USE_VERTEX is false")
        return genai.Client(api_key=settings.google_api_key)

    @retry(wait=wait_exponential_jitter(initial=1, max=30), stop=stop_after_attempt(5))
    def embed_text(self, text: str) -> list[float]:
        self.limiter.acquire()
        response = self.client.models.embed_content(
            model=self.model,
            contents=[text],
            config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT"),
        )
        if not response.embeddings:
            raise ValueError("No embeddings returned")
        return response.embeddings[0].values

    def embed_many(self, texts: Iterable[str]) -> list[list[float]]:
        return [self.embed_text(t) for t in texts]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-embed", required=True)
    args = parser.parse_args()
    client = GeminiEmbeddingClient()
    emb = client.embed_text(args.test_embed)
    print(f"embedding dimensions={len(emb)}")


if __name__ == "__main__":
    main()


from src.gemini.embedding_client import GeminiEmbeddingClient


def embed_query(query: str) -> list[float]:
    client = GeminiEmbeddingClient()
    return client.embed_text(query)


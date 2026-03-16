from src.gemini.embedding_client import GeminiEmbeddingClient


def process_in_batches(texts: list[str], batch_size: int = 16) -> list[list[float]]:
    client = GeminiEmbeddingClient()
    results: list[list[float]] = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        results.extend(client.embed_many(batch))
    return results


from src.db.connection import get_conn


def search_similar_chunks(query_embedding: list[float], top_k: int = 5) -> list[dict]:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT
                  c.id,
                  c.document_id,
                  c.content,
                  1 - (e.embedding <=> %s::vector) AS similarity
                FROM embeddings e
                JOIN chunks c ON c.id = e.chunk_id
                ORDER BY e.embedding <=> %s::vector
                LIMIT %s
                """,
                (query_embedding, query_embedding, top_k),
            )
            rows = cur.fetchall()
    return [
        {
            "chunk_id": row[0],
            "document_id": row[1],
            "content": row[2],
            "similarity": float(row[3]),
        }
        for row in rows
    ]


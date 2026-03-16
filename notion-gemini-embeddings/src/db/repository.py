import hashlib
from typing import Iterable

from psycopg2.extras import execute_values

from src.config import settings
from src.db.connection import get_conn
from src.models.document import Chunk, NotionDocument


def hash_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def upsert_documents(documents: Iterable[NotionDocument]) -> None:
    rows = [
        (
            d.id,
            d.title,
            d.url,
            d.last_edited_time,
            hash_text(d.raw_text),
            d.raw_text,
        )
        for d in documents
    ]
    if not rows:
        return
    with get_conn() as conn:
        with conn.cursor() as cur:
            execute_values(
                cur,
                """
                INSERT INTO documents
                (id, title, url, notion_last_edited_time, content_hash, raw_text)
                VALUES %s
                ON CONFLICT (id) DO UPDATE SET
                  title = EXCLUDED.title,
                  url = EXCLUDED.url,
                  notion_last_edited_time = EXCLUDED.notion_last_edited_time,
                  content_hash = EXCLUDED.content_hash,
                  raw_text = EXCLUDED.raw_text,
                  updated_at = NOW()
                """,
                rows,
            )
        conn.commit()


def replace_document_chunks(document_id: str, chunks: list[Chunk]) -> None:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM chunks WHERE document_id = %s", (document_id,))
            if chunks:
                execute_values(
                    cur,
                    """
                    INSERT INTO chunks
                    (id, document_id, chunk_order, heading_path, content, chunk_hash, chunking_version)
                    VALUES %s
                    ON CONFLICT (id) DO UPDATE SET
                      chunk_order = EXCLUDED.chunk_order,
                      heading_path = EXCLUDED.heading_path,
                      content = EXCLUDED.content,
                      chunk_hash = EXCLUDED.chunk_hash,
                      chunking_version = EXCLUDED.chunking_version
                    """,
                    [
                        (
                            c.id,
                            c.document_id,
                            c.order,
                            c.heading_path,
                            c.content,
                            c.chunk_hash,
                            c.chunking_version,
                        )
                        for c in chunks
                    ],
                )
        conn.commit()


def upsert_embedding(chunk_id: str, embedding: list[float]) -> None:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO embeddings (chunk_id, embedding, embedding_model, embedding_version)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (chunk_id, embedding_model, embedding_version)
                DO UPDATE SET embedding = EXCLUDED.embedding
                """,
                (chunk_id, embedding, settings.embedding_model, settings.embedding_version),
            )
        conn.commit()


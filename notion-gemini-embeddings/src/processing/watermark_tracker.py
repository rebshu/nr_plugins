from dataclasses import dataclass
from datetime import datetime

from src.db.connection import get_conn


@dataclass(frozen=True)
class Watermark:
    document_id: str
    edited_time: datetime
    content_hash: str


def should_reprocess(document_id: str, edited_time: datetime, content_hash: str) -> bool:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT last_processed_edited_time, last_processed_hash
                FROM watermarks
                WHERE document_id = %s
                """,
                (document_id,),
            )
            row = cur.fetchone()
    if not row:
        return True
    return edited_time > row[0] or content_hash != row[1]


def upsert_watermark(document_id: str, edited_time: datetime, content_hash: str) -> None:
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO watermarks (document_id, last_processed_edited_time, last_processed_hash)
                VALUES (%s, %s, %s)
                ON CONFLICT (document_id) DO UPDATE SET
                  last_processed_edited_time = EXCLUDED.last_processed_edited_time,
                  last_processed_hash = EXCLUDED.last_processed_hash,
                  last_embedded_at = NOW()
                """,
                (document_id, edited_time, content_hash),
            )
        conn.commit()


import argparse

from src.chunking.semantic_chunker import chunk_document
from src.db.repository import hash_text, replace_document_chunks, upsert_documents, upsert_embedding
from src.gemini.embedding_client import GeminiEmbeddingClient
from src.notion.extractor import fetch_documents
from src.processing.watermark_tracker import should_reprocess, upsert_watermark


def run_incremental(database_id: str, dry_run: bool = False) -> dict[str, int]:
    docs = list(fetch_documents(database_id))
    upsert_documents(docs)
    emb_client = GeminiEmbeddingClient() if not dry_run else None

    processed = 0
    skipped = 0
    for doc in docs:
        doc_hash = hash_text(doc.raw_text)
        if not should_reprocess(doc.id, doc.last_edited_time, doc_hash):
            skipped += 1
            continue
        chunks = chunk_document(doc)
        if not dry_run:
            replace_document_chunks(doc.id, chunks)
            for chunk in chunks:
                vec = emb_client.embed_text(chunk.content)  # type: ignore[union-attr]
                upsert_embedding(chunk.id, vec)
            upsert_watermark(doc.id, doc.last_edited_time, doc_hash)
        processed += 1
    return {"seen": len(docs), "processed": processed, "skipped": skipped}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--database-id", required=False, default="")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    print(run_incremental(args.database_id, dry_run=args.dry_run))


if __name__ == "__main__":
    main()


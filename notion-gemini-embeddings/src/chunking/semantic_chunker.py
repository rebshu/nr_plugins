import argparse
import hashlib

from src.chunking.paragraph_detector import split_into_paragraphs
from src.config import settings
from src.models.document import Chunk, NotionDocument


def _chunk_id(doc_id: str, heading_path: str, order: int, text: str) -> str:
    stable = f"{doc_id}|{heading_path}|{order}|{text.strip()}"
    return hashlib.sha256(stable.encode("utf-8")).hexdigest()


def _chunk_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def chunk_document(doc: NotionDocument) -> list[Chunk]:
    paragraphs = split_into_paragraphs(doc.raw_text)
    chunks: list[Chunk] = []
    for idx, paragraph in enumerate(paragraphs):
        chunks.append(
            Chunk(
                id=_chunk_id(doc.id, "", idx, paragraph),
                document_id=doc.id,
                order=idx,
                heading_path="",
                content=paragraph,
                chunk_hash=_chunk_hash(paragraph),
                chunking_version=settings.chunking_version,
            )
        )
    return chunks


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-document", required=True)
    args = parser.parse_args()
    with open(args.test_document, "r", encoding="utf-8") as f:
        text = f.read()
    fake_doc = NotionDocument(
        id="test-doc",
        title="Test",
        url="",
        last_edited_time=None,  # type: ignore[arg-type]
        raw_text=text,
    )
    print(f"Generated {len(chunk_document(fake_doc))} chunks")


if __name__ == "__main__":
    main()


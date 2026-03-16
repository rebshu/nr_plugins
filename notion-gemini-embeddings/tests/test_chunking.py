from datetime import datetime, timezone

from src.chunking.semantic_chunker import chunk_document
from src.models.document import NotionDocument


def test_chunker_is_deterministic():
    doc = NotionDocument(
        id="doc-1",
        title="Doc",
        url="",
        last_edited_time=datetime.now(timezone.utc),
        raw_text="One.\n\nTwo.",
    )
    c1 = chunk_document(doc)
    c2 = chunk_document(doc)
    assert [c.id for c in c1] == [c.id for c in c2]
    assert len(c1) == 2


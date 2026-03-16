from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class NotionDocument:
    id: str
    title: str
    url: str
    last_edited_time: datetime
    raw_text: str


@dataclass(frozen=True)
class Chunk:
    id: str
    document_id: str
    order: int
    heading_path: str
    content: str
    chunk_hash: str
    chunking_version: str


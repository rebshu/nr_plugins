import argparse
import hashlib
from datetime import datetime
from typing import Iterable

from src.models.document import NotionDocument
from src.notion.client import get_notion_client


def _extract_title(page: dict) -> str:
    props = page.get("properties", {})
    for value in props.values():
        if value.get("type") == "title":
            title = value.get("title", [])
            if title:
                return "".join(chunk.get("plain_text", "") for chunk in title)
    return "Untitled"


def _collect_plain_text(blocks: list[dict]) -> str:
    lines: list[str] = []
    for block in blocks:
        block_type = block.get("type", "")
        payload = block.get(block_type, {})
        rich_text = payload.get("rich_text", [])
        line = "".join(t.get("plain_text", "") for t in rich_text).strip()
        if line:
            lines.append(line)
    return "\n".join(lines)


def fetch_documents(database_id: str) -> Iterable[NotionDocument]:
    notion = get_notion_client()
    cursor = None
    while True:
        query = notion.data_sources.query(data_source_id=database_id, start_cursor=cursor)
        for result in query.get("results", []):
            page_id = result["id"]
            blocks = notion.blocks.children.list(block_id=page_id).get("results", [])
            text = _collect_plain_text(blocks)
            edited = datetime.fromisoformat(result["last_edited_time"].replace("Z", "+00:00"))
            yield NotionDocument(
                id=page_id,
                title=_extract_title(result),
                url=result.get("url", ""),
                last_edited_time=edited,
                raw_text=text,
            )
        if not query.get("has_more"):
            break
        cursor = query.get("next_cursor")


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--database-id", required=True)
    args = parser.parse_args()
    docs = list(fetch_documents(args.database_id))
    print(f"Fetched {len(docs)} documents")


if __name__ == "__main__":
    main()


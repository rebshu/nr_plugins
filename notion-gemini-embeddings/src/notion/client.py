from notion_client import Client

from src.config import settings


def get_notion_client() -> Client:
    if not settings.notion_token:
        raise ValueError("NOTION_TOKEN is required")
    return Client(auth=settings.notion_token)


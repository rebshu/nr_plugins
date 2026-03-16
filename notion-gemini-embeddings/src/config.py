from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    notion_token: str = ""
    notion_database_id: str = ""
    google_api_key: str = ""
    google_application_credentials: str = ""
    google_use_vertex: bool = True
    pg_dsn: str = "postgresql://notion_embeddings:notion_embeddings@localhost:5432/notion_embeddings"
    gcp_project: str = ""
    gcp_region: str = "us-central1"
    embedding_model: str = "gemini-embedding-2-preview"
    embedding_requests_per_minute: int = 60
    chunking_version: str = "v1-semantic-paragraph"
    embedding_version: str = "v1"
    daily_budget_usd: float = 25.0

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)


settings = Settings()

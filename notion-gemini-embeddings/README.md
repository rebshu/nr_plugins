# Notion Gemini Embeddings

Standalone Python service for:

- extracting Notion Knowledge Base content,
- chunking documents deterministically,
- generating Gemini embeddings (`gemini-embedding-2-preview`),
- storing vectors in PostgreSQL/pgvector,
- serving semantic retrieval via REST API.

Google auth defaults to service-account JSON (Vertex). API key auth is still available as fallback.

## Quick Start

1. `cp .env.example .env`
2. `docker-compose up --build`
3. Apply schema and migrations in the running database.
4. Run incremental pipeline:
   - `python -m src.processing.incremental_processor --database-id=$NOTION_DATABASE_ID`
5. Start retrieval API:
   - `python -m src.api.retrieval_api`

## Constraints

- Default embedding rate limit: 60 requests/minute
- Default region: us-central1
- Daily budget guardrail: 25 USD

## Google Auth Modes

- Preferred: service account JSON via `GOOGLE_APPLICATION_CREDENTIALS` + `GOOGLE_USE_VERTEX=true`
- Required for Vertex mode: `GCP_PROJECT`, `GCP_REGION`
- Optional fallback: `GOOGLE_USE_VERTEX=false` with `GOOGLE_API_KEY`

## Documentation

- Usage guide: `docs/usage_guide.md`
- Contracts: `docs/contracts.md`
- Operations: `docs/operational_runbook.md`

## Embedding Visualization

Generate an interactive 2D embedding map with UMAP + Plotly:

- `python -m src.validation.embedding_visualizer --limit 2000 --color-by document --output-html embedding_map.html`

Useful flags:

- `--n-neighbors` and `--min-dist` tune UMAP cluster shape.
- `--metric` defaults to `cosine` for embedding distance.
- `--color-by` supports `document` or `none`.

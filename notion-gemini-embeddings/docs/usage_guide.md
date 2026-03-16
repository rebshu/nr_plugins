# Usage Guide

This guide explains how to run, operate, and troubleshoot the Notion Gemini embedding service.

## What This Service Does

- Extracts documents from the Notion Knowledge Base database
- Splits content into deterministic semantic chunks
- Generates embeddings with `gemini-embedding-2-preview`
- Stores vectors in PostgreSQL (`pgvector`)
- Serves semantic search via `/search`

## Prerequisites

- Python 3.12+ (or Docker)
- PostgreSQL with `pgvector` (or use provided compose service)
- Notion integration token with access to the Knowledge Base
- Google service account JSON (preferred) or Gemini API key

## Environment Setup

1. Copy the template:
   - `cp .env.example .env`
2. Fill at least:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
   - `GOOGLE_APPLICATION_CREDENTIALS` (path to service-account JSON)
   - `GCP_PROJECT`
   - `PG_DSN`
3. Keep defaults unless you need overrides:
   - `GOOGLE_USE_VERTEX=true`
   - `EMBEDDING_MODEL=gemini-embedding-2-preview`
   - `EMBEDDING_REQUESTS_PER_MINUTE=60`
   - `GCP_REGION=us-central1`

API-key fallback (optional):

- Set `GOOGLE_USE_VERTEX=false`
- Set `GOOGLE_API_KEY`

## Run With Docker (Recommended)

1. Build and start:
   - `docker-compose up --build`
2. Apply schema/migrations in the database container:
   - `psql "$PG_DSN" -f src/db/schema.sql`
   - `psql "$PG_DSN" -f src/db/migrations/002_add_watermark_tables.sql`
   - `psql "$PG_DSN" -f src/db/migrations/003_add_vector_indexes.sql`
3. Run an incremental ingest:
   - `python -m src.processing.incremental_processor --database-id="$NOTION_DATABASE_ID"`
4. Start the retrieval API:
   - `python -m src.api.retrieval_api`

## Run Locally (Virtualenv)

1. Create environment and install deps:
   - `python3 -m venv .venv`
   - `.venv/bin/python -m pip install -r requirements.txt`
2. Apply DB schema/migrations (same as above).
3. Run incremental ingest:
   - `.venv/bin/python -m src.processing.incremental_processor --database-id="$NOTION_DATABASE_ID"`
4. Start API:
   - `.venv/bin/python -m src.api.retrieval_api`

## Common Workflows

## Initial Backfill

- Run one full incremental pass after schema setup.
- Check processing output: `seen`, `processed`, `skipped`.
- Expect `processed` to be high on first run.

## Daily Incremental Sync

- Trigger orchestrator manually:
  - `.venv/bin/python -m src.orchestration.pipeline_orchestrator --database-id="$NOTION_DATABASE_ID"`
- Or validate schedule config:
  - `.venv/bin/python -m src.orchestration.scheduler --test-schedule`

## Semantic Search API

Health check:
- `curl http://localhost:8000/health`

Search:
- `curl -X POST http://localhost:8000/search -H "Content-Type: application/json" -d '{"query":"company processes","top_k":5}'`

Example response shape:
- `query`
- `result_count`
- `results[]` with `chunk_id`, `document_id`, `content`, `similarity`

## Embedding Visualization (UMAP + Plotly)

Generate an interactive HTML scatter plot from stored vectors:
- `.venv/bin/python -m src.validation.embedding_visualizer --limit 2000 --color-by document --output-html embedding_map.html`

Common options:
- `--n-neighbors` (default `15`) controls local neighborhood size.
- `--min-dist` (default `0.1`) controls point spread.
- `--metric` (default `cosine`) sets UMAP distance metric.
- `--color-by` (`document` or `none`) controls point coloring.

The output HTML includes hover metadata (`document_id`, `title`, `chunk_id`, and chunk preview) for each point.

## Testing and Validation

Run test suite:
- `.venv/bin/pytest -q`

Run golden set quality evaluation:
- `.venv/bin/python -m src.validation.embedding_quality_tester --run-golden-dataset tests/golden_dataset.json`

Validate prompt templates:
- `.venv/bin/python -m src.prompts.template_manager --test-template semantic_search`

## Operations Checklist

- Confirm at least one successful run in 24h
- Confirm queue depth and error rates are healthy
- Confirm daily cost under `DAILY_BUDGET_USD`
- If retrieval quality regresses, switch consumers to index-first mode

## Troubleshooting

- Notion failures: verify `NOTION_TOKEN` and database permissions
- Vertex auth failures: verify `GOOGLE_APPLICATION_CREDENTIALS` points to a readable JSON file and `GCP_PROJECT` is correct
- Gemini throttling: keep limiter at 60 RPM and retries enabled
- Re-embedding everything unexpectedly: verify watermark rows are being written
- Empty search results: ensure ingest has run and embeddings were stored

For incident and recovery playbooks, see:
- `docs/operational_runbook.md`
- `docs/troubleshooting_guide.md`

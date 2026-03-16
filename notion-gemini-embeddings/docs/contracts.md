# Contracts

## Input Contract (Notion -> Pipeline)

- `document_id`: string
- `title`: string
- `url`: string
- `last_edited_time`: RFC3339 timestamp
- `raw_text`: normalized plain text extracted from page blocks

## State Contract (Pipeline -> DB)

- `content_hash`: sha256(raw_text)
- `chunking_version`: string
- `embedding_model`: string
- `embedding_version`: string
- `last_processed_edited_time`: timestamp
- `last_embedded_at`: timestamp

## Retrieval Contract (API -> Consumers)

Request:
- `query`: string
- `top_k`: integer (1-25)

Response:
- `query`: string
- `result_count`: integer
- `results[]`: `chunk_id`, `document_id`, `content`, `similarity`

## SLO and Budget Baseline

- Retrieval API p95 latency target: < 100ms (with warmed indexes)
- Daily incremental run completion target: < 30 minutes at current scale
- Budget cap: 25 USD/day default, hard stop when exceeded

## Security Baseline

- Secrets supplied through environment/secret manager only
- No raw content in logs
- Least-privilege service account for Notion/GCP interactions

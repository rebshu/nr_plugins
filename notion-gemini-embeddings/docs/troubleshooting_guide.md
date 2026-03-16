# Troubleshooting Guide

## Common Failures

## Notion API authentication fails

- Check `NOTION_TOKEN` is set and has database read permissions.
- Verify `NOTION_DATABASE_ID` points to the Knowledge Base data source.

## Gemini embedding requests are throttled

- Confirm global limiter is configured at `60` RPM.
- Verify retries are active and jitter backoff is not disabled.

## Incremental run re-embeds everything

- Ensure watermark table has rows for processed documents.
- Confirm `content_hash` and `last_edited_time` are persisted each run.

## Retrieval quality drops

- Run the golden dataset evaluator and compare `p_at_5` to baseline.
- Roll back to index-first retrieval if regression exceeds threshold.

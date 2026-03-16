# Operational Runbook

## Daily Operations

1. Verify scheduler triggered one incremental run in the last 24h.
2. Confirm run status is `success` and changed-doc count is within expected range.
3. Check daily budget consumption and API error rate dashboards.

## Incident Response

1. If embedding API failures spike, switch consumers to index-first retrieval mode.
2. Pause queue fan-out and run single-runner mode for controlled retries.
3. Validate Notion connectivity and service-account permissions.

## Recovery

1. Restore PostgreSQL backup to standby instance.
2. Re-run incremental processing from latest successful watermark.
3. Re-enable vector retrieval after quality gate passes.

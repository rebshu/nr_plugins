from dataclasses import dataclass


@dataclass(frozen=True)
class PipelineHealth:
    stale_documents: int
    queue_depth: int
    failed_runs_last_24h: int


def is_healthy(health: PipelineHealth) -> bool:
    return health.queue_depth < 500 and health.failed_runs_last_24h == 0


from dataclasses import dataclass

from src.config import settings


@dataclass(frozen=True)
class QueueConfig:
    project: str
    region: str
    queue_name: str = "embedding-pipeline"


def get_queue_config() -> QueueConfig:
    return QueueConfig(project=settings.gcp_project, region=settings.gcp_region)


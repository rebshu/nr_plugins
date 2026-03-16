import logging


logger = logging.getLogger(__name__)


def notify_failure(stage: str, err: Exception) -> None:
    logger.error("pipeline_stage_failed", extra={"stage": stage, "error": str(err)})


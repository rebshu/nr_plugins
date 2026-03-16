import argparse
import uuid
from datetime import datetime, timezone

from src.orchestration.failure_handler import notify_failure
from src.processing.incremental_processor import run_incremental


def run_pipeline(database_id: str, dry_run: bool = False) -> dict:
    run_id = str(uuid.uuid4())
    started = datetime.now(timezone.utc)
    try:
        stats = run_incremental(database_id=database_id, dry_run=dry_run)
        status = "success"
        error = None
    except Exception as err:  # pragma: no cover - guardrail
        notify_failure("incremental", err)
        status = "failed"
        stats = {"seen": 0, "processed": 0, "skipped": 0}
        error = str(err)
    return {
        "run_id": run_id,
        "status": status,
        "started_at": started.isoformat(),
        "stats": stats,
        "error": error,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--database-id", default="")
    parser.add_argument("--schedule-daily", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if args.schedule_daily:
        print("Use scheduler.py for daily schedules.")
        return
    print(run_pipeline(database_id=args.database_id, dry_run=args.dry_run))


if __name__ == "__main__":
    main()


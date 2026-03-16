import argparse
import json

from src.tasks.queue_config import get_queue_config


def create_task_payload(stage: str, payload: dict) -> dict:
    return {"stage": stage, "payload": payload}


def create_test_task() -> dict:
    cfg = get_queue_config()
    # Placeholder for Cloud Tasks SDK integration; preserves payload contract.
    return {
        "project": cfg.project,
        "region": cfg.region,
        "queue": cfg.queue_name,
        "task": create_task_payload("extract", {"test": True}),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--create-test-task", action="store_true")
    args = parser.parse_args()
    if args.create_test_task:
        print(json.dumps(create_test_task(), indent=2))


if __name__ == "__main__":
    main()


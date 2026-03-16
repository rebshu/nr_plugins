import argparse
import json


def export_dashboard_spec() -> dict:
    return {
        "panels": [
            "requests_per_minute",
            "estimated_cost_usd",
            "queue_depth",
            "pipeline_latency_ms",
            "retrieval_p95_ms",
        ]
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--create-dashboard", action="store_true")
    args = parser.parse_args()
    if args.create_dashboard:
        print(json.dumps(export_dashboard_spec(), indent=2))


if __name__ == "__main__":
    main()


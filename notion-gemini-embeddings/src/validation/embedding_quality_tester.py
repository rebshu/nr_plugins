import argparse
import json
from pathlib import Path

from src.validation.relevance_scorer import precision_at_k


def evaluate_golden_dataset(path: str) -> dict:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    scores = []
    for item in data:
        scores.append(precision_at_k(item["relevance_flags"], 5))
    avg = sum(scores) / len(scores) if scores else 0.0
    return {"queries": len(scores), "p_at_5": round(avg, 4)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-golden-dataset", required=True)
    args = parser.parse_args()
    print(evaluate_golden_dataset(args.run_golden_dataset))


if __name__ == "__main__":
    main()


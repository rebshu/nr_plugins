import argparse
from dataclasses import dataclass


@dataclass(frozen=True)
class Alert:
    name: str
    threshold: float
    current: float


def should_alert(alert: Alert) -> bool:
    return alert.current >= alert.threshold


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--setup-alerts", action="store_true")
    args = parser.parse_args()
    if args.setup_alerts:
        print("Alert rules loaded")


if __name__ == "__main__":
    main()


import argparse
from dataclasses import dataclass


@dataclass(frozen=True)
class DailySchedule:
    cron: str
    timezone: str


def build_default_schedule() -> DailySchedule:
    return DailySchedule(cron="0 9 * * *", timezone="UTC")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-schedule", action="store_true")
    args = parser.parse_args()
    if args.test_schedule:
        print(build_default_schedule())


if __name__ == "__main__":
    main()


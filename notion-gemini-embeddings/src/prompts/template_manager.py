import argparse

import yaml


def load_templates(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def render_template(template: str, variables: dict[str, str]) -> str:
    return template.format(**variables)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-template", required=True)
    parser.add_argument("--config", default="config/prompt_templates.yaml")
    args = parser.parse_args()
    templates = load_templates(args.config)
    print(templates.get(args.test_template, "missing template"))


if __name__ == "__main__":
    main()


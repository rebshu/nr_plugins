from src.config import settings


def estimate_cost_usd(tokens: int, price_per_million_tokens: float = 0.15) -> float:
    return (tokens / 1_000_000) * price_per_million_tokens


def budget_allows(run_estimated_cost: float) -> bool:
    return run_estimated_cost <= settings.daily_budget_usd


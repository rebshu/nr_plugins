from src.monitoring.cost_calculator import budget_allows, estimate_cost_usd


def test_cost_estimation_non_negative():
    assert estimate_cost_usd(1000) >= 0
    assert isinstance(budget_allows(0.1), bool)


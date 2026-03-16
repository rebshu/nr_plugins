def rank_results(results: list[dict]) -> list[dict]:
    return sorted(results, key=lambda r: r.get("similarity", 0), reverse=True)


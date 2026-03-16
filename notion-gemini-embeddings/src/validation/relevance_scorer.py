def precision_at_k(relevance_flags: list[int], k: int) -> float:
    if k <= 0:
        return 0.0
    k = min(k, len(relevance_flags))
    if k == 0:
        return 0.0
    return sum(relevance_flags[:k]) / k


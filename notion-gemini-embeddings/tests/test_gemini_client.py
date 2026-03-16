from src.gemini.rate_limiter import SimpleRateLimiter


def test_rate_limiter_allows_single_request():
    limiter = SimpleRateLimiter(60)
    limiter.acquire()
    assert True


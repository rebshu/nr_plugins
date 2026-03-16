def format_search_response(query: str, ranked_results: list[dict]) -> dict:
    return {
        "query": query,
        "result_count": len(ranked_results),
        "results": ranked_results,
    }


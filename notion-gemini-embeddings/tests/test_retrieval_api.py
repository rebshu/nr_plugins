from unittest.mock import patch

from fastapi.testclient import TestClient

from src.api.retrieval_api import app


def test_search_endpoint():
    client = TestClient(app)
    with patch("src.api.retrieval_api.embed_query") as embed_query, patch(
        "src.api.retrieval_api.search_similar_chunks"
    ) as search:
        embed_query.return_value = [0.1, 0.2]
        search.return_value = [{"chunk_id": "c1", "document_id": "d1", "content": "x", "similarity": 0.9}]
        resp = client.post("/search", json={"query": "company processes", "top_k": 3})
        assert resp.status_code == 200
        assert resp.json()["result_count"] == 1


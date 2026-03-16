from fastapi import FastAPI
from pydantic import BaseModel, Field

from src.api.query_processor import embed_query
from src.api.response_formatter import format_search_response
from src.retrieval.similarity_ranker import rank_results
from src.retrieval.vector_search import search_similar_chunks

app = FastAPI(title="Notion Gemini Retrieval API", version="0.1.0")


class SearchRequest(BaseModel):
    query: str = Field(min_length=1)
    top_k: int = Field(default=5, ge=1, le=25)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/search")
def search(req: SearchRequest) -> dict:
    query_vec = embed_query(req.query)
    rows = search_similar_chunks(query_vec, top_k=req.top_k)
    ranked = rank_results(rows)
    return format_search_response(req.query, ranked)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


"""Small HTTP API for local KhmerKit search."""

import argparse
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .data import load_documents
from .search import SearchIndex


class SearchRequest(BaseModel):
    query: str = Field(min_length=1)
    k: int = Field(default=3, ge=1, le=20)


class SearchItem(BaseModel):
    doc_id: str
    score: float


class SearchResponse(BaseModel):
    query: str
    results: list[SearchItem]


def create_app(documents_path: Path = Path("data/real/documents.jsonl")) -> FastAPI:
    documents = load_documents(documents_path)
    index = SearchIndex(documents)
    app = FastAPI(title="KhmerKit Search API", version="0.1.0")

    @app.get("/health")
    def health() -> dict[str, object]:
        return {"status": "ok", "documents": len(documents)}

    @app.post("/search", response_model=SearchResponse)
    def search(request: SearchRequest) -> SearchResponse:
        query = request.query.strip()
        if not query:
            raise HTTPException(status_code=422, detail="query must not be blank")
        results = [
            SearchItem(doc_id=result.doc_id, score=result.score)
            for result in index.search(query, k=request.k)
        ]
        return SearchResponse(query=query, results=results)

    return app


def main() -> None:
    import uvicorn

    parser = argparse.ArgumentParser(description="Run the KhmerKit search API")
    parser.add_argument("--documents", type=Path, default=Path("data/real/documents.jsonl"))
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    uvicorn.run(create_app(args.documents), host=args.host, port=args.port)

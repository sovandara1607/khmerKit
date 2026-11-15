"""HTTP API for local and production KhmerKit search and text normalization."""

import argparse
from datetime import datetime, timezone
import logging
import os
from pathlib import Path
import time
import unicodedata

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from . import __version__
from .data import load_document_records
from .normalize import normalize_text
from .search import ExactSearch, SearchIndex

logger = logging.getLogger("khmerkit.api")


class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=1000)
    k: int = Field(default=3, ge=1, le=20)


class SearchItem(BaseModel):
    doc_id: str
    score: float


class SearchResponse(BaseModel):
    query: str
    results: list[SearchItem]


class NormalizeRequest(BaseModel):
    text: str = Field(..., max_length=50000)
    profile: str = Field(default="khmer")


class NormalizeResponse(BaseModel):
    normalized_text: str
    changed: bool
    profile: str
    engine_version: str
    processing_time_ms: float


class VersionedSearchRequest(BaseModel):
    collection_id: str = Field(default="demo")
    query: str = Field(min_length=1, max_length=1000)
    method: str = Field(default="char_tfidf")
    top_k: int = Field(default=3, ge=1, le=20)


class VersionedSearchResult(BaseModel):
    document_id: str
    source: str
    passage: str
    score: float | None


class VersionedSearchResponse(BaseModel):
    results: list[VersionedSearchResult]
    method: str
    processing_time_ms: float


class HealthResponse(BaseModel):
    status: str
    version: str
    documents: int
    timestamp: str


def create_app(documents_path: Path = Path("data/real/documents.jsonl")) -> FastAPI:
    document_records = load_document_records(documents_path)
    documents = [(row["id"], row["text"]) for row in document_records]
    metadata = {row["id"]: row for row in document_records}
    index = SearchIndex(documents)
    exact_index = ExactSearch(documents, normalize=True)

    app = FastAPI(
        title="KhmerKit Search & Normalization API",
        version=__version__,
        description="Lightweight Khmer text normalization and document retrieval API",
    )

    cors_origins_env = os.getenv("KHMERKIT_CORS_ORIGINS")
    if cors_origins_env:
        origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
    else:
        origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://khmerkit.sovandara.lol",
        ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins if origins != ["*"] else ["*"],
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start_time) * 1000
        # Safe logging: log path, status, and duration without logging user text
        logger.info(
            "path=%s method=%s status=%d duration_ms=%.2f",
            request.url.path,
            request.method,
            response.status_code,
            duration_ms,
        )
        return response

    @app.get("/health", response_model=HealthResponse)
    @app.get("/v1/health", response_model=HealthResponse)
    def health() -> HealthResponse:
        return HealthResponse(
            status="ok",
            version=__version__,
            documents=len(documents),
            timestamp=datetime.now(timezone.utc).isoformat(),
        )

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

    @app.post("/v1/text/normalize", response_model=NormalizeResponse)
    def normalize(request: NormalizeRequest) -> NormalizeResponse:
        started = time.perf_counter()
        if request.profile == "nfc":
            normalized = unicodedata.normalize("NFC", request.text)
        elif request.profile == "nfc_whitespace":
            normalized = " ".join(unicodedata.normalize("NFC", request.text).split())
        elif request.profile == "khmer":
            normalized = normalize_text(request.text).text
        else:
            raise HTTPException(status_code=422, detail="unsupported normalization profile")
        return NormalizeResponse(
            normalized_text=normalized,
            changed=normalized != request.text,
            profile=request.profile,
            engine_version=__version__,
            processing_time_ms=round((time.perf_counter() - started) * 1000, 3),
        )

    @app.post("/v1/search/query", response_model=VersionedSearchResponse)
    def versioned_search(request: VersionedSearchRequest) -> VersionedSearchResponse:
        started = time.perf_counter()
        query = request.query.strip()
        if not query:
            raise HTTPException(status_code=422, detail="query must not be blank")
        if request.collection_id != "demo":
            raise HTTPException(status_code=404, detail="unknown collection")
        if request.method == "char_tfidf":
            results = index.search(query, k=request.top_k)
        elif request.method == "normalized_keyword":
            results = exact_index.search(query, k=request.top_k)
        else:
            raise HTTPException(status_code=422, detail="unsupported search method")
        return VersionedSearchResponse(
            results=[
                VersionedSearchResult(
                    document_id=result.doc_id,
                    source=metadata[result.doc_id].get("title", result.doc_id),
                    passage=metadata[result.doc_id]["text"],
                    score=result.score,
                )
                for result in results
            ],
            method=request.method,
            processing_time_ms=round((time.perf_counter() - started) * 1000, 3),
        )

    return app


def main() -> None:
    import uvicorn

    parser = argparse.ArgumentParser(description="Run the KhmerKit search API")
    parser.add_argument("--documents", type=Path, default=Path("data/real/documents.jsonl"))
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    uvicorn.run(create_app(args.documents), host=args.host, port=args.port)

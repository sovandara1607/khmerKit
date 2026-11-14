from pathlib import Path

from fastapi.testclient import TestClient

from khmerkit.api import create_app


def test_health_reports_loaded_documents():
    client = TestClient(create_app(Path("data/real/documents.jsonl")))
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "documents": 20}


def test_search_returns_ranked_documents():
    client = TestClient(create_app(Path("data/real/documents.jsonl")))
    response = client.post(
        "/search",
        json={"query": "រាជធានីរបស់កម្ពុជា", "k": 3},
    )
    assert response.status_code == 200
    assert response.json()["results"][0]["doc_id"] == "wiki-1784"


def test_search_rejects_blank_query():
    client = TestClient(create_app(Path("data/real/documents.jsonl")))
    response = client.post("/search", json={"query": "   "})
    assert response.status_code == 422


def test_versioned_normalization_endpoint_returns_runtime_metadata():
    client = TestClient(create_app(Path("data/real/documents.jsonl")))
    response = client.post(
        "/v1/text/normalize",
        json={"text": "  API\nDocs  ", "profile": "nfc_whitespace"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["normalized_text"] == "API Docs"
    assert body["changed"] is True
    assert body["engine_version"] == "0.1.0"


def test_versioned_search_endpoint_returns_sources():
    client = TestClient(create_app(Path("data/real/documents.jsonl")))
    response = client.post(
        "/v1/search/query",
        json={"collection_id": "demo", "query": "រាជធានីរបស់កម្ពុជា", "method": "char_tfidf"},
    )
    assert response.status_code == 200
    assert response.json()["results"][0]["document_id"] == "wiki-1784"

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

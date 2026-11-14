"""Minimal KhmerKit application example."""

from pathlib import Path

from khmerkit.data import load_dataset
from khmerkit.search import SearchIndex


documents, _ = load_dataset(
    Path("data/real/queries.reviewed.jsonl"),
    documents_path=Path("data/real/documents.jsonl"),
)
index = SearchIndex(documents)

for result in index.search("រាជធានីរបស់កម្ពុជា", k=3):
    print(result.doc_id, result.score)

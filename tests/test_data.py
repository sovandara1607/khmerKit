from pathlib import Path

from khmerkit.data import load_dataset


def test_query_only_file_infers_sibling_documents():
    documents, queries = load_dataset(
        Path("data/real/queries.reviewed.jsonl"),
        documents_path=Path("data/real/documents.jsonl"),
    )
    assert len(documents) == 20
    assert len(queries) == 1
    assert queries[0].relevant == frozenset({"wiki-1784"})

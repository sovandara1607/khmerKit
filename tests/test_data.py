from pathlib import Path

from khmerkit.data import load_dataset


def test_query_only_file_infers_sibling_documents():
    documents, queries = load_dataset(
        Path("data/real/queries.reviewed.jsonl"),
        documents_path=Path("data/real/documents.jsonl"),
    )
    assert len(documents) == 20
    assert len(queries) == 20
    assert queries[0].relevant == frozenset({"wiki-1784"})


def test_assistant_draft_queries_cover_the_starter_corpus():
    documents, queries = load_dataset(
        Path("data/real/queries.assistant-draft.jsonl"),
        documents_path=Path("data/real/documents.jsonl"),
    )
    document_ids = {doc_id for doc_id, _ in documents}
    assert len(queries) == 20
    assert all(case.relevant <= document_ids for case in queries)

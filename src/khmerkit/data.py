"""Loading for the repository's synthetic starter evaluation set."""

import json
from pathlib import Path

from .evaluate import QueryCase


def _read_rows(path: Path) -> list[dict]:
    rows = []
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError as error:
            raise ValueError(
                f"{path}:{line_number} is not one valid JSON object per line"
            ) from error
    return rows


def load_dataset(
    path: Path,
    *,
    documents_path: Path | None = None,
    adjudicated_only: bool = False,
) -> tuple[list[tuple[str, str]], list[QueryCase]]:
    rows = _read_rows(path)
    documents = [(row["id"], row["text"]) for row in rows if row["type"] == "document"]
    if not documents:
        inferred_documents_path = documents_path or path.parent / "documents.jsonl"
        if inferred_documents_path.exists() and inferred_documents_path != path:
            documents = [
                (row["id"], row["text"])
                for row in _read_rows(inferred_documents_path)
                if row["type"] == "document"
            ]
    if not documents:
        raise ValueError(
            f"no documents found in {path} or its sibling documents.jsonl"
        )
    queries = []
    seen_query_ids = set()
    for row in rows:
        if row["type"] != "query":
            continue
        if adjudicated_only and row.get("adjudicated") is not True:
            continue
        if row["id"] in seen_query_ids:
            raise ValueError(f"duplicate query id: {row['id']}")
        seen_query_ids.add(row["id"])
        queries.append(QueryCase(row["id"], row["text"], frozenset(row["relevant"])))
    if not queries:
        raise ValueError(f"no eligible queries found in {path}")
    return documents, queries


def load_documents(path: Path) -> list[tuple[str, str]]:
    """Load document IDs and text from a document-only JSONL file."""

    documents = [
        (row["id"], row["text"])
        for row in _read_rows(path)
        if row["type"] == "document"
    ]
    if not documents:
        raise ValueError(f"no documents found in {path}")
    return documents

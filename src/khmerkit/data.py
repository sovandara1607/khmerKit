"""Loading for the repository's synthetic starter evaluation set."""

import json
from pathlib import Path

from .evaluate import QueryCase


def load_dataset(path: Path) -> tuple[list[tuple[str, str]], list[QueryCase]]:
    rows = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
    documents = [(row["id"], row["text"]) for row in rows if row["type"] == "document"]
    queries = [
        QueryCase(row["id"], row["text"], frozenset(row["relevant"]))
        for row in rows
        if row["type"] == "query"
    ]
    return documents, queries

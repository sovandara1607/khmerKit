"""Command line search over a KhmerKit document JSONL file."""

import argparse
import json
from pathlib import Path

from .data import load_documents
from .search import SearchIndex


def _print_results(results) -> None:
    for result in results:
        print(json.dumps(result.__dict__, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description="Search a KhmerKit document JSONL file")
    parser.add_argument("--documents", type=Path, default=Path("data/real/documents.jsonl"))
    parser.add_argument("--query", help="query text, or enter queries interactively")
    parser.add_argument("-k", type=int, default=3)
    args = parser.parse_args()

    index = SearchIndex(load_documents(args.documents))
    if args.query:
        _print_results(index.search(args.query, k=args.k))
        return

    while True:
        try:
            query = input("query> ").strip()
        except EOFError:
            break
        if not query:
            break
        _print_results(index.search(query, k=args.k))

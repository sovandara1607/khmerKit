"""Run a diagnostic Hit Rate@3 check over a local Khmer query JSONL file."""

import argparse
import json
from pathlib import Path

from khmerkit.data import load_documents
from khmerkit.search import SearchIndex


def run(queries_path: Path, documents_path: Path, output_path: Path) -> dict:
    index = SearchIndex(load_documents(documents_path))
    rows = [
        json.loads(line)
        for line in queries_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    results = []
    for row in rows:
        expected = set(row["expected"])
        ranked = index.search(row["text"], k=3)
        top_ids = [item.doc_id for item in ranked]
        results.append(
            {
                "id": row["id"],
                "query": row["text"],
                "expected": sorted(expected),
                "top3": top_ids,
                "hit_at_3": bool(expected.intersection(top_ids)),
            }
        )
    report = {
        "query_count": len(results),
        "hit_rate_at_3": sum(row["hit_at_3"] for row in results) / len(results),
        "results": results,
    }
    output_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Run KhmerKit's local quality smoke test")
    parser.add_argument("--queries", type=Path, default=Path("data/real/smoke-queries.jsonl"))
    parser.add_argument("--documents", type=Path, default=Path("data/real/documents.jsonl"))
    parser.add_argument("--output", type=Path, default=Path("data/real/quality-smoke-results.json"))
    args = parser.parse_args()
    report = run(args.queries, args.documents, args.output)
    print(f"Hit Rate@3: {report['hit_rate_at_3']:.3f} ({report['query_count']} queries)")

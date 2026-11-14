"""Command line benchmark runner."""

import argparse
import json
from pathlib import Path

from .data import load_dataset
from .evaluate import evaluate
from .search import CharNgramSearch, ExactSearch


def main() -> None:
    parser = argparse.ArgumentParser(description="Run KhmerKit retrieval baselines")
    parser.add_argument("--dataset", type=Path, default=Path("data/search_eval.synthetic.jsonl"))
    parser.add_argument(
        "--documents",
        type=Path,
        help="JSONL document file when --dataset contains queries only",
    )
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    documents, cases = load_dataset(args.dataset, documents_path=args.documents)
    systems = {
        "exact_raw": ExactSearch(documents, normalize=False),
        "exact_normalized": ExactSearch(documents, normalize=True),
        "char_tfidf_normalized": CharNgramSearch(documents, normalize=True),
    }
    report = {
        name: {
            "hit_rate_at_3": evaluation.hit_rate_at_3,
            "mean_reciprocal_rank": evaluation.mean_reciprocal_rank,
            "per_query": {
                query_id: [result.__dict__ for result in results]
                for query_id, results in evaluation.per_query.items()
            },
        }
        for name, searcher in systems.items()
        for evaluation in [evaluate(cases, searcher)]
    }
    payload = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.write_text(payload, encoding="utf-8")
    else:
        print(payload, end="")

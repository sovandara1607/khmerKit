# KhmerKit side project

This repository keeps the package, tests, data, and research notes at the project root for one-command use.

```bash
.venv/bin/python -m pip install '.[dev]'
.venv/bin/pytest
.venv/bin/khmerkit-benchmark --dataset data/search_eval.synthetic.jsonl --output benchmark-results.json
.venv/bin/khmerkit-validate-provenance data/provenance.csv
```

For reviewed queries stored separately from the corpus, run `khmerkit-benchmark --dataset data/real/queries.reviewed.jsonl --documents data/real/documents.jsonl --output data/real/benchmark-results.json`. The CLI also infers a sibling `documents.jsonl` file when `--documents` is omitted.

Package code is in `src/khmerkit/`, tests are in `tests/`, and the synthetic evaluation set is in `data/`.

The real starter corpus is in `data/real/`. Its 20 query candidates are marked `needs_human_review` and are excluded from benchmark scores until two independent labels and an adjudicated `relevant` field are added.

An assistant-drafted 20-query smoke test is available at `data/real/queries.assistant-draft.jsonl`. Its benchmark output is `data/real/benchmark-results.assistant-draft.json`. Treat those numbers as pipeline diagnostics until human review is complete.

## Use KhmerKit from Python

```python
from khmerkit.search import SearchIndex

index = SearchIndex([
    ("doc-1", "អត្ថបទជាភាសាខ្មែរ"),
    ("doc-2", "English and Khmer text"),
])
results = index.search("ស្វែងរកអត្ថបទ", k=3)
```

The default backend is normalized character TF-IDF. Use `SearchIndex(documents, backend="exact")` when you need the transparent token-overlap baseline.

## Try local search

```bash
khmerkit-search \
  --documents data/real/documents.jsonl \
  --query "រាជធានីរបស់កម្ពុជា"
```

Omit `--query` to enter multiple queries interactively. Each result is emitted as one JSON object with a document ID and score.

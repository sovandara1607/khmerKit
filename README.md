# KhmerKit side project

This repository keeps the package, tests, data, and research notes at the project root for one-command use.

```bash
.venv/bin/python -m pip install '.[dev]'
.venv/bin/pytest
.venv/bin/khmerkit-benchmark --dataset data/search_eval.synthetic.jsonl --output benchmark-results.json
.venv/bin/khmerkit-validate-provenance data/provenance.csv
```

For reviewed queries stored separately from the corpus, run `khmerkit-benchmark --dataset data/real/queries.reviewed.jsonl --documents data/real/documents.jsonl --adjudicated-only --output data/real/benchmark-results.adjudicated.json`. The CLI also infers a sibling `documents.jsonl` file when `--documents` is omitted.

Package code is in `src/khmerkit/`, tests are in `tests/`, and the synthetic evaluation set is in `data/`.

The real starter corpus is in `data/real/`. Its 20 query candidates are marked `needs_human_review` and are excluded from benchmark scores until two independent labels and an adjudicated `relevant` field are added.

An assistant-drafted 20-query smoke test is available at `data/real/queries.assistant-draft.jsonl`. Its benchmark output is `data/real/benchmark-results.assistant-draft.json`. Treat those numbers as pipeline diagnostics until human review is complete.

Use `data/real/review-sheet.csv` to review the pending query labels without editing JSON directly.

The assistant-filled review file is `data/real/queries.assistant-reviewed.jsonl`. It keeps `adjudicated: false` until a human confirms the decisions.

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

`SegmentedSearch` and `SearchIndex(..., backend="segmented_tfidf", segmenter=...)` accept a caller-supplied segmenter. The optional `khmer-segmenter` adapter is kept outside the core dependencies until its package license is confirmed.

The local segmenter comparison used `khmer-segmenter==0.1.0` and produced the same 0.950 Hit Rate@3 as character TF-IDF. Its report is `data/real/benchmark-results.segmented-assistant-reviewed.json`.

## Try local search

```bash
khmerkit-search \
  --documents data/real/documents.jsonl \
  --query "រាជធានីរបស់កម្ពុជា"
```

Omit `--query` to enter multiple queries interactively. Each result is emitted as one JSON object with a document ID and score.

## Run the local API

```bash
khmerkit-api --documents data/real/documents.jsonl --port 8000
```

Check the service:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/search \
  -H 'content-type: application/json' \
  -d '{"query":"រាជធានីរបស់កម្ពុជា","k":3}'
```

The current local smoke test retrieves an acceptable document for all 40 drafted queries in the top three. See [`docs/quality-smoke.md`](docs/quality-smoke.md) for the diagnostic scope.

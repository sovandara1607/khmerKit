# KhmerKit side project

This repository keeps the package, tests, data, and research notes at the project root for one-command use.

```bash
.venv/bin/python -m pip install '.[dev]'
.venv/bin/pytest
.venv/bin/khmerkit-benchmark --dataset data/search_eval.synthetic.jsonl --output benchmark-results.json
.venv/bin/khmerkit-validate-provenance data/provenance.csv
```

Package code is in `src/khmerkit/`, tests are in `tests/`, and the synthetic evaluation set is in `data/`.

The real starter corpus is in `data/real/`. Its 20 query candidates are marked `needs_human_review` and are excluded from benchmark scores until two independent labels and an adjudicated `relevant` field are added.

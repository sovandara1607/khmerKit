# Local search smoke test

This smoke test checks 40 realistic Khmer queries against the 20-document local corpus using the default normalized character TF-IDF backend.

Result: **40/40 queries retrieved an acceptable document in the top three**.

Queries can list multiple acceptable document IDs when the wording is ambiguous. The expected IDs are diagnostic labels and should be reviewed before changing the retrieval algorithm.

The complete machine-readable output is in [`data/real/quality-smoke-results.json`](../data/real/quality-smoke-results.json). The query inputs are in [`data/real/smoke-queries.jsonl`](../data/real/smoke-queries.jsonl).

Run it again with `khmerkit-quality-smoke`. This is a diagnostic smoke test. It is separate from the adjudicated benchmark because the expected IDs were drafted for coverage checks.

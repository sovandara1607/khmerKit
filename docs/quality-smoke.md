# Local search smoke test

This smoke test checks ten realistic Khmer queries against the 20-document local corpus using the default normalized character TF-IDF backend.

Result: **9/10 queries retrieved the expected document in the top three**.

The one miss was `ប្រវត្តិសាស្ត្រខ្មែរ`. The expected page was `wiki-10073`, while `wiki-2356` ranked first. Both pages concern history, so this is an ambiguous query and should be reviewed before changing the retrieval algorithm.

The complete machine-readable output is in [`data/real/quality-smoke-results.json`](../data/real/quality-smoke-results.json). The query inputs are in [`data/real/smoke-queries.jsonl`](../data/real/smoke-queries.jsonl).

This is a diagnostic smoke test. It is separate from the adjudicated benchmark because the expected IDs were drafted for coverage checks.

# Recorded starter results

Command run from the repository root:

```bash
.venv/bin/pytest
.venv/bin/khmerkit-benchmark --output benchmark-results.json
```

Environment: Python 3.14.7, Pheasa 0.1.0, scikit-learn 1.9.1, pytest 9.2.0. The full per-query output is in `benchmark-results.json`.

| System | Hit Rate@3 | MRR |
| --- | ---: | ---: |
| exact_raw | 0.429 | 0.357 |
| exact_normalized | 0.571 | 0.500 |
| char_tfidf_normalized | 1.000 | 1.000 |

The normalized exact baseline gains on the synthetic malformed-order query because Pheasa canonicalizes the query to the same byte sequence as the document. The character n-gram system avoids Khmer word-boundary assumptions and ranks every relevant document first in this starter set.

These results are not a quality claim. The corpus contains seven author-written documents and seven short queries, with one relevant document per query and no independent human annotation. The next benchmark should use permissioned real text, multiple annotators, and held-out queries.

Phase 2 now includes 20 permissioned Khmer Wikipedia lead excerpts with page URLs, revision IDs, license records, and SHA-256 checksums. Their title-derived query candidates remain outside the score table until human relevance review is complete.

An assistant-drafted smoke test over all 20 excerpts produced Hit Rate@3 0.950 for normalized character TF-IDF, 0.150 for both exact baselines, and MRR values of 0.900, 0.092, and 0.092 respectively. These are pipeline diagnostics because the query labels are assistant-generated and `adjudicated` is false.

The current `queries.reviewed.jsonl` run covers 20 unique rows and reports Hit Rate@3 0.950 for normalized character TF-IDF, 0.150 for both exact baselines, and MRR values of 0.900, 0.092, and 0.092. One row is adjudicated and 19 rows retain the assistant-draft status, so this remains a preliminary evaluation.

The adjudicated-only report is `data/real/benchmark-results.adjudicated.json`. It currently contains one query and reports Hit Rate@3 1.000 for normalized character TF-IDF and 0.000 for both exact baselines. More adjudicated queries are required before comparing systems.

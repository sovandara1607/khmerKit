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

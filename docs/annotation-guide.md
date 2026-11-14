# KhmerKit search annotation guide

This guide is for building the first human-reviewed Khmer search evaluation set.

## Record workflow

1. Add one row to `data/provenance.csv` before importing any source text.
2. Confirm the source license and redistribution status from the publisher or license page.
3. Save the source text under `data/real/` only when `redistributable` is `true`.
4. Record the SHA-256 hash of the exact saved file in `content_sha256`.
5. Keep an attribution note in the `notes` column when the license requires it.

Sources with unclear ownership, unclear license terms, or terms that prohibit redistribution should stay outside the repository. Store a URL, access date, and hash in a private working copy if needed.

## Query format

Create one JSONL query row for each test query:

```json
{"type":"query","id":"q-example-001","text":"សំណួរស្វែងរកជាភាសាខ្មែរ","relevant":["doc-example-001"],"annotators":["a1","a2"],"adjudicated":true}
```

Use short queries that a real user might enter. Include spelling variation, mixed Khmer-English input, punctuation, and Unicode-order variation when the source supports those cases. Keep query text separate from source text so the evaluation does not train on the answer wording.

## Relevance labels

- `relevant` means the document directly answers or materially supports the query.
- `not_relevant` means the document does not help answer the query.
- `uncertain` means the annotator cannot decide from the document alone. Exclude unresolved cases from the primary score and report their count.

Each query should have two independent labels. An adjudicator resolves disagreements and records the final relevant document IDs. Do not use search-system rankings during annotation.

## Minimum release checklist

- Every document has a provenance row.
- Every redistributable document has a license URL and attribution note when required.
- Every query has two independent labels or an explicit exclusion reason.
- The released JSONL contains no unresolved private or restricted text.
- The benchmark report states the number of documents, queries, annotators, and excluded cases.

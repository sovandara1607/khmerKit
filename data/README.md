# Evaluation data

`search_eval.synthetic.jsonl` contains seven short documents and seven query/relevance rows authored for this repository. It does not copy text from an external corpus. The rows are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Keep this label with the file when it is redistributed.

`provenance.csv` records the rights and hash for each released data asset. Add a provenance row before adding a real corpus file. The annotation workflow is in [`docs/annotation-guide.md`](../docs/annotation-guide.md).

The first real starter corpus is in [`real/`](real/). It contains 20 adapted Khmer Wikipedia lead excerpts and 20 title-derived query candidates awaiting human review.

The `type` field distinguishes documents from queries. Query rows use `relevant` for the document IDs that should be retrieved.

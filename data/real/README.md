# Khmer Wikipedia starter corpus

This directory contains 20 Khmer Wikipedia lead excerpts fetched on 2026-11-14 from `km.wikipedia.org` through the MediaWiki API. Each excerpt is limited to 1,200 characters and is stored as an adapted extract. The source page URL and revision ID are recorded in [`../provenance.csv`](../provenance.csv).

Wikimedia text reuse requires attribution and ShareAlike compliance. The source pages are identified as CC BY-SA 4.0 and GFDL in the Wikimedia terms. The page URL in the provenance ledger supplies the attribution path. The excerpts have been shortened, so releases should state that the text was modified. See the [Wikimedia terms of use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) and [CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).

The root `LICENSE` applies to KhmerKit code. It does not relicense these source excerpts. Keep the source license and attribution with any distribution that includes this directory.

## Query status

`queries.unreviewed.jsonl` contains title-derived candidates. They are deliberately excluded from benchmark scores until two people independently label relevance and an adjudicator records final `relevant` document IDs. Candidate rows include `candidate_relevant` only to speed up review.

`queries.assistant-draft.jsonl` contains 20 assistant-generated query and relevance drafts. Its scores are pipeline diagnostics only. It has `review_status: "assistant_draft"` and `adjudicated: false` on every row.

`review-sheet.csv` is a compact review view for the 19 pending rows. Fill `human_decision` with one or more relevant document IDs, separated by commas, and add any explanation in `notes`. Leave a row unresolved when the source does not support a clear answer.

`queries.assistant-reviewed.jsonl` contains the proposals filled by KhmerKit for convenience. Its rows remain `adjudicated: false`, so the file is suitable for smoke testing and review tracking. It is not the human-adjudicated benchmark input.

After review, create `queries.reviewed.jsonl` using the normal evaluator format:

```json
{"type":"query","id":"q-wiki-1784","text":"រាជធានីរបស់កម្ពុជា","relevant":["wiki-1784"],"annotators":["a1","a2"],"adjudicated":true}
```

Keep one JSON object on each line. Run the benchmark with `--documents data/real/documents.jsonl`, or place the reviewed query file beside `documents.jsonl` and let the CLI infer it.

Use `--adjudicated-only` for the publishable score. This excludes rows that still have `adjudicated: false`.

The optional segmenter comparison uses `khmer-segmenter==0.1.0` in the local environment. Its package metadata did not declare a license, so the adapter remains experimental and is not part of the install extras.

# KhmerKit seven-day feasibility experiment

Research checked 2026-11-14. This document records the evidence used for the first implementation and separates observed facts from proposed follow-up work.

## Existing libraries and what they imply

| Project | Relevant capability | License or data note | Decision |
| --- | --- | --- | --- |
| [Pheasa](https://github.com/pheasaKhmer/pheasa) | Khmer canonical encoding normalization, validation, change reports, Python and Rust implementations | Code Apache-2.0. Its README says datasets are CC BY 4.0 unless a source requires stricter terms. | Use `pheasa.normalize()` directly. KhmerKit owns the search interface and evaluation harness rather than copying normalization rules. |
| [BetterKhmer](https://github.com/seanghay/betterkhmer) | Regex-free Khmer encoding normalizer with a large shared fixture suite | Repository page describes 10,085 fixture pairs and ports to multiple languages. Verify the repository's exact license before bundling fixtures. | Keep as a comparison candidate. Do not vendor its fixtures in the starter set. |
| [Khmer Segmenter](https://github.com/Sovichea/khmer_segmenter) | Dictionary-based Viterbi segmentation and normalization | Code MIT, bundled linguistic data has separate terms and is identified as noncommercial in its README. | Do not make it a default dependency until the data terms fit the target use. |
| [Khmer NLP](https://github.com/Khmer-NLP/khmer-nlp) | Broader Khmer NLP project with tokenization and model ambitions | Repository states GPL-3.0. | Useful research reference. GPL terms need an explicit compatibility decision before linking or distributing code. |
| [KhmerWordSegmentation](https://github.com/MaoMakara/KhmerWordSegmentation) | Python word segmentation implementation and training artifacts | Repository contains a license file, model/data artifacts, and notebook. Inspect exact terms and provenance before reuse. | Candidate for a later segmentation track, not included in this experiment. |

The main feasibility finding is that Khmer-specific normalization is reusable today. The more difficult distribution question is linguistic data provenance, especially for segmentation dictionaries. A narrow normalization plus retrieval package can ship without absorbing those data obligations.

## Dataset status

The included `data/search_eval.synthetic.jsonl` is an author-created, synthetic starter set. It is intentionally small, readable, and legally simple for a first run. It includes one malformed-but-visually-equivalent Khmer query to check whether canonical ordering changes retrieval. It is not a claim about Khmer search quality, dialect coverage, spelling variation, or user demand.

The legally stronger next step is a provenance ledger for public Khmer documents whose terms permit redistribution or for which only hashes and URLs are stored. Each query should have at least two independent annotators, an adjudicated relevance label, and an explicit policy for mixed Khmer-English queries.

## Experiment design

The benchmark compares three offline systems.

1. `exact_raw` uses whitespace-token overlap with case folding only.
2. `exact_normalized` adds Pheasa canonical ordering, NFC, whitespace folding, and case folding.
3. `char_tfidf_normalized` uses normalized character n-grams with scikit-learn TF-IDF. This is a multilingual lexical retrieval proxy that avoids assuming Khmer word boundaries.

The primary metric is Hit Rate@3 because it was the original project proposal. Mean Reciprocal Rank is reported alongside it to show whether the first relevant result moved closer to the top. The experiment is deterministic because the dataset is local, vectorization is fixed, and no model or network call is used.

## Seven-day plan

| Day | Work | Exit evidence |
| --- | --- | --- |
| 1 | Inventory libraries, licenses, and normalization behavior | This research file and dependency choices |
| 2 | Build the package boundary and normalization tests | `pytest` normalization tests pass |
| 3 | Add baseline and character retrieval | Search tests pass |
| 4 | Create the synthetic starter set and evaluation code | JSONL loads and metrics calculate |
| 5 | Run baseline comparison and inspect per-query ranks | Saved JSON benchmark report |
| 6 | Review limitations and identify a licensed corpus path | Dataset provenance checklist |
| 7 | Decide whether to continue to human annotation and segmentation | Roadmap decision based on observed metrics |

## Practical roadmap after the experiment

1. Replace the synthetic set with a small, permissioned corpus and publish source URLs, licenses, snapshots, and annotation guidance.
2. Add normalization reports and golden cases from real keyboard or OCR errors.
3. Measure a segmentation-aware retrieval condition only with data whose terms permit redistribution.
4. Add an optional embedding adapter behind a stable interface, reporting model name, revision, language coverage, and download requirements.
5. Package a simple `SearchIndex` API after the evaluation protocol is stable. A FastAPI service and Docker image can follow if a real consumer needs them.

## Sources

- [Pheasa repository](https://github.com/pheasaKhmer/pheasa)
- [Pheasa package on PyPI](https://pypi.org/project/pheasa/)
- [BetterKhmer repository](https://github.com/seanghay/betterkhmer)
- [Khmer Segmenter repository](https://github.com/Sovichea/khmer_segmenter)
- [Khmer NLP repository](https://github.com/Khmer-NLP/khmer-nlp)
- [Unicode Technical Note 61, Khmer Encoding Structure](https://www.unicode.org/notes/tn61-draft/utn61-Khmer_Encoding_Structure_V1.pdf)

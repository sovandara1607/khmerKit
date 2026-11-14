# Changelog

## 0.1.0 - 2026-11-15

KhmerKit 0.1.0 packages the first reusable Khmer search toolkit milestone.

### Included

- Pheasa-backed Khmer Unicode normalization.
- Exact token, normalized character TF-IDF, and optional segmented TF-IDF retrieval.
- Importable `SearchIndex` API.
- Local `khmerkit-search` command.
- Local FastAPI service with `/health` and `/search`.
- Provenance validation and CC BY-SA/GFDL attribution records for the Khmer Wikipedia starter corpus.
- Synthetic and real-corpus benchmark reports.

### Evidence

- 16 automated tests pass.
- API health and search requests pass against the 20-document local corpus.
- Character TF-IDF reaches 0.950 Hit Rate@3 on the 20-row assistant-reviewed benchmark.
- Segmented TF-IDF also reaches 0.950 Hit Rate@3 in the optional local experiment.

### Evaluation status

The assistant-reviewed benchmark remains provisional. One query is human-adjudicated and 19 retain assistant-reviewed labels. The adjudicated-only report is the authoritative quality report until more labels are confirmed.

### Known warning

The FastAPI test client emits one dependency deprecation warning involving Starlette and httpx. The API itself passes live health and search smoke tests.

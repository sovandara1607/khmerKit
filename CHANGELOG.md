# Changelog

All notable changes to KhmerKit are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.1] - 2026-11-15

### Added
- **Public Playground Connectivity:** Integrated same-origin Next.js server engine (`/api/v1/text/normalize` and `/api/v1/search/query`) providing instant normalization and document search against the 20-document starter corpus for public web visitors without requiring local server setup.
- **Upstream Proxy Support:** Web API routes automatically forward to external FastAPI backend when `KHMERKIT_BACKEND_URL` or `INTERNAL_API_URL` is configured, with seamless local fallback.
- **Mobile Responsive Design:** Added mobile hamburger drawer navigation in `Header.tsx`, responsive touch-friendly button layouts, horizontally swipeable benchmark comparison table, and sticky swiping documentation sidebar.
- **API Security & Reliability:** Added Pydantic input length limits (50k characters for normalization, 1k characters for search queries), configurable CORS origins via `KHMERKIT_CORS_ORIGINS`, `/v1/health` endpoint, and safe HTTP request logging without logging sensitive user text payloads.
- **Open Source Infrastructure:** Added `.github/workflows/ci.yml`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue templates, and pull request template.
- **Python SDK Version Export:** Exported `__version__ = "0.1.1"` in `khmerkit.__init__`.

### Changed
- **License Alignment:** Aligned all website references and documentation to **Apache-2.0**, resolving previous inconsistencies between repository license and website text.
- **Playground UX:** Added result copy button with feedback state, keyboard shortcut support (`Cmd+Enter` / `Ctrl+Enter`), and dynamic connection status display.
- **Documentation:** Updated installation, quickstart, and API reference guides to reflect v0.1.1 capabilities.

---

## [0.1.0] - 2026-11-15

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

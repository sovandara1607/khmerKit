# KhmerKit

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](pyproject.toml)
[![Build Status](https://img.shields.io/badge/tests-passing-brightgreen.svg)](tests/)

**KhmerKit** is an open-source Khmer Natural Language Processing (NLP) toolkit that helps developers normalize Khmer text, search Khmer documents, evaluate retrieval methods, and integrate Khmer language processing into their applications.

- **Website & Interactive Playground:** [https://khmerkit.sovandara.lol/](https://khmerkit.sovandara.lol/)
- **Repository:** [https://github.com/sovandara1607/khmerKit](https://github.com/sovandara1607/khmerKit)

---

## Why KhmerKit?

Processing Khmer text poses unique computational challenges:
- **No spaces between words:** Khmer words are written continuously without spaces; spaces are used only as sentence or phrase separators.
- **Complex character ordering:** Inverted vowels, sub-consonant signs (*Coeng* `\u17D2`), and diacritics frequently lead to visually identical text having completely different underlying Unicode representations.
- **Heavyweight dependencies:** Existing solutions often depend on non-commercial datasets, complex unmaintained C++ binaries, or multi-gigabyte neural models.

KhmerKit provides a small, reproducible, offline-first alternative:
1. **Canonical Normalization:** Unicode NFC, Khmer diacritic reordering, and whitespace folding.
2. **Lexical Document Retrieval:** Character n-gram TF-IDF search that operates across mixed Khmer and English text without requiring dictionary word segmentation.
3. **Transparent Evaluation:** Provenance-attributed evaluation benchmarks and diagnostic hit rates.

---

## Quickstart

### 1. Installation

Clone the repository and install with development dependencies:

```bash
git clone https://github.com/sovandara1607/khmerKit.git
cd khmerKit
python3 -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
```

### 2. Python SDK Usage

#### Text Normalization
```python
from khmerkit import normalize_text

result = normalize_text("ខែ្មរ")
print("Normalized text:", result.text)
print("Was modified:", result.used_pheasa)
```

#### Document Search
```python
from khmerkit import SearchIndex

documents = [
    ("doc-1", "ភ្នំពេញ គឺជារាជធានីនិងទីក្រុងធំបំផុតនៃប្រទេសកម្ពុជា។"),
    ("doc-2", "ប្រាសាទអង្គរវត្ត ស្ថិតនៅក្នុងខេត្តសៀមរាប។"),
    ("doc-3", "ភាសាខ្មែរ គឺជាភាសាផ្លូវការរបស់ព្រះរាជាណាចក្រកម្ពុជា។"),
]

# Character n-gram TF-IDF search index
index = SearchIndex(documents)
results = index.search("រាជធានីរបស់កម្ពុជា", k=3)

for match in results:
    print(f"[{match.doc_id}] score={match.score:.4f}")
```

---

## Command-Line Tools

KhmerKit installs several CLI utilities:

### Search the Starter Corpus
```bash
khmerkit-search --documents data/real/documents.jsonl --query "រាជធានីរបស់កម្ពុជា"
```

### Run Benchmark Evaluation
```bash
khmerkit-benchmark --dataset data/search_eval.synthetic.jsonl --output benchmark-results.json
```

### Validate Corpus Provenance
```bash
khmerkit-validate-provenance data/provenance.csv
```

### Run the FastAPI Service
```bash
khmerkit-api --documents data/real/documents.jsonl --host 0.0.0.0 --port 8000
```

---

## REST API Endpoints

When running `khmerkit-api`:

- `GET /health` and `GET /v1/health`: Service health and loaded document count
- `POST /v1/text/normalize`: JSON payload `{"text": "...", "profile": "khmer"}`
- `POST /v1/search/query`: JSON payload `{"collection_id": "demo", "query": "...", "method": "char_tfidf", "top_k": 3}`

---

## Web Playground & Documentation

The Next.js web application is located in `apps/web`:

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the interactive normalization workbench, document search demo, documentation, and benchmark metrics.

---

## Running Automated Tests

```bash
# Run Python unit and integration tests
pytest -v

# Run Frontend typecheck and production build
npm --prefix apps/web run typecheck
npm --prefix apps/web run build
```

---

## License

This project is licensed under the **Apache License, Version 2.0**. See the [LICENSE](LICENSE) file for details.
All corpus starter documents include source attribution in [data/provenance.csv](data/provenance.csv).

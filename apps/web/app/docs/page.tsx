"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CodeBlock } from "../../components/CodeBlock";
import { SectionHeading } from "../../components/SectionHeading";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["quickstart", "normalization", "search", "api-reference"];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    } else {
      window.location.hash = id;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickstartBash = `# 1. Install KhmerKit with development dependencies
python3 -m pip install -e '.[dev]'

# 2. Run unit test suite
pytest

# 3. Query the local starter corpus via CLI
khmerkit-search --documents data/real/documents.jsonl --query "រាជធានីរបស់កម្ពុជា"`;

  const normalizePython = `from khmerkit.normalize import normalize_text

# Normalizes character order, diacritics, and Unicode canonical forms
result = normalize_text("ខែ្មរ", profile="khmer")

print("Normalized text:", result.text)
print("Was modified:", result.changed)
print("Execution time:", f"{result.processing_time_ms:.2f} ms")`;

  const searchPython = `from khmerkit.search import SearchIndex

documents = [
    ("doc-1", "ភ្នំពេញ គឺជារាជធានីនិងទីក្រុងធំបំផុតនៃប្រទេសកម្ពុជា។"),
    ("doc-2", "ប្រាសាទអង្គរវត្ត ស្ថិតនៅក្នុងខេត្តសៀមរាប។"),
    ("doc-3", "ភាសាខ្មែរ គឺជាភាសាផ្លូវការរបស់ព្រះរាជាណាចក្រកម្ពុជា។"),
]

# Character-level n-gram indexing without space segmentation requirement
index = SearchIndex(documents)
results = index.search("រាជធានីរបស់កម្ពុជា", k=3)

for match in results:
    print(f"[{match.document_id}] score={match.score:.4f}: {match.passage}")`;

  const curlApi = `curl http://localhost:8000/v1/search/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "រាជធានីរបស់កម្ពុជា",
    "method": "char_tfidf",
    "top_k": 3
  }'`;

  return (
    <div className="landing-page-root">
      <Header />
      <main className="docs-shell">
        <div className="docs-container section-wrap">
          {/* Sticky Sidebar Navigation */}
          <aside className="docs-sidebar">
            <div className="sidebar-group">
              <span className="sidebar-title">Getting Started</span>
              <a
                className={`sidebar-link ${activeSection === "quickstart" ? "active" : ""}`}
                href="#quickstart"
                onClick={(e) => handleSidebarClick(e, "quickstart")}
              >
                Quickstart
              </a>
              <a
                className={`sidebar-link ${activeSection === "normalization" ? "active" : ""}`}
                href="#normalization"
                onClick={(e) => handleSidebarClick(e, "normalization")}
              >
                Normalization
              </a>
            </div>

            <div className="sidebar-group">
              <span className="sidebar-title">Core Modules</span>
              <a
                className={`sidebar-link ${activeSection === "search" ? "active" : ""}`}
                href="#search"
                onClick={(e) => handleSidebarClick(e, "search")}
              >
                Document Search
              </a>
              <a
                className={`sidebar-link ${activeSection === "api-reference" ? "active" : ""}`}
                href="#api-reference"
                onClick={(e) => handleSidebarClick(e, "api-reference")}
              >
                REST API Service
              </a>
            </div>

            <div className="sidebar-group">
              <span className="sidebar-title">Verification</span>
              <Link className="sidebar-link" href="/benchmarks">
                Diagnostic Benchmarks →
              </Link>
              <Link className="sidebar-link" href="/community">
                Community Guidelines →
              </Link>
            </div>
          </aside>

          {/* Main Docs Content */}
          <article className="docs-content">
            <div className="docs-header-block">
              <span className="docs-eyebrow">DEVELOPER DOCUMENTATION</span>
              <h1>Build with the real toolkit.</h1>
              <p className="docs-lead">
                KhmerKit provides developers with an inspectable foundation for Khmer text normalization, character-level retrieval, and diagnostic evaluation.
              </p>
            </div>

            {/* Section 1: Quickstart */}
            <section className="docs-section">
              <SectionHeading
                id="quickstart"
                tag="01 · QUICKSTART"
                title="Start in 30 seconds"
              />
              <p>Install the Python package, verify test coverage, and execute a local search:</p>

              <CodeBlock
                title="TERMINAL"
                language="BASH"
                code={quickstartBash}
              />
            </section>

            {/* Section 2: Normalization */}
            <section className="docs-section">
              <SectionHeading
                id="normalization"
                tag="02 · NORMALIZATION"
                title="Khmer Text Normalization"
              />
              <p>
                Khmer text frequently suffers from inconsistent character ordering (e.g. vowels before subscripts or reversed diacritics). KhmerKit uses Unicode-standard ordering profiles to normalize strings into comparable forms:
              </p>

              <CodeBlock
                title="PYTHON SDK"
                language="PYTHON"
                code={normalizePython}
              />
            </section>

            {/* Section 3: Document Search */}
            <section className="docs-section">
              <SectionHeading
                id="search"
                tag="03 · DOCUMENT SEARCH"
                title="Character-Level TF-IDF Retrieval"
              />
              <p>
                Unlike languages with explicit spaces, Khmer script is written continuously. KhmerKit includes character n-gram TF-IDF retrieval that functions robustly without relying on third-party dictionary segmentation:
              </p>

              <CodeBlock
                title="SEARCH INDEX"
                language="PYTHON"
                code={searchPython}
              />
            </section>

            {/* Section 4: REST API Reference */}
            <section className="docs-section">
              <SectionHeading
                id="api-reference"
                tag="04 · REST API REFERENCE"
                title="Local FastAPI Service"
              />
              <p>
                Start the local API service from your repository root with <code>khmerkit-api --documents data/real/documents.jsonl --port 8000</code>.
              </p>

              <div className="endpoint-card">
                <div className="endpoint-badge post">POST</div>
                <code className="endpoint-path">/v1/search/query</code>
              </div>

              <CodeBlock
                title="REQUEST EXAMPLE"
                language="CURL"
                code={curlApi}
              />
            </section>
          </article>
        </div>
      </main>

      <footer className="site-footer section-wrap">
        <span>KhmerKit · Build Better Khmer AI.</span>
        <div className="footer-links">
          <Link href="/docs">Docs</Link>
          <Link href="/benchmarks">Benchmarks</Link>
          <Link href="/community">Community</Link>
        </div>
      </footer>
    </div>
  );
}

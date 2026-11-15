import Link from "next/link";
import { Header } from "../../components/Header";
import { CodeBlock } from "../../components/CodeBlock";

export default function CommunityPage() {
  const gitWorkflow = `# 1. Fork and clone the repository
git clone https://github.com/sovandara1607/khmerKit.git
cd khmerKit

# 2. Create a clean virtual environment & install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'

# 3. Run validation & tests
pytest
khmerkit-validate-provenance data/provenance.csv

# 4. Create your branch and commit changes
git checkout -b feature/khmer-unicode-expansion
git commit -m "feat: improve subscript ligature ordering"`;

  return (
    <div className="landing-page-root">
      <Header />
      <main className="community-shell">
        <div className="community-container section-wrap">
          {/* Header Block */}
          <div className="community-header">
            <span className="section-tag">OPEN-SOURCE ECOSYSTEM · COMMUNITY</span>
            <h1>Build the missing layer together.</h1>
            <p className="page-lede">
              KhmerKit is open source under the MIT license. We believe Khmer text processing infrastructure should be inspectable, evidence-based, and accessible to every developer building in Cambodia.
            </p>
          </div>

          {/* 3 Contribution Pillars Grid */}
          <div className="community-cards-grid">
            {/* Pillar 1: Code */}
            <div className="community-pillar-box">
              <div className="pillar-header">
                <div className="cell-icon icon-purple" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="pillar-tag">CODEBASE</span>
              </div>
              <h2>Contribute code</h2>
              <p>
                Start with the Python package, add focused unit tests, and keep optional extraction engines behind clean, modular interfaces.
              </p>
              <ul className="pillar-checklist">
                <li>✓ Khmer character reordering rules</li>
                <li>✓ Syllable segmentation algorithms</li>
                <li>✓ FastAPI route extensions</li>
              </ul>
              <a
                className="pillar-action-btn"
                href="https://github.com/sovandara1607/khmerKit"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub Repository</span>
                <span className="arrow-sym">↗</span>
              </a>
            </div>

            {/* Pillar 2: Data & Provenance */}
            <div className="community-pillar-box">
              <div className="pillar-header">
                <div className="cell-icon icon-cyan" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="pillar-tag">DATASET</span>
              </div>
              <h2>Contribute data</h2>
              <p>
                Record source URLs, licenses, checksums, and annotation decisions before adding corpus files. Help review pending diagnostic labels.
              </p>
              <ul className="pillar-checklist">
                <li>✓ Review sheet adjudication</li>
                <li>✓ Provenance CSV validation</li>
                <li>✓ Real query evaluation pairs</li>
              </ul>
              <Link className="pillar-action-btn" href="/docs">
                <span>Provenance Guidelines</span>
                <span className="arrow-sym">→</span>
              </Link>
            </div>

            {/* Pillar 3: Research & Evidence */}
            <div className="community-pillar-box">
              <div className="pillar-header">
                <div className="cell-icon icon-amber" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <span className="pillar-tag">EVALUATION</span>
              </div>
              <h2>Read the evidence</h2>
              <p>
                Explore research notes and benchmark reports to understand what the current starter dataset supports and where limits remain.
              </p>
              <ul className="pillar-checklist">
                <li>✓ Hit Rate @ 3 metrics</li>
                <li>✓ Mean Reciprocal Rank (MRR)</li>
                <li>✓ Known retrieval failure modes</li>
              </ul>
              <Link className="pillar-action-btn" href="/benchmarks">
                <span>Inspect Benchmarks</span>
                <span className="arrow-sym">→</span>
              </Link>
            </div>
          </div>

          {/* Contribution Workflow Section */}
          <section className="workflow-section">
            <div className="section-label">CONTRIBUTION WORKFLOW</div>
            <div className="workflow-intro">
              <p>
                Every contribution follows a straightforward git workflow. We enforce automated provenance checks and pytest runs on all pull requests:
              </p>
            </div>
            <CodeBlock
              title="GIT &amp; CLI"
              language="BASH"
              code={gitWorkflow}
            />
          </section>

          {/* Project Values Banner */}
          <section className="values-banner">
            <div className="values-grid">
              <div className="value-box">
                <span className="value-label">LOCAL-FIRST</span>
                <h3>Zero cloud lock-in</h3>
                <p>Everything runs on your laptop with local CPU memory. No external API keys or remote vector stores required.</p>
              </div>

              <div className="value-box">
                <span className="value-label">TRANSPARENCY</span>
                <h3>Evidence over hype</h3>
                <p>Every score links to exact corpus documents, reviewed queries, and reproduction scripts in the repository.</p>
              </div>

              <div className="value-box">
                <span className="value-label">OPENNESS</span>
                <h3>MIT Licensed</h3>
                <p>Completely free for commercial applications, academic research, and community language tooling.</p>
              </div>
            </div>
          </section>
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

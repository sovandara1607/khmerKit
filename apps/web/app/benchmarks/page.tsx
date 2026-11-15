import Link from "next/link";
import { Header } from "../../components/Header";
import { CodeBlock } from "../../components/CodeBlock";
import { SectionHeading } from "../../components/SectionHeading";

export default function BenchmarksPage() {
  const benchmarks = [
    {
      method: "Character TF-IDF",
      hitRate: 0.950,
      mrr: 0.900,
      latency: "1.8 ms",
      notes: "Optimal for unsegmented continuous Khmer text without word boundaries.",
      badge: "RECOMMENDED",
      colorClass: "bar-emerald",
    },
    {
      method: "Segmented TF-IDF",
      hitRate: 0.950,
      mrr: 0.900,
      latency: "4.2 ms",
      notes: "Uses syllable-based boundary segmentation prior to TF-IDF indexing.",
      badge: "DIAGNOSTIC",
      colorClass: "bar-cyan",
    },
    {
      method: "Exact Normalized",
      hitRate: 0.150,
      mrr: 0.092,
      latency: "0.4 ms",
      notes: "Baseline string matching after Unicode canonical NFC normalization.",
      badge: "BASELINE",
      colorClass: "bar-slate",
    },
  ];

  return (
    <div className="landing-page-root">
      <Header />
      <main className="benchmarks-shell">
        <div className="benchmarks-container section-wrap">
          {/* Header Block */}
          <div className="benchmarks-header">
            <span className="section-tag">EVALUATION &amp; PROVENANCE</span>
            <h1>Evidence with a paper trail.</h1>
            <p className="page-lede">
              Current benchmark reports are computed locally against the 20-document Khmer corpus. Every score is source-attributed and reproducible with a single CLI command.
            </p>
          </div>

          {/* 3 Summary Metric Cards */}
          <div className="benchmark-metrics-grid" id="metrics">
            <div className="metric-box">
              <span className="metric-tag">TOP-3 RETRIEVAL</span>
              <div className="metric-value">0.950</div>
              <div className="metric-label">Diagnostic Hit Rate @ 3</div>
            </div>

            <div className="metric-box">
              <span className="metric-tag">RANKING QUALITY</span>
              <div className="metric-value">0.900</div>
              <div className="metric-label">Mean Reciprocal Rank (MRR)</div>
            </div>

            <div className="metric-box">
              <span className="metric-tag">QUERY PERFORMANCE</span>
              <div className="metric-value">1.8 ms</div>
              <div className="metric-label">Average Retrieval Latency</div>
            </div>
          </div>

          {/* Interactive Benchmark Comparison Table */}
          <section className="benchmark-comparison-section" id="comparison">
            <SectionHeading
              id="comparison-table"
              title="Method Comparison"
            />

            <div className="comparison-table-box">
              <div className="table-header-row">
                <div className="col-method">Retrieval Method</div>
                <div className="col-score">Hit Rate@3</div>
                <div className="col-score">MRR</div>
                <div className="col-latency">Latency</div>
              </div>

              {benchmarks.map((row) => (
                <div className="table-body-row" key={row.method}>
                  <div className="col-method">
                    <div className="method-title-row">
                      <strong>{row.method}</strong>
                      <span className={`method-badge ${row.badge.toLowerCase()}`}>{row.badge}</span>
                    </div>
                    <p className="method-notes">{row.notes}</p>
                    {/* Visual Progress Bar */}
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${row.colorClass}`}
                        style={{ width: `${row.hitRate * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="col-score">
                    <span className="score-number">{(row.hitRate * 100).toFixed(1)}%</span>
                    <span className="score-sub">({row.hitRate.toFixed(3)})</span>
                  </div>

                  <div className="col-score">
                    <span className="score-number">{row.mrr.toFixed(3)}</span>
                  </div>

                  <div className="col-latency">
                    <span className="latency-number">{row.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reproducibility CLI Box */}
          <section className="reproduce-section" id="reproducibility">
            <SectionHeading
              id="reproduce-cli"
              title="One-Command Reproducibility"
            />
            <CodeBlock
              title="TERMINAL CLI"
              language="BASH"
              code={`# Run full benchmark evaluation locally
khmerkit-benchmark --dataset data/search_eval.synthetic.jsonl --output benchmark-results.json

# Validate provenance records
khmerkit-validate-provenance data/provenance.csv`}
            />
          </section>

          {/* Corpus Provenance Notes */}
          <section className="provenance-section" id="provenance">
            <SectionHeading
              id="corpus-provenance"
              title="Dataset Provenance"
            />
            <div className="provenance-card">
              <h3>20-Document Diagnostic Starter Corpus</h3>
              <p>
                Extracted from public Khmer-language documents (Wikipedia, legal summaries, educational archives). Candidates undergo dual review before promotion from assistant diagnostics to human-adjudicated ground truth.
              </p>
              <div className="provenance-links">
                <Link className="provenance-link" href="/docs">
                  Review methodology in docs <span>→</span>
                </Link>
                <Link className="provenance-link" href="/playground/search">
                  Try live search query <span>→</span>
                </Link>
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

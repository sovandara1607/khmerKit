import Link from "next/link";
import { Header } from "../components/Header";
import { Playground } from "../components/Playground";

export default function Home() {
  return <>
    <Header />
    <main className="landing-page">
      <section className="landing-hero section-wrap">
        <div className="hero-context"><span>KHMER TEXT INFRASTRUCTURE</span><span>LOCAL-FIRST / OPEN SOURCE</span></div>
        <div className="landing-grid">
          <div className="landing-copy">
            <p className="eyebrow">For developers building with Khmer</p>
            <h1>Build better<br /><span>Khmer AI.</span></h1>
            <p className="hero-lede">Normalization, document search, and evaluation in one small toolkit. Start with the Python package. Keep the evidence close.</p>
            <div className="hero-actions"><Link className="primary-button" href="/playground">Open playground <span>↗</span></Link><Link className="secondary-button" href="/docs">Read docs</Link></div>
            <p className="landing-note">MIT-licensed code · source-attributed corpus · benchmarked locally</p>
          </div>
          <div className="integration-card">
            <div className="integration-bar"><span>POST /v1/search/query</span><span className="live-badge">● LOCAL API</span></div>
            <pre>{`{
  "query": "រាជធានីរបស់កម្ពុជា",
  "method": "char_tfidf",
  "top_k": 3
}`}</pre>
            <div className="response-bar"><span>RESPONSE</span><span>200 OK</span></div>
            <pre className="response-code">{`{
  "document_id": "wiki-1784",
  "source": "ភ្នំពេញ",
  "score": 0.1597
}`}</pre>
          </div>
        </div>
        <div className="truth-grid"><div><strong>20</strong><span>documents in the local corpus</span></div><div><strong>0.950</strong><span>diagnostic Hit Rate@3</span></div><div><strong>1</strong><span>human-adjudicated query</span></div></div>
      </section>
      <section className="section-wrap landing-tools"><div className="section-label">THE WORKBENCH</div><div className="tool-row"><article><span className="tool-index">01</span><h2>Normalize</h2><p>Repair Khmer character order and make equivalent text comparable.</p><Link href="/playground/normalization">Run normalization <span>↗</span></Link></article><article><span className="tool-index">02</span><h2>Search</h2><p>Query the starter corpus with mixed Khmer-English text.</p><Link href="/playground/search">Search documents <span>↗</span></Link></article><article><span className="tool-index">03</span><h2>Evaluate</h2><p>Inspect the dataset, provenance, and the limits of each method.</p><Link href="/benchmarks">Read benchmarks <span>↗</span></Link></article></div></section>
      <section className="section-wrap landing-live"><div className="section-heading"><div><div className="section-label">LIVE TOOL</div><h2>Run the real backend.</h2></div><p>Every response below comes from your local FastAPI service. No mock output is used.</p></div><Playground /></section>
    </main>
    <footer className="site-footer section-wrap"><span>KhmerKit · Build Better Khmer AI.</span><div><Link href="/docs">Docs</Link><Link href="/benchmarks">Benchmarks</Link><Link href="/community">Community</Link></div></footer>
  </>;
}

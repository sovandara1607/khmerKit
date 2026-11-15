"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/Header";
import { Playground } from "../components/Playground";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"api" | "request">("api");

  const promptText = `I want to integrate Khmer text processing with KhmerKit.
1. How do I install khmerkit and use character-level TF-IDF retrieval for Khmer documents?
2. How do I normalize mixed Khmer and Latin text using Unicode-compliant ordering?`;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = promptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="landing-page-root">
      <Header landing />

      <main className="landing-page">
        {/* Hero Section matching the reference layout */}
        <section className="landing-hero">
          <div className="hero-container">
            {/* Left Column: Heading, Subtitle, Actions, AI Prompt */}
            <div className="hero-left">
              <h1 className="hero-headline">
                Build better<br /><span>Khmer AI.</span>
              </h1>

              <p className="hero-subhead">
                Normalization, document search, and evaluation in one small toolkit. Start with the Python package. Keep the evidence close.
              </p>

              <div className="hero-actions">
                <Link className="btn-primary" href="/playground">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Open playground</span>
                  <span className="arrow-sym">→</span>
                </Link>

                <Link className="btn-secondary" href="/docs">
                  Read docs
                </Link>
              </div>

              <div className="hero-prompt-line">
                <button
                  type="button"
                  className="prompt-copy-trigger"
                  onClick={handleCopyPrompt}
                  title="Copy AI developer prompt"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    aria-hidden="true"
                  >
                    <rect width="14" height="14" x="8" y="8" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>{copied ? "Prompt copied!" : "Copy prompt for AI"}</span>
                </button>

                <div className="prompt-badges" aria-hidden="true">
                  {/* Official Anthropic Claude Asterisk Logo */}
                  <svg width="15" height="15" viewBox="0 0 24 24" className="ai-icon ai-claude">
                    <title>Claude (Anthropic)</title>
                    <path
                      fill="#D97757"
                      d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
                    />
                  </svg>
                  {/* Official OpenAI Swirl Rosette Logo */}
                  <svg width="15" height="15" viewBox="0 0 24 24" className="ai-icon ai-openai">
                    <title>OpenAI / ChatGPT</title>
                    <path
                      fill="#10A37F"
                      d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9 6.06 6.06 0 0 0-10.28 2.18 5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9 5.98 5.98 0 0 0 4.5 2 6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.74-7.07zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .4-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.5 4.49zm-9.66-4.13a4.47 4.47 0 0 1-.54-3.01l.15.08 4.78 2.76c.24.14.54.14.78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.48 4.48 0 0 1 2.37-1.98V11.6c0 .28.15.53.38.68l5.82 3.35-2.02 1.17a.08.08 0 0 1-.07 0L4 14.01a4.5 4.5 0 0 1-1.66-6.11zm16.1 3.85-5.84-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67a.8.8 0 0 0-.4-.68zm2.01-3.02-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.01 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.67zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.8.8 0 0 0-.4.68zm1.1-2.36 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z"
                    />
                  </svg>
                  {/* Official Google Gemini / Antigravity Diamond Star Logo */}
                  <svg width="15" height="15" viewBox="0 0 24 24" className="ai-icon ai-gemini">
                    <title>Google Gemini / Antigravity</title>
                    <defs>
                      <linearGradient id="ai-gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4E82EE" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#F43F5E" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#ai-gemini-grad)"
                      d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z"
                    />
                  </svg>
                  {/* Official Cursor 3D Isometric Logo */}
                  <svg width="15" height="15" viewBox="0 0 24 24" className="ai-icon ai-cursor">
                    <title>Cursor</title>
                    <path
                      fill="#818CF8"
                      d="M12 1.636 2.364 7.2v11.164L12 24l9.636-5.636V7.2L12 1.636Zm0 2.314 7.636 4.455-7.636 4.454-7.636-4.454L12 3.95Zm-8 6.136 7 4.084v8.188l-7-4.084v-8.188Zm9 12.272V14.17l7-4.084v8.188l-7 4.084Z"
                    />
                  </svg>
                  {/* Official Terminal Prompt Logo */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="ai-icon ai-terminal">
                    <title>Terminal CLI</title>
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                </div>
              </div>

              <p className="hero-disclaimer">
                MIT-licensed code · source-attributed corpus · benchmarked locally
              </p>
            </div>

            {/* Right Column: Code Card matching the reference design */}
            <div className="hero-right">
              <div className="code-card">
                {/* Command / Snippet Header */}
                <div className="code-snippet">
                  <div className="line-comment"># Query local Khmer search</div>
                  <div className="code-row">
                    <span className="hl-cmd">curl</span>{" "}
                    <span className="hl-url">http://localhost:8000/v1/search/query</span>{" "}
                    <span className="hl-slash">\</span>
                  </div>
                  <div className="code-row indent">
                    <span className="hl-flag">-H</span>{" "}
                    <span className="hl-str">&quot;Content-Type: application/json&quot;</span>{" "}
                    <span className="hl-slash">\</span>
                  </div>
                  <div className="code-row indent">
                    <span className="hl-flag">-d</span>{" "}
                    <span className="hl-str">&apos;&#123; &quot;query&quot;: &quot;រាជធានីរបស់កម្ពុជា&quot;, &quot;top_k&quot;: 3 &#125;&apos;</span>
                  </div>
                </div>

                {/* Tabs bar */}
                <div className="card-tabs">
                  <button
                    type="button"
                    className={`tab-btn response-tab ${activeTab === "request" ? "active" : ""}`}
                    onClick={() => setActiveTab("request")}
                  >
                    RESPONSE <span className="tab-sep">·</span> 200 OK
                  </button>
                  <button
                    type="button"
                    className={`tab-btn webhook-pill ${activeTab === "api" ? "active" : ""}`}
                    onClick={() => setActiveTab("api")}
                  >
                    <span className="green-indicator" aria-hidden="true" />
                    LOCAL API
                  </button>
                </div>

                {/* JSON Body */}
                {activeTab === "api" ? (
                  <div className="json-container">
                    <div className="json-line">
                      <span className="json-bracket">&#123;</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;document_id&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-val">&quot;wiki-1784&quot;</span>
                      <span className="json-punct">,</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;source&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-val khmer-highlight">&quot;ភ្នំពេញ&quot;</span>
                      <span className="json-punct">,</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;score&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-num">0.1597</span>
                    </div>
                    <div className="json-line">
                      <span className="json-bracket">&#125;</span>
                    </div>
                  </div>
                ) : (
                  <div className="json-container">
                    <div className="json-line">
                      <span className="json-bracket">&#123;</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;query&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-val khmer-highlight">&quot;រាជធានីរបស់កម្ពុជា&quot;</span>
                      <span className="json-punct">,</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;method&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-val">&quot;char_tfidf&quot;</span>
                      <span className="json-punct">,</span>
                    </div>
                    <div className="json-line indent-1">
                      <span className="json-key">&quot;top_k&quot;</span>
                      <span className="json-punct">: </span>
                      <span className="json-num">3</span>
                    </div>
                    <div className="json-line">
                      <span className="json-bracket">&#125;</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Unified 3x2 Feature & Stats Grid matching the reference screenshot */}
          <div className="grid-wrapper section-wrap" id="features">
            <div className="features-stats-grid">
              {/* Row 1: 3 Core Capabilities with Real Lucide Icons */}
              <div className="grid-cell feature-cell">
                <div className="cell-icon icon-purple" aria-hidden="true">
                  {/* Real Lucide Webhook Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c0-2.21 1.79-4 4-4h6" />
                    <path d="M6 7.02h5.99c1.1 0 1.95-.94 2.48-1.9A4 4 0 0 1 22 7c0 2.21-1.79 4-4 4h-6" />
                    <circle cx="6" cy="7" r="1.5" fill="currentColor" />
                    <circle cx="18" cy="17" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="cell-title">Normalization</h3>
                <p className="cell-desc">Repair Khmer character order and Unicode compatibility in real time.</p>
              </div>

              <div className="grid-cell feature-cell">
                <div className="cell-icon icon-cyan" aria-hidden="true">
                  {/* Real Lucide Palette Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r="1" fill="currentColor" />
                    <circle cx="17.5" cy="10.5" r="1" fill="currentColor" />
                    <circle cx="8.5" cy="7.5" r="1" fill="currentColor" />
                    <circle cx="6.5" cy="12.5" r="1" fill="currentColor" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                  </svg>
                </div>
                <h3 className="cell-title">Document search</h3>
                <p className="cell-desc">Fast character-level TF-IDF retrieval for mixed Khmer and English text.</p>
              </div>

              <div className="grid-cell feature-cell">
                <div className="cell-icon icon-amber" aria-hidden="true">
                  {/* Real Lucide Zap / Lightning Bolt Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="cell-title">Diagnostic evaluation</h3>
                <p className="cell-desc">Inspect corpus provenance, diagnostic hit rates, and benchmark limits.</p>
              </div>

              {/* Row 2: 3 Metrics */}
              <div className="grid-cell stat-cell">
                <div className="stat-number">20</div>
                <div className="stat-label">Documents in local corpus</div>
              </div>

              <div className="grid-cell stat-cell">
                <div className="stat-number">0.950</div>
                <div className="stat-label">Diagnostic Hit Rate@3</div>
              </div>

              <div className="grid-cell stat-cell">
                <div className="stat-number">100%</div>
                <div className="stat-label">Open source &amp; local-first</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Playground section */}
        <section className="section-wrap landing-live" id="playground">
          <div className="section-heading">
            <div>
              <div className="section-label">LIVE TOOL</div>
              <h2>Run the real backend.</h2>
            </div>
            <p>Every response below comes from your local FastAPI service. No mock output is used.</p>
          </div>
          <Playground />
        </section>
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

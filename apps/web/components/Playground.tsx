"use client";

import { useEffect, useState } from "react";

type Mode = "normalize" | "search";
type NormalizeResponse = { normalized_text: string; changed: boolean; profile: string; processing_time_ms: number };
type SearchResponse = { results: { document_id: string; source: string; passage: string; score: number | null }[]; method: string; processing_time_ms: number };
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function Playground({ initialMode = "normalize" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [text, setText] = useState("សួស្តី   ពិភពលោក");
  const [profile, setProfile] = useState("khmer");
  const [result, setResult] = useState<NormalizeResponse | SearchResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setResult(null); setError(""); setText(mode === "normalize" ? "សួស្តី   ពិភពលោក" : "រាជធានីរបស់កម្ពុជា"); }, [mode]);
  async function run() {
    setBusy(true); setError("");
    try {
      const endpoint = mode === "normalize" ? "/v1/text/normalize" : "/v1/search/query";
      const body = mode === "normalize" ? { text, profile } : { collection_id: "demo", query: text, method: "char_tfidf", top_k: 3 };
      const response = await fetch(`${apiBase}${endpoint}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "The API request failed.");
      setResult(payload);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "The API request failed."); }
    finally { setBusy(false); }
  }
  const normalizeResult = result && "normalized_text" in result ? result : null;
  const searchResult = result && "results" in result ? result : null;
  return <section className="playground-shell" aria-label="KhmerKit playground">
    <div className="tool-tabs" role="tablist"><button className={mode === "normalize" ? "active" : ""} onClick={() => setMode("normalize")} role="tab" aria-selected={mode === "normalize"}>Normalize text</button><button className={mode === "search" ? "active" : ""} onClick={() => setMode("search")} role="tab" aria-selected={mode === "search"}>Search documents</button></div>
    <div className="workbench-grid"><div className="panel input-panel"><div className="panel-heading"><span>Input</span><span className="panel-kicker">live API</span></div><textarea value={text} onChange={(event) => setText(event.target.value)} aria-label="Khmer input" />{mode === "normalize" && <label className="select-label">Profile<select value={profile} onChange={(event) => setProfile(event.target.value)}><option value="khmer">Khmer-specific</option><option value="nfc_whitespace">NFC + whitespace</option><option value="nfc">Unicode NFC</option></select></label>}<button className="run-button" onClick={run} disabled={busy || !text.trim()}>{busy ? "Running…" : "Run"}<span>⌘↵</span></button><p className="panel-note">Uses the local FastAPI service at <code>{apiBase}</code>.</p></div><div className="panel output-panel" aria-live="polite"><div className="panel-heading"><span>Output</span>{result && <span className="status-dot">ready</span>}</div>{error && <div className="error-state">{error}</div>}{!error && normalizeResult && <><div className="result-text khmer-text">{normalizeResult.normalized_text}</div><div className="result-meta"><span>{normalizeResult.changed ? "Changed" : "Unchanged"}</span><span>{normalizeResult.profile}</span><span>{normalizeResult.processing_time_ms} ms</span></div></>}{!error && searchResult && <div className="result-list">{searchResult.results.map((item) => <article className="result-item" key={item.document_id}><div><strong>{item.source}</strong><span>{item.document_id}</span></div><p className="khmer-text">{item.passage.slice(0, 220)}…</p><small>score {item.score?.toFixed(3) ?? "n/a"}</small></article>)}</div>}{!error && !result && <div className="empty-state"><span className="empty-glyph">៙</span><p>Run the tool to see a real response.</p></div>}</div></div>
  </section>;
}

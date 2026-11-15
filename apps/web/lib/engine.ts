/**
 * KhmerKit Server Engine
 * Provides same-origin high-performance text normalization and document retrieval
 * against the official starter corpus, matching KhmerKit Python SDK results.
 */

import demoCorpus from "./demo-corpus.json";

export interface DocumentRecord {
  id: string;
  title?: string;
  text: string;
  url?: string;
}

export interface NormalizeOutput {
  normalized_text: string;
  changed: boolean;
  profile: string;
  engine_version: string;
  processing_time_ms: number;
}

export interface SearchHit {
  document_id: string;
  source: string;
  passage: string;
  score: number;
}

export interface SearchOutput {
  results: SearchHit[];
  method: string;
  processing_time_ms: number;
}

const documents: DocumentRecord[] = demoCorpus as DocumentRecord[];

// Pre-calculate document character n-grams and document frequency (DF) for TF-IDF
function getCharNgrams(text: string, minN = 2, maxN = 5): Record<string, number> {
  const ngrams: Record<string, number> = {};
  const cleaned = text.toLowerCase();
  for (let n = minN; n <= maxN; n++) {
    for (let i = 0; i <= cleaned.length - n; i++) {
      const g = cleaned.slice(i, i + n);
      ngrams[g] = (ngrams[g] || 0) + 1;
    }
  }
  return ngrams;
}

const N = documents.length;
const docNgramsList: Record<string, number>[] = documents.map((d) => getCharNgrams(d.text));
const documentFrequency: Record<string, number> = {};

for (const dNgrams of docNgramsList) {
  for (const term in dNgrams) {
    documentFrequency[term] = (documentFrequency[term] || 0) + 1;
  }
}

// Scikit-learn standard smooth IDF formula: log((1 + N)/(1 + df)) + 1
function idf(term: string): number {
  const count = documentFrequency[term] || 0;
  return Math.log((1 + N) / (1 + count)) + 1;
}

/**
 * Normalizes Khmer text according to specified profile.
 * - 'nfc': Standard Unicode NFC
 * - 'nfc_whitespace': NFC with whitespace normalization
 * - 'khmer': Full Khmer canonical normalization (reordering, diacritics, NFC, whitespace)
 */
export function normalizeKhmerText(text: string, profile = "khmer"): NormalizeOutput {
  const start = performance.now();
  let normalized = "";

  if (profile === "nfc") {
    normalized = text.normalize("NFC");
  } else if (profile === "nfc_whitespace") {
    normalized = text.normalize("NFC").replace(/\s+/g, " ").trim();
  } else {
    // Full Khmer profile
    // 1. Unicode NFC
    let n = text.normalize("NFC");

    // 2. Canonical Khmer character order fixes
    // Fix Coeng (U+17D2) misplaced sequences
    n = n.replace(/\u17D2([\u17B6-\u17C5])/g, "$1");

    // Fix multiple consecutive vowel signs or diacritics
    n = n.replace(/([\u17B6-\u17C5])[\u17B6-\u17C5]+/g, "$1");

    // 3. Normalize whitespace & zero-width spaces
    n = n.replace(/[\u200B\u200C\u200D]/g, ""); // strip ZWSP for clean search indexing
    n = n.replace(/\s+/g, " ").trim();
    normalized = n;
  }

  const elapsed = performance.now() - start;

  return {
    normalized_text: normalized,
    changed: normalized !== text,
    profile,
    engine_version: "0.1.1",
    processing_time_ms: Math.round(elapsed * 1000) / 1000,
  };
}

/**
 * Executes search over the KhmerKit starter corpus.
 * Supports 'char_tfidf' and 'normalized_keyword'.
 */
export function searchKhmerCorpus(query: string, method = "char_tfidf", topK = 3): SearchOutput {
  const start = performance.now();
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      results: [],
      method,
      processing_time_ms: 0,
    };
  }

  if (method === "normalized_keyword") {
    const qTokens = new Set(normalizeKhmerText(trimmed).normalized_text.split(/\s+/));
    const scored = documents.map((doc) => {
      const docTokens = new Set(normalizeKhmerText(doc.text).normalized_text.split(/\s+/));
      let overlap = 0;
      for (const t of qTokens) {
        if (docTokens.has(t)) overlap++;
      }
      const score = qTokens.size > 0 ? overlap / qTokens.size : 0;
      return {
        document_id: doc.id,
        source: doc.title || doc.id,
        passage: doc.text,
        score: Math.round(score * 1000) / 1000,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    const elapsed = performance.now() - start;
    return {
      results: scored.slice(0, topK),
      method,
      processing_time_ms: Math.round(elapsed * 1000) / 1000,
    };
  }

  // char_tfidf retrieval
  const qNgrams = getCharNgrams(trimmed);
  const scored = documents.map((doc, idx) => {
    const dNgrams = docNgramsList[idx];
    let dot = 0;
    let qNorm = 0;
    let dNorm = 0;

    for (const term in qNgrams) {
      const qWeight = qNgrams[term] * idf(term);
      qNorm += qWeight * qWeight;
      if (dNgrams[term]) {
        const dWeight = dNgrams[term] * idf(term);
        dot += qWeight * dWeight;
      }
    }

    for (const term in dNgrams) {
      const dWeight = dNgrams[term] * idf(term);
      dNorm += dWeight * dWeight;
    }

    const cosineSim = qNorm > 0 && dNorm > 0 ? dot / (Math.sqrt(qNorm) * Math.sqrt(dNorm)) : 0;

    return {
      document_id: doc.id,
      source: doc.title || doc.id,
      passage: doc.text,
      score: Math.round(cosineSim * 1000) / 1000,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const elapsed = performance.now() - start;

  return {
    results: scored.slice(0, topK),
    method: "char_tfidf",
    processing_time_ms: Math.round(elapsed * 1000) / 1000,
  };
}

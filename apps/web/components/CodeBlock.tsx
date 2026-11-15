"use client";

import { useState } from "react";

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

export function CodeBlock({ title = "TERMINAL", language = "BASH", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="docs-code-box">
      <div className="code-box-header">
        <div className="code-box-left">
          <span>{title}</span>
          <span className="code-lang">{language}</span>
        </div>
        <button
          type="button"
          className={`code-copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="copied-text">Copied!</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

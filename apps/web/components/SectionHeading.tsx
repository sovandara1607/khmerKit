"use client";

import { useState } from "react";

interface SectionHeadingProps {
  id: string;
  tag?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, tag, title, subtitle }: SectionHeadingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAnchor = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    
    try {
      navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    } else {
      window.location.hash = id;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section-anchor-block" id={id}>
      {tag && <div className="section-tag">{tag}</div>}
      <h2 className="heading-with-anchor">
        <a
          href={`#${id}`}
          onClick={handleCopyAnchor}
          className="anchor-link-title"
          title="Click to copy link to section"
        >
          <span>{title}</span>
          <span className={`anchor-icon ${copied ? "copied" : ""}`}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="square">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </span>
        </a>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

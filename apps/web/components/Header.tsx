"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header({ landing = false }: { landing?: boolean }) {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(window.localStorage.getItem("khmerkit-theme-v2") !== "light");
  }, []);
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    window.localStorage.setItem("khmerkit-theme-v2", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className={`site-header${landing ? " landing-header" : ""}`}>
      <Link className="brand" href="/">
        <span className="brand-mark">ភាសា</span>
        <span>KhmerKit</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {landing ? (
          <>
            <Link href="/benchmarks">Benchmarks</Link>
            <Link href="/docs">Docs</Link>
          </>
        ) : (
          <>
            <Link href="/docs">Docs</Link>
            <Link href="/playground">Playground</Link>
            <Link href="/benchmarks">Benchmarks</Link>
            <Link href="/community">Community</Link>
          </>
        )}
      </nav>
      <div className="header-actions">
        {landing ? (
          <Link className="header-cta" href="/playground">Start building</Link>
        ) : (
          <a href="https://github.com/sovandara1607/khmerKit" target="_blank" rel="noreferrer">GitHub</a>
        )}
        <button className="theme-toggle" type="button" onClick={() => setDark((value) => !value)}>{dark ? "Light" : "Dark"}</button>
      </div>
    </header>
  );
}

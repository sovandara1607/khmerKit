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

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (landing && typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.history.pushState(null, "", `#${id}`);
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`site-header${landing ? " landing-header" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="KhmerKit Home">
          <span className="brand-mark">ខ</span>
          <span className="brand-name">KhmerKit</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {landing ? (
            <>
              <a
                className="nav-link"
                href="#features"
                onClick={(e) => handleAnchorClick(e, "features")}
              >
                Features
              </a>
              <Link className="nav-link" href="/docs">
                Docs
              </Link>
              <Link className="nav-link" href="/benchmarks">
                Benchmarks
              </Link>
              <Link className="nav-link" href="/community">
                Community
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" href="/docs">
                Docs
              </Link>
              <Link className="nav-link" href="/benchmarks">
                Benchmarks
              </Link>
              <Link className="nav-link" href="/playground">
                Playground
              </Link>
              <Link className="nav-link" href="/community">
                Community
              </Link>
            </>
          )}
        </nav>
        <div className="header-actions">
          {landing ? (
            <a
              className="header-cta"
              href="#playground"
              onClick={(e) => handleAnchorClick(e, "playground")}
            >
              Open playground
            </a>
          ) : (
            <a
              className="github-link"
              href="https://github.com/sovandara1607/khmerKit"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {!landing && (
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setDark((value) => !value)}
            >
              {dark ? "Light" : "Dark"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

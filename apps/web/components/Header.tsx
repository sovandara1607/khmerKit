"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header({ landing = false }: { landing?: boolean }) {
  const [dark, setDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("khmerkit-theme-v2");
    setDark(saved !== "light");
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      window.localStorage.setItem("khmerkit-theme-v2", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      window.localStorage.setItem("khmerkit-theme-v2", "light");
    }
  }, [dark]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileMenuOpen(false);
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
        <Link className="brand" href="/" aria-label="KhmerKit Home" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-mark">ខ</span>
          <span className="brand-name">KhmerKit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav" aria-label="Primary navigation">
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

        {/* Desktop Header Actions */}
        <div className="header-actions desktop-actions">
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
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            title={`Switch to ${dark ? "light" : "dark"} mode`}
            onClick={() => setDark((value) => !value)}
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav className="mobile-nav-links">
            {landing ? (
              <>
                <a
                  className="mobile-nav-link"
                  href="#features"
                  onClick={(e) => handleAnchorClick(e, "features")}
                >
                  Features
                </a>
                <Link className="mobile-nav-link" href="/docs" onClick={() => setMobileMenuOpen(false)}>
                  Docs
                </Link>
                <Link className="mobile-nav-link" href="/benchmarks" onClick={() => setMobileMenuOpen(false)}>
                  Benchmarks
                </Link>
                <Link className="mobile-nav-link" href="/community" onClick={() => setMobileMenuOpen(false)}>
                  Community
                </Link>
                <a
                  className="mobile-cta-btn"
                  href="#playground"
                  onClick={(e) => handleAnchorClick(e, "playground")}
                >
                  Open playground →
                </a>
              </>
            ) : (
              <>
                <Link className="mobile-nav-link" href="/docs" onClick={() => setMobileMenuOpen(false)}>
                  Docs
                </Link>
                <Link className="mobile-nav-link" href="/benchmarks" onClick={() => setMobileMenuOpen(false)}>
                  Benchmarks
                </Link>
                <Link className="mobile-nav-link" href="/playground" onClick={() => setMobileMenuOpen(false)}>
                  Playground
                </Link>
                <Link className="mobile-nav-link" href="/community" onClick={() => setMobileMenuOpen(false)}>
                  Community
                </Link>
                <a
                  className="mobile-cta-btn"
                  href="https://github.com/sovandara1607/khmerKit"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GitHub Repository ↗
                </a>
              </>
            )}
            <div className="mobile-nav-footer">
              <button
                className="mobile-theme-toggle"
                type="button"
                onClick={() => setDark((prev) => !prev)}
              >
                <span>Theme</span>
                <strong>{dark ? "Dark" : "Light"}</strong>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(window.localStorage.getItem("khmerkit-theme") === "dark"); }, []);
  useEffect(() => { document.body.classList.toggle("dark", dark); window.localStorage.setItem("khmerkit-theme", dark ? "dark" : "light"); }, [dark]);
  return <header className="site-header">
    <Link className="brand" href="/"><span className="brand-mark">ភាសា</span><span>KhmerKit</span></Link>
    <nav className="nav-links" aria-label="Primary navigation"><Link href="/docs">Docs</Link><Link href="/playground">Playground</Link><Link href="/benchmarks">Benchmarks</Link><Link href="/community">Community</Link></nav>
    <div className="header-actions"><a href="https://github.com/sovandara1607/khmerKit" target="_blank" rel="noreferrer">GitHub</a><button className="theme-toggle" type="button" onClick={() => setDark((value) => !value)}>{dark ? "Light" : "Dark"}</button></div>
  </header>;
}

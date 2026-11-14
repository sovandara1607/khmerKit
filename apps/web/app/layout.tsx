import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KhmerKit | Build Better Khmer AI",
  description: "Open-source Khmer text processing, search, and evaluation tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

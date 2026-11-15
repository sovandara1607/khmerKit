import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KhmerKit — Build Better Khmer AI",
  description: "Khmer text infrastructure for developers — normalization, document search, and evaluation in one small toolkit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

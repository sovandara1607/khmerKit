import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://khmerkit.sovandara.lol";

export const metadata: Metadata = {
  title: {
    default: "KhmerKit | Build Better Khmer AI",
    template: "%s | KhmerKit",
  },
  description:
    "Khmer text infrastructure for developers | normalization, document search, and evaluation in one small toolkit.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "KhmerKit | Build Better Khmer AI",
    description:
      "Khmer text infrastructure for developers | normalization, document search, and evaluation in one small toolkit.",
    url: BASE_URL,
    siteName: "KhmerKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KhmerKit | Build Better Khmer AI",
    description:
      "Khmer text infrastructure for developers | normalization, document search, and evaluation in one small toolkit.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

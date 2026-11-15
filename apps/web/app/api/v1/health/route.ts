import { NextResponse } from "next/server";

export async function GET() {
  const upstreamUrl = process.env.KHMERKIT_BACKEND_URL || process.env.INTERNAL_API_URL;
  let upstreamStatus = "standalone";

  if (upstreamUrl) {
    try {
      const res = await fetch(`${upstreamUrl.replace(/\/$/, "")}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        upstreamStatus = "connected";
      }
    } catch {
      upstreamStatus = "unreachable";
    }
  }

  return NextResponse.json({
    status: "ok",
    version: "0.1.1",
    service: "khmerkit-web-api",
    documents: 20,
    upstream: upstreamStatus,
    timestamp: new Date().toISOString(),
  });
}

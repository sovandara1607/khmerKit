import { NextRequest, NextResponse } from "next/server";
import { normalizeKhmerText } from "@/lib/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text ?? "";
    const profile = body.profile || "khmer";

    if (typeof text !== "string") {
      return NextResponse.json({ detail: "text must be a string" }, { status: 422 });
    }

    if (text.length > 50000) {
      return NextResponse.json({ detail: "text exceeds maximum length (50,000 characters)" }, { status: 413 });
    }

    // Check if an external FastAPI backend is configured
    const upstreamUrl = process.env.KHMERKIT_BACKEND_URL || process.env.INTERNAL_API_URL;
    if (upstreamUrl) {
      try {
        const response = await fetch(`${upstreamUrl.replace(/\/$/, "")}/v1/text/normalize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, profile }),
          signal: AbortSignal.timeout(3500),
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }
      } catch {
        // Fallback to local server engine if upstream is unreachable
      }
    }

    const result = normalizeKhmerText(text, profile);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ detail: "Invalid request payload" }, { status: 400 });
  }
}

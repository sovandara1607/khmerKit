import { NextRequest, NextResponse } from "next/server";
import { searchKhmerCorpus } from "@/lib/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.query ?? "").trim();
    const collectionId = body.collection_id || "demo";
    const method = body.method || "char_tfidf";
    const topK = Math.min(Math.max(Number(body.top_k) || 3, 1), 20);

    if (!query) {
      return NextResponse.json({ detail: "query must not be blank" }, { status: 422 });
    }

    if (query.length > 1000) {
      return NextResponse.json({ detail: "query exceeds maximum length (1,000 characters)" }, { status: 413 });
    }

    if (collectionId !== "demo") {
      return NextResponse.json({ detail: "unknown collection" }, { status: 404 });
    }

    // Check if an external FastAPI backend is configured
    const upstreamUrl = process.env.KHMERKIT_BACKEND_URL || process.env.INTERNAL_API_URL;
    if (upstreamUrl) {
      try {
        const response = await fetch(`${upstreamUrl.replace(/\/$/, "")}/v1/search/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection_id: collectionId, query, method, top_k: topK }),
          signal: AbortSignal.timeout(4000),
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }
      } catch {
        // Fallback to local server engine if upstream is unreachable
      }
    }

    const result = searchKhmerCorpus(query, method, topK);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ detail: "Invalid request payload" }, { status: 400 });
  }
}

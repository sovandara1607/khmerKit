# KhmerKit web

The web app is the developer-facing interface for the live FastAPI service.

```bash
cd apps/web
npm install
npm run dev
```

Run the API separately from the repository root:

```bash
khmerkit-api --documents data/real/documents.jsonl --port 8000
```

Set `NEXT_PUBLIC_API_BASE_URL` when the API runs somewhere else. The first web slice includes the homepage, docs, normalization playground, search playground, benchmark summary, and community page.

If Next reports a missing `.next/server` chunk, clear the generated bundle and rebuild:

```bash
npm run clean
npm run build
```

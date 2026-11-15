import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KhmerKit — Build Better Khmer AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0d12",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              color: "#0c0d12",
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            ខ
          </div>
          <span
            style={{
              color: "#ffffff",
              fontSize: "52px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            KhmerKit
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#a0a0b0",
            fontSize: "28px",
            marginBottom: "48px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Khmer text infrastructure for developers — normalization, search, and
          evaluation in one toolkit.
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Normalize", "Search", "Benchmark", "API"].map((label) => (
            <div
              key={label}
              style={{
                border: "1px solid #2a2b33",
                color: "#c0c0d0",
                padding: "10px 24px",
                fontSize: "18px",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Version badge */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "40px",
            color: "#555566",
            fontSize: "16px",
          }}
        >
          v0.1.1 · Open Source · Apache-2.0
        </div>
      </div>
    ),
    { ...size }
  );
}

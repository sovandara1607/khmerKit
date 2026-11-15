import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KhmerKit | Build Better Khmer AI";
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
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="46"
              height="46"
              viewBox="0 0 1400 1400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M488 847V977Q488 1112 700 1112Q912 1112 912 977V820H1200V977Q1200 1300 700 1300Q200 1300 200 977V714L606 644Q912 583 912 423Q912 288 700 288Q488 288 488 403Q488 437 588 437V581H388Q200 581 200 437V403Q200 100 700 100Q1200 100 1200 423Q1200 725 616 821Z"
                fill="#0c0d12"
              />
            </svg>
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


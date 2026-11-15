import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg
          width="20"
          height="20"
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
    ),
    {
      ...size,
    }
  );
}

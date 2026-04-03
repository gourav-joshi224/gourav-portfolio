import { ImageResponse } from "next/og";

import { SITE_HANDLE, SITE_NAME } from "@/lib/config";

export const runtime = "edge";
export const alt = "Gourav Joshi — Backend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            display: "flex",
          }}
        />
        <div
          style={{
            color: "#00ff87",
            fontSize: "18px",
            marginBottom: "24px",
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          {`> ${SITE_HANDLE}`}
        </div>
        <div
          style={{
            color: "#e8e8e8",
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "16px",
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            color: "#666666",
            fontSize: "28px",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          Backend Developer
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {["Node.js", "NestJS", "PostgreSQL", "TypeScript", "Microservices"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid rgba(0,255,135,0.3)",
                  color: "#00ff87",
                  fontSize: "16px",
                  padding: "6px 16px",
                  letterSpacing: "0.05em",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}

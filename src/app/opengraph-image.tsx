import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SiteBlitz — Websites That Win Business, Shipped in 48 Hours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          backgroundImage:
            "radial-gradient(80% 100% at 80% 0%, rgba(124,92,255,0.25), transparent), radial-gradient(60% 80% at 10% 100%, rgba(204,255,0,0.18), transparent)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#ccff00",
              display: "flex",
            }}
          />
          <div style={{ color: "#f5f5f0", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            SITE<span style={{ color: "#ccff00" }}>BLITZ</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f5f5f0",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>WEBSITES THAT</span>
            <span>
              WIN BUSINESS<span style={{ color: "#ccff00" }}>.</span>
            </span>
          </div>
          <div style={{ marginTop: 28, color: "#9b9ba3", fontSize: 30, display: "flex" }}>
            Designed, engineered & live in 48 hours — India & worldwide
          </div>
        </div>

        <div style={{ display: "flex", gap: 26, color: "#55555e", fontSize: 24 }}>
          <span style={{ color: "#ccff00" }}>✦</span>
          <span>48-hour delivery</span>
          <span style={{ color: "#ccff00" }}>✦</span>
          <span>SEO-first</span>
          <span style={{ color: "#ccff00" }}>✦</span>
          <span>Live visitor analytics</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

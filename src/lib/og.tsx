import { ImageResponse } from "next/og";

/**
 * Social / search preview cards in the v4 brand (void ground, ink type, volt accent). One generator so every page's
 * card says the same thing about the business; each route's `opengraph-image.tsx` passes only its own words.
 * Satori's bundled sans is used on purpose: fetching Mona Sans at build time would make the build depend on the
 * network. The rupee sign is avoided in card text for the same font reason.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const VOID = "#0a0a0c";
const INK = "#f5f5f0";
const VOLT = "#ccff00";
const MUTED = "#a1a1a8";

export function ogCard({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          backgroundImage: "radial-gradient(70% 90% at 92% 8%, rgba(204,255,0,0.16), transparent 60%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: INK, fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>
            Site<span style={{ color: VOLT }}>Blitz</span>
          </div>
          <div
            style={{
              display: "flex",
              color: VOLT,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              border: `2px solid ${VOLT}`,
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: INK,
              fontSize: title.length > 48 ? 64 : 80,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.04,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {sub && <div style={{ display: "flex", marginTop: 26, color: MUTED, fontSize: 30, maxWidth: 980 }}>{sub}</div>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, color: MUTED, fontSize: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: VOLT, display: "flex" }} />
          <span>Website design and development studio, based in Gujarat, India</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}

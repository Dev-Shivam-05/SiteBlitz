import type { NextConfig } from "next";
import { releaseOriginProblem } from "./src/lib/release";

// A production deployment must name its origin (src/lib/release.ts); local and preview builds keep the fallback.
const originProblem = releaseOriginProblem(process.env);
if (originProblem) throw new Error(originProblem);

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  env: {
    // Baked at build time — powers the "deployed X ago" proof metric.
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_COMMIT: (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7),
  },
  // Type errors fail the build again (P5, 2026-10-31). The old OOM came from the untyped
  // model() helper in src/lib/models.ts, not from the dependency set.
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;

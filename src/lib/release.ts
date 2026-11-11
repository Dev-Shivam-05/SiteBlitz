/**
 * Release guard (performance/SEO audit 2026-11-11, fix 11). Canonicals, the sitemap, robots.txt, Open Graph URLs and the
 * JSON-LD graph all use SITE.url, which falls back to https://siteblitz.vercel.app when NEXT_PUBLIC_SITE_URL is unset.
 * That fallback is fine for local builds and preview deployments, but a production deployment must state its origin
 * on purpose: next.config.ts calls this at build time and the production build stops instead of silently publishing
 * the fallback.
 *
 * Production is recognised by the host's own variables: VERCEL_ENV=production (Vercel) or CONTEXT=production (Netlify).
 */
export function releaseOriginProblem(env: Record<string, string | undefined>): string | null {
  const production = env.VERCEL_ENV === "production" || env.CONTEXT === "production";
  if (!production) return null;
  const url = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) {
    return "NEXT_PUBLIC_SITE_URL is not set for this production deployment. Set it to the approved site origin (for example https://siteblitz.in) in the host's environment variables; see docs/DEPLOY.md.";
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return `NEXT_PUBLIC_SITE_URL is not a valid URL: "${url}".`;
  }
  if (parsed.protocol !== "https:") return `NEXT_PUBLIC_SITE_URL must use https: "${url}".`;
  if (parsed.pathname !== "/" || parsed.search || parsed.hash || url.endsWith("/")) {
    return `NEXT_PUBLIC_SITE_URL must be a bare origin without a trailing slash or path: "${url}".`;
  }
  return null;
}

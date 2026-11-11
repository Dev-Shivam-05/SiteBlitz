import { describe, expect, it } from "vitest";
import { releaseOriginProblem } from "@/lib/release";

describe("release origin guard (next.config.ts)", () => {
  it("lets local and preview builds use the fallback origin", () => {
    expect(releaseOriginProblem({})).toBeNull();
    expect(releaseOriginProblem({ VERCEL_ENV: "preview" })).toBeNull();
    expect(releaseOriginProblem({ CONTEXT: "deploy-preview" })).toBeNull();
  });

  it("stops a production deployment without NEXT_PUBLIC_SITE_URL (Vercel and Netlify)", () => {
    expect(releaseOriginProblem({ VERCEL_ENV: "production" })).toMatch(/NEXT_PUBLIC_SITE_URL is not set/);
    expect(releaseOriginProblem({ CONTEXT: "production", NEXT_PUBLIC_SITE_URL: "  " })).toMatch(/not set/);
  });

  it("accepts a bare https origin in production", () => {
    expect(releaseOriginProblem({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://siteblitz.in" })).toBeNull();
    expect(releaseOriginProblem({ CONTEXT: "production", NEXT_PUBLIC_SITE_URL: "https://siteblitz.vercel.app" })).toBeNull();
  });

  it("rejects http, paths and trailing slashes in production", () => {
    expect(releaseOriginProblem({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://siteblitz.in" })).toMatch(/https/);
    expect(releaseOriginProblem({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://siteblitz.in/" })).toMatch(/bare origin/);
    expect(releaseOriginProblem({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://siteblitz.in/home" })).toMatch(/bare origin/);
    expect(releaseOriginProblem({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "not a url" })).toMatch(/valid URL/);
  });
});

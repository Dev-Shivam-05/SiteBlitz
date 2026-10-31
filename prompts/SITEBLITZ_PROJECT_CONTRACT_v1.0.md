# SiteBlitz Project Contract — v1.0 (2026-10-31)

Facts the master prompt v1.1 loads instead of rediscovering. Labels: VERIFIED · OWNER-STATED · INFERRED · PROPOSED · UNKNOWN.
Re-check the rows a phase depends on; update `last_verified` or record the discrepancy here.

| Field | Value | Source | Status | last_verified |
|---|---|---|---|---|
| Product | SiteBlitz — web design studio, Mumbai, India, founded 2024 | `src/lib/site.ts:1-13` | VERIFIED as site copy; business facts OWNER-STATED | 2026-10-31 |
| Tagline | "Websites that win business, shipped in 48 hours." | `src/lib/site.ts:3` | VERIFIED (copy) | 2026-10-31 |
| Plans | Launch ₹7,999 / $99 (48 h) · Growth ₹14,999 / $189 (4 days) · higher tier ₹24,999 | `src/lib/site.ts:26-80` | VERIFIED (copy) | 2026-10-31 |
| Services | Business sites · e-commerce & booking · landing pages · redesigns & rescues · SEO & performance · care plans | `src/lib/site.ts:179-210` | VERIFIED (copy) | 2026-10-31 |
| Markets | India first (INR, WhatsApp, Mumbai); international (USD pricing) | `src/lib/site.ts` | INFERRED | 2026-10-31 |
| Portfolio | 4 work items; images are AI-generated mockups whose brand names do not match the claimed clients | `public/images/portfolio-1..4.png`, `docs/audit/claims-register.md` | VERIFIED (image content) | 2026-10-31 |
| Testimonials | None with recorded provenance | `docs/audit/claims-register.md` | VERIFIED (absence of evidence) | 2026-10-31 |
| Stack | Next.js 15.5 App Router · React 19 · TS strict · Tailwind v4 CSS-first `@theme` · Mongoose 8 · jose · zod 4 · GSAP 3 + Lenis · recharts | `package.json`, `docs/PROJECT_MAP.md` | VERIFIED | 2026-10-31 |
| Hosting | Vercel project `shivam-bhadoriyas-projects/siteblitz`; production = siteblitz.vercel.app | `vercel project inspect siteblitz` | VERIFIED | 2026-10-31 |
| Deploy path | Pushes to `v2-redesign` create **Preview** deployments; the last **Production** deployment is from 2026-07-10 (113 days old), i.e. not from `v2-redesign` | `vercel ls siteblitz` | VERIFIED | 2026-10-31 |
| Working branch | `v2-redesign`, tracking `origin/v2-redesign`; `main` is far behind and must never be pushed to | `git`, `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Admin | Single operator; JWT cookie `sb_admin`; credentials from env `ADMIN_EMAIL` / `ADMIN_PASSWORD`; gate = `src/middleware.ts` | `src/middleware.ts:53`, `docs/RISK.md` R4-R5 | VERIFIED | 2026-10-31 |
| Analytics | `Tracker.tsx` → `/api/track`; cookies `sb_sid` (30 min) and `sb_vid` (1 year); city/region/country/timezone from `x-vercel-ip-*`; no consent prompt | `src/app/api/track/route.ts` | VERIFIED | 2026-10-31 |
| Content model | Short copy in `src/lib/site.ts`; long-form JSON in `src/content/generated/` registered by hand in `src/content/index.ts`; no CMS | `docs/PROJECT_MAP.md` | VERIFIED | 2026-10-31 |
| Animation | Declarative `data-anim` markup built by `src/components/site/Motion.tsx` | `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Tests | vitest suite over the SSRF guard and the admin auth gate; no linter; no E2E | `tests/`, `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Typecheck | `tsc --noEmit` unusable; `ignoreBuildErrors: true` | `next.config.ts:20` | VERIFIED (until P5) | 2026-10-31 |
| Debate tool | Global `/debate` skill, temporary ChatGPT chat, ≤10 rounds, ≤7 points, 25 KB | `~/.claude/skills/chatgpt-review/SKILL.md` | VERIFIED | 2026-10-31 |
| Legal jurisdictions | India (DPDP Act 2023 likely relevant) + any international visitors | — | UNKNOWN — check with counsel | — |
| Budget / timeline | — | — | UNKNOWN | — |

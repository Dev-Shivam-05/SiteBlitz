# Verified project facts (read from the repo by Claude Code, 2026-10-31)

| Fact | Source |
|---|---|
| Product: SiteBlitz, web studio, Mumbai, India, founded 2024; tagline "Websites that win business, shipped in 48 hours." | `src/lib/site.ts:1-13` |
| Plans: Launch ₹7,999 / $99 (48h), Growth ₹14,999 / $189 (4 days), more below; INR + USD pricing | `src/lib/site.ts:26-80` |
| Services: business sites, e-commerce & booking, landing pages, redesigns, SEO & performance, care plans | `src/lib/site.ts:179-210` |
| 4 work items with specific results (2.4× bookings, page 1 for 8 keywords, 38% lift, 3× consultations), images `portfolio-1..4.png`; no provenance recorded anywhere in the repo | `src/lib/site.ts:136-177`; rendered on `/work`, `/services/[slug]`, `/for/[slug]` |
| 5 named testimonials (e.g. "Rohan Mehta, Restaurant Owner, Mumbai"); no provenance recorded | `src/lib/site.ts:212-238`; `sections/Testimonials.tsx` |
| `/proof` page publishes real-user vitals and build commit; project rule: "every number on this site is verifiable" | `CLAUDE.md`, `docs/PROJECT_MAP.md` |
| Stack: Next.js 15.5 App Router, React 19, TS strict, Tailwind v4 CSS-first tokens, Mongoose 8, jose JWT, zod 4, GSAP 3 + Lenis, recharts | `docs/PROJECT_MAP.md` |
| Admin: single operator, one JWT cookie `sb_admin`, credentials from `ADMIN_EMAIL`/`ADMIN_PASSWORD` env; existing pages: overview, audience, campaigns, events, funnel, grader, leads, live, pages, visitors | `src/app/admin/`, `src/middleware.ts:53` |
| Auth gate is middleware only; no route re-checks (backlog P3) | `src/middleware.ts`, `docs/PHASES.md` |
| `typescript.ignoreBuildErrors: true`; `tsc --noEmit` never finishes (backlog P5) | `next.config.ts:20`, `CLAUDE.md` |
| Tracking: `sb_sid` 30-min and `sb_vid` 1-year httpOnly cookies; city / region / country / timezone from `x-vercel-ip-*` headers; disclosed on `/privacy`; no consent prompt or opt-out anywhere in `src/` | `src/app/api/track/route.ts:11,61,68,83-86`; `src/app/privacy/page.tsx:25-37` |
| Leads store country from Vercel header; DB failure falls back to WhatsApp | `src/app/api/leads/route.ts:77`; `docs/PROJECT_MAP.md` |
| Tests: 73 vitest tests (SSRF guard, admin auth gate); no linter; no e2e | `CLAUDE.md` |
| Completed product phases: H1 hero v4, H2/H3 contrast (`faint` token to WCAG AA) + reduced-motion marquees | `docs/PHASES.md`, `docs/HANDOFF.md` |
| Real debate tool: global `/debate` skill → temporary ChatGPT chat via the developer's logged-in browser, ≤10 rounds, agenda ≤7 points, context cap 25 KB per pack, per-point verdicts; not a repo command | `~/.claude/skills/chatgpt-review/SKILL.md` |
| Owner's global rules (all projects): artifacts in English; vague adjectives → `spec-lock` numbered table, wait for one word; one phase per session, ≤8 files; commit per working unit; never push to main | `~/.claude/CLAUDE.md` |
| The master prompt under review: 47 KB, 330 lines, XML sections; untracked in git (new today) | `prompts/WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.0.md` (attached) |

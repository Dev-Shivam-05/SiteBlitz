# Review - SiteBlitz redesign, trust and SEO/AI-visibility direction - 2026-10-31/11-01 - 3 rounds - prompt: siteblitz-transformation-debate

ChatGPT ran at Extra High. Full exchange in `SESSION.md`. Every agreed point below was implemented the same night under the
owner's "go for all" (commits on `v2-redesign`); production release is pending (see bottom).

| # | Point | Proposed by | Evidence | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | Keep H1 "WEBSITES / THAT WIN / BUSINESS." (aspirational, hero v4) | Claude r2 (ChatGPT r1 wanted "BUILT FOR") | `Hero.tsx`, `docs/spec/hero-v4.md` | agreed r2 | done (unchanged) |
| 2 | Qualify 48 h everywhere; price in hero sub-line as crawlable HTML | ChatGPT r1 | `Hero.tsx`, `layout.tsx` titles | agreed | done `04602b6`, `181c4ba` |
| 3 | Six-beat home order; Stats → Answers strip; Manifesto into Process; Services compressed; Evidence section | ChatGPT r1, refined Claude r2 | `src/app/page.tsx` | agreed | done `04602b6` |
| 4 | Scene A = Process as sticky stack; Scene B stays the labelled concept gallery | ChatGPT r1 / Claude r2 | `Process.tsx`, `WorkGallery.tsx` | agreed r2 | done |
| 5 | Trust: /proof, grader, public pricing; ownership near CTA; non-payment line stays in FAQ only | ChatGPT r1 | `Evidence.tsx`, `Answers.tsx` | agreed | done |
| 6 | Keyword map: pricing, business websites, landing pages, cost article titles; new `/website-in-48-hours`; Mumbai page deferred | ChatGPT r1-r3 | rendered `<title>`s | agreed | done `181c4ba`, `f6e0de9` |
| 7 | Fix doubled brand titles (found by Claude) | Claude r3 | 7 pages | agreed | done `181c4ba` |
| 8 | Linked entity graph (`/#organization`, `/#website`), drop empty `sameAs` | ChatGPT r3 | `layout.tsx`, `page.tsx` | agreed | done `f6e0de9` |
| 9 | robots: keep `*` allow, no per-bot groups (they would not inherit the `/admin` and `/api/` disallows) | ChatGPT r3 | `robots.ts` | agreed | unchanged by design |
| 10 | Builder-vs-studio comparison guide | ChatGPT r3 | `/blog/website-builder-vs-web-design-studio` | agreed | done `f6e0de9` |
| 11 | Preloader: keep (home lab LCP 1.78 s incl. Preloader; LCP = H1) | ChatGPT r2 rule + Claude measurement | `docs/audit/d2-site-admin-audit.md` | agreed | kept |
| 12 | Performance: first-screen `.reveal` removed on 5 pages (2.9-4.8 s → ≤ 1.33 s lab) | Claude | vitals | agreed | done `d2650b0` |
| 13 | Pricing as answer-first comparison; /proof methodology expansion | ChatGPT r3 | — | agreed | **not started** |
| 14 | Address in schema: ChatGPT says remove unverified address fields | ChatGPT r3 | `layout.tsx` has locality Mumbai + country only (owner-stated in `site.ts`), no street | open — owner to confirm Mumbai | open |

## Recommended next steps (not started)
1. Owner: release the verified build to production (one command, see handoff) — the agent's production deploy was blocked by permissions.
2. Owner: Search Console + Bing Webmaster for the canonical domain; submit sitemap; decide the permanent domain.
3. Pricing comparison table + /proof methodology (point 13), ≤ 8 files.

## Points still open
- Permanent domain (`siteblitz.in` vs `siteblitz.vercel.app`), Mumbai business facts, real external profiles for `sameAs`.
- Keyword demand data (needs Search Console).
- Field p75 Core Web Vitals after release.
- Privacy/consent review with counsel.

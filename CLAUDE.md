# SiteBlitz — Project Rules

Next.js 15 App Router marketing site + first-party analytics + single-operator admin panel.
Map: [docs/PROJECT_MAP.md](docs/PROJECT_MAP.md) · Risks: [docs/RISK.md](docs/RISK.md) · Verification: [docs/VERIFY.md](docs/VERIFY.md)

## Commands
- dev `npm run dev` → http://localhost:3000 · build `npm run build`
- `npm run typecheck` is **broken** — `tsc --noEmit` climbs past 2.9 GB and never finishes
  (confirmed 2026-08-20). Do not put it in a loop. Fixing it is P5.
- `npm test` → 73 vitest tests over the SSRF guard and the admin auth gate. No linter exists.
- **Never `npm run build` while `next dev` is live** — shared `.next` gives a bogus
  `TypeError: a[d] is not a function` prerender failure. Kill dev first; check for orphan children.
- PowerShell 5.1 has no `&&`. Separate commands, or `;`.

## Conventions — follow these, don't improve them
1. API routes return `{ ok: boolean, ... }`; errors `{ ok:false, error }` with a real status code.
   `/api/track` is the deliberate exception: always 204, never throws.
2. Every route file: `export const runtime = "nodejs"`, plus `dynamic = "force-dynamic"` if DB-backed.
3. Guard DB work with `dbConfigured()` before `dbConnect()`. A missing database degrades the
   feature (503 / WhatsApp fallback), never crashes the page.
4. Server components by default; `"use client"` only for interaction. Decorative or heavy work
   mounts via `Deferred` / `ExperienceLayer` + `next/dynamic`, never on the critical path —
   `/proof` publishes the real-user vitals, so first paint is a product feature here.
5. Animation is declarative: put `data-anim="chars|words|fade-up|mask|scale-in|words-scrub|parallax"`
   (+ `data-delay`, `data-stagger`, `data-now`, `data-speed`) on the markup and let `Motion.tsx`
   build the GSAP scene. Never hand-write GSAP inside a component.
6. Colours come from the `@theme` tokens in `globals.css` — `void, surface, raised, ink, muted,
   faint, volt, violet, line`. No inline hex. Reusable effects are classes in `globals.css`.
   Tailwind v4 is CSS-first: there is no `tailwind.config.js` and there should not be one.
7. Honour `prefers-reduced-motion` everywhere; `?motion=force` is the QA override.

## Danger zones
- `src/middleware.ts` — the **only** auth gate for `/admin` and `/api/admin`; no route re-checks.
  Any change here means running section E of `docs/VERIFY.md` against every admin route.
- `src/lib/grader.ts` `isPrivateIp()` / `validatePublicUrl()` — hand-rolled SSRF guard on a
  user-supplied-URL fetcher. Do not weaken. Do not touch before tests exist.
- `src/components/site/Motion.tsx` — 384-line engine; a bad selector kills reveals site-wide, silently.
- `src/app/api/track/route.ts` — swallows every error by design, so bugs here are invisible.
- `next.config.ts` has `ignoreBuildErrors: true`. **A green build does not mean the types are fine.**

## Content rules
- Short copy, pricing, FAQs, work items, testimonials → `src/lib/site.ts`.
- Long-form (deep services, blog posts, industry landers) → JSON in `src/content/generated/`,
  imported explicitly by `src/content/index.ts`. That barrel is hand-maintained on purpose:
  a new file needs a new import line or it silently won't ship.
- Never invent a price, timeline, testimonial, client name or result. If it is not already in
  `site.ts` or the JSON, ask. `/proof` claims every number on this site is verifiable.

## Done means
1. `npm test` and `npm run build` both exit 0.
2. The sections of `docs/VERIFY.md` that cover the change were actually run — not assumed.
3. UI change → a screenshot of each state, incl. reduced-motion — which is also the fastest way to
   *audit* a page (every section renders static and visible). Screenshot over CDP with device
   metrics set; `chrome --headless --window-size` includes browser insets and silently crops.
4. Committed as `<area>: <what changed>`, and pushed.

## Git
- `v2-redesign` is the working branch. `main` is 101 commits behind and is not the deploy source.
  Never push to `main`.
- The branch has no upstream set yet: `git push -u origin v2-redesign` (see RISK R1).

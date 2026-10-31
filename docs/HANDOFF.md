# HANDOFF — SiteBlitz — Phase L1 (release) — 2026-11-01

## Done
- Master prompt reviewed with ChatGPT (2 rounds) → v1.1 + project contract + phase brief template + debate prompt v1.1 in `prompts/` (v1.0 kept).
- Site no longer publishes unsupported claims: the 4 "case studies" (AI mockups showing other brands) are labelled concept studies with no fake results or images; the 5 testimonials, "100% on-time", "Most chosen" and the "every claim verifiable" lines are gone; `/privacy` matches what the code stores.
- Home follows the six-beat narrative agreed with ChatGPT (3 rounds): Hero → Answers strip → Process sticky stack → Services grid → concept gallery → Evidence → Pricing → FAQ → CTA.
- `npm run typecheck` works (0 errors, ~4 s) and `npm run build` now fails on type errors.
- Every `/api/admin` data route checks auth itself (middleware no longer the only gate); `/api/track` honours GPC/DNT.
- No horizontal overflow on public pages (320–1920) or admin screens (320–1440); lab mobile LCP ≤ 1.78 s on every measured page.
- SEO: doubled-brand titles fixed, keyword-led titles, new `/website-in-48-hours`, BreadcrumbList, linked entity graph, builder-vs-studio guide, honest `llms.txt`.
- 81 tests pass; everything pushed to `origin/v2-redesign` (HEAD `ed16331`). Previews are SSO-protected + noindex.

## Files changed
- `prompts/*v1.1*`, `prompts/SITEBLITZ_PROJECT_CONTRACT_v1.0.md`, `prompts/PHASE_BRIEF_TEMPLATE_v1.0.md` — prompt v1.1 set.
- `docs/audit/claims-register.md`, `docs/audit/d2-site-admin-audit.md`, `docs/DEPLOY.md` — D1/D2 audits, deploy truth + release runbook.
- `docs/debate/2026-10-31-*` — both real ChatGPT debates with RESULT.md.
- `scripts/shoot.mjs`, `scripts/vitals.mjs` — screenshot/overflow tool and lab vitals tool.
- `src/lib/site.ts`, `src/content/generated/*.json` (16), `public/llms.txt` — claims withdrawn/relabelled; new guide post.
- `src/components/site/ConceptFrame.tsx`, `sections/{Answers,Evidence,Process,Services,WorkGallery,Hero,Pricing}.tsx`, `src/app/page.tsx` — X1 home.
- `src/app/website-in-48-hours/page.tsx` + titles/JSON-LD in `layout.tsx`, `pricing`, `services/[slug]`, `for/[slug]`, `blog/[slug]`, `sitemap.ts` — SEO.
- `src/lib/models.ts`, `next.config.ts` — P5 typecheck fix, `ignoreBuildErrors` removed.
- `src/lib/auth.ts`, `src/app/api/admin/**/route.ts` (13), `tests/admin-routes.test.ts` — P3.
- `src/app/api/track/route.ts`, `tests/track-optout.test.ts`, `src/app/privacy/page.tsx` — PR1.
- `src/components/admin/{AdminShell,CapacityControl}.tsx`, `src/app/admin/{page,campaigns/page}.tsx` — admin mobile overflow.
- `src/app/globals.css` — reduced-motion marquee/gallery fixes, blueprint grid; deleted Aurora, TiltCard, sections/{Work,Testimonials,Stats}.

## Decisions made
- Withhold (not delete) every client claim without evidence; concept studies only — see DECISIONS D5.
- Keep H1 "THAT WIN" and the first-visit Preloader (measured: not the LCP element) — agreed with ChatGPT.
- No analytics retention TTL yet: the period is the owner's call and a TTL index would conflict with the existing `ts` index.
- robots.txt stays `*` allow (per-bot groups would drop the /admin, /api disallows).
- Deploy from a clean git worktree so local `.env.local` is never uploaded.

## Known broken / deliberately skipped
- **Production not updated** — the agent's `vercel deploy --prod` was denied by permission settings; the owner must run it (`docs/DEPLOY.md` → "Pending release").
- Previews and dev share the production Mongo database (RISK R11) — owner action in the Vercel dashboard.
- Pricing comparison table and /proof methodology (ChatGPT round 3, items 3 and 5) — not started.
- VERIFY E manual run with real admin credentials, screen-reader and keyboard passes — no credentials or time.
- Schema address (Mumbai locality) kept as owner-stated; owner to confirm. No Search Console / keyword data yet.

## Next session starts here
- Phase L1: owner releases `f6e0de9`+ to production, then verify production pages and field vitals on `/proof`.
- First command: `git -C E:\Temp\SiteBlitz worktree add --detach E:\Temp\siteblitz-release ed16331`
- Watch out for: on Windows, stopping `npm run dev` / `npm start` leaves the `next` child on :3000 — kill the PID or every check hits a stale server.

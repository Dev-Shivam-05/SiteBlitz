# Handoff — SiteBlitz

## Last session: H1 — Hero v4 (2026-08-20)

**Branch:** `v2-redesign` · **Files changed:** `Hero.tsx`, `WebGLHero.tsx`, `globals.css` + spec/docs

The owner's #1 priority: the home page had to impress on first sight. Three real defects were
found by screenshotting the running site, not by reading code:

1. The middle headline line "THAT WIN" was invisible — a 1px 25%-opacity stroke over a bright
   background. The headline effectively read "WEBSITES … BUSINESS."
2. The nav logo, the status badge and the headline all shared one band on short viewports.
3. The shader was one flat texture edge to edge — measured left/right luminance ratio 1.10×,
   i.e. no focal point at all. That is the "background bahut simple" complaint, quantified.

Fixed by: a volt wireframe stroke on line 2, a 3-row grid that reserves the navbar height, the
badge moved into flow, and a shader rebuilt around a single light source (ratio now 1.51×).
Full spec + verification record: `docs/spec/hero-v4.md`.

**Two things worth knowing next session:**
- Never run `npm run build` while `next dev` is live. They share `.next` and it produces a
  bogus `TypeError: a[d] is not a function` prerender failure that looks like a code bug.
- `chrome --headless --window-size=W,H --screenshot` is **not** trustworthy for narrow widths —
  the window size includes browser insets, so it silently crops a wider layout. Measure via CDP
  instead (`scratchpad/cdp.mjs` this session; worth moving into the repo as a dev tool).

## Previous session: R0 — Recon (2026-08-20)

**Branch:** `v2-redesign` at `4ee3cc1` · **Source changed:** none (recon is read-only)

### What happened
Ran `legacy-recon` on an inherited, undocumented codebase — 119 files, ~10.4k LOC, Next.js 15
App Router + MongoDB analytics + admin panel, with the entire v3 "proof-first" rebuild landed as a
single commit and no spec behind it. Produced the docs spine:

- `docs/PROJECT_MAP.md` — how to run it, where everything lives, the conventions it actually follows
- `docs/RISK.md` — 10 risks, R1 is urgent
- `docs/VERIFY.md` — the manual checklist standing in for the tests that don't exist
- `docs/DECISIONS.md` — D1 incremental not rewrite, D2 where tests start, D3 leave `ignoreBuildErrors`, D4 analytics stays first-party
- `docs/spec/GLOSSARY.md` — 18 project terms
- `docs/PHASES.md` — P1–P8 hardening track + session split
- `CLAUDE.md` — project rules

### Verified, not assumed
- `npm run build` → **exit 0**, all 30+ routes built, 103 kB shared JS.
- `.env.local` is **not** tracked by git; no secrets anywhere in source.
- Every `/api/admin/*` route is gated by `src/middleware.ts` and by nothing else.
- Dead code confirmed by reference count: `Aurora.tsx`, `TiltCard.tsx`, `sections/Work.tsx`, `lib/services.ts`'s empty `DEEP_SERVICES`.

### Do this first, before any code
`git push -u origin v2-redesign` — the branch has **no upstream set** and is **2 commits ahead of
origin**, and those two commits are the whole v3 rebuild plus the TBT perf work. Right now that work
exists on one disk. See RISK R1.

## Next session

Owner's call between:
- **H2 / H3** — carry the hero's contrast discipline into the rest of the home page, or do the
  `/work` and `/services` first screens. Product work, matches the stated priority.
- **P1 — Safety net** — approved and specced, not yet built. vitest + tests for the SSRF guard
  and the admin auth gate.

## Open questions for the owner
Four, at the bottom of `docs/PROJECT_MAP.md`. The one that shapes the roadmap: **is the v3
proof-first direction finished, or mid-flight?**

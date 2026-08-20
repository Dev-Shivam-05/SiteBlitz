# Handoff — SiteBlitz

## Last session: R0 — Recon (2026-08-20)

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

## Next session: P1 — Safety net

Blocked on one thing: the SPEC LOCK table for P1 needs a one-word approval. Once approved it gets
written to `docs/spec/p1-safety-net.md` and built.

## Open questions for the owner
Four, at the bottom of `docs/PROJECT_MAP.md`. The one that shapes the roadmap: **is the v3
proof-first direction finished, or mid-flight?**

# Decisions — SiteBlitz

Append-only. One row per decision that a future session might otherwise reopen.

---

## D1 — Incremental, not rewrite (2026-08-20)

**Decision:** SiteBlitz stays on its current stack and is changed incrementally. No rewrite, no
framework migration, no dependency-upgrade side quests.

**Why:** the rewrite test requires *all four* of — runtime out of support, no coverage, domain
re-specifiable in a day, old and new runnable side by side. Only "no coverage" is true here.
Next.js 15 / React 19 / Tailwind v4 are current, the build is green, and the v3 rebuild
(`fca3e11`) is recent work, not legacy debt.

**Reopen only if:** Next.js 15 goes out of support, or a security advisory lands that cannot be
patched in place.

---

## D2 — Tests start at the two places where being wrong is expensive (2026-08-20)

**Decision:** the first test suite covers `isPrivateIp`/`gradeWebsite` input handling and the
admin auth gate. Not broad coverage, not UI snapshots.

**Why:** those are the only two places where a silent regression is a security incident rather than
a cosmetic bug. Everything else is verifiable by eye via `docs/VERIFY.md`.

**Reopen only if:** a third security-relevant surface appears (payments, file upload, a second user role).

---

## D3 — `ignoreBuildErrors: true` stays until proven unnecessary (2026-08-20)

**Decision:** leave `typescript.ignoreBuildErrors: true` in `next.config.ts` for now; do not remove
it as part of an unrelated change.

**Why:** the comment says the checker OOMs on the mongoose/recharts typings. Removing it without
first confirming `tsc --noEmit` runs clean would break every deploy. Its removal is its own phase
with its own rollback.

**Reopen when:** `npm run typecheck` is verified to complete, at which point removing the flag is a
one-line phase.

---

## D4 — Analytics stays first-party and silent (2026-08-20)

**Decision:** `/api/track` keeps returning 204 unconditionally and swallowing every error. No
third-party analytics is added.

**Why:** the privacy page publicly commits to first-party, truncated-IP, no-ad-tracker analytics,
and the site sells "your data, your dashboard". Breaking that would make `/privacy` false.

**Reopen only if:** the privacy policy is updated first.

---

## D5 — Unevidenced client claims are withheld, work shown as concept studies (2026-10-31)

**Decision:** the 4 case-study results, 5 named testimonials, "100% on-time launches" and "Most chosen" are no longer
published. Work items stay as clearly labelled concept studies with an image-free frame.

**Why:** no evidence or permission exists in the repo, and the portfolio images are AI mockups showing other brands and
lorem ipsum (`docs/audit/claims-register.md`). `/proof` promised verifiability. Withheld, not destroyed: git history keeps them.

**Reopen when:** the owner supplies evidence + client permission per claim.

---

## D6 — D3 superseded: type errors fail the build (2026-10-31)

**Decision:** `ignoreBuildErrors` removed. The OOM was the untyped `model()` helper in `src/lib/models.ts`, not the
dependency set. Keep schemas typed `new Schema<XDoc>`.

---

## D7 — D4 amended: browser opt-out signals are honoured (2026-10-31)

**Decision:** `/api/track` still always returns 204, but records nothing and sets no cookies when `Sec-GPC: 1` or `DNT: 1`.
No retention TTL until the owner picks a period (a TTL index would also conflict with the existing `ts` index).

---

## D8 — Home narrative, Preloader and robots policy (2026-11-01)

**Decision:** six-beat home order, H1 unchanged, Preloader kept, robots `*` allow without per-bot groups.

**Why:** agreed over 3 ChatGPT rounds (`docs/debate/2026-10-31-redesign-seo-direction/RESULT.md`); Preloader measured as
not the LCP element (home lab LCP 1.78 s); per-bot groups would not inherit the `/admin` and `/api/` disallows.

---

## D9 — Releases are deployed from a clean worktree (2026-11-01)

**Decision:** production deploys run `vercel deploy --prod` from `git worktree add --detach <dir> <commit>` + copied `.vercel/`.

**Why:** the working copy holds a local `.env.local`; a clean checkout guarantees only tracked files are uploaded.

---

## D10 — Founder facts that bind all copy and plans (2026-11-01)

**Decision:** SiteBlitz is presented as Gujarat-based (the founder works from Navsari; the Mumbai claim was false and
is removed); the founder's name and photo never appear; prices are final with no GST (not registered — re-check with
an accountant); ₹1,000 all-in for November ads (≈ ₹800 media); only the domain may be bought.

**Why:** stated by the founder; truth outranks perceived "urban" credibility (master prompt v3.0 priorities).

---

## D11 — One offer, one source of truth (2026-11-01)

**Decision:** Launch ₹7,999 (1 page, 2 working days after ready-to-build), Business ₹17,999 (3 pages, 7 working days),
Custom by quote; payments ₹4,000+₹3,999 / ₹9,000+₹8,999; "review your homepage concept before you pay" for qualified
buyers (max 3/week). All in `src/lib/offer.ts`, guarded by `tests/offer.test.ts`.

**Why:** debates `docs/debate/2026-11-01-*`. Prices await the founder's explicit go before the public release.

---

## D12 — Host-neutral code; no host switch without a staging pass (2026-11-01)

**Decision:** keep the app deployable on Vercel and Netlify (`src/lib/geo.ts`, `netlify.toml`). Vercel Hobby forbids
commercial use; Netlify Free allows it but pauses all sites at its 300-credit cap and may remove free sites. The
founder chooses: Vercel Pro ($20/mo) or Netlify Free after a staging deploy passes the e2e script.

---

## D13 — Final visual design is NOT decided (2026-11-01)

**Decision:** none yet, on purpose. The founder dislikes the new light demo-led design and asked for time. Next session
must ask: keep the new design, return to the previous dark design (`bada4e7`), or something else.

**Constraint whichever way:** the truth fixes, `src/lib/offer.ts`, the demos' disclosure rules and `tests/offer.test.ts`
stay. Only the visual layer may be swapped.

---

## D14 — Redesign v3 is the final design: Horeca-led motion, original identity (2026-11-10)

**Decision:** resolves D13. Neither the light teal design (`bdb59e8`) nor the previous dark one. The public site follows
`docs/spec/redesign-v3-motion.md`: the motion grammar of Horeca Social (https://horeca-social.com/en, Awwwards Honorable
Mention 2026-05-09), with PX PUSH's package focus and 1820 Productions' statement rhythm. The identity is SiteBlitz's own:
Antonio 600 + DM Sans, ivory #F8F5EE / ink #121A1D / vermilion #C43D15. Home = 10 scenes; demos lead with licensed
stand-in photographs. Headline "WEBSITES. FROM ₹7,999.", wipe word "VISIBLE.", hero = a textile-shop photograph.

**Why:** the owner rated the light design 1/10 and asked for an award-site reference with heavy scroll motion suited
to selling a service; 13 Awwwards 2026 sites were shortlisted, 8 captured live, and Horeca won with ChatGPT's agreement
(2 rounds, `docs/debate/2026-11-10-motion-reference/RESULT.md`): it sells a service, keeps its motion on phones, uses
no WebGL, and its stack (GSAP + CSS sticky, Lenis on desktop) matches ours. The owner approved with "go".

---

## D15 — Redesign v4 "showcase" replaces v3's look (2026-11-10)

**Decision:** supersedes D14's visual identity (its content and motion rules stay). The public site and the admin share
one dark brand: void #0A0A0C, ink #F5F5F0, volt #CCFF00; Mona Sans (wide, heavy) + Instrument Serif italic + DM Sans.
Main reference Lando Norris (Awwwards SOTY 2025), WebGL moment after Lusion (SOTY 2023), offer panels after Akaru
(SOTM Apr 2024), admin after Linear / Vercel Observability / visitors.now. Spec: `docs/spec/redesign-v4-showcase.md`.

**Why:** the owner rated v3 "not worth it": the site is SiteBlitz's portfolio piece and must impress like an award
agency's. Restraint read as ordinary twice (light teal 1/10, v3). Speed is protected by deferral and fallbacks
(static poster, low-power detection, reduced motion), not by dropping the effects.

---

## D16 — Choices made while building v4 (2026-11-10)

**Decision:** recorded here because the build had to pick them; all within the approved D15 spec.
- Hero headline "Websites people *remember.*"; the particles fly into the **showroom** concept (`/demo/showroom`), the
  one demo whose capture reads best as a phone. The static wordmark is the poster, so no-WebGL looks the same.
- The particle engine is plain WebGL 1 (no three.js, ~4 KB gz). It boots on the first pointer/touch/scroll/key or 2 s
  after load: lab TBT on `/` fell from 748 to 364 ms (mobile 4x CPU); LCP 1.28 s, CLS 0.001.
- `cobe` (MIT, ~7 KB) added for the admin Live globe. Visitors carry only country + city, so dots sit on a static
  centroid table (`src/lib/geo-centroids.ts`); no coordinates are collected.
- The footer credits only the three photographs the v4 home shows (the textile-shop hero photo left with v3).
- Leads board loads the first 25 leads per status; the list view keeps paging. List/Board is remembered per device.

**Why:** each is the lightest option that meets the spec; none adds a claim, a price or a data collection.

## D17 — Multi-page site and search work, built overnight (2026-11-11)

**Decision:** taken by Claude Code during the owner's 9-hour "build whatever you can; SEO must be extraordinary"
instruction, after four ChatGPT rounds (`docs/debate/2026-11-10-multipage-seo-ranking/RESULT.md`). Each is reversible.
- Navigation is real pages (Work, Services, Pricing, Process, Studio, Contact) from one registry (`src/lib/pages.ts`,
  `src/lib/routes.ts`); the home page keeps all ten v4 scenes and links each to its page. FAQ joins the phone menu.
- Brand entity: schema.org `Organization` (ProfessionalService is deprecated), region-only address, alternateName
  "Site Blitz" only (said visibly on /faq and /about). No misspellings are written anywhere; `sameAs` waits for real
  profiles.
- robots.txt names search and AI crawlers and **allows the training crawlers too** (GPTBot, ClaudeBot,
  Google-Extended, Applebot-Extended) for the widest AI visibility. ChatGPT advised separating training from search;
  the owner can remove those names in `src/app/robots.ts`.
- Prices: SEO & GEO (was "from Rs 9,999"), Care plans (Rs 2,499/month) and Project rescue (from Rs 17,999) now say
  "priced by written quote": none of those prices is in `offer.ts` (D11). Landing pages keep Rs 7,999 only within the
  Launch scope. Restore any of them only by adding it to `offer.ts`.
- Content truth pass on every service, industry page and guide (no 48-hour promise without ready-to-build, no client
  analytics dashboards, no ranking or Lighthouse-score promises, withdrawn Growth/Scale plans removed). Guide byline is
  "SiteBlitz Studio": the founder's name had appeared on six posts (content rule: it never appears).
- New original asset: the Gujarat business-listing website study (`/research/...` + Surat page), built from Overture Maps
  Places 2026-10-21.0, counts only, aggregates offered under **CC BY 4.0** with credit to SiteBlitz and Overture.
  Classes are named for what was measured ("low-reuse website URL", not "own website"); no business is named.
- One Roman-Hindi guide (`/blog/website-banane-ka-kharcha`) paired with the English cost guide via hreflang
  en / hi-Latn / hi. No templated city pages (doorway risk); no other language pages yet.
- Inner-page motion: CSS-only hero entrance (H1 lines rise in masks, transform only, drawn volt rule, CSS-drawn
  strokes), one or two moments per page, per-block scroll fades removed. Body font `display: optional` to stop swap
  reflow (lab CLS 0.17 -> 0.00 on the research pages). Preloader and curtain unchanged (D15).
- IndexNow key `public/1f93564764360cbcd2221f16935413ca.txt` (public by protocol); submission is the founder's step
  after the domain is live (`docs/SEO-LAUNCH-CHECKLIST.md`).

**Why:** the owner asked for multi-page, top search visibility and AI visibility without inventing anything; every
choice above either removes a false or inconsistent claim or adds content only the studio can publish truthfully.

## D18 — Fixes from the harsh performance / SEO / mobile audit (2026-11-11)

**Decision:** the owner approved all twelve fixes plus the security update ("Go for all, do not stop until everything is
completed") after the three-round audit in `docs/debate/2026-11-11-perf-seo-harsh-audit/RESULT.md`. This changes D15 in
one place: the full-screen first-visit preloader (0-100 count on a void sheet) is replaced by a 3 px volt line that sweeps
the top edge once. Everything else in D15 stays (palette, Mona Sans / Instrument Serif / DM Sans, particle hero, curtain).
- Next 15.5.20 -> 15.5.29 (2026-11-03 security release).
- Fonts self-hosted from `src/fonts/` (`scripts/fonts/build_fonts.py`): Mona Sans narrowed to 600-800 weight / 100-125 %
  width, DM Sans 400-600 with its optical-size axis, both with the rupee sign; two preloads, 101 KB instead of six files,
  214 KB, five preloads. Instrument Serif stays on next/font/google, no longer preloaded. Admin text set in Mona Sans at
  weight 400 (one quick-add input) now renders at 600, the lowest weight in the file.
- Below-the-fold sections and the footer use `content-visibility: auto`; sections holding measured or pinned scenes are
  excluded and Motion.tsx refreshes ScrollTrigger when real heights arrive.
- Footer links `prefetch={false}`; the hero phone capture loads at low priority.
- Accessibility: phone menu is a modal, skip link, scroll padding for the fixed header and WhatsApp pill, words-scrub
  readable (opacity 0.5 -> 1, no aria-label on a <p>), step numerals 3.5:1, guide body 16 px, nothing public under 12 px.
- Search: declared favicon set, in-content links to the hub pages, descriptive anchors, full legal descriptions, manifest
  copy from site.ts/offer.ts, and production builds require `NEXT_PUBLIC_SITE_URL` (docs/DEPLOY.md).
- Rejected while building: wrapping the page body in `<Suspense>` to split hydration. Next streamed the boundary into a
  hidden `<div>` swapped in by script, so without JavaScript the page body was invisible.

**Why:** each change removes a measured defect (see the audit's `results/`); none changes copy, prices or the look beyond
the preloader.

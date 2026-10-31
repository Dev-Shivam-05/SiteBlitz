Round 2 — Claude Code. I checked your round-1 points against the code. Verdicts first, then facts, then what I need.

## Verdicts

1. **Partly agreed.**
   - Agreed: qualify the delivery promise everywhere ("in as little as 48 hours" / "Launch plan"), and put the starting price in the hero sub-line as crawlable HTML.
   - **Rejected — keep the H1 "WEBSITES / THAT WIN / BUSINESS."** It is the owner's brand line, phrased as an aspiration rather than a quantified result, and hero v4 is completed, owner-prioritised work (`docs/spec/hero-v4.md`). The current sub-line already says "in as little as 48 hours" (`src/components/site/sections/Hero.tsx`).
   - Rejected for now: switching the primary CTA from "Start a project" (→ /contact) to "See plans & scope". There is no conversion data either way. A price link goes in the sub-line instead.
2. **Agreed, with one change.** Order: Hero → answers strip (replaces Stats) → Process → Services → concept-study gallery → Evidence (ProofStrip + grader + pricing link) → Pricing → FAQ → CTA. Manifesto merges into Process. Services gets compressed. Stats is replaced by a strip that answers price / time / ownership / measured speed, using only facts already in `site.ts` and the terms.
3. **Agreed.** The non-payment line stays in the FAQ only, where the owner wrote it, and is not promoted.
4. **Scene A agreed:** Process becomes the existing `[data-stack]` sticky card stack, which `Motion.tsx` already supports, so no engine change. Services then stops using the stack, so two stacks never run back to back.
   **Scene B rejected:** the pinned gallery stays as the labelled concept studies. Turning it into a second process storyboard would repeat Scene A, and the concept studies are the only "what it looks like" content.
5. **Agreed:** P0 metadata on /pricing, /services/business-websites and /services/landing-pages; cost-article title. New `/website-in-48-hours` built only from facts already published: the Launch plan features, "what you need to provide" (FAQ) and the 4 process steps.
   **Deferred:** `/website-designer-mumbai` — local presence is unverified and the page would be thin (doorway risk). Keyword volumes: "need data" accepted; the owner must connect Search Console.
6. **Agreed:** Organization + WebSite on home, BreadcrumbList on deep pages, BlogPosting on posts (to check), buyer-question FAQs. `llms.txt` was already corrected tonight. Your claims about Google dropping FAQ rich results and llms.txt having no ranking effect are noted as your citations; I cannot verify them offline.
7. **Agreed — and much of it already exists in code:** WebGL is off below 768 px and on low-power devices, off under reduced motion, boots on `requestIdleCallback`, pauses offscreen (IntersectionObserver), and caps DPR at 1.5 (`WebGLHero.tsx:142-267`). The H1 is server-rendered and visible before JS; GSAP `from()` animates it after hydration. Open risk: the first-visit Preloader curtain mounts after hydration, covers the hero, and its big brand text may become the LCP element. I am measuring lab LCP with CPU 4× and slow-4G throttling before changing anything.

## Facts you asked about

- The branch upstream is set: `v2-redesign` tracks `origin/v2-redesign`, pushed several times tonight. The `CLAUDE.md` line saying it has no upstream is stale and will be fixed.
- `/services/[slug]` pages already emit Service + Offer + FAQPage JSON-LD; `/for/[slug]` emits Service + FAQPage; home emits FAQPage + WebSite.

## What I need from you

1. Accept or reject my rejections (H1, primary CTA, Scene B, Mumbai page), one line each.
2. Exact copy for: the answers strip (4 cells: big value + label, using only price ₹7,999 / $99, "as little as 48 hours", "code, content & domain yours after full payment", "/proof live speed"), the Evidence section heading + 2-sentence intro, and the `/website-in-48-hours` page outline (H1, 5-7 H2s, meta title ≤ 60 chars, meta description ≤ 155 chars).
3. If the lab LCP comes back above 2.5 s because of the Preloader, would you remove the Preloader on first visit, or keep it only on desktop with the H1 painted underneath? One line, with the reason.

End with the list of points still open.

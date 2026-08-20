# Glossary — SiteBlitz

Terms that mean something specific in this codebase. Use these words, not synonyms.

| Term | Means |
|---|---|
| **Session** | One anonymous visit, keyed by the `sb_sid` cookie, 30-minute idle window. Mongo collection `Session`. |
| **Visitor** | A person across sessions, keyed by the `sb_vid` cookie, 1-year lifetime. Not a collection — a field (`visitorId`) on `Session`. |
| **Pageview** | One route view. Gets `duration`, `scrollDepth` and (initial load only) `vitals` attached by the `leave` beacon. |
| **Event** | A named interaction. Collection is `AnalyticsEvent`; the model file calls the type `EventDoc`. Named events come from `data-track="..."`; untagged link/button clicks are recorded as `click`. |
| **Leave beacon** | The `type:"leave"` POST fired on tab-hide or route change. Carries duration/scroll, and CWV once per page load. |
| **Lead** | A submitted enquiry. Has a `status` of exactly `new \| contacted \| qualified \| won \| lost` and a `score` 0–100 from `scoreLead()`. |
| **Score** (lead) | 0–100 heuristic: phone +25, email +15, big budget +20, long message +10, plan named +10, base 20. Not a probability. |
| **Grade** / **Grader run** | One audit of an *external* URL by `/tools/grader`. Stored as `GraderRun`. Unrelated to lead score. |
| **Finding** | One check inside a grade: `{ check, ok, note, weight, category }`, category ∈ `seo \| performance \| trust \| ux`. |
| **Proof** | Publicly shown, first-party, verifiable numbers on `/proof` and in `ProofStrip` — live visitors, 7-day counts, median real-user CWV, build time, commit. Never estimates. |
| **Capacity** | The `Setting` row with `key: "capacity"`, `{ slots, note }`. Set in the admin panel, read by `/api/proof`, shown in the Hero and ProofStrip. |
| **Experience layer** | The idle-deferred decoration bundle: `MotionProvider` + `Cursor` + `ScrollHUD`, mounted by `ExperienceLayer` inside a `QuietBoundary`. Decoration only — if it fails, the site must still work. |
| **Animation engine** | `useAnimEngine` in `Motion.tsx`. Scans `[data-anim]` and builds GSAP scenes. The only place GSAP is written. |
| **Deep service** | A `/services/[slug]` page driven by a `DeepService` JSON file. Distinct from the six short `SERVICES` blurbs in `site.ts`. |
| **Lander** | An `/for/[slug]` industry landing page from an `IndustryLander` JSON file. |
| **Volt** | The brand accent colour `#ccff00` (token `--color-volt`). The only bright colour on the site. |
| **Entrance** | The `<Shell entrance>` prop that plays the `Preloader` curtain. Home page only. |

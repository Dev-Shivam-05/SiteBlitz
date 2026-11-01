# HANDOFF — SiteBlitz — First-client programme (S0–AD) — 2026-11-01

## ⚠️ FIRST THING NEXT SESSION — ASK THE FOUNDER, DO NOT ASSUME
The founder **does not like the current (new, light) design** and needs time to decide. Before any other work, ask:

> "Which design should be final: (1) the new light demo-led design now on `v2-redesign` (`bdb59e8` onward), or
> (2) the previous dark design (state at `bada4e7`, before the redesign)? Or (3) something else?"

Wait for the answer. Do not release, restyle or revert anything until the founder decides.
**Trap if they choose the old design:** `bdb59e8` mixes the visual redesign with truth fixes and the offer config.
A plain `git revert bdb59e8` would bring back the fake Mumbai location, the dead email, the withdrawn $/₹14,999/₹24,999
prices and the "booked" wording. Restore only the visual layer (globals.css tokens, layout fonts, Navbar/Footer,
home sections), keep `src/lib/offer.ts`, `src/lib/site.ts` truth fixes, the demos and `tests/offer.test.ts` green.

## Done
- Three ChatGPT debates (business transformation, 7 rounds; ads + psychology + redesign, 4 rounds; ad campaign, 2 rounds), all in `docs/debate/2026-11-01-*` with `RESULT.md`.
- Grader can no longer be DNS-rebound to internal addresses: the connection is pinned to validated IPs (14 new tests, mutation-checked).
- The public site is light and demo-led. The home page has a phone switcher (salon / coaching / showroom), the 4-step process, pricing, an honest comparison, FAQs and a WhatsApp CTA.
- `/pricing` shows the full terms: inclusions, exclusions, renewals, payment stages, revisions and when the delivery clock starts.
- Three fictional, labelled, noindex demos at `/demo/salon|coaching|showroom`. Their enquiry is simulated, sends nothing and collects no data (verified by clicking through in the browser).
- Truth fixes:
  - "Gujarat-based" replaces Mumbai.
  - The dead `hello@siteblitz.in` is hidden (`SITE.emailLive=false`).
  - Booking is a "request", not "booked".
  - On database failure the WhatsApp fallback is a button the visitor taps.
  - Withdrawn prices are purged from every page and every JSON; `tests/offer.test.ts` blocks their return.
- Admin:
  - Today view (overdue / due / new / no-next-action, concepts 3 per week, ₹800 ad-spend ledger, alert status).
  - Phone-first Quick-add with duplicate warning and source codes SB-R1/SB-S1.
  - Lead search and inline edits that report failures.
  - Telegram new-lead alert with retry.
  - 08:00 IST brief at `/api/cron/brief` (CRON_SECRET).
- End-to-end against a throwaway local MongoDB: the lead is saved with an `SB-XXXX` ref and a +91 phone, shows in admin, the alert is recorded, plus quick-add, edits, ad spend and cron auth. 24/25 passed; the honeypot failure is fixed.
- Ad kit in `marketing/ads/`:
  - an 18 s Reel (1080×1920, original sound) and a 1080×1350 static, both rendered from real demo captures;
  - Gujarati/Hinglish copy, Ads Manager settings, spend rules and a release checklist.
- The code runs on Vercel or Netlify (`src/lib/geo.ts`, `netlify.toml`, `netlify/functions/daily-brief.mjs`).
- 178 tests pass and `npm run build` passes. Pushed `cf34032` to `origin/v2-redesign` (Preview only).

## Files changed
- `src/lib/offer.ts` — the single source of prices, payment splits, delivery terms and scope.
- `src/lib/site.ts` — truthful SITE (region, `emailLive`, reply hours), new nav, process and FAQs.
- `src/app/globals.css`, `src/app/layout.tsx` — light tokens (AA measured), Manrope, dark admin scope, demo themes.
- `src/app/page.tsx`, `src/components/site/sections/{Home,PricingPlans}.tsx`, `src/components/site/DemoSwitcher.tsx` — the new home.
- `src/app/pricing/page.tsx` — full terms page.
- `src/lib/demos.ts`, `src/components/demo/*`, `src/app/demo/[vertical]/page.tsx`, `public/demos/*.png` — concept demos.
- `src/components/site/{Navbar,Footer,LeadForm,BookingForm,Shell,ExperienceLayer}.tsx`, contact, legal and 48h pages, 16 content JSONs — truth fixes and the new chrome.
- Deleted: WebGL hero, preloader, marquees, cursor, scroll HUD, proof strip, old Pricing/Hero/Evidence/WorkGallery sections, ScopeCalculator.
- `src/lib/grader.ts` + `tests/grader-*.test.ts` — the DNS-rebinding fix.
- Admin/alerts: `src/lib/{phone,ref,leadops,today,leads,telegram,notify,todayData,brief,cron}.ts`, the today/quick-add/leads pages, the adspend/today/retry/cron routes, `models.ts`, `AdminShell.tsx`, `useApi.ts`.
- `src/lib/geo.ts`, `netlify.toml`, `netlify/functions/daily-brief.mjs` — host-neutral setup.
- `scripts/shoot.mjs` — `--dpr` and `--eval` flags.
- `marketing/ads/*` — ad sources, renderer and exports.
- `tests/{offer,geo,phone,ref,today,telegram,cron-brief}.test.ts`.

## Decisions made
- D10–D12 in `docs/DECISIONS.md`: founder facts (Navsari/Gujarat, no face or name, no GST, ₹1,000 ads, domain only), one offer config, host-neutral code.
- D13: the final design is undecided because the founder dislikes the current one (see the top of this file).
- Ad plan: Meta click-to-WhatsApp, ₹800 lifetime media cap, Gujarati-led hybrid hook "પહેલાં ડેમો જુઓ. 1-પેજ વેબસાઇટ ₹7,999થી.", Reel + static, codes SB-R1/SB-S1.
- Recommend a **.com with privacy protection** over .in, because .in requires Aadhaar KYC and bans WHOIS privacy, which would publish the founder's name. siteblitz.com is taken; siteblitzstudio.com looked free (RDAP 404).
- WhatsApp: convert the current number to the Business app (personal WhatsApp stops on that number; contacts can still message).

## Known broken / deliberately skipped
- **Production not released:** it still serves the 2026-07-10 build with the fake testimonials. Waiting on the founder's design decision and approval.
- **Founder dislikes the current design:** final design pending (top of file).
- Prices ₹7,999 / ₹17,999 and the payment splits are not yet explicitly approved by the founder.
- **Hosting not switched:** the founder must choose Netlify Free (needs a staging pass) or Vercel Pro ($20/mo). The Vercel Hobby commercial-use breach is still live.
- Not created yet, all needing founder logins:
  - domain;
  - Meta Page and Ads account;
  - WhatsApp Business;
  - Telegram bot (alerts show "failed: telegram_not_configured" until then).
- A1 individual admin accounts are not built. One shared env login remains, so don't give the collaborator access yet.
- No real-phone test yet; QA was headless Chrome only.
- The Preview deploy shares the production database (RISK R11) and has no admin env.

## Next session starts here
- Phase: ask the founder the design question above, then (depending on the answer) restyle or keep, then L1 release + accounts.
- First command: `git -C E:\Temp\SiteBlitz log --oneline -3` (then ask the design question before touching code)
- Watch out for: reverting `bdb59e8` wholesale would bring the false claims and old prices back. Restore the visuals only.

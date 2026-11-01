# Evidence: fresh checks by Claude Code, 2026-11-01 (IST morning)

Labels: VERIFIED = checked by command/code/live URL today. HYPOTHESIS = not yet tested.

## Live production (siteblitz.vercel.app)
- VERIFIED: `/api/proof` → `builtAt 2026-07-10T17:50Z`, commit `4ee3cc1`, i.e. NOT the corrected `v2-redesign` build.
- VERIFIED: live home HTML contains "Nikhil Verma" ×8, "Spice Route" ×4, "Most chosen" ×1 (withdrawn fabricated testimonial / case study / badge).
- VERIFIED traffic (first-party, from `/api/proof`): **5 visitors and 56 pageviews in the last 7 days**; daily sessions in Oct: 1, 4, 4, 7, 2, 1, then 53 on 2026-10-31 (agent testing; previews write to the production DB) and 3 on 11-01. Real-user vitals: 13 samples, LCP 936 ms, CLS 0.009, INP 172 ms. **The site has essentially no organic or paid traffic.**
- VERIFIED: `/proof` and the home "proof strip" publish these live numbers to visitors (e.g. "5 visitors this week").

## Domain and email
- VERIFIED: `siteblitz.in` → NXDOMAIN from the local resolver AND Google DNS (`dns.google/resolve`, Status 3, authority = .in registry). The domain is not registered/delegated. `hello@siteblitz.in` (published on /contact, footer, schema) cannot receive email.
- VERIFIED: no custom domain; the brand lives on `siteblitz.vercel.app`.

## Lead path (code)
- VERIFIED: `/api/leads` = zod validation + honeypot + rule-based score (`scoreLead`) → Mongo `Lead`. Needs phone or email.
- VERIFIED: on DB failure the form calls `window.open(wa.me…)` **after an awaited fetch** and then shows the success state (`LeadForm.tsx:82-87`). HYPOTHESIS: popup blockers (esp. iOS Safari) can block this, so the visitor sees "done" while nothing was sent. Needs a device test.
- VERIFIED: `/book` = day + slot picker; stored as lead text "Requested brief call: <day> at <slot> IST"; goal field "Booked brief call"; prefilled WhatsApp text says "I just booked a brief call". No calendar, no availability check, no confirmation message is sent by the system.
- VERIFIED: no notification of any kind on a new lead (no email/SMS/WhatsApp/Telegram/webhook code in `src/`).

## Admin (code)
- VERIFIED nav: Overview, Live, Visitors, Leads, Grader, Funnel, Pages, Campaigns, Audience, Activity: 8 of 10 are traffic analytics for a site with ~1 visitor/day.
- VERIFIED Leads: list of 25/page, filter by `new|contacted|qualified|won|lost`, status `<select>`, append note, tel/wa/mailto links. No search, owner, next-follow-up date, value, proposal, task, customer, project, payment.
- VERIFIED: status/note PATCH ignores the HTTP result (`admin/leads/page.tsx:63-74`); a failure is silent.
- VERIFIED auth: one account, `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars, plaintext compare, JWT cookie. No users collection, roles or audit log.

## Public UX (screenshots attached: home 1440 + 390, work 1440, pricing 1440, contact 390)
- OBSERVED: hero = huge "WEBSITES / THAT WIN / BUSINESS." on black with an acid-green WebGL smoke; looks like many dark "agency" templates.
- OBSERVED: `/work` heading "Work that works" directly above "They are concepts, not client projects"; cards are empty grey wireframes.
- OBSERVED: `/pricing` stacks two headers ("PRICING / Honest numbers, zero surprises" then "PRICING / Agency quality, without the agency invoice"); no price visible in the first desktop viewport.
- OBSERVED: `/contact` = 3-step brief + WhatsApp + email cards (the email card points at the dead domain).

## Content inventory
- VERIFIED: 6 service pages, 4 industry landers (restaurants, clinics, law firms, boutiques), 7 blog posts, `/website-in-48-hours`, `/tools/grader`.

## Unknown (founder only)
Team hours and skills, who delivers sites, budget, any real past work, legal entity/GST, domain ownership intent, India-only vs international.

## Model note
ChatGPT UI shows effort "Extra High"; the model name is not displayed in this UI, so GPT-6 cannot be confirmed by Claude.

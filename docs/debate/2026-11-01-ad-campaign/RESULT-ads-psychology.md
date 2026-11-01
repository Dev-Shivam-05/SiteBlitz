# Review - SiteBlitz ads, buyer psychology, redesign and AI-team scope - 2026-11-01 - 4 rounds - prompt: SiteBlitz_AI_CoFounder_Debate_Master_Prompt_v3.0.xml

This is a follow-up to `../2026-11-01-business-transformation/RESULT.md`, run after the founder's answers
(`founder-facts.md`). ChatGPT ran at "Extra High" in a temporary chat and reported itself as GPT-6 (not verifiable
in the UI). Inputs: the 5 reference diagrams plus Claude's reading of the 5 re-structure.ai articles (`references.md`).
Nothing was implemented, deployed, spent or sent.

Note: ChatGPT's round 4 says the pricing is "founder-approved". **It is not.** ₹17,999 for 3 pages and the payment
splits still need the founder's explicit go.

| # | Point | Proposed by | Evidence | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | ₹1,000 is an all-in experiment: **about ₹800 media lifetime budget + ₹144 GST + ₹56 buffer**. One Meta click-to-WhatsApp campaign over South Gujarat (Navsari/Surat/Valsad/Vapi), at least 7 days, using the native lifetime cap (manual tracking cannot enforce spend) | Claude r1, ChatGPT r1/r4 | Meta charges 18% GST on ads; daily budgets are averages | agreed | founder approves the ad + spend |
| 2 | First creative is the Hinglish ad "Business Websites ₹7,999 Se", with the pre-filled WhatsApp code SB-H1; Gujarati (SB-G1) is the alternative. The image is a real screenshot of a finished demo | ChatGPT r3 | `03_chatgpt.md` (d), with Meta policy self-check | agreed | founder approves |
| 3 | Offer: Launch ₹7,999 (1 page, about 2 working days) · Business ₹17,999 (3 pages, 7 working days from ready-to-build) · Custom by quote · no GST (unregistered) · payment ₹4,000+₹3,999 / ₹9,000+₹8,999 · no unlimited revisions | ChatGPT r1-r4, Claude r2 | the old ₹14,999 / 5-page offer was withdrawn on economics | agreed | **founder approves prices** |
| 4 | Risk reversal: the matching industry demo is shown first; a free personalised homepage concept only for qualified buyers, capped at 3 a week or 9 h. The public guarantee is "Review before you pay" (Option A); no "100% refund" or "guaranteed customers" | Claude r1, ChatGPT r1-r2 | `02_chatgpt.md` §8 | agreed | founder approves wording |
| 5 | Sales system: WhatsApp Business app (free); 3 qualifying questions (outcome, authority + budget, timing); scripts in EN / Hinglish / Gujarati; follow-ups on days 1/3/7 only with consent; 14 objection replies; 15-min internal response target 9-9 (not public until measured) | ChatGPT r2 | `02_chatgpt.md` §6-9 | agreed | ready for founder use |
| 6 | Truth: remove "Mumbai" from copy and schema → "Gujarat-based, serving businesses across India". No founder name or photo; the legal payee is disclosed in the quote before payment. Udyam only after an eligibility check | Claude r1/r2, ChatGPT r1-r4 | founder works from Navsari | agreed | founder picks "Navsari" vs "South Gujarat" |
| 7 | Redesign scope first: home (Hero A, light palette, live website switcher with no auto-cycling), pricing/terms page, demos at `/demo/salon` → `/coaching` → `/showroom` (noindex, labelled, simulations submit nothing). Removed: WebGL hero, marquees, preloader, outline type, MENU-only nav, public traffic counter. The site stays English; Gujarati/Hinglish in ads and chat | Claude r3, ChatGPT r3 | full copy in `03_chatgpt.md` (a)(c)(e) | agreed | founder approves design + copy |
| 8 | Hosting: Vercel Hobby is non-commercial, so **Netlify Free** (commercial use allowed), staging first. Budget 300 credits a month: 15 per production deploy, branch/preview deploys 0, 20/GB bandwidth; the site pauses at the cap | Claude r1, ChatGPT r2/r4 | Netlify free-plan announcement + credit docs | agreed | technical test pending |
| 9 | Email: the domain only gives forwarding, not sending as `hello@`. WhatsApp stays primary; a separate "Team SiteBlitz" Gmail handles email. `hello@` is not advertised as two-way until tested. Domain availability is checked at the registrar (NXDOMAIN is not proof it is free) | ChatGPT r4 corrected Claude | Cloudflare Email Routing docs; Gmail "Send mail as" | agreed | founder buys the domain |
| 10 | "AI marketing team" at ₹0: Claude Code is the brain in sessions. Planned build items: a canonical pricing/offer config (one source for site + scripts) plus `knowledge/` (voice, objections, banned claims, scripts); phone-first Quick-add lead form; a Telegram alert for web leads; and a daily 8:00 IST rule-based brief via a Netlify Scheduled Function | Claude r4, ChatGPT r4 | Netlify Scheduled Functions are on all plans (30 s limit) | agreed | build order below |
| 11 | Deferred: Meta Marketing API, LLM intent scoring, voice agents, paid tools, a 23-41 agent setup, a multilingual site, restyling the long-form pages | both | the references' own stack costs about $100-200 a month | agreed | backlog |

**Build order (Claude, phases of about 8 files, each tested and screenshotted):**
1. **Nov 2-3:** grader SSRF fix; truth fixes (Mumbai, claims, dead email, booking wording, WhatsApp fallback); Netlify staging.
2. **Nov 4-5:** light design system; home; pricing/terms; salon demo.
3. **Nov 6-7:** coaching demo; Quick-add lead form + web-lead Telegram alert.
4. **Nov 8:** full gate check (14-item release checklist in `04_chatgpt.md`).
5. **Nov 9-10:** founder-approved production cutover + domain; ad launch after a separate approval.
6. **Nov 11-15:** fixes from real conversations; showroom demo; morning brief.

The 7-day ad verdict lands around Nov 16-17.

## Recommended next steps (not started - waiting for your go)
1. Claude starts phase 1 (grader fix + truth fixes + Netlify staging) on `v2-redesign`. No production change.
2. Founder, Nov 2-3:
   - check and buy the domain;
   - set up WhatsApp Business (name SiteBlitz, greeting, away message, quick replies from `02_chatgpt.md`);
   - prepare the Meta ad account (no spend);
   - choose "Navsari" or "South Gujarat".
3. Founder approves prices/payment splits and the "Review before you pay" wording.

## Points still open (founder only)
- Price approval: ₹7,999 / ₹17,999 / quote, and the splits.
- Location wording: "Navsari, Gujarat" or "South Gujarat".
- Legal payee name, GST position and receipt format (accountant).
- Final ad creative, audience and the ₹800 media lifetime cap.
- Production release approval (Nov 8-9).

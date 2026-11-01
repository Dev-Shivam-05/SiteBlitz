# Claude Code: Round 3 verdicts, then Round 4 (final)

## Round 3 verdicts

**Agreed: FD-36 to FD-47.**
- **Live website switcher instead of the slider: agreed.** You are right that the slider implies Instagram is the
  problem.
- **Salon / coaching / showroom demos, salon first: agreed.** The demos are noindex, have no real-business data, and
  their simulations submit nothing.
- **Hinglish ad first: agreed.** Gujarati is the alternative.
- **Hero A and the full home and pricing copy: adopted** as the content spec, subject to the release conditions you
  listed.
- **Launch package "2 working days":** this matches the founder's own claim (48 h for one page once the project is
  fully in hand). I will keep it as the target, with the ready-to-build definition.

## Round 4: AI marketing team, infrastructure, and the 14-day launch plan (agenda 5 + 6)

**A. The reference "AI marketing team" scaled to the ₹0 tool budget.** Claude's position: *Claude Code is the
"Brain"* and works in sessions. The automations are rule-based and free. No LLM API costs, no voice agents.

| Reference layer | SiteBlitz version now | Cost |
|---|---|---|
| Knowledge layer | `knowledge/` in the repo: offer, pricing, objections, scripts (en/hi/gu), banned-claims, icp, demo-catalog, ad-creatives, brand-voice. Every Claude session and every copy change reads it, and it is the single source the site and scripts are generated from | ₹0 |
| Signals | Meta click-to-WhatsApp chats, the website WhatsApp CTA, the form, in-person visits | ad budget only |
| System of record | Admin lead register plus a phone-first **Quick-add lead** form: name, phone, business type, source code (SB-H1…), stage, next action, about 10 seconds per lead. WhatsApp Business app chats are copied in by hand; no WhatsApp API | ₹0 |
| Interrupts | Telegram bot: new web lead; ad spend logged ≥ ₹800; concept cap (3 per week) reached; daily list of follow-ups due | ₹0 |
| Morning brief | Daily 8:00 IST scheduled job sent to Telegram, rule-based: leads yesterday by source, leads with no next action, follow-ups due, concepts used this week, spend to date (entered by the founder), deposits | ₹0 |
| Ads API | Meta Marketing API insights read: **NOT now**. The founder enters spend in one admin field daily for a 7-14 day, ₹1,000 test. It is revisited if ads scale | ₹0 |
| Judgment / scoring model ("Jev") | **Not now.** At about 10-40 chats, the 3 qualifying questions plus a human are better | ₹0 |

**B. Infrastructure:**
- **Domain:** the founder buys `siteblitz.in` (NXDOMAIN, so likely available; check at purchase).
- **DNS:** pointed to Netlify.
- **Email with no mailbox:** free forwarding from `hello@siteblitz.in` to a **new, separate Gmail** used only for
  SiteBlitz, so replies don't expose the founder's personal name. Use registrar forwarding, or Cloudflare Email
  Routing if DNS sits on Cloudflare.
- **Anonymity vs payment:** the UPI payee name will show the founder's legal name at payment time. That is acceptable
  and legally necessary, and the quote states the payee. Disagree if you see a problem.
- **Hosting:** Netlify Free, staging first, with credits measured, production deploys deliberate, and a rollback
  plan. A scheduled daily brief is needed: check Netlify scheduled functions on the Free plan and their credit cost.
  The fallback is a GitHub Actions cron, which is free for public repos and within free minutes for private ones,
  calling a protected endpoint.

**C. 14-day plan (2-15 Nov), sized in Claude phases of about 8 files each:**

| Days | Claude | Founder |
|---|---|---|
| 1-2 | S0a grader IP-pinning + test. S0b truth: Mumbai removed (copy + schema), withdrawn claims, dead email, "Request a call" booking, explicit WhatsApp fallback. Netlify staging | Buy the domain; set up WhatsApp Business (name, greeting, away message, quick replies, labels); create the Meta ad account and payment method; decide Navsari vs South Gujarat; start in-person visits with the current demo |
| 3-5 | New light design system + home (Hero A, switcher) + pricing/terms page + `/demo/salon` | Approve the copy; 5-second test with 3-5 owners from the visits |
| 6-7 | `/demo/coaching` + `/demo/showroom`; `knowledge/` files; Quick-add lead + Telegram alerts | Use the demos in conversations; log every lead |
| 8-9 | Production cutover to Netlify + domain, gates verified; morning brief; ad creative from a real demo screenshot | Approve the release and the ad; launch the Hinglish ad: ₹1,000 lifetime cap, at least 7 days |
| 10-14 | Fix what the conversations reveal; restyle the remaining public pages in batches | Reply to chats within 15 min, 9-9; concepts (cap 3 per week); quotes; follow-ups |

Day 14 review: spend, chats, qualified, concepts, quotes, deposits, and loss reasons.

**Final round asks:**
1. Attack A, B and C.
2. Confirm or change the 14-day sequence, especially whether ads should wait until all 3 demos exist or launch
   once the salon demo plus home and pricing pass.
3. Give the final consolidated decision list from this debate (FD-17 onward, collapsed).
4. Write a **one-page founder action sheet** for this campaign.
5. State whether this follow-up debate is complete.

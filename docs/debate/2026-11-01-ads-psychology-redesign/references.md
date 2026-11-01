# Reference architecture: 5 re-structure.ai articles (read by Claude on 2026-11-01)

Articles: solo founder with a "team of 23"; a one-person AI marketing team in 3 steps; a 41-agent real-estate team; an
"AI marketing engine that sells like Amazon" (e-commerce); a VC-firm social media team.

All five share one skeleton:
1. **Signals:** where demand shows up.
   - F5Bot Reddit keyword alerts.
   - Apify scrapes of competitor comments.
   - Form submissions, DMs and comments.
   - Ad results and store data.
2. **System of record:** a CRM (HubSpot / Follow Up Boss / Affinity), a calendar (Cal.com / Calendly), payments
   (Stripe), and links with UTMs (Bitly).
3. **Owner input:** offer, pricing, guarantee, brand voice, budget, approvals.
4. **Brain:** Claude Code as "Marketing Director". It triages, routes, sets priorities and checks the work. "Jev" is a
   judgment model that scores buyer intent 0-100, with a reason. ElevenLabs provides voice.
5. **Knowledge layer:** markdown folders every agent reads:
   - `/offer` (product, pricing, objections);
   - `/customers` (ideal customer, buying signals, scoring rubric);
   - `/content` (hooks, winning ads);
   - `/voice` (brand voice, **banned claims**);
   - `/sales` (call script, qualifying questions, booking rules);
   - `/compliance` (consent, AI disclosure, platform rules);
   - `/reporting` (morning brief).
6. **Departments:** acquisition, creative studio, paid ads, lead conversion, organic publishing, research,
   retention/follow-up.
7. **Interrupts:** events that need a human, such as a big lead arriving, a caller asking for a person, ad spend
   hitting its limit, a risky claim, a bad review, or credits running low.
8. **Human handoff:** one Slack/Telegram approval queue. Nothing is published, sent or spent without approval.
9. **Morning brief:** a 6:30-7 AM scheduled job (n8n, then headless `claude -p`). It reports 3 numbers, what made
   money, today's calls, approvals waiting, and one suggestion.

**Speed-to-lead mechanics:**
- Form with a consent checkbox, then a CRM record, then an instant callback (voice agent within "60 s").
- 3 qualifying questions, then a booking link, with a text fallback.
- A tracked link per creative, so the source of every lead is known.

**Ads mechanics:**
- 10 hooks per ad, each under 9 words.
- A 3-5 day test with a hard daily cap.
- **Winners are chosen on revenue, not clicks.**

**Stated cost of the full stack:** about $100-200 a month plus ad spend (Claude Pro/Max, ElevenLabs, Twilio, Apify,
Higgsfield, n8n). Performance claims in the articles are vendor assertions with no measured results.

## Claude's initial worth-it read for SiteBlitz (tool budget ₹0)

- **Worth it now (free):**
  - A knowledge layer in the repo (`/knowledge/offer|objections|icp|voice|banned-claims|sales-scripts`), which also
    feeds every Claude session.
  - Telegram interrupts: new lead, lead unanswered after 30 min, ad spend near cap.
  - A daily morning brief as a rule-based Vercel cron (Hobby allows a daily cron).
  - A source tag per ad through pre-filled WhatsApp text.
- **Maybe:** Meta Marketing API insights read (free, own account, Limited tier), so admin shows spend vs leads.
- **Not now:**
  - voice agents, Twilio, ElevenLabs, Higgsfield, Apify, 23-41 agents;
  - LLM-based intent scoring, since leads number about 0, and it costs money and adds risk.

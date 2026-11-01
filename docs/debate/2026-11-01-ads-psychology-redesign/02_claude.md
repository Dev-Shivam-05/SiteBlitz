# Claude Code: Round 1 verdicts, then Round 2

## Round 1 verdicts

- **C1 (the ₹1,000 tax-inclusive experiment), FD-17: agreed.** Meta charges 18% GST on ads for Indian advertisers, so
  about ₹847 of the ₹1,000 is media.
- **C4 / FD-20: I withdraw ₹14,999 for 5 pages; agreed ₹17,999 for 3 pages.** No GST is added, so the net is higher
  than in the earlier model. The ladder is ₹7,999 / ₹17,999 / quote. The founder approves.
- **C3 / FD-19, capped concepts: agreed, with a different cap.** Show the labelled industry demo first; a personalised
  concept only after qualification.
  - I propose a cap of **3 a week**, not 2. With 50+ h a week and 2 builders, 3 concepts × 3 h is under 20% of
    capacity.
  - Re-measure after the first 3 concepts.
- **C6, diagnostic stop rules instead of day-based ones: agreed.** The hard cap is ₹1,000 all-in. Run at least 7 days.
- **C7 / FD-22, truthful location: agreed.**
- **FD-21: disagree because of timing.** The 15/15 conversation test takes weeks, while November's ad must run within
  November.

  My proposal: the ad addresses *local service businesses in South Gujarat* (Navsari / Surat / Valsad / Vapi). The first
  qualifying question records the business type, and in chat we send the vertical-matched demo. The ad itself then
  becomes a segment signal. If you still want one vertical, pick it now and justify it with something better than
  intuition (for example year-round demand: clinics vs seasonal coaching admissions).
- **FD-24, hosting (now on the critical path): proposed resolution.** Netlify's own announcement says its Free plan
  allows commercial projects ("deploy commercial projects", netlify.com blog "introducing-netlify-free-plan", read
  2026-11-01). The founder will not pay for anything except the domain.
  - So: migrate production from Vercel Hobby to Netlify Free.
  - Risks: the 2026 credit-based limits, Next 15 middleware running as an edge function, and `x-vercel-ip-*` geo
    headers disappearing, which degrades analytics geography.
  - The alternative is Vercel Pro at $20 a month, which the founder rejects. Cloudflare via OpenNext is a third
    option, but its sources conflict on the free Worker size limit.

  Please challenge this, or confirm it.
- **The trust gate before paid traffic: agreed.** Launch order: truth fixes + hosting migration + domain + one ad
  landing page/demo, then ads. Target: ads live by about 8-10 Nov, leaving about 3 weeks of November.

## Round 2: buyer psychology and the sales system (agenda 3)

The founder says selling is "our weakest part, we literally don't know how to sell". Write the actual sales system.
Claude's positions:

**P1. The buyer's mental model** (a South Gujarat small-business owner): "Is it worth the money? Will anyone even see
my site? I already have Instagram/JustDial. Will I get stuck with hidden renewals, or a domain held hostage? Can I trust
an online stranger? Is this complicated for me?"

**P2. Ethical levers only:**
- **Reciprocity:** the free industry demo, and a concept for qualified buyers.
- **Endowment:** their own business name and photos in the concept.
- **Risk reversal:** pay 50% only after approving the design. The guarantee wording is the founder's decision.
- **Proof of work instead of testimonials:** live demos, plus "test our own site's speed yourself on PageSpeed".
- **Liking / unity:** Gujarati and Hinglish, WhatsApp voice notes, "a South Gujarat studio".
- **Commitment ladder:** small yeses first.
- **Fluency:** one clear price per package.
- **Ownership:** domain and site in the client's name.
- **Scarcity only if true:** e.g. "we take N projects a month", if the founder confirms it.

Never: fake countdowns, fake "only 2 slots left", fake reviews.

**P3. Trust without the founder's face.**
- A consistent "Team SiteBlitz" identity.
- **Udyam (MSME) registration.** It is free; the founder must register. If done, "Udyam-registered" is a true, checkable
  signal.
- A written quote and a simple agreement PDF.
- UPI to a business name.
- Receipts for every payment.
- Response-time promises the founder can keep (the founder checks admin 2-3 times a day, but WhatsApp is on the phone
  all day).

**P4. Speed-to-lead with ₹0 tools.** WhatsApp Business app (free): greeting message, quick replies, labels (New /
Qualified / Concept / Quoted / Won / Lost) and catalogue with the 3 packages. Target: first human reply within 15 min,
9 am-9 pm. Every chat is copied into the admin lead register the same day, so the CRM stays the source of truth.

**P5. Please write these in full,** in Hinglish, Gujarati and English where it matters:
- (a) the greeting auto-reply;
- (b) the 3 qualifying questions (your outcome/authority/timing versions from Round 1);
- (c) the demo-send message;
- (d) the concept offer with its terms;
- (e) the quote message;
- (f) a follow-up cadence (I propose day 0/1/3/7, then stop), with each message;
- (g) an objection map of at least 10 objections with responses ("too costly", "I have Instagram", "my nephew makes
  websites", "send details, will think", "what if I don't like it", "who are you, where's your office", "will it come on
  Google", "monthly charges?", "need it cheaper", "need e-commerce");
- (h) the guarantee/refund wording options for the founder to pick from.

End with FD-25 onward and OPEN POINTS.

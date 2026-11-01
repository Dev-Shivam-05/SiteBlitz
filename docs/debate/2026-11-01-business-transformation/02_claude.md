# Claude Code: Round 1 verdicts, then Round 2

## Round 1: per-point verdicts

- **R01-R10 risk register: agreed.** One correction on R09: GPC/DNT handling exists on the corrected build, but
  production still runs the 2026-07-10 build. On production, the privacy page and the behaviour still disagree until the
  release ships. That makes R09 a P0 that the release closes, not a separate P1.
- **C1(a) "a tested preview is not a production candidate": agreed.** Release gate L1 must include:
  - the build ID from `/api/proof`;
  - a scan of the rendered HTML for withdrawn claims;
  - a real form submission;
  - the rollback command, recorded.

  One constraint: preview and production share one database (R11), so a preview form test writes a lead into production.
  Proposed: tag every test lead `test:true`, or set `MONGODB_DB=siteblitz_preview` on Preview first. This is a founder
  action in Vercel.
- **C1(d) commitments: agreed.** "Indexing guaranteed" is removed regardless. I accept your four replacement wordings.
- **C2 design is not cosmetic: agreed.** Round 3 must compare substantially different directions, not re-tune the dark
  theme.
- **Grader as the core of acquisition: agreed, it needs evidence first** (D-008). Validation: 15 public sites, grader vs
  manual review, false-positive rate recorded.
- **D-001 to D-011: agreed as PROPOSED**, all pending founder approval.

**Your evidence requests:**
1. Deployed commit: `/api/proof` reports `4ee3cc1`, built 2026-07-10, so production is NOT the corrected build. VERIFIED today.
2. Lead and booking flows under failure: cannot be run until a non-production database exists (see above). The test plan
   is accepted as written.
3. Domain: NXDOMAIN on Google DNS, with the `.in` registry answering authoritatively. VERIFIED. There is nothing to
   test for deliverability until a domain exists.
4. Labour per package: see the planning estimate below.

## Round 2: market, offer, pricing, first three sales

Answer Q2.1-2.4. Claude's positions for you to attack:

**C5. Labour per package (PLANNING ESTIMATE).** This assumes a reusable design system and the founder building alone.
It needs the founder's real numbers.

| Package | Brief + content | Build | Revisions | Launch (domain, SEO, GBP) | Comms | Total |
|---|---|---|---|---|---|---|
| Launch, 1 page | 2-3 h | 4-6 h | 1-2 h | 1-2 h | 1-2 h | **9-15 h** |
| Growth, ≤5 pages | 4-6 h | 12-18 h | 3-6 h | 2-3 h | 3-4 h | **24-37 h** |
| Scale, ≤10 pages + integrations | 6-10 h | 30-50 h | 6-10 h | 3-4 h | 5-8 h | **50-82 h** |

- At ₹7,999 that is about ₹530-890 per hour gross, before GST (if registered, and if the price includes GST, net is
  ₹6,779), gateway fees (~2%, verify) and hosting.
- Scale at ₹24,999 is about ₹300-500 per hour: the worst ratio, and the most delivery risk.
- "Unlimited revisions (fair use)" on Scale is an open-ended liability.

**C6. Hosting is an unpriced cost and a compliance issue.** Vercel's Hobby plan is for non-commercial use (verify the
current terms). Client sites need a commercial host, a hosting account owned by the client, or a care plan that covers
hosting. None of the three plans says who owns or pays for hosting and the domain after launch.

**C7. Primary ICP hypothesis.** Appointment- or enquiry-driven local service businesses within the founder's physical
reach, for example clinics (dental, physio, skin), coaching and tuition centres, and salons.
- *Why:* one new patient or student is worth a lot relative to the price, so the ROI is easy to explain. Their Google
  listing shows publicly whether they have a website. They already run on WhatsApp. The founder can visit them in person.
- *Deprioritise restaurants:* they rely on Zomato/Swiggy, and their willingness to pay for a site is low.
- *Deprioritise law firms:* Bar Council of India rules restrict advocates' advertising and solicitation, which limits
  "conversion" websites. Verify the current BCI rule text.

**C8. Backup ICP.** White-label delivery for small Indian digital-marketing agencies and freelance marketers who sell
websites but lack builders. They have demand, repeat volume, and judge on samples rather than client case studies.
- *Risk:* low price per site, and SiteBlitz's own brand gains no proof.

**C9. Offer shape.** Retire the three-equal-plans grid as the lead. Lead instead with one vertical wedge offer, for
example "a clinic website that books appointments, live in 7 days", with:
- a fixed scope and a clear start condition (content received);
- a recurring care plan from day one (hosting, monthly edits, Google Business Profile upkeep). Hosting has to be handled
  anyway, and recurring revenue matters more than build revenue.

Keep a cheaper one-page entry option, but don't make it the headline. All prices are PROPOSED for testing; nothing new
is published without the founder.

**C10. First three customers.**
1. Build 2 real, functional demo sites for the chosen vertical, labelled as concepts, so there is something to inspect.
2. Offer 1-2 disclosed pilot projects at a reduced price in exchange for permission to publish a case study.
3. Source 30 businesses in one locality from Google Maps by hand. Check Places API terms before any automation.
4. First contact is an in-person visit or a phone call with a one-page audit printed or shown on a phone. Cold WhatsApp
   blasts are not allowed: WhatsApp Business Platform rules require opt-in for business-initiated messages.
5. After a "yes": a 20-minute discovery call, a same-day written quote, 50% advance via a UPI/payment link, then content
   intake.

End with the D-log and OPEN POINTS. Where you rely on a price, rule or term, give the source URL and date.

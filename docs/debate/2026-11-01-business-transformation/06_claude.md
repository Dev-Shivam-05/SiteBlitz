# Claude Code: Round 5 verdicts, then Round 6

## Round 5: per-point verdicts

- **Google Ads API correction: agreed, and verified.** Google's API policy and developer-token pages confirm that
  developer tokens were sunset on 2026-09-09, and access levels now attach to the Cloud project. Third-party coverage
  reports an AUTHORIZATION_ERROR issue for some projects after upgrade; this is noted as an integration risk. D-058 is
  agreed.
- **Meta correction: agreed, and verified.** Meta's 2026-05-04 blog confirms "Marketing API Access Tier", with the
  changelog labelling the tiers Limited (formerly Standard) and Full (formerly Advanced). The `ads_api_access_tier`
  header still reports the old values. D-059 is agreed.
- **S-1 is P0: agreed, and verified reachable.** the production page `/tools/grader` returns 200, and
  `POST /api/grade` answers (422 on empty input). The fix:
  - pin the outbound connection to the validated IP;
  - add a test that simulates a resolver returning a public then a private address;
  - ship it in the S0 release.

  Severity context, a REASONED estimate: Vercel functions run without a classic instance-metadata endpoint, so the
  impact is lower than on a VM, but it is still a P0 by policy.
- **Opportunity separate from Quote, multiple payments, direct leads: agreed** (D-055).
- **Atlas Flex instead of M10: agreed** (D-062). The current tier is UNKNOWN until the founder checks Atlas.
- **The CRM effort you asked for (PLANNING ESTIMATE):**

  | Item | Claude implementation | Founder review |
  |---|---|---|
  | A2 alerts + reconciliation | 4-6 h | 0.5 h |
  | A3a + A3b leads/Today/history | 8-12 h | 1 h |
  | A1 two hashed accounts + roles + critical audit events | 6-10 h | 0.5 h |
  | A4 prospect register | 4-6 h | 0.5 h |

  **Total:** ~22-34 h of implementation, but only ~2.5 h of founder time.

  The ₹500/h comparison overstates the build cost, because the scarce resource is founder hours, not
  implementation hours.

  **HubSpot free (counter-case):** 3-5 h of setup, plus wiring the existing form into it, and its mobile app gives
  push notifications for free. Honest conclusion: HubSpot is a valid fallback if A2 slips past one session.
- **Disputed points are now resolved:** S-1 is P0. Pre-sale CRM is limited to S0 + A2 + A3a; A1 ships before the
  collaborator gets access; A3b and A4 follow.

## Round 6: adversarial stress test and 90-day pre-mortem

Answer Q6.1-6.4. Attack both of our plans. Claude's opening pre-mortem:

**C25. "Day 90, zero customers": the five likeliest causes, with the earliest warning sign for each:**
1. **Building replaced selling.** S0 through A4, the redesign and the demo absorb the 90 days. This is exactly how the
   last session failed. *Warning:* by day 14, fewer than 10 real owner conversations have happened.
2. **The buyer doesn't think they need a website.** Coaching institutes may run on referrals, Instagram and
   directories; clinics may run on Practo-type platforms and Google Maps. Those are substitutes, not empty space.
   *Warning:* fewer than 1 in 10 conversations ends qualified, or objections cluster around "we get patients/students
   from X".
3. **The proof gap persists.** Owners still ask "who else have you done this for?" and nobody takes a disclosed pilot.
   *Warning:* proof-type objections dominate the log by conversation 10.
4. **Price vs freelancers.** ₹17,999 loses to ₹4-7k offers, and the "reliability" story doesn't land. *Warning:*
   quotes are declined on price, with no counter-offer.
5. **Founder capacity.** Hours are unknown and possibly part-time. Content collection stalls and the 7-day promise
   slips on the first job. *Warning:* "content received" is later than 5 days after payment.

There is also a standing risk: P0 is not shipped, the fabricated claims stay live, and a prospect who checks the site
finds them.

**C26. Where we are being optimistic:**
- 30 prospects split 15/15 is too small to tell two segments apart; expect noise.
- "Founder can visit businesses" is unverified.
- The 14-22 h delivery estimate is a guess.
- A simulated demo may not persuade a sceptical owner at all.
- Telegram alerts assume the founder answers within hours.
- The design work will expand.

**C27. Proposed cuts and safeguards:**
- **Time-box building:** S0 + A2 + A3a + the demo + one landing template, about 2 weeks. Founder conversations
  start in week 1 in parallel, without waiting for the redesign. A printed or phone-shown audit is enough.
- **Pivot triggers** (planning thresholds to challenge):
  - **Day 30:** fewer than 5 qualified conversations from 30 prospects. Change the segment or channel, not the website.
  - **Day 60:** five or more quotes and 0 accepted. Change price, proof or offer (for example, a smaller paid pilot).
  - **Day 90:** 0 paid. Test the white-label agency route (D-016) or a productised fixed-price "website rescue" for
    businesses that already have a broken site.
- **Backlog, not deleted:** ad command center, lead-discovery automation, the full redesign of long-form pages, and
  the Hindi/regional variants.

Also run Q6.3's failure simulations: give each one a detection signal, an automatic safeguard and a human recovery step.
End with a revised priority order, the D-log and OPEN POINTS.

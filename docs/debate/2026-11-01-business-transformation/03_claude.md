# Claude Code: Round 2 verdicts, then Round 3

## Round 2: per-point verdicts

- **Unit-economics table: agreed.** I re-checked the arithmetic: ₹7,999 / 1.18 = ₹6,779, and 2% + 18% GST on the
  2% = ₹189. Scale gets restructured into a quotation (D-014 agreed).
- **D-015, coaching vs clinics: agreed as a two-arm test, so it is no longer disputed.** Split the first prospect
  sample 15/15. Choose the primary ICP by qualified conversations and payments, not by replies.
- **D-018, care plan optional and capped: agreed.** I withdraw "care from day one" as a bundle; the plan is offered on
  every quote but not required.
- **D-017, ₹17,999 three-page enquiry site: agreed as a test price**, provided a reusable vertical template exists.
  Claude's estimate is a one-time 25-40 h to build the coaching template and demo, then 14-22 h per client only if the
  client supplies content. Content collection is the biggest schedule risk, so the 7-day clock starts at "content
  received".
- **Google Maps terms: agreed.** Maps may be used only to *discover* names. Every stored field comes from the business's
  own site or an allowed directory, with source URL and date.
- **TRAI and calls: agreed.** First contact is in person, by warm introduction, or by email to an address the business
  publishes on its own site for enquiries. Any phone campaign goes through a compliance check first.
- **Hosting (D-012):** `siteblitz` sits in a personal Vercel scope. The plan tier is not visible from the CLI, so it is
  UNKNOWN; the founder must confirm Hobby or Pro. If it is Hobby, the studio's own commercial site is also at risk, not
  only client sites. Client default: a hosting account the client owns.
- **D-012 to D-022: agreed as PROPOSED**, all pending founder approval.

## Round 3: brand, public UI/UX, conversion

Answer Q3.1-3.4. The screenshots are in Round 1. Claude's positions:

**C11. Critique.** The current site is designed to impress other designers (WebGL smoke, outline type, marquees,
"MENU" hamburger on desktop, italic accent words). The buyer is a coaching-institute or clinic owner on a phone. The
owner's question is "will *my* site look professional and bring enquiries, what does it cost, can I trust you?" The site
answers none of these in the first two screens. A studio's own site is its main product sample, and this sample does not
look like what the ICP would buy.

**C12. Three directions** (ChatGPT: add yours, then pick one):
- **A. "See it working" (demo-led).** Light, calm, mobile-first. The hero is a phone-frame of the live concept
  institute site. In a sandbox clearly labelled as a demo, the visitor submits a test enquiry and watches the owner alert
  arrive.
  - *Pros:* proves the one thing being sold.
  - *Cons:* build cost, and it must never look like a client site.
- **B. "Your accountable local studio" (founder-led).** The founder's name, face and city, a fixed-scope quote, an
  ownership guarantee and the real process. Editorial type, real photographs.
  - *Pros:* local trust.
  - *Cons:* needs the founder to be public, and scales less well.
- **C. "Productised offer" (pricing-first).** One offer page, like a SaaS product page: a checklist of what is included,
  a comparison with Wix, a freelancer and an agency, and a FAQ.
  - *Pros:* clarity.
  - *Cons:* invites a pure price comparison.

Claude recommends **A + B**: demo-led proof with founder accountability, a light theme, and the WebGL hero, marquees,
preloader and the 6-item nav removed. The final choice of brand direction is the founder's.

**C13. Sequence.** Do not redesign all ~30 pages first.
1. One outreach landing page, `/for/coaching-institutes`, plus the live concept demo. These are the assets the founder
   shows in person.
2. Then the home page, pricing and contact.
3. Long-form pages are restyled last.

**C14. Booking semantics.**
- Rename to "Request a call". The confirmation screen shows a reference number and "we will confirm by <channel>
  within <published working hours>". The founder sets the hours.
- Also send an email receipt to the visitor if they gave an email.
- A real calendar (Google Calendar appointment schedule or Cal.com) is NEXT, not NOW.

**C15. Acceptance tests (proposed).**
- **Comprehension:** a 5-second test with 5 target owners. Can they say what is sold, to whom, and the price?
- **Mobile:** at 360 px, the offer, the price and the primary CTA are all visible within the first 2 screens.
- **Usability:** the enquiry form can be completed in 60 s or less, works by keyboard only, meets WCAG 2.2 AA contrast,
  and shows a visible error and recovery path on failure.
- **Performance:** field p75 LCP ≤ 2.5 s and INP ≤ 200 ms.
- **Admin:** every action shows success or failure; one "Today" view lists new leads and overdue follow-ups; no admin
  page exists without an action on it.

Please give concrete hero copy for your recommended direction (English; also say whether a Hindi/Hinglish variant
matters for this ICP). Name 3-5 public reference sites by URL, saying what to learn from each and what not to copy.
End with the D-log and OPEN POINTS.

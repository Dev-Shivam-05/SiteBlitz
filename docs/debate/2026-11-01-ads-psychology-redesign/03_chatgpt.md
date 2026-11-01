# SiteBlitz × Claude Code — Round 3

November 1, 2026 · Total redesign, buyer psychology, website copy and November advertising

## Executive decision

AGREE with Claude's central insight: In the planned Meta click-to-WhatsApp campaign, the website is primarily a trust validator, a product demonstration, and a source of transparent commercial terms—not the initial advertising landing page.

That changes the implementation priority.

PROPOSED NOVEMBER CUSTOMER JOURNEY

Meta ad

Clear offer and starting price

WhatsApp

Real conversation and qualification

Working demo

See an example of the finished product

SiteBlitz website

Verify pricing, identity and terms

Approved scope → ₹9,000 deposit → Build → ₹8,999 final payment

My recommendation: Redesign the home page, pricing/terms page and three demos first. Preserve functioning secondary pages until the core journey passes testing. A visually attractive site that still cannot establish trust or explain ownership will not solve SiteBlitz's sales problem.

## R1. Defining “extraordinary”

AGREE, WITH MEASUREMENT CORRECTIONS

Claude's proposed criteria are sensible. I would refine them as follows.

| Test                      | Acceptance criterion                                                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Five-second comprehension | At least 4 of 5 independent business owners can explain the service, intended customer and starting price                               |
| Mobile first screen       | At 360px width and a defined 360×640 viewport, the offer, starting price and primary WhatsApp CTA appear without scrolling              |
| Demo usability            | An unfamiliar buyer can complete the simulated enquiry flow without guidance                                                            |
| Real mobile speed         | Aim for 75th-percentile field LCP ≤2.5 seconds                                                                                          |
| Responsiveness            | Test 320px, 360px, 390px, tablet and 1440px                                                                                             |
| Accessibility             | Keyboard-operable controls, visible focus, sufficient contrast, reduced-motion support                                                  |
| Visual quality            | Compare blind preference and comprehension against three actual competitor examples, without assuming aesthetic preference equals sales |
| Commercial clarity        | No contradictory prices, false proof, vague refund rights or hidden renewals                                                            |

Correction: Field LCP cannot be established simply by passing Lighthouse or throttling a test browser to 4G. Google's 2.5-second threshold applies to the 75th percentile of real page loads; the other Core Web Vitals include INP ≤200 ms and CLS ≤0.1. At launch, use repeatable mobile lab testing and collect real-user measurements. Report field performance only when sufficient data exists.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev+1



The five-person comprehension test is an initial usability gate, not proof of statistically superior conversion.

I also require that clicking the primary WhatsApp CTA opens the correct business conversation on a real Android phone, with a tested fallback if the app is unavailable.

## R2. Psychology-led homepage order

AGREE

I endorse Claude's seven-section sequence with two modifications.

First, the strongest reassurance—review a concept before deciding whether to purchase—belongs in the hero and again in the four-step explanation.

Second, the comparison must explicitly explain that a website complements Instagram, Justdial and other discovery channels. We should not imply that a website alone generates traffic.

I approve removing WebGL smoke, marquees, preloaders, outline typography, the desktop MENU-only navigation and the prominent public traffic counter. Retain `/proof` only if its technical information is accurate, contextualized and useful. It should not function as a substitute for client results.

## R3. Signature interaction

DISAGREE WITH THE SLIDER AS THE PRIMARY INTERACTION

Claude proposes an Instagram-only versus website before/after slider. It is technically achievable, but commercially weaker than it first appears.

The buyer does not need to abandon Instagram. An artificial before/after could imply that Instagram is inherently a problem, whereas SiteBlitz's actual proposition is an additional, owned business destination.

### Preferred interaction: The live website switcher

One phone. Three business types. Three working demos.

SalonCoachingShowroom

9:41

ILLUSTRATIVE CONCEPT

Sample Salon

### A simpler way to explore services

Services · Enquiry · Visit information

Try an appointment request

Visual preview only · No form submitted

Explore this demo specificationIllustration of the proposed interface. This is not a deployed SiteBlitz page; the final site must link to its actual working demos.

This interaction exposes the real product rather than merely decorating the page. On the production homepage, choosing a business type should update the preview and provide a real link to that demo.

No automatic cycling. No heavy animation framework. No pretend enquiry submission.

If Claude strongly prefers a comparison slider, it can remain an optional secondary enhancement, clearly labeled as an illustration, keyboard-accessible and without suggesting guaranteed business improvement.

## R4. Visual system

AGREE WITH THE PALETTE

Canvas

\#FAF9F5

Ink

\#182B36

Teal

\#006B60

Muted

\#58656D

Use `#E7B877` only as a decorative fill or accent where text contrast remains adequate.

My design direction is confident, warm, professional and product-led. It should look like a skilled design studio, not a crypto landing page, AI dashboard or anonymous template seller.

For the initial launch, I favor one well-chosen variable sans-serif family with distinct weights over loading two separate families. If Claude can demonstrate that a two-family combination substantially improves the design without affecting performance, it is acceptable.

Use real-looking website demonstrations, restrained spacing, consistent rounded cards, high-quality licensed imagery and clear typographic hierarchy. Never use fabricated client photographs or testimonials to make the site feel established.

## R5. Select three demo verticals

AGREE WITH THREE, BUT CHANGE THE INITIAL MIX

I recommend:

| Rank | Demo vertical              | Core customer action         | Why it belongs                                                                         |
| ---- | -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| 1    | Salon / beauty studio      | Appointment enquiry          | Visually compelling, simple service information, understandable conversion path        |
| 2    | Coaching / tuition classes | Admission or batch enquiry   | Clear course, location and enquiry needs; also supports earlier ICP research           |
| 3    | Local retail / showroom    | Product or catalogue enquiry | Demonstrates a site useful alongside WhatsApp and social media without full e-commerce |

These are product-design hypotheses, not verified findings that these three sectors have the highest willingness to pay in South Gujarat.

Salons offer a relatively simple demonstration with clear customer actions and year-round service needs. Coaching has potentially meaningful admission cycles, but timing varies. Showrooms demonstrate catalogue-based enquiries without the complications of online checkout.

I would defer clinics until health-content accuracy, privacy and regulated advertising considerations have been addressed. Real estate introduces property-data and advertising-category complexity. Restaurants remain a strong fourth demo candidate, particularly for menu and location discovery.

Selected first demo: `/demo/salon`.

## R6. Language strategy

AGREE — ENGLISH WEBSITE FIRST

Use plain, accessible English on the site, with Gujarati and Hinglish in advertising and WhatsApp conversations.

The cost of three full website languages is not just translating words. Every page, price, disclaimer, demo, error state and contract-related statement must stay consistent.

A Gujarati website version becomes justified if actual customer conversations show people struggling with the English site or explicitly requesting a Gujarati version.

For November, the site must communicate clearly on a phone. It does not need to become a multilingual content-management project.

## (a) Full homepage copy — ready for Claude to implement

The following is the proposed replacement content for the seven-section homepage. It avoids fabricated customer results and does not imply that a concept demo is a completed client project.

# SiteBlitz — Homepage Copy v1

## Navigation

**SiteBlitz**

Live Demos | How It Works | Pricing | FAQs

**CTA: Chat on WhatsApp**

---

## SECTION 1 — HERO

*Gujarat-based website studio · Serving businesses across India*

# Websites that help customers understand your business — and get in touch.

Professional, mobile-friendly websites for local service businesses.

See working website demos, know the price upfront, and explore a homepage concept tailored to your business if your project qualifies.

**One-page website: ₹7,999**

**Three-page website: ₹17,999**

Custom projects quoted separately.

*One-time website build prices. Domain, hosting and renewal costs are disclosed separately where applicable.*

**Primary CTA: Chat on WhatsApp**

**Secondary CTA: Explore Working Demos**

No invented client reviews. No guaranteed rankings. Just real demonstrations and a clear process.

---

## SECTION 2 — SEE IT WORKING

# Don't just imagine your website. Explore one.

We've created interactive concept websites to demonstrate the design and customer experience SiteBlitz can build.

These are sample projects, not websites commissioned by paying clients.

### Demo 1 — Salon & Beauty

**Help customers explore services and request an appointment.**

Showcase treatments, explain services, provide contact information and offer a straightforward appointment-enquiry journey.

**CTA: Explore Salon Demo**

### Demo 2 — Coaching & Tuition

**Make it easier for families to find the right class.**

Present courses, batches, teaching information, location and admission-enquiry options in one clear website.

**CTA: Explore Coaching Demo**

### Demo 3 — Retail & Showroom

**Give customers a useful catalogue before they visit or enquire.**

Organize collections, product information and business details with a direct route to WhatsApp enquiries.

**CTA: Explore Showroom Demo**

*All three are illustrative SiteBlitz concept demonstrations. Their businesses, content and enquiry examples are not real client results.*

---

## SECTION 3 — HOW IT WORKS

# A clear process, before any payment.

### 01 — Tell us what you need

Start a WhatsApp conversation. We'll ask about your business, what customers should be able to do on your website, and when you want to launch.

**No complicated technical brief required.**

### 02 — See the design direction

Explore a working industry demo.

For suitable projects, we'll prepare one personalized homepage concept using your approved business details and images.

**Review the concept free of charge, with no obligation to buy.**

### 03 — Approve the scope and price

If the direction is right, we'll agree on the pages, features, content, timeline, ownership and any future costs in writing.

You approve the agreement before the first project payment.

### 04 — Build, review and launch

We build the agreed website, share a staging version, complete the included revision round and arrange final payment and handover.

For the Business package, the delivery target is seven working days after the project is ready to build, subject to the agreed schedule.

**CTA: Discuss Your Website**

---

## SECTION 4 — PRICING

# Clear pricing. Work agreed in writing.

### Launch — ₹7,999

**One focused page for a professional business presence.**

- One responsive page
- Services and business information
- WhatsApp and contact options
- Basic technical SEO setup
- One consolidated revision round

**CTA: Ask About Launch**

### Business — ₹17,999

**Three pages for businesses that need more room to explain their services.**

- Three agreed pages
- Mobile-responsive design
- Service information and enquiry journey
- Basic technical SEO setup
- One consolidated revision round
- Seven-working-day delivery target after content readiness

**CTA: Discuss Business Package**

### Custom — By quotation

**For projects that need more than a standard website.**

E-commerce, larger catalogues, advanced booking requirements, additional pages and integrations are quoted according to the agreed scope.

**CTA: Request a Custom Quote**

*Prices cover the specified website build. Domain registration, hosting, renewals, optional maintenance and out-of-scope work are explained before payment.*

**Text link: Compare Packages and Ownership Terms**

---

## SECTION 5 — WHY WORK WITH SITEBLITZ?

# Different ways to build a website. Choose what fits.

A website builder can be appropriate if you want to do the design and setup yourself.

A freelancer may be a good choice if their process, availability and support suit your needs.

SiteBlitz offers a defined website-building service with working demos, a written scope, a clear price and a review process.

| What matters          | DIY website builder         | Independent freelancer | SiteBlitz                             |
| --------------------- | --------------------------- | ---------------------- | ------------------------------------- |
| Who builds it?        | You                         | Depends on agreement   | SiteBlitz team                        |
| Scope and timeline    | You manage them             | Agreed individually    | Defined before payment                |
| Domain ownership      | Depends on your setup       | Must be agreed         | Client-owned registration recommended |
| Changes and revisions | You make changes            | Depends on agreement   | Included revision defined in scope    |
| Ongoing costs         | Platform and domain charges | Depends on arrangement | Disclosed before purchase             |
| Support               | Depends on platform plan    | Depends on agreement   | Defined in project terms              |

**We don't claim that every business needs SiteBlitz.**

Choose the approach that suits your budget, time and level of involvement.

---

## SECTION 6 — QUESTIONS PEOPLE ASK

### Is the personalized homepage concept really free?

For qualified projects, yes. You may review one initial homepage concept without paying or agreeing to purchase. It is a design preview, not a finished website, and is subject to available capacity.

### What if I don't like the concept?

You can decide not to proceed without paying for that free concept. Once a paid project starts, revisions and cancellation rights follow the written agreement and applicable law.

### Can I continue using Instagram?

Absolutely. Your website can complement Instagram, WhatsApp and other discovery channels by keeping important business information and enquiry options together.

### Will my website bring more customers?

A website can support your marketing and make it easier for visitors to enquire. Results depend on demand, promotion, competition and other factors. We don't guarantee leads or sales.

### Will my website show up on Google?

We implement the agreed technical SEO fundamentals and support relevant search-engine submission. Google controls indexing and ranking, so neither can be guaranteed.

### Are there monthly charges?

The website build is a one-time project fee. Domains, hosting and optional ongoing services may have separate costs. We'll disclose what's included and any known renewal charges in the quotation.

### Who owns my domain and website?

We recommend that you register the domain in your own account. The agreement specifies website deliverables, access, intellectual-property rights and any third-party software licenses.

### How quickly can you deliver?

Timelines depend on package scope and when the required content and approvals are complete. The Business package targets seven working days from the agreed ready-to-build date.

### Where is SiteBlitz based?

We're based in South Gujarat and serve businesses remotely across India.

### Can I talk to someone before deciding?

Yes. Send us a WhatsApp message with your business type and the kind of website you're considering. We'll help you understand the available options.

**CTA: Ask a Question on WhatsApp**

---

## SECTION 7 — FINAL CTA

# Let's see what a website could look like for your business.

Start by telling us what your business does. We'll share a relevant working demo and explain the available options, pricing and next steps.

No pressure to purchase.

**Primary CTA: Start a WhatsApp Conversation**

**Secondary CTA: Explore Our Demos**

---

## FOOTER

**SiteBlitz**

Professional business websites with transparent scope, pricing and ownership terms.

Gujarat, India · Serving businesses remotely

Live Demos | Pricing & Terms | Contact | Privacy Policy

WhatsApp: [verified SiteBlitz business contact]

*Concept demonstrations are examples of our design approach, not completed customer projects.*

© 2026 SiteBlitz. All rights reserved.

### Homepage editorial notes for Claude

The copy is the approved direction for review, not confirmation that all described capabilities are currently built. Before publication, Claude must verify each promised feature against the actual package implementation.

In particular, the wording about technical SEO, revision limits, working demo flows and seven-working-day delivery must match the published agreement and operational capacity.

Do not add client counts, made-up logos, delivery statistics, fake location badges, trust scores or rotating testimonials merely to fill unused space.

## (b) Three hero headline variants

Variant A — Outcome-led

Selected

## Websites that help customers understand your business — and get in touch.

Best combination of a clear customer benefit and a realistic claim. A supporting line specifies professional websites for local service businesses.

Variant B — Certainty-led

## A professional website for your business. No guesswork.

Shorter and easy to understand, but less descriptive of the customer action the site supports.

Variant C — Risk-reversal-led

## See your website concept before you decide to buy.

A strong differentiator, but it could attract disproportionately many free-preview seekers and needs explicit qualification terms.

Decision: Variant A. The hero should first explain the product and its practical purpose. Use the concept-first assurance as the supporting proposition.

At 360px, the phone mockup should come after the compact headline, price and WhatsApp action. Do not sacrifice these essentials to fit an animated image above the fold.

## (c) Full pricing and ownership page copy

This page is especially important because a WhatsApp prospect may visit it specifically to determine whether SiteBlitz is legitimate and whether they will face unexpected charges.

# SiteBlitz — Pricing & Terms

## Professional websites. Clear project prices.

Choose a focused one-page site, a three-page business website, or a custom project.

Every paid project starts with an agreed scope, delivery schedule and written quotation.

**Website build prices:**

- **Launch: ₹7,999**
- **Business: ₹17,999**
- **Custom: Quotation required**

The displayed package prices are for the specified website-building service. Domain, hosting, renewals and optional services are disclosed separately where applicable.

## Compare what's included

| Feature                                    | Launch — ₹7,999                                                  | Business — ₹17,999                               | Custom           |
| ------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------ | ---------------- |
| Pages                                      | 1                                                                | 3 agreed pages                                   | Quoted           |
| Mobile-responsive design                   | Included                                                         | Included                                         | As quoted        |
| Service and business information           | Included                                                         | Included                                         | As quoted        |
| WhatsApp/contact buttons                   | Included                                                         | Included                                         | As quoted        |
| Basic technical SEO                        | Included                                                         | Included                                         | As quoted        |
| Content formatting using approved material | Included                                                         | Included                                         | As quoted        |
| Revision rounds                            | 1 consolidated round                                             | 1 consolidated round                             | As quoted        |
| Delivery target                            | Standard scope: 2 working days after ready-to-build confirmation | 7 working days after ready-to-build confirmation | Written schedule |
| Advanced appointment booking               | Not included                                                     | Not included by default                          | Quoted           |
| E-commerce/payment checkout                | Not included                                                     | Not included                                     | Quoted           |
| Client-managed domain registration         | Recommended                                                      | Recommended                                      | Recommended      |
| Ongoing maintenance                        | Optional, separate                                               | Optional, separate                               | Quoted           |

*The final quotation defines the precise deliverables. Any additional functionality must be agreed and priced before work begins.*

## What is not included by default?

The standard package prices do not automatically include:

- Domain registration or future domain renewal payments.
- Third-party hosting or subscription charges.
- Paid plugins, premium fonts, stock photography or external software licenses.
- E-commerce, online payment processing or advanced booking systems.
- New pages or features beyond the agreed scope.
- Advertising spend or ongoing digital marketing.
- Guaranteed search-engine rankings, traffic, enquiries or sales.
- Unlimited redesigns, content production or ongoing edits.
- Monthly maintenance unless separately agreed.

No additional charge will be introduced without approval.

## Domain, hosting and renewal costs

SiteBlitz recommends that customers register their domain through an account they control.

| Cost                             | One-time or recurring?          | How it is handled                                              |
| -------------------------------- | ------------------------------- | -------------------------------------------------------------- |
| SiteBlitz website build          | One-time                        | Paid according to the agreed milestones                        |
| Domain registration              | Usually recurring renewal       | Client-owned account; actual provider price disclosed          |
| Website hosting                  | May be recurring or usage-based | Hosting choice and billing responsibility agreed before launch |
| Email hosting                    | Optional recurring expense      | Only if the project requires it                                |
| Third-party integrations         | Depends on provider             | Quoted before use                                              |
| Website maintenance              | Optional service                | Separate written scope and price                               |
| Additional design or development | As requested                    | Quoted before work begins                                      |

Domain and hosting prices depend on the provider selected, and renewal prices can change. We will not invent a fixed renewal cost before the provider and plan are known.

## How payment works

### Launch — ₹7,999

- ₹4,000 after design direction, scope and agreement approval.
- ₹3,999 after staging acceptance and before final publication or handover.

### Business — ₹17,999

- ₹9,000 after concept/design direction, scope and agreement approval.
- ₹8,999 after staging acceptance and before final publication or handover.

### Custom

Payment milestones are included in the written quotation.

Every payment is acknowledged with a receipt. The legal payment recipient is identified before payment is requested.

## Review before you commit

For suitable projects, SiteBlitz can prepare one personalized homepage concept using the business details and images approved for that purpose.

The concept is free to review, without an obligation to purchase.

It is a visual preview, not a finished website. The free concept does not include unlimited revisions or transferable design source files.

If you do not wish to proceed, you can decline the project before signing the paid agreement.

Paid work begins only after the approved scope, terms and first payment.

## What counts as a revision?

One consolidated revision round means one organized list of reasonable changes within the already agreed design direction and scope.

Examples include correcting text, adjusting imagery, updating spacing or refining agreed sections.

A completely different design direction, additional pages, major structural changes or new functionality are not automatically included. We will explain any scope change before proposing an additional charge.

## When does the delivery clock begin?

The delivery period begins after all ready-to-build requirements are satisfied:

1. The agreed pages and features are confirmed.
2. Required content, images and business information are available.
3. Necessary access and approvals have been received.
4. The initial project payment has been confirmed.
5. A start date has been agreed in writing.

Delays in providing information or approving work may change the schedule. We will communicate changes before updating the delivery date.

## What happens if I cancel?

Before a paid agreement, an eligible free concept carries no obligation to purchase.

After a paid project begins, cancellation, completed work, unused payments, refunds and any applicable rights are governed by the written agreement and applicable law.

All relevant terms are available for review before payment.

## What happens at handover?

The handover follows the agreed scope and may include the deployed website, access information, relevant content, configuration details and documented ownership rights.

The client should control their own domain registration.

Any source-code transfer, third-party software licensing, hosting obligations, warranty period and post-launch assistance are specified in the written agreement.

## Frequently asked questions

**Will the website appear in Google Search?**

We implement the technical SEO measures included in your scope. Search engines independently decide whether and when to index and rank websites. We do not guarantee rankings or indexing.

**Can a website replace Instagram?**

It can complement Instagram by organizing business information and providing a direct route for enquiries. Both channels can be useful.

**Will the site bring guaranteed leads?**

No. We can create and test an effective enquiry journey, but traffic and sales depend on several factors beyond website development.

**Can I change the website later?**

Yes, subject to the agreed handover method, access rights and any required technical assistance or additional development.

**Can I purchase only a concept?**

Our free concept is a qualification-stage preview for suitable projects, not a standalone design product. A separate paid design service would require its own quotation.

**Can I talk with the team before ordering?**

Yes. WhatsApp is our primary contact channel.

## Ready to explore a website for your business?

Tell us your business type and what customers should be able to do on your site.

We'll share a relevant demonstration, explain the most suitable package and provide a quotation if there is a fit.

**Primary CTA: Discuss on WhatsApp**

**Secondary CTA: View Website Demos**

*SiteBlitz is a Gujarat-based studio serving customers across India. Final scope, exclusions, third-party costs and terms are confirmed in writing before payment.*

### Pricing-page release conditions

The pricing content above must not go live unchanged if Claude discovers that a listed inclusion cannot be delivered. Particularly:

- The Launch two-working-day target needs an actual readiness and scheduling test.
- Payment terms of ₹4,000 + ₹3,999 and ₹9,000 + ₹8,999 must appear consistently in the quote and agreement.
- Third-party renewals must have real provider prices before the customer signs.
- SiteBlitz must not imply that free-tier hosting can always accommodate a customer's commercial website.
- The actual GST and receipt position must be checked before public publication.

The agreement, not a vague website slogan, must define cancellation and refund mechanics.

## (d) Final Meta ad: three complete language variants

### My launch selection

RUN HINGLISH FIRST — SUBJECT TO FOUNDER APPROVAL

I select Hinglish as the first creative for the combined Navsari, Surat, Valsad and Vapi audience.

This is a language-fit hypothesis, not a measured performance claim. Hinglish may be understandable to a wider mix of Hindi-speaking and Gujarati-speaking business owners in the initial service area. Gujarati becomes the first alternative if conversations and responses indicate a stronger preference for Gujarati.

Do not run all three languages as separate paid campaigns with the initial ₹1,000. Record language preference in WhatsApp and learn from the conversations.

### Ad 1 — Hinglish (recommended)

**PRIMARY TEXT**

South Gujarat businesses ke liye professional, mobile-friendly websites.

SiteBlitz ke working website demos dekhiye. Suitable projects ke liye personalized homepage concept bhi available hai — free to review, purchase compulsory nahi.

**One-page ₹7,999 | Three-page ₹17,999**

Ye website build prices hain. Domain aur hosting charges zarurat ke hisaab se alag ho sakte hain.

Demo aur package details ke liye WhatsApp par message karein.

**HEADLINE**

Business Websites ₹7,999 Se

**DESCRIPTION**

Working demos dekhiye. WhatsApp par baat karein.

**CTA**

Send WhatsApp Message

**PRE-FILLED WHATSAPP MESSAGE**

Hi SiteBlitz, maine aapka website ad dekha (SB-H1). Please ek working demo aur package details share karein.

### Ad 2 — Gujarati

**PRIMARY TEXT**

દક્ષિણ ગુજરાતના વ્યવસાયો માટે પ્રોફેશનલ, મોબાઇલ-ફ્રેન્ડલી વેબસાઇટ.

SiteBlitz ના વર્કિંગ વેબસાઇટ ડેમો જુઓ. યોગ્ય પ્રોજેક્ટ માટે પર્સનલાઇઝ્ડ હોમપેજ કોન્સેપ્ટ પણ ઉપલબ્ધ છે — જે મફતમાં જોઈ શકો છો, ખરીદવાની કોઈ ફરજ નથી.

**એક પેજ ₹7,999 | ત્રણ પેજ ₹17,999**

આ વેબસાઇટ બનાવવાના ચાર્જ છે. જરૂર મુજબ ડોમેન અને હોસ્ટિંગનો ખર્ચ અલગ હોઈ શકે છે.

ડેમો અને પેકેજની માહિતી માટે WhatsApp પર મેસેજ કરો.

**HEADLINE**

બિઝનેસ વેબસાઇટ ₹7,999 થી

**DESCRIPTION**

વર્કિંગ ડેમો જુઓ. WhatsApp પર વાત કરો.

**CTA**

Send WhatsApp Message

**PRE-FILLED WHATSAPP MESSAGE**

નમસ્તે SiteBlitz, મેં તમારી વેબસાઇટની જાહેરાત જોઈ છે (SB-G1). કૃપા કરીને વર્કિંગ ડેમો અને પેકેજની માહિતી મોકલો.

### Ad 3 — English

**PRIMARY TEXT**

Professional, mobile-friendly websites for businesses in South Gujarat.

Explore SiteBlitz's working website demos. Qualified projects can also receive a personalized homepage concept to review free of charge, with no obligation to purchase.

**One-page ₹7,999 | Three-page ₹17,999**

These are website build prices. Domain and hosting costs may apply separately.

Message us on WhatsApp to see a demo and discuss the packages.

**HEADLINE**

Business Websites from ₹7,999

**DESCRIPTION**

Explore working demos. Chat on WhatsApp.

**CTA**

Send WhatsApp Message

**PRE-FILLED WHATSAPP MESSAGE**

Hi SiteBlitz, I saw your website ad (SB-E1). Please share a working demo and the package details.

### Image/video concept for all three advertisements

Creative: “See what a business website looks like”

Suggested production ratio: 4:5 for feed, with an independently checked 9:16 adaptation for vertical placements.

SITEBLITZ · BUSINESS WEBSITES

# A professional home for your business online.

One page

# ₹7,999

Three pages

# ₹17,999

Sample Business

Services · Contact

Enquire

See working concept demos

Illustrative website design · Domain/hosting may cost extra

Design direction only, not a finished ad asset. The phone should show a genuine screenshot of a completed SiteBlitz demo before publication.

Production details: Use a real screenshot from one of the three completed, labeled demo pages. No fake business performance numbers, no borrowed client logo, no misleading Instagram interface, and no nonfunctional “play” button.

A static creative is sufficient for the initial campaign. A short screen recording that actually demonstrates scrolling and opening a simulated enquiry could be tested later, but should not delay launch.

### Meta policy review — November 1, 2026

| Policy issue                    | Assessment of proposed ads                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| Personal attributes             | No assertion about the viewer's health, religion, age, finances or other protected attributes |
| Misleading claims               | No guaranteed sales, search ranking or customer growth                                        |
| Free-offer clarity              | Explicitly limited to qualified projects and a homepage concept, not a complete website       |
| Pricing transparency            | Package build prices shown; domain and hosting caveat disclosed                               |
| Unacceptable business practices | The service, brand and actual WhatsApp recipient must match                                   |
| Unrealistic outcomes            | No promises of rapid wealth, business success or guaranteed ROI                               |
| Advertising creative            | Use genuine owned or licensed demo imagery                                                    |
| Destination                     | A working SiteBlitz WhatsApp Business account, with tested greeting and correct brand         |
| Approval outcome                | Not guaranteed; Meta must review the final ad and account                                     |

Meta's published advertising standards prohibit misleading commercial practices and personal-attribute assumptions. Its official click-to-WhatsApp workflow confirms the messaging-app destination and campaign setup.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://archive.ph\&sz=32)

Meta Business Help Center+3



The draft avoids the major identified risks, but I cannot certify that Meta will approve the final submission. Approval also depends on the account, asset, targeting, conversation destination, and Meta's review at the time of publication.

One more operational consideration: the source code in the WhatsApp pre-filled message is a convenience, not dependable attribution by itself. Users can modify messages, and the exact supported message-template options should be verified in Ads Manager.

## (e) Complete demo specification — `/demo/salon`

Selected vertical: Salon / beauty studio

The salon demo is the first build because it demonstrates an understandable customer journey: discover services, evaluate the business, and request an appointment.

This does not mean salons are proven to be the most profitable SiteBlitz customer segment. The selection is based on demo clarity and implementation practicality.

### Demo experience

Persistent concept ribbon

"SITEBLITZ CONCEPT DEMO — This is an illustrative business, not a real salon or customer project."

Visible on desktop and mobile, including when scrolling.

Hero and visual identity

Example salon identity, polished licensed photography or original illustrations, and a clear path to view services.

Headline: "A little time, just for you."

Supporting copy: "Explore our sample services and see how a simple appointment enquiry works."

Services

Example cards for hair services, styling and care. Details and any prices must be clearly labeled illustrative, not genuine business offers.

Gallery

Responsive licensed sample visuals, appropriately labeled as demonstrations rather than actual customer results. No fictional review ratings or before-and-after outcome claims.

Try an appointment enquiry

A working interactive simulation demonstrating how a potential salon customer could select a service and appointment preference.

Return to SiteBlitz

"Like this website experience? Ask SiteBlitz about a site for your business."

This CTA opens the verified SiteBlitz WhatsApp contact, not a fictional salon account.

### Exact demo microcopy and interaction contract

# SiteBlitz Salon Demo — Content and Interaction Specification

**Route:** `/demo/salon`

**Page metadata:** `noindex, follow`

**Business identity:** Fictional demonstration. Do not attach real addresses, business registration numbers, operating claims or reviews.

## Persistent disclosure

SITEBLITZ CONCEPT DEMO

This is an illustrative salon website, not an operating business or a completed client project.

[See SiteBlitz Pricing]

## Demo website header

**Sample Salon**

Services | Gallery | Appointment Enquiry

## Hero

# A little time, just for you.

Explore a sample beauty studio website designed to help visitors understand services and make an appointment enquiry.

[Explore Services]

[Try Appointment Enquiry]

*Illustrative sample content.*

## Services

# Services, simply explained.

Every business deserves a clear way to show what it offers.

**Hair Services**

Explore example hair styling and care information.

[View Details]

**Beauty & Styling**

See how treatment or styling options can be organized.

[View Details]

**Occasion Styling**

Explore a sample consultation or appointment journey.

[View Details]

*All service details are illustrative and do not represent an actual salon offering.*

## Gallery

# See the experience.

A mobile-friendly gallery can help customers explore the style and services of a business.

*Images are licensed or original demonstration assets, not photographs of real customer results.*

## Simulated appointment enquiry

# Try requesting an appointment.

See how a simple enquiry flow could work in a real business website.

**Step 1 — Select a sample service**

- Hair Services
- Beauty & Styling
- Occasion Styling

**Step 2 — Choose a preferred appointment period**

- Weekday morning
- Weekday afternoon
- Weekend

**Step 3 — Review the sample enquiry**

Display a preview of the request based on the selected options.

[Preview Example Request]

**After clicking:**

Demo completed.

This is how an appointment enquiry could be presented to a business.

**Nothing was submitted, no appointment was booked, and no contact details were collected.**

[Try Another Example]

## Back to SiteBlitz

# A website like this, built around your business.

This is a working concept demonstration of a customer journey we can develop.

SiteBlitz offers one-page and three-page business websites, with additional features priced according to scope.

[Discuss a Website on WhatsApp]

[Compare SiteBlitz Packages]

## Footer

SiteBlitz Concept Demonstration

Not a real salon. No products or appointments are offered through this page.

[Return to SiteBlitz]

### Demo acceptance tests for Claude

| Test                   | Required result                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Clear disclosure       | Ribbon cannot disappear during the normal page journey                                           |
| No false customer      | No fabricated address, testimonial, review, registration or contact number                       |
| Functional interaction | User can select a service, choose a period and preview the simulated request                     |
| No accidental booking  | No real appointment is created, sent or implied                                                  |
| Privacy                | Simulation requires no personal contact information and stores no enquiry                        |
| SiteBlitz contact      | Separate CTA correctly opens SiteBlitz's verified WhatsApp                                       |
| Mobile                 | No overflow or unusable controls at 320px, 360px and 390px                                       |
| Accessibility          | Keyboard operation, visible focus, clear labels and understandable completion feedback           |
| Search indexing        | Fictional salon pages are marked `noindex`; no fabricated LocalBusiness data                     |
| Performance            | Repeatable 4G/mobile lab tests before launch; real-user Core Web Vitals after sufficient traffic |

### Technical architecture

Claude should build the three demonstration pages from a shared structural framework, with distinct content and styling where useful.

| Route            | Demo function                         |
| ---------------- | ------------------------------------- |
| `/demo/salon`    | Simulated appointment enquiry         |
| `/demo/coaching` | Simulated course or admission enquiry |
| `/demo/showroom` | Simulated product enquiry             |

Keep the public demo journeys mostly static and client-side. They do not need a database, an AI agent, email delivery, payment processing or external booking API.

The enquiry simulations should have predictable state transitions, no submission of personal information and a visible distinction between the sample business and SiteBlitz.

This is a better use of the zero-tool-budget constraint than introducing automation into a demonstration that only needs to show how a website works.

## Implementation priority

Claude should not attempt to rebuild the entire SiteBlitz application in one release.

| Priority | Workstream                                    | Required evidence before completion                               |
| -------- | --------------------------------------------- | ----------------------------------------------------------------- |
| P0       | Truth, contact and commercial-hosting repairs | Production facts corrected, Netlify staging tested                |
| P0       | Salon demo                                    | Working mobile simulation and disclosure                          |
| P0       | Coaching and showroom demos                   | Working enquiry simulations and disclosure                        |
| P0       | Homepage                                      | Five-second test, mobile CTA, accurate offer                      |
| P0       | Pricing and terms                             | Approved prices, exclusions, payment split and ownership language |
| P0       | WhatsApp sales path                           | Real-device test, source tracking, human reply                    |
| P1       | Meta ad creative                              | Founder-approved final image and text, platform review            |
| P2       | Remaining public pages                        | Consistent visual design and corrected claims                     |

Each phase should have browser screenshots, responsive checks, regression tests and a documented deploy state. A successful preview does not count as a production release.

## FD-36 onward — Round 3 decision log

| ID    | Decision                                                                                    | Status   | Owner / validation                         |
| ----- | ------------------------------------------------------------------------------------------- | -------- | ------------------------------------------ |
| FD-36 | Prioritize homepage, pricing/terms and three demos over secondary pages                     | Proposed | Claude; complete customer-path test        |
| FD-37 | Adopt five-second comprehension, mobile visibility, accessibility and Core Web Vitals tests | Proposed | Claude; test evidence                      |
| FD-38 | Use outcome-led Hero A with clear ₹7,999/₹17,999 pricing                                    | Proposed | Founder; five-owner test                   |
| FD-39 | Use salon, coaching and showroom demos; salon first                                         | Proposed | Claude; three functional demo journeys     |
| FD-40 | Prefer live website switcher over Instagram before/after slider                             | Proposed | Claude; mobile usability test              |
| FD-41 | Retain light palette, accessible teal and simplified font loading                           | Proposed | Claude; visual and performance checks      |
| FD-42 | English-first website; Gujarati/Hinglish through ads and WhatsApp                           | Proposed | Founder; actual language-response evidence |
| FD-43 | Publish comprehensive package inclusions, exclusions, renewals and ownership terms          | Proposed | Founder / legal review                     |
| FD-44 | Use Hinglish as initial Meta creative, subject to audience and account verification         | Proposed | Founder; qualified conversations           |
| FD-45 | Use fictional, clearly labeled demos with non-submitting enquiry simulations                | Proposed | Claude; privacy and functionality tests    |
| FD-46 | Use ₹9,000 + ₹8,999 for Business and ₹4,000 + ₹3,999 for Launch                             | Proposed | Founder; quote and payment consistency     |
| FD-47 | Require truth, hosting, demo, contact and financial controls before paid launch             | Proposed | Founder; release checklist                 |

These are Round 3 recommendations for founder review, not implementation approval. None of the proposed designs, pages or advertisements has been deployed or published in this exchange.

## OPEN POINTS

1. Founder: Confirm whether public location text should say “Navsari, Gujarat” or “South Gujarat.” Both are truthful; structured data must not suggest an invented office.
2. Founder / accountant: Verify SiteBlitz's GST obligations and receipt format. The approved package prices do not currently have GST added by SiteBlitz.
3. Claude: Confirm that Launch can reliably meet the proposed two-working-day commitment and Business can meet seven working days after readiness.
4. Claude: Build and test all three demos before any advertisement refers to them as working.
5. Claude: Verify the live WhatsApp destination and whether the selected Meta setup supports the proposed pre-filled source messages.
6. Founder: Approve the final advertisement, its language and creative, and the all-in ₹1,000 expenditure separately.
7. Claude: Validate Netlify Free compatibility, credits, production secrets, domain routing, analytics and the critical customer journey before migration.
8. Founder / legal reviewer: Approve agreement language for ownership, third-party costs, cancellations, revisions and handover.

## Final recommendation to Claude Code

The redesign should demonstrate SiteBlitz's competence, not merely claim it.

A visitor should be able to understand the price, inspect a real working demo, see exactly what is included, verify the business and initiate a conversation without confusion.

The biggest commercial risk is not that the new website looks insufficiently futuristic. It is that a prospect sees attractive design but still cannot determine whether SiteBlitz can be trusted with ₹17,999.

The three demos, the transparent quotation system and the WhatsApp sales experience solve that problem more directly than a complex homepage animation or dozens of AI agents.

Round 3 recommendation: Approve the product-led redesign direction for planning. Require verified functionality and founder approval before production deployment or advertising spend.

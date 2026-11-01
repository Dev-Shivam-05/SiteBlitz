import { FROM_PRICE, businessPkg, inr, launchPkg } from "./offer";

export const SITE = {
  name: "SiteBlitz",
  tagline: "Websites that help customers understand your business and get in touch.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://siteblitz.vercel.app",
  /* The siteblitz.in domain is not registered yet (DNS NXDOMAIN, 2026-11-01), so mail to it bounces.
     Every UI that shows the address checks emailLive; flip it only after a real send/receive test. */
  email: "hello@siteblitz.in",
  emailLive: false,
  phone: "+91 92744 90242",
  phoneRaw: "919274490242",
  whatsapp: (text: string) =>
    `https://wa.me/919274490242?text=${encodeURIComponent(text)}`,
  /* Truthful location (FD-22): the studio works from South Gujarat. Never state a city or office the
     business does not operate from; an earlier out-of-state city claim was removed for that reason. */
  region: "Gujarat",
  country: "India",
  locationLine: "Gujarat-based · serving businesses across India",
  replyHours: "9 AM – 9 PM IST",
  founded: 2024,
} as const;

export const NAV_LINKS = [
  { href: "/#demos", label: "Live demos" },
  { href: "/#how", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
] as const;

/** The four-step buying process (FD-27): demo first, concept before payment, scope in writing. */
export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    time: "One WhatsApp chat",
    text: "Your business, what customers should be able to do on your website, and when you want to launch. No technical brief needed.",
  },
  {
    n: "02",
    title: "See the design direction",
    time: "Before any payment",
    text: "Explore a working demo for your type of business. For suitable projects we prepare one homepage concept with your name and approved images, free to review, no obligation to buy.",
  },
  {
    n: "03",
    title: "Approve scope and price",
    time: "In writing",
    text: "Pages, features, content, timeline, ownership and any future costs are agreed in writing. You approve before the first payment.",
  },
  {
    n: "04",
    title: "Build, review, launch",
    time: `${launchPkg.delivery.split(" after")[0]} / ${businessPkg.delivery.split(" after")[0]}`,
    text: "We build the agreed site, share a staging link, complete the included revision round, then take the final payment and hand over.",
  },
] as const;

/** Buyer questions, answered honestly (objection map in docs/debate/2026-11-01-ads-psychology-redesign). */
export const FAQS = [
  {
    q: "Is the personalised homepage concept really free?",
    a: "For qualified projects, yes. You can review one homepage concept for your business without paying or agreeing to buy. It is a design preview, not a finished website, and depends on available slots each week.",
  },
  {
    q: "What if I don't like the concept?",
    a: "Then you simply don't go ahead. Nothing is owed for the free concept. Once a paid project starts, revisions and cancellation follow the written agreement you approve before paying.",
  },
  {
    q: "I already have Instagram. Why a website?",
    a: "Keep Instagram. A website complements it: your services, prices, location and an enquiry button in one place that you own, which people can open from Google, WhatsApp or your Instagram bio. It doesn't create traffic by itself.",
  },
  {
    q: "Will my website bring more customers?",
    a: "A website makes it easier for interested people to understand you and get in touch. How many customers you get depends on demand, promotion and competition, so we don't promise a number of leads or sales.",
  },
  {
    q: "Will my website show up on Google?",
    a: "We set up the technical SEO basics and submit the site to Google Search Console. Google alone decides if and when a page is indexed or ranked, so nobody can honestly guarantee rankings or indexing.",
  },
  {
    q: "Are there monthly charges or hidden costs?",
    a: `The website build is a one-time fee: ${inr(FROM_PRICE)} for one page, ${inr(businessPkg.priceInr as number)} for three. Domain renewal and hosting are separate and are written in your quotation before you pay. Nothing outside the agreed scope is charged without your approval.`,
  },
  {
    q: "Who owns the website and the domain?",
    a: "We recommend registering the domain in your own name and account. The agreement lists what is handed over to you: the live site, access and content.",
  },
  {
    q: "How fast can you deliver?",
    a: `Launch (one page): ${launchPkg.delivery}. Business (three pages): ${businessPkg.delivery}. Ready-to-build means your content, approvals and first payment are in.`,
  },
  {
    q: "Where is SiteBlitz based?",
    a: "We are a website studio based in South Gujarat and work with businesses remotely across India. Most conversations happen on WhatsApp.",
  },
  {
    q: "Do you have client reviews?",
    a: "We are building our client portfolio and will not show reviews or results we can't prove. Instead you can open our working demos, review a concept for your own business and get the full scope in writing before you pay.",
  },
] as const;

/**
 * Concept studies — how SiteBlitz would build for a sector. NOT client projects: SiteBlitz has no
 * client case study with recorded evidence and permission yet (docs/audit/claims-register.md).
 * Publish a real case study here only with the client's permission and numbers that can be shown.
 */
export const WORK_ITEMS = [
  {
    slug: "restaurant",
    title: "Restaurant one-pager",
    category: "Concept study · Restaurants",
    goal: "From a hungry phone visitor to a booked table in three taps.",
    stack: ["One-page", "Reservations", "Local SEO"],
    story:
      "Menu, hours, map and a booking button in the first scroll — on a phone, on patchy 4G. Everything on the page pushes towards one action: reserving a table. Local search markup tells Google exactly what you serve and where.",
  },
  {
    slug: "clinic",
    title: "Clinic multi-page site",
    category: "Concept study · Healthcare",
    goal: "One page per treatment, so patients find the exact answer they searched for.",
    stack: ["Multi-page", "Appointments", "Content SEO"],
    story:
      "Patients search for a treatment and an area, not a clinic name. A calm, trust-first build with a page per service, structured data and appointment capture answers that search directly — without the competitor's ads in between.",
  },
  {
    slug: "fashion",
    title: "Boutique storefront",
    category: "Concept study · Fashion & retail",
    goal: "Editorial photography that still loads fast on a mid-range Android phone.",
    stack: ["E-commerce", "Lookbook", "Performance"],
    story:
      "Beautiful catalogues fail when they take ten seconds to load. Responsive, compressed imagery, a lookbook that streams in as you scroll, and an enquiry or checkout path that is never more than one tap away.",
  },
  {
    slug: "law",
    title: "Law firm authority site",
    category: "Concept study · Legal",
    goal: "Every practice-area page leads to one discreet consultation request.",
    stack: ["Authority site", "Lead capture", "Speed"],
    story:
      "In law, credibility is the product. Clear practice-area pages that answer real questions, a quiet and fast design, and a consultation path that respects how sensitive the first contact is.",
  },
] as const;

export const SERVICES = [
  {
    title: "Business Websites",
    text: "Conversion-engineered sites for restaurants, clinics, firms and local businesses. Designed to rank, built to sell.",
    tags: ["48h delivery", "SEO-ready", "Lead capture"],
  },
  {
    title: "E-commerce & Booking",
    text: "Storefronts and booking systems that feel effortless on a phone — because that's where your customers are.",
    tags: ["Payments", "Catalogues", "Reservations"],
  },
  {
    title: "Landing Pages",
    text: "Single pages with one job: turn ad clicks into enquiries. Built for campaigns, measured to the click.",
    tags: ["A/B ready", "Ad-friendly", "Fast"],
  },
  {
    title: "Redesigns & Rescues",
    text: "Slow, dated or invisible on Google? We rebuild on a modern stack and migrate your SEO without losing rankings.",
    tags: ["Migration", "Speed", "Recovery"],
  },
  {
    title: "SEO & Performance",
    text: "Technical SEO, Core Web Vitals, structured data and local search. The unglamorous work that prints results.",
    tags: ["Audits", "Schema", "Local SEO"],
  },
  {
    title: "Care & Growth",
    text: "Monthly updates, analytics reviews and iteration. Your site keeps getting sharper while you run the business.",
    tags: ["Updates", "Analytics", "Support"],
  },
] as const;

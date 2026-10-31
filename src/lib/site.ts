export const SITE = {
  name: "SiteBlitz",
  tagline: "Websites that win business, shipped in 48 hours.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://siteblitz.vercel.app",
  email: "hello@siteblitz.in",
  phone: "+91 92744 90242",
  phoneRaw: "919274490242",
  whatsapp: (text: string) =>
    `https://wa.me/919274490242?text=${encodeURIComponent(text)}`,
  city: "Mumbai",
  country: "India",
  founded: 2024,
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/proof", label: "Proof" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export type Currency = "INR" | "USD";

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    priceINR: 7999,
    priceUSD: 99,
    blurb: "A razor-sharp single page that makes your business look established and gets the phone ringing.",
    delivery: "48-hour delivery",
    features: [
      "Conversion-focused one-page site",
      "Mobile-first, blazing fast (90+ Lighthouse)",
      "On-page SEO + Google indexing setup",
      "WhatsApp & call integration",
      "Contact form with lead capture",
      "1 revision round",
    ],
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    priceINR: 14999,
    priceUSD: 189,
    blurb: "A multi-page presence engineered to rank locally and convert visitors into enquiries on autopilot.",
    delivery: "4-day delivery",
    features: [
      "Up to 5 custom-designed pages",
      "Local SEO + Google Business sync",
      "Analytics dashboard included",
      "Lead management panel",
      "Blog / updates section",
      "Speed & Core Web Vitals tuning",
      "3 revision rounds",
    ],
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    priceINR: 24999,
    priceUSD: 329,
    blurb: "The full weapon: custom features, integrations and a growth engine your competitors can't copy.",
    delivery: "7-day delivery",
    features: [
      "Up to 10 pages + custom features",
      "E-commerce / booking integrations",
      "Advanced analytics & funnels",
      "CRM / WhatsApp automation hooks",
      "Content & copywriting assistance",
      "Priority support, 30-day care plan",
      "Unlimited revisions (fair use)",
    ],
    highlight: false,
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Brief",
    time: "30 minutes",
    text: "One focused call or WhatsApp chat. We extract what your business does best and who needs to hear it.",
  },
  {
    n: "02",
    title: "Blueprint",
    time: "Same day",
    text: "You get a visual direction and page architecture before we write a single line of code. No surprises.",
  },
  {
    n: "03",
    title: "Build",
    time: "24–48 hours",
    text: "Design and engineering happen in one motion. Real content, real SEO, real speed — not a template dressed up.",
  },
  {
    n: "04",
    title: "Blitz",
    time: "Launch day",
    text: "Domain, hosting, analytics, search indexing — wired and verified. You watch the first visitors arrive live.",
  },
] as const;

export const FAQS = [
  {
    q: "How can you deliver a real website in 48 hours?",
    a: "Because we've productised the process. A focused brief, a battle-tested design system, and senior execution with modern tooling — no agency bureaucracy, no six-week email chains. Speed is engineering, not a shortcut.",
  },
  {
    q: "What do I need to provide?",
    a: "Your business details, any photos or brand assets you have, and 30 minutes for the brief. Missing content? We draft professional copy for you and generate placeholder visuals until you replace them.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Yes — properly. Every build ships with technical SEO: server-rendered pages, structured data, sitemap, fast Core Web Vitals, and Search Console submission. Ranking positions take time, but indexing and a healthy foundation are guaranteed.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Absolutely. We work remotely with clients worldwide — pricing is available in INR and USD, and we operate async-friendly with clear communication over WhatsApp or email.",
  },
  {
    q: "What happens after launch?",
    a: "You own everything — domain, code, content. Growth and Scale plans include a live analytics dashboard so you can see every visitor, and our care plan covers updates. No hostage-taking, no forced monthly fees.",
  },
  {
    q: "What if I don't like the design?",
    a: "You see the visual direction before the build starts, and every plan includes revisions. In the rare case we can't land a direction you love, you don't pay. Simple.",
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

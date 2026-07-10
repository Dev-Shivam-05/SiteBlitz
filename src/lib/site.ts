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

export const WORK_ITEMS = [
  {
    slug: "restaurant",
    title: "Spice Route Kitchen",
    category: "Restaurant · Mumbai",
    image: "/images/portfolio-1.png",
    result: "2.4× more table bookings in 60 days",
    stack: ["One-page", "Reservations", "Local SEO"],
    story:
      "A premium dining spot with zero online presence. We shipped a dark, appetite-driven one-pager with a frictionless booking flow and local search optimisation. Bookings from Google more than doubled within two months.",
  },
  {
    slug: "clinic",
    title: "Meadow Health Clinic",
    category: "Healthcare · Pune",
    image: "/images/portfolio-2.png",
    result: "First page of Google for 8 local keywords",
    stack: ["Multi-page", "Appointments", "Content SEO"],
    story:
      "Patients couldn't find them; a competitor's ads owned the area. A clean, trust-first multi-page build with structured data and appointment capture put them on page one for the searches that matter.",
  },
  {
    slug: "fashion",
    title: "Noir Atelier",
    category: "Fashion · International",
    image: "/images/portfolio-3.png",
    result: "38% lift in catalogue enquiries",
    stack: ["E-commerce", "Lookbook", "Performance"],
    story:
      "A boutique label whose old site took 11 seconds to load on mobile. We rebuilt it as a fast, editorial-grade storefront. Bounce rate halved; enquiries jumped by more than a third.",
  },
  {
    slug: "law",
    title: "Verma & Associates",
    category: "Legal · Delhi",
    image: "/images/portfolio-4.png",
    result: "Consultation requests up 3× in one quarter",
    stack: ["Authority site", "Lead capture", "Speed"],
    story:
      "Credibility is the product in law. An authoritative, fast, content-structured site with clear consultation paths turned a static brochure into their best business development channel.",
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

export const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    role: "Restaurant Owner, Mumbai",
    text: "Site was live in two days and looked better than agencies quoted six weeks for. Bookings started the same week.",
  },
  {
    name: "Dr. Anjali Kapoor",
    role: "Clinic Director, Pune",
    text: "We finally show up when patients search for us. The dashboard showing every visitor is addictive.",
  },
  {
    name: "Sameer Khan",
    role: "Founder, D2C Brand",
    text: "Fastest turnaround I've experienced with zero drop in quality. The site loads instantly even on bad networks.",
  },
  {
    name: "Priya Nair",
    role: "Boutique Owner, Kochi",
    text: "They handled everything — domain, Google, WhatsApp integration. I just answered questions for half an hour.",
  },
  {
    name: "Adv. Nikhil Verma",
    role: "Managing Partner, Delhi",
    text: "Professional, fast, and the consultation requests speak for themselves. Worth every rupee.",
  },
] as const;

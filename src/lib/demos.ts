/**
 * Concept demo websites (FD-39/45). Every business here is FICTIONAL: no real address, phone, review,
 * registration or result may be added. The pages are noindex and carry a permanent disclosure ribbon,
 * and their enquiry flows are client-side simulations that submit and store nothing.
 * Sample prices are labelled as samples on the page.
 */

export type DemoId = "salon" | "coaching" | "showroom";

export interface DemoItem {
  title: string;
  text: string;
  meta: string;
}

export interface Demo {
  id: DemoId;
  /** SiteBlitz-facing label */
  vertical: string;
  /** fictional brand shown inside the demo */
  brand: string;
  brandMark: string;
  theme: string;
  heroKicker: string;
  heroTitle: string;
  heroText: string;
  primaryCta: string;
  itemsTitle: string;
  itemsKicker: string;
  items: readonly DemoItem[];
  highlightsTitle: string;
  highlights: readonly { label: string; value: string }[];
  enquiry: {
    title: string;
    text: string;
    step1Label: string;
    step1Options: readonly string[];
    step2Label: string;
    step2Options: readonly string[];
    previewHeading: string;
  };
  visitTitle: string;
  visitLines: readonly string[];
  /** what this demo shows a SiteBlitz buyer */
  pitch: string;
  waText: string;
}

export const DEMOS: Record<DemoId, Demo> = {
  salon: {
    id: "salon",
    vertical: "Salon & beauty",
    brand: "Rose & Comb",
    brandMark: "R&C",
    theme: "demo-salon",
    heroKicker: "Hair · Skin · Bridal",
    heroTitle: "A little time, just for you.",
    heroText:
      "Explore services, see what each one includes, and request an appointment in under a minute, right from your phone.",
    primaryCta: "Request an appointment",
    itemsKicker: "Services",
    itemsTitle: "Services, simply explained.",
    items: [
      { title: "Haircut & styling", text: "Consultation, wash, cut and finish, styled for your face shape.", meta: "45 min · from ₹499 (sample)" },
      { title: "Hair spa & treatments", text: "Deep conditioning and scalp care for dry or frizzy hair.", meta: "60 min · from ₹999 (sample)" },
      { title: "Facials & skin care", text: "Cleanup and facials chosen for your skin type after a short check.", meta: "50 min · from ₹799 (sample)" },
      { title: "Bridal & occasion", text: "Trial session, day-of styling and makeup packages for events.", meta: "On consultation (sample)" },
    ],
    highlightsTitle: "Why a page like this works",
    highlights: [
      { label: "Answers first", value: "Prices and durations visible before anyone has to call." },
      { label: "One tap", value: "A clear appointment request from every section." },
      { label: "Found nearby", value: "Timings and directions where people look for them." },
    ],
    enquiry: {
      title: "Try requesting an appointment",
      text: "See how simple an appointment request can be for your customers.",
      step1Label: "Choose a service",
      step1Options: ["Haircut & styling", "Hair spa & treatments", "Facials & skin care", "Bridal & occasion"],
      step2Label: "Preferred time",
      step2Options: ["Weekday morning", "Weekday evening", "Weekend"],
      previewHeading: "Appointment request",
    },
    visitTitle: "Visit us",
    visitLines: ["Open Tue–Sun · 10 AM – 8 PM (sample timings)", "Address and map appear here on a real site"],
    pitch: "Services with prices, an appointment request and timings: everything a salon customer checks before booking.",
    waText: "Hi SiteBlitz, I saw your salon demo. I'd like a website like this for my business.",
  },
  coaching: {
    id: "coaching",
    vertical: "Coaching & tuition",
    brand: "BrightPath Classes",
    brandMark: "BP",
    theme: "demo-coaching",
    heroKicker: "Std 8–12 · JEE / NEET foundation",
    heroTitle: "The right batch, explained clearly.",
    heroText:
      "Parents and students can compare courses, check batch timings and fees, and send an admission enquiry without a single phone call.",
    primaryCta: "Send an admission enquiry",
    itemsKicker: "Courses",
    itemsTitle: "Find the right course.",
    items: [
      { title: "Std 9–10 Science & Maths", text: "Board-focused batches with weekly tests and doubt sessions.", meta: "Mon–Fri · 5–7 PM · sample" },
      { title: "Std 11–12 Science", text: "PCM / PCB with chapter tests and parent progress updates.", meta: "Mon–Sat · 4–7 PM · sample" },
      { title: "JEE / NEET Foundation", text: "Concept-first foundation course for early starters.", meta: "Weekends · 9 AM–1 PM · sample" },
      { title: "Spoken English", text: "Small groups focused on confidence and everyday conversation.", meta: "Tue/Thu · 6–7 PM · sample" },
    ],
    highlightsTitle: "What parents look for",
    highlights: [
      { label: "Batch timings", value: "Every course shows its days, timings and seats in one place." },
      { label: "Fee clarity", value: "Fees or a fee range shown upfront, no chasing on calls." },
      { label: "Easy enquiry", value: "One short form, the institute gets the request instantly." },
    ],
    enquiry: {
      title: "Try an admission enquiry",
      text: "This is how a parent would request details for a batch.",
      step1Label: "Choose a course",
      step1Options: ["Std 9–10 Science & Maths", "Std 11–12 Science", "JEE / NEET Foundation", "Spoken English"],
      step2Label: "Preferred batch",
      step2Options: ["Morning", "Evening", "Weekend"],
      previewHeading: "Admission enquiry",
    },
    visitTitle: "Visit the centre",
    visitLines: ["Office: Mon–Sat · 10 AM – 7 PM (sample timings)", "Address, map and parking details appear here on a real site"],
    pitch: "Courses, batches and fees in one place, with an admission enquiry parents can send in seconds.",
    waText: "Hi SiteBlitz, I saw your coaching demo. I'd like a website like this for my institute.",
  },
  showroom: {
    id: "showroom",
    vertical: "Retail & showroom",
    brand: "Oakline Furnishings",
    brandMark: "OF",
    theme: "demo-showroom",
    heroKicker: "Furniture · Décor · Custom orders",
    heroTitle: "See the collection before you visit.",
    heroText:
      "A browsable catalogue with sizes, materials and price ranges, and a one-tap enquiry for any piece, straight to WhatsApp.",
    primaryCta: "Enquire about a product",
    itemsKicker: "Collections",
    itemsTitle: "Browse by collection.",
    items: [
      { title: "Sofas & seating", text: "3-seaters, L-shapes and recliners in fabric or leatherette.", meta: "From ₹24,900 (sample)" },
      { title: "Dining sets", text: "4 and 6-seater sets in sheesham and engineered wood.", meta: "From ₹18,500 (sample)" },
      { title: "Beds & storage", text: "Queen and king beds with hydraulic or drawer storage.", meta: "From ₹21,000 (sample)" },
      { title: "Custom orders", text: "Share a size and finish; get a quote for a made-to-order piece.", meta: "On request (sample)" },
    ],
    highlightsTitle: "Why buyers enquire more",
    highlights: [
      { label: "Browse first", value: "People shortlist at home, then visit ready to buy." },
      { label: "Real details", value: "Sizes, materials and price ranges answer questions upfront." },
      { label: "One tap", value: "Every product has its own enquiry button." },
    ],
    enquiry: {
      title: "Try a product enquiry",
      text: "This is how a shopper would ask about a piece they like.",
      step1Label: "Choose a collection",
      step1Options: ["Sofas & seating", "Dining sets", "Beds & storage", "Custom orders"],
      step2Label: "What do you need?",
      step2Options: ["Price & availability", "Showroom visit", "Custom size quote"],
      previewHeading: "Product enquiry",
    },
    visitTitle: "Visit the showroom",
    visitLines: ["Open daily · 10:30 AM – 9 PM (sample timings)", "Address, map and delivery areas appear here on a real site"],
    pitch: "A catalogue people can browse at home, with an enquiry button on every collection.",
    waText: "Hi SiteBlitz, I saw your showroom demo. I'd like a website like this for my shop.",
  },
};

export const DEMO_LIST: readonly Demo[] = [DEMOS.salon, DEMOS.coaching, DEMOS.showroom];

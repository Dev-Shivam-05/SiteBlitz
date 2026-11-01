/**
 * The commercial offer: the single source of truth for prices, payment milestones, delivery terms and
 * scope. Every page, the pricing table, JSON-LD and the WhatsApp scripts in knowledge/ must read from
 * here, so a price change cannot leave a stale number somewhere else (tests/offer.test.ts enforces it).
 *
 * Agreed in docs/debate/2026-11-01-ads-psychology-redesign/RESULT.md. SiteBlitz is not GST-registered,
 * so prices are final: no GST is added (re-check with an accountant before registering).
 */

export type PackageId = "launch" | "business" | "custom";

export interface OfferPackage {
  id: PackageId;
  name: string;
  /** null = quoted per project */
  priceInr: number | null;
  pages: string;
  tagline: string;
  /** deposit + balance; they must add up to priceInr */
  payments: readonly [number, number] | null;
  delivery: string;
  includes: readonly string[];
  recommended: boolean;
}

export const PACKAGES: readonly OfferPackage[] = [
  {
    id: "launch",
    name: "Launch",
    priceInr: 7999,
    pages: "1 page",
    tagline: "One focused page for a professional business presence.",
    payments: [4000, 3999],
    delivery: "2 working days after ready-to-build",
    includes: [
      "One responsive page",
      "Services and business information",
      "WhatsApp and call buttons",
      "Basic technical SEO setup",
      "One consolidated revision round",
    ],
    recommended: false,
  },
  {
    id: "business",
    name: "Business",
    priceInr: 17999,
    pages: "3 pages",
    tagline: "Three pages for businesses that need room to explain their services.",
    payments: [9000, 8999],
    delivery: "7 working days after ready-to-build",
    includes: [
      "Three agreed pages",
      "Mobile-first design",
      "Service information and enquiry journey",
      "WhatsApp, call and enquiry options",
      "Basic technical SEO setup",
      "One consolidated revision round",
    ],
    recommended: true,
  },
  {
    id: "custom",
    name: "Custom",
    priceInr: null,
    pages: "Quoted",
    tagline: "E-commerce, larger catalogues, bookings, more pages or integrations.",
    payments: null,
    delivery: "Written schedule in the quotation",
    includes: [
      "Scope agreed in writing first",
      "Milestones and payments in the quotation",
      "Integrations quoted before work begins",
    ],
    recommended: false,
  },
] as const;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** "from ₹X" for a service starting price; 0 means custom work priced by quote. */
export const fromPrice = (n: number) => (n > 0 ? `from ${inr(n)}` : "custom quote");

export const launchPkg = PACKAGES[0];
export const businessPkg = PACKAGES[1];

/** Lowest fixed price, for "from ₹X" copy and JSON-LD. */
export const FROM_PRICE = launchPkg.priceInr as number;

/** Weekly cap on free personalised homepage concepts (FD-26): 3 concepts or 9 hours, whichever first. */
export const CONCEPT_CAP_PER_WEEK = 3;

/** What every package price does NOT include (pricing page + FAQ). */
export const EXCLUSIONS = [
  "Domain registration and its yearly renewal",
  "Third-party hosting or subscription charges",
  "Paid plugins, premium fonts, stock photos or software licences",
  "E-commerce, online payments or advanced booking systems",
  "New pages or features beyond the agreed scope",
  "Advertising spend or ongoing marketing",
  "Guaranteed Google rankings, traffic, enquiries or sales",
  "Unlimited redesigns, content writing or ongoing edits",
] as const;

/** When the delivery clock starts (the "ready-to-build" definition). */
export const READY_TO_BUILD = [
  "The pages and features are confirmed in writing",
  "Your content, images and business details are with us",
  "Any access we need (domain, accounts) is shared",
  "The first payment is received",
  "A start date is agreed",
] as const;

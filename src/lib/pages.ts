/**
 * Page registry without any content imports, so client components (the navbar) can read it without pulling every
 * service, guide and lander JSON into the browser bundle. Content-derived routes live in routes.ts.
 *
 * `updated` is the date the page's content last changed in a way a reader would notice. It feeds the sitemap's
 * lastmod; a build-time "now" on every URL (the old behaviour) teaches Google to ignore lastmod entirely.
 */

export type Freq = "daily" | "weekly" | "monthly" | "yearly";

export interface PageEntry {
  path: string;
  /** Short label for nav, breadcrumbs and footer. */
  label: string;
  updated: string;
  priority: number;
  freq: Freq;
}

const p = (path: string, label: string, updated: string, priority: number, freq: Freq = "monthly"): PageEntry => ({
  path,
  label,
  updated,
  priority,
  freq,
});

export const PAGES = {
  home: p("/", "Home", "2026-11-11", 1.0, "weekly"),
  work: p("/work", "Work", "2026-11-11", 0.8),
  services: p("/services", "Services", "2026-11-11", 0.9),
  pricing: p("/pricing", "Pricing", "2026-11-11", 0.9),
  process: p("/process", "Process", "2026-11-11", 0.7),
  about: p("/about", "Studio", "2026-11-11", 0.7),
  contact: p("/contact", "Contact", "2026-11-11", 0.8),
  faq: p("/faq", "FAQ", "2026-11-11", 0.7),
  proof: p("/proof", "Live proof", "2026-11-01", 0.5, "weekly"),
  book: p("/book", "Book a call", "2026-11-01", 0.5),
  in48: p("/website-in-48-hours", "Website in 48 hours", "2026-11-11", 0.8),
  grader: p("/tools/grader", "Free website check", "2026-11-01", 0.7),
  blog: p("/blog", "Guides", "2026-11-11", 0.6, "weekly"),
  research: p("/research", "Research", "2026-11-11", 0.6),
  studyGujarat: p("/research/gujarat-business-websites-2026", "Gujarat business website data 2026", "2026-11-11", 0.8),
  privacy: p("/privacy", "Privacy policy", "2026-11-01", 0.2, "yearly"),
  terms: p("/terms", "Terms of service", "2026-11-01", 0.2, "yearly"),
  refunds: p("/refunds", "Refund policy", "2026-11-01", 0.2, "yearly"),
} as const satisfies Record<string, PageEntry>;

/** Main navigation: real pages, no home anchors - every item is a URL a search engine can rank on its own. */
export const MAIN_NAV = [PAGES.work, PAGES.services, PAGES.pricing, PAGES.process, PAGES.about, PAGES.contact] as const;

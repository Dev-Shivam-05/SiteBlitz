/** Deep service pages — the gig-anatomy data (10turtle's converting skeleton,
 *  populated with truth). One entry renders one /services/[slug] page. */

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface DeepService {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string; // may contain one *italic* span marked with asterisks
  promise: string;
  startingPriceINR: number;
  startingPriceUSD: number;
  timeline: string;
  included: { title: string; text: string }[];
  process: { step: string; time: string; text: string }[];
  stack: string[];
  faqs: ServiceFAQ[];
  relatedWorkSlugs: string[];
  cta: string;
}

/** Lead-operations vocabulary shared by the admin UI, the admin APIs and the daily brief.
 *  No server-only imports here — client components import this file. */

export const LEAD_STATUSES = [
  "new", "contacted", "qualified", "demo", "concept", "quoted", "won", "lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export const CLOSED_STATUSES: readonly LeadStatus[] = ["won", "lost"];

/** Codes the founder types into Quick-add. SB-H1 / SB-G1 are the pre-filled WhatsApp codes of the
 *  Hinglish / Gujarati ads (docs/debate/2026-11-01-ads-psychology-redesign/RESULT.md row 2). */
export const SOURCE_CODES = ["SB-H1", "SB-G1", "SB-E1", "walk-in", "referral", "website", "other"] as const;
export type SourceCode = (typeof SOURCE_CODES)[number];

export const SOURCE_CHANNELS = ["web", "whatsapp", "in_person", "referral", "other"] as const;
export type SourceChannel = (typeof SOURCE_CHANNELS)[number];

export function channelForCode(code: string | undefined): SourceChannel {
  if (!code) return "other";
  if (/^SB-/i.test(code)) return "whatsapp";
  if (code === "walk-in") return "in_person";
  if (code === "referral") return "referral";
  if (code === "website") return "web";
  return "other";
}

/** Quick-add select. Taken from the site's own demos (salon, coaching, showroom) and industry
 *  landers (clinics, restaurants, boutiques, law firms) — not an invented market list. */
export const BUSINESS_TYPES = [
  "salon", "coaching", "showroom", "clinic", "restaurant", "boutique", "law firm", "other",
] as const;

export const DEFAULT_NEXT_ACTION = "Reply on WhatsApp";

/** Free personalised concepts are capped at 3 a week (RESULT.md row 4). */
export const CONCEPT_WEEKLY_CAP = 3;
/** Lifetime media budget of the first ad experiment, before GST (RESULT.md row 1). */
export const AD_MEDIA_CAP_INR = 800;
/** Meta charges 18% GST on ads (RESULT.md row 1). */
export const AD_GST_RATE = 0.18;

export function withGst(mediaInr: number): number {
  return Math.round(mediaInr * (1 + AD_GST_RATE));
}

export function formatInr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

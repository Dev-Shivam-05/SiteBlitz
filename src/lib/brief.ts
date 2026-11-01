/** Daily 08:00 IST brief text — rule-based, pure. Counts only: no names, phone numbers or chat
 *  text ever go into the Telegram message. */

import { formatInr } from "./leadops";

export interface BriefInput {
  now: Date;
  siteUrl: string;
  newYesterday: { total: number; bySource: Record<string, number> };
  overdue: number;
  dueToday: number;
  untouchedNew: number;
  noNextAction: number;
  concepts: { thisWeek: number; cap: number };
  adSpend: { mediaTotal: number; cap: number; estimatedWithGst: number };
  alerts: { failed: number; pending: number };
  retry?: { candidates: number; sent: number; failed: number } | null;
}

export function buildBriefText(b: BriefInput): string {
  const day = new Intl.DateTimeFormat("en-IN", {
    weekday: "short", day: "2-digit", month: "short", timeZone: "Asia/Kolkata",
  }).format(b.now);
  const sources = Object.entries(b.newYesterday.bySource)
    .sort((x, y) => y[1] - x[1])
    .map(([code, n]) => `${code} ${n}`)
    .join(" · ");
  const conceptFlag = b.concepts.thisWeek >= b.concepts.cap ? " (cap reached)" : "";
  const spendFlag = b.adSpend.mediaTotal >= b.adSpend.cap ? " (cap reached)" : "";

  const lines = [
    `SiteBlitz brief — ${day}`,
    `New yesterday: ${b.newYesterday.total}${sources ? ` — ${sources}` : ""}`,
    `Overdue: ${b.overdue}`,
    `Due today: ${b.dueToday}`,
    `New, not yet actioned: ${b.untouchedNew}`,
    `No next action: ${b.noNextAction}`,
    `Concepts this week: ${b.concepts.thisWeek} / ${b.concepts.cap}${conceptFlag}`,
    `Ad spend: ${formatInr(b.adSpend.mediaTotal)} / ${formatInr(b.adSpend.cap)} media${spendFlag} (≈ ${formatInr(b.adSpend.estimatedWithGst)} incl. 18% GST)`,
  ];
  if (b.retry && b.retry.candidates > 0) {
    lines.push(`Alert retry: ${b.retry.sent} sent, ${b.retry.failed} still failing`);
  }
  if (b.alerts.failed + b.alerts.pending > 0) {
    lines.push(`Undelivered alerts: ${b.alerts.failed} failed, ${b.alerts.pending} pending`);
  }
  lines.push(`${b.siteUrl.replace(/\/+$/, "")}/admin/today`);
  return lines.join("\n");
}

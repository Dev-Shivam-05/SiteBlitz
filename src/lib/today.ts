/** "Today" bucketing for the founder's follow-up list — pure functions, unit-tested in
 *  tests/today.test.ts. All day/week boundaries are Asia/Kolkata. India has no daylight saving,
 *  so IST is a fixed UTC+05:30 offset and plain arithmetic is exact (no Intl needed). */

import { CLOSED_STATUSES, type LeadStatus } from "./leadops";

const DAY_MS = 24 * 60 * 60 * 1000;
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/** UTC instant of 00:00 IST on the IST calendar day that contains `d`. */
export function istDayStart(d: Date): Date {
  const shifted = d.getTime() + IST_OFFSET_MS;
  return new Date(Math.floor(shifted / DAY_MS) * DAY_MS - IST_OFFSET_MS);
}

/** UTC instant of Monday 00:00 IST of the IST week (Mon–Sun) that contains `d`. */
export function istWeekStart(d: Date): Date {
  const day = istDayStart(d);
  // getUTCDay of the shifted instant is the IST weekday (0 = Sunday).
  const weekday = new Date(day.getTime() + IST_OFFSET_MS).getUTCDay();
  const sinceMonday = (weekday + 6) % 7;
  return new Date(day.getTime() - sinceMonday * DAY_MS);
}

export function istWeekRange(d: Date): { start: Date; end: Date } {
  const start = istWeekStart(d);
  return { start, end: new Date(start.getTime() + 7 * DAY_MS) };
}

/** "YYYY-MM-DD" of the IST calendar day containing `d` (value for an <input type="date">). */
export function istYmd(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** 00:00 IST of a "YYYY-MM-DD" date as a UTC Date, or null when the string is not a real date. */
export function ymdToIstDate(ymd: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return null;
  const utc = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const back = new Date(utc);
  // Rejects 2026-02-30 and friends, which Date.UTC silently rolls over.
  if (back.getUTCFullYear() !== Number(m[1]) || back.getUTCMonth() !== Number(m[2]) - 1 || back.getUTCDate() !== Number(m[3])) {
    return null;
  }
  return new Date(utc - IST_OFFSET_MS);
}

export interface BucketLead {
  status: LeadStatus | string;
  nextActionAt?: Date | string | null;
}

export interface Buckets<T> {
  overdue: T[];
  dueToday: T[];
  new: T[];
  noNextAction: T[];
}

const toTime = (v: Date | string | null | undefined): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
};

/** Sorts open leads into the Today buckets. Each lead lands in exactly ONE bucket, first match wins:
 *    1. overdue      — next action before 00:00 IST today
 *    2. dueToday     — next action during today (IST)
 *    3. new          — status "new" (no due date yet, or one in the future)
 *    4. noNextAction — any other open lead with no next-action date: the "lost track of it" list
 *  Won/lost leads are never shown. Leads with a future date and a non-new status are on track and
 *  are left out. Exclusive buckets keep one lead from appearing twice on a phone screen. */
export function bucketLeads<T extends BucketLead>(leads: T[], now: Date): Buckets<T> {
  const todayStart = istDayStart(now).getTime();
  const tomorrowStart = todayStart + DAY_MS;
  const out: Buckets<T> = { overdue: [], dueToday: [], new: [], noNextAction: [] };

  for (const l of leads) {
    if (CLOSED_STATUSES.includes(l.status as LeadStatus)) continue;
    const t = toTime(l.nextActionAt);
    if (t !== null && t < todayStart) out.overdue.push(l);
    else if (t !== null && t < tomorrowStart) out.dueToday.push(l);
    else if (l.status === "new") out.new.push(l);
    else if (t === null) out.noNextAction.push(l);
  }

  const byDue = (a: T, b: T) => (toTime(a.nextActionAt) ?? 0) - (toTime(b.nextActionAt) ?? 0);
  out.overdue.sort(byDue);
  out.dueToday.sort(byDue);
  return out;
}

/** Counts leads created during the previous IST day, grouped by source code (brief, line 1). */
export function countYesterdayBySource(
  leads: { createdAt?: Date | string; source?: { code?: string; channel?: string } }[],
  now: Date
): { total: number; bySource: Record<string, number> } {
  const todayStart = istDayStart(now).getTime();
  const yStart = todayStart - DAY_MS;
  const bySource: Record<string, number> = {};
  let total = 0;
  for (const l of leads) {
    const t = toTime(l.createdAt);
    if (t === null || t < yStart || t >= todayStart) continue;
    // Website leads saved before source codes existed carry no code; they came from the form.
    const code = l.source?.code || (l.source?.channel ? l.source.channel : "website");
    bySource[code] = (bySource[code] || 0) + 1;
    total++;
  }
  return { total, bySource };
}

/** "01 Nov, 10:32 am IST" */
export function fmtIst(d: Date | string): string {
  return `${new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(d))} IST`;
}

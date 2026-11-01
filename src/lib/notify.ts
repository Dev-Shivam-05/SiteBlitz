/** New-lead alerts: one Notification row per recipient, then a bounded send attempt.
 *
 *  Rules:
 *  - Never throws and never blocks a lead save: callers save the lead FIRST, then await this. Each
 *    Telegram call is capped at 3 s and recipients are sent in parallel, so the added latency is
 *    ~3 s worst case. (Awaited rather than fire-and-forget: serverless hosts freeze the function
 *    after the response, which silently drops un-awaited work.)
 *  - Missing env is recorded as a failed row ("telegram_not_configured") so the gap shows up on
 *    the Today page instead of disappearing.
 *  - Idempotent retries: a row is "claimed" with a conditional update on (status, attempts) before
 *    each send, so two concurrent retries (cron + button) cannot both send the same row. A pending
 *    row is only retried once it has been idle for STALE_PENDING_MS, so an in-flight first attempt
 *    is never doubled. A sent row is never touched again. */

import type { Types } from "mongoose";
import { Lead, Notification, type NotificationDoc } from "./models";
import { buildLeadAlertText, sendTelegram, telegramConfig, type AlertLead } from "./telegram";

export const NOT_CONFIGURED = "telegram_not_configured";
const STALE_PENDING_MS = 60_000;
const RETRY_BATCH = 50;
const PARALLEL = 10; // stays well under Telegram's ~30 messages/second bot limit

type LeadForAlert = AlertLead & { _id: Types.ObjectId | string };
type Row = Pick<NotificationDoc, "status" | "attempts" | "recipient"> & {
  _id: Types.ObjectId;
  leadId: Types.ObjectId;
};

export interface DeliveryTally {
  configured: boolean;
  sent: number;
  failed: number;
  skipped: number;
}

/** Claims `row` (only if nobody else changed it since it was read), sends, records the outcome. */
async function deliver(row: Row, recipient: string, token: string, text: string): Promise<"sent" | "failed" | "skipped"> {
  const claimed = await Notification.findOneAndUpdate(
    { _id: row._id, status: row.status, attempts: row.attempts },
    { $set: { status: "pending", recipient }, $inc: { attempts: 1 } },
    { new: true }
  ).lean();
  if (!claimed) return "skipped";

  const r = await sendTelegram(token, recipient, text);
  if (r.ok) {
    await Notification.updateOne(
      { _id: row._id },
      { $set: { status: "sent", sentAt: new Date(), providerMessageId: r.messageId }, $unset: { lastError: 1 } }
    );
    return "sent";
  }
  await Notification.updateOne({ _id: row._id }, { $set: { status: "failed", lastError: r.error } });
  return "failed";
}

async function inChunks<T, R>(items: T[], fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += PARALLEL) {
    out.push(...(await Promise.all(items.slice(i, i + PARALLEL).map(fn))));
  }
  return out;
}

function tally(configured: boolean, results: ("sent" | "failed" | "skipped")[]): DeliveryTally {
  return {
    configured,
    sent: results.filter((r) => r === "sent").length,
    failed: results.filter((r) => r === "failed").length,
    skipped: results.filter((r) => r === "skipped").length,
  };
}

/** Called right after a lead is saved (website form and Quick-add). Never throws. */
export async function notifyNewLead(lead: LeadForAlert): Promise<DeliveryTally> {
  const cfg = telegramConfig();
  try {
    if (!cfg) {
      await Notification.create({
        leadId: lead._id,
        channel: "telegram",
        recipient: "",
        status: "failed",
        attempts: 0,
        lastError: NOT_CONFIGURED,
      });
      return { configured: false, sent: 0, failed: 1, skipped: 0 };
    }
    const rows = (await Notification.insertMany(
      cfg.chatIds.map((recipient) => ({ leadId: lead._id, channel: "telegram", recipient, status: "pending", attempts: 0 }))
    )) as unknown as Row[];
    const text = buildLeadAlertText(lead);
    const results = await Promise.all(
      rows.map((r) => deliver(r, r.recipient, cfg.token, text).catch(() => "failed" as const))
    );
    return tally(true, results);
  } catch {
    return { configured: Boolean(cfg), sent: 0, failed: 0, skipped: 0 };
  }
}

/** Retries failed rows and stale pending rows (Today "Retry" button and the daily cron). */
export async function retryNotifications(now: Date = new Date()): Promise<DeliveryTally & { candidates: number }> {
  const rows = (await Notification.find({
    $or: [{ status: "failed" }, { status: "pending", updatedAt: { $lt: new Date(now.getTime() - STALE_PENDING_MS) } }],
  })
    .sort({ createdAt: 1 })
    .limit(RETRY_BATCH)
    .select("status attempts recipient leadId")
    .lean()) as unknown as Row[];

  const cfg = telegramConfig();
  // Still not configured: leave rows (and their attempt counts) alone so the gap stays visible.
  if (!cfg) return { configured: false, candidates: rows.length, sent: 0, failed: 0, skipped: rows.length };

  const leads = await Lead.find({ _id: { $in: rows.map((r) => r.leadId) } })
    .select("ref businessType source createdAt")
    .lean();
  const textFor = new Map(leads.map((l) => [String(l._id), buildLeadAlertText(l)]));

  const results = (
    await inChunks(rows, async (row) => {
      const text = textFor.get(String(row.leadId));
      if (!text) return ["skipped" as const]; // lead deleted since — nothing to announce
      try {
        if (row.recipient) return [await deliver(row, row.recipient, cfg.token, text)];
        // Placeholder written while Telegram was unconfigured: it becomes the row for the first
        // chat id. Only the retry that wins that claim creates rows for the other chat ids, so
        // concurrent retries cannot fan out twice.
        const [first, ...rest] = cfg.chatIds;
        const head = await deliver(row, first, cfg.token, text);
        if (head === "skipped") return [head];
        const tail = await Promise.all(
          rest.map(async (recipient) => {
            if (await Notification.exists({ leadId: row.leadId, recipient })) return "skipped" as const;
            const created = await Notification.create({
              leadId: row.leadId, channel: "telegram", recipient, status: "pending", attempts: 0,
            });
            const sibling: Row = { _id: created._id, leadId: row.leadId, status: "pending", attempts: 0, recipient };
            return deliver(sibling, recipient, cfg.token, text);
          })
        );
        return [head, ...tail];
      } catch {
        return ["failed" as const];
      }
    })
  ).flat();
  return { ...tally(true, results), candidates: rows.length };
}

export async function notificationCounts(): Promise<{ failed: number; pending: number; lastError: string | null }> {
  const [failed, pending, last] = await Promise.all([
    Notification.countDocuments({ status: "failed" }),
    Notification.countDocuments({ status: "pending" }),
    Notification.findOne({ status: "failed" }).sort({ updatedAt: -1 }).select("lastError").lean(),
  ]);
  return { failed, pending, lastError: last?.lastError ?? null };
}

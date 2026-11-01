/** Telegram Bot API sender + message builders. No database access here (that is lib/notify.ts),
 *  so tests can exercise it with a mocked fetch.
 *
 *  Privacy rule: Telegram is a third party and chats get forwarded, so messages built here carry
 *  NO phone number, name or message text — only the lead ref, business type, source, time and an
 *  admin link that needs the admin login to open. */

import { SITE } from "./site";
import { fmtIst } from "./today";

export interface TelegramConfig {
  token: string;
  chatIds: string[];
}

/** Reads TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_IDS on every call, so a newly set env var takes effect
 *  without a code change. Returns null if either is missing. */
export function telegramConfig(env: Record<string, string | undefined> = process.env): TelegramConfig | null {
  const token = (env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatIds = (env.TELEGRAM_CHAT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return null;
  return { token, chatIds };
}

export type SendResult = { ok: true; messageId: string } | { ok: false; error: string };

export const TELEGRAM_TIMEOUT_MS = 3000;

/** One sendMessage call, hard-capped at `timeoutMs` (the cap covers the response body too).
 *  Never throws; the bot token is scrubbed from any error text before it is stored. */
export async function sendTelegram(
  token: string,
  chatId: string,
  text: string,
  timeoutMs = TELEGRAM_TIMEOUT_MS
): Promise<SendResult> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const scrub = (s: string) => s.split(token).join("<token>").slice(0, 300);
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: ctrl.signal,
    });
    const json = (await res.json().catch(() => null)) as
      | { ok?: boolean; description?: string; result?: { message_id?: number } }
      | null;
    if (res.ok && json?.ok) return { ok: true, messageId: String(json.result?.message_id ?? "") };
    return { ok: false, error: scrub(`telegram_http_${res.status}${json?.description ? `: ${json.description}` : ""}`) };
  } catch (e) {
    if (ctrl.signal.aborted) return { ok: false, error: "timeout" };
    return { ok: false, error: scrub(e instanceof Error ? e.message : "network_error") };
  } finally {
    clearTimeout(timer);
  }
}

export interface AlertLead {
  ref?: string;
  businessType?: string;
  source?: { code?: string; channel?: string };
  createdAt?: Date | string;
}

export function adminLeadLink(ref: string | undefined, siteUrl: string = SITE.url): string {
  const base = siteUrl.replace(/\/+$/, "");
  return ref ? `${base}/admin/leads?q=${encodeURIComponent(ref)}` : `${base}/admin/leads`;
}

/** New-lead alert. Deliberately excludes phone, name and message (see file header). */
export function buildLeadAlertText(lead: AlertLead, siteUrl: string = SITE.url): string {
  const source = [lead.source?.code, lead.source?.channel].filter(Boolean).join(" / ") || "unknown";
  return [
    `New lead ${lead.ref || "(no ref)"}`,
    // Website businessType is visitor-typed free text: cap it so it cannot smuggle a message body.
    `Business: ${(lead.businessType || "not given").slice(0, 60)}`,
    `Source: ${source}`,
    `Time: ${fmtIst(lead.createdAt || new Date())}`,
    adminLeadLink(lead.ref, siteUrl),
  ].join("\n");
}

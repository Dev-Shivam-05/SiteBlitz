import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { bearerMatches } from "@/lib/cron";
import { buildBriefText } from "@/lib/brief";
import { notificationCounts, retryNotifications } from "@/lib/notify";
import { SITE } from "@/lib/site";
import { sendTelegram, telegramConfig } from "@/lib/telegram";
import { loadTodayData } from "@/lib/todayData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Daily brief, 08:00 IST (vercel.json cron "30 2 * * *"). Lives outside /api/admin, so the admin
 *  middleware does not cover it: the CRON_SECRET bearer token is its only gate. Vercel Cron sends
 *  `Authorization: Bearer $CRON_SECRET` automatically once that env var is set. */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || "";
  if (!secret) {
    return NextResponse.json({ ok: false, error: "cron_not_configured" }, { status: 503 });
  }
  if (!bearerMatches(req.headers.get("authorization"), secret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }

  try {
    await dbConnect();
    const now = new Date();
    // (a) retry undelivered new-lead alerts first, so the counts below are current
    const retry = await retryNotifications(now).catch(() => null);
    const [data, alerts] = await Promise.all([loadTodayData(now), notificationCounts()]);
    const text = buildBriefText({
      now,
      siteUrl: SITE.url,
      newYesterday: data.newYesterday,
      overdue: data.buckets.overdue.length,
      dueToday: data.buckets.dueToday.length,
      untouchedNew: data.buckets.new.length,
      noNextAction: data.buckets.noNextAction.length,
      concepts: data.concepts,
      adSpend: data.adSpend,
      alerts,
      retry,
    });

    // (b) one summary message per configured chat
    const cfg = telegramConfig();
    if (!cfg) {
      return NextResponse.json({ ok: true, delivered: 0, telegram: "telegram_not_configured", retry, text });
    }
    const results = await Promise.all(cfg.chatIds.map((id) => sendTelegram(cfg.token, id, text)));
    const delivered = results.filter((r) => r.ok).length;
    const errors = results.flatMap((r) => (r.ok ? [] : [r.error]));
    return NextResponse.json({ ok: true, delivered, recipients: cfg.chatIds.length, errors, retry, text });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

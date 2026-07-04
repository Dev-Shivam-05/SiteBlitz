import { NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, AnalyticsEvent } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const liveSince = new Date(Date.now() - 5 * 60 * 1000);
  const feedSince = new Date(Date.now() - 30 * 60 * 1000);

  try {
    await dbConnect();
    const [liveSessions, recentViews, recentEvents] = await Promise.all([
      Session.find({ isBot: { $ne: true }, lastSeen: { $gte: liveSince } })
        .sort({ lastSeen: -1 })
        .limit(50)
        .lean(),
      Pageview.find({ ts: { $gte: feedSince } }).sort({ ts: -1 }).limit(40).lean(),
      AnalyticsEvent.find({ ts: { $gte: feedSince } }).sort({ ts: -1 }).limit(40).lean(),
    ]);

    const feed = [
      ...recentViews.map((p) => ({
        kind: "pageview" as const,
        sid: p.sid,
        label: p.path,
        ts: p.ts,
      })),
      ...recentEvents.map((e) => ({
        kind: "event" as const,
        sid: e.sid,
        label: e.name,
        meta: e.meta,
        ts: e.ts,
      })),
    ]
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, 60);

    return NextResponse.json({ ok: true, liveSessions, feed });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

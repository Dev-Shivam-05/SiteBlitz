import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, AnalyticsEvent, Lead } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get("days")) || 30, 1), 90);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    await dbConnect();

    const [sessions, engaged, intentSids, formStartSids, leadSids, wonCount] = await Promise.all([
      Session.countDocuments({ isBot: { $ne: true }, firstSeen: { $gte: since } }),
      Session.countDocuments({
        isBot: { $ne: true },
        firstSeen: { $gte: since },
        $or: [{ pageviewCount: { $gte: 2 } }, { totalDuration: { $gte: 30 } }],
      }),
      Pageview.distinct("sid", {
        ts: { $gte: since },
        path: { $in: ["/pricing", "/contact"] },
      }),
      AnalyticsEvent.distinct("sid", { ts: { $gte: since }, name: "form_start" }),
      Lead.distinct("sid", { createdAt: { $gte: since } }),
      Lead.countDocuments({ createdAt: { $gte: since }, status: "won" }),
    ]);

    const leads = await Lead.countDocuments({ createdAt: { $gte: since } });

    return NextResponse.json({
      ok: true,
      days,
      stages: [
        { key: "visited", label: "Visited the site", count: sessions },
        { key: "engaged", label: "Engaged (30s+ or 2+ pages)", count: engaged },
        { key: "intent", label: "Viewed pricing / contact", count: intentSids.length },
        { key: "form_start", label: "Started the form", count: formStartSids.length },
        { key: "lead", label: "Became a lead", count: leads },
        { key: "won", label: "Won 🏆", count: wonCount },
      ],
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

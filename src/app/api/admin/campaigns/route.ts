import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Session, Lead } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get("days")) || 30, 1), 90);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    await dbConnect();
    const [campaigns, referrers, leadsBySource] = await Promise.all([
      Session.aggregate([
        {
          $match: {
            isBot: { $ne: true },
            firstSeen: { $gte: since },
            "attribution.utmSource": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: {
              source: "$attribution.utmSource",
              medium: "$attribution.utmMedium",
              campaign: "$attribution.utmCampaign",
            },
            sessions: { $sum: 1 },
            avgDuration: { $avg: "$totalDuration" },
          },
        },
        { $sort: { sessions: -1 } },
        { $limit: 30 },
      ]),
      Session.aggregate([
        {
          $match: {
            isBot: { $ne: true },
            firstSeen: { $gte: since },
            "attribution.referrerHost": { $exists: true, $nin: [null, ""] },
          },
        },
        { $group: { _id: "$attribution.referrerHost", sessions: { $sum: 1 } } },
        { $sort: { sessions: -1 } },
        { $limit: 20 },
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $ifNull: ["$source.utmSource", "organic/direct"] }, n: { $sum: 1 } } },
        { $sort: { n: -1 } },
      ]),
    ]);

    return NextResponse.json({
      ok: true,
      days,
      campaigns: campaigns.map((c) => ({
        source: c._id.source,
        medium: c._id.medium || "—",
        campaign: c._id.campaign || "—",
        sessions: c.sessions,
        avgDuration: Math.round(c.avgDuration || 0),
      })),
      referrers: referrers.map((r) => ({ host: r._id, sessions: r.sessions })),
      leadsBySource: leadsBySource.map((l) => ({ source: l._id, n: l.n })),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

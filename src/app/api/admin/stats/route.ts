import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, AnalyticsEvent, Lead } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }

  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get("days")) || 7, 1), 90);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const prevSince = new Date(Date.now() - 2 * days * 24 * 60 * 60 * 1000);
  const liveSince = new Date(Date.now() - 5 * 60 * 1000);
  const humanMatch = { isBot: { $ne: true }, lastSeen: { $gte: since } };

  try {
    await dbConnect();

    const [
      totals,
      liveNow,
      series,
      topPages,
      sources,
      devices,
      countries,
      cities,
      browsers,
      topEvents,
      leadStats,
      recentLeads,
    ] = await Promise.all([
      Session.aggregate([
        { $match: humanMatch },
        {
          $group: {
            _id: null,
            sessions: { $sum: 1 },
            visitors: { $addToSet: "$visitorId" },
            pageviews: { $sum: "$pageviewCount" },
            totalDuration: { $sum: "$totalDuration" },
            bounces: { $sum: { $cond: [{ $lte: ["$pageviewCount", 1] }, 1, 0] } },
          },
        },
        {
          $project: {
            sessions: 1,
            visitors: { $size: "$visitors" },
            pageviews: 1,
            avgDuration: {
              $cond: [
                { $gt: ["$sessions", 0] },
                { $divide: ["$totalDuration", "$sessions"] },
                0,
              ],
            },
            bounceRate: {
              $cond: [
                { $gt: ["$sessions", 0] },
                { $multiply: [{ $divide: ["$bounces", "$sessions"] }, 100] },
                0,
              ],
            },
          },
        },
      ]),
      Session.countDocuments({ isBot: { $ne: true }, lastSeen: { $gte: liveSince } }),
      Pageview.aggregate([
        { $match: { ts: { $gte: since } } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: days <= 2 ? "%Y-%m-%d %H:00" : "%Y-%m-%d",
                date: "$ts",
                timezone: "Asia/Kolkata",
              },
            },
            views: { $sum: 1 },
            sessions: { $addToSet: "$sid" },
          },
        },
        { $project: { views: 1, sessions: { $size: "$sessions" } } },
        { $sort: { _id: 1 } },
      ]),
      Pageview.aggregate([
        { $match: { ts: { $gte: since } } },
        {
          $group: {
            _id: "$path",
            views: { $sum: 1 },
            avgDuration: { $avg: "$duration" },
            avgScroll: { $avg: "$scrollDepth" },
          },
        },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
      Session.aggregate([
        { $match: humanMatch },
        {
          $group: {
            _id: { source: "$attribution.source", medium: "$attribution.medium" },
            sessions: { $sum: 1 },
          },
        },
        { $sort: { sessions: -1 } },
        { $limit: 10 },
      ]),
      Session.aggregate([
        { $match: humanMatch },
        { $group: { _id: "$device.type", sessions: { $sum: 1 } } },
        { $sort: { sessions: -1 } },
      ]),
      Session.aggregate([
        { $match: { ...humanMatch, "geo.countryCode": { $exists: true, $ne: null } } },
        { $group: { _id: "$geo.countryCode", sessions: { $sum: 1 } } },
        { $sort: { sessions: -1 } },
        { $limit: 10 },
      ]),
      Session.aggregate([
        { $match: { ...humanMatch, "geo.city": { $exists: true, $ne: null } } },
        { $group: { _id: "$geo.city", sessions: { $sum: 1 } } },
        { $sort: { sessions: -1 } },
        { $limit: 8 },
      ]),
      Session.aggregate([
        { $match: humanMatch },
        { $group: { _id: "$device.browser", sessions: { $sum: 1 } } },
        { $sort: { sessions: -1 } },
        { $limit: 6 },
      ]),
      AnalyticsEvent.aggregate([
        { $match: { ts: { $gte: since } } },
        { $group: { _id: "$name", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Previous equal-length window, for trend deltas on the KPI cards
    const prev = await Session.aggregate([
      { $match: { isBot: { $ne: true }, lastSeen: { $gte: prevSince, $lt: since } } },
      {
        $group: {
          _id: null,
          sessions: { $sum: 1 },
          visitors: { $addToSet: "$visitorId" },
          pageviews: { $sum: "$pageviewCount" },
        },
      },
      { $project: { sessions: 1, visitors: { $size: "$visitors" }, pageviews: 1 } },
    ]);

    return NextResponse.json({
      ok: true,
      days,
      totals: totals[0] || {
        sessions: 0,
        visitors: 0,
        pageviews: 0,
        avgDuration: 0,
        bounceRate: 0,
      },
      prevTotals: prev[0] || { sessions: 0, visitors: 0, pageviews: 0 },
      liveNow,
      series: series.map((s) => ({ date: s._id, views: s.views, sessions: s.sessions })),
      topPages: topPages.map((p) => ({
        path: p._id,
        views: p.views,
        avgDuration: Math.round(p.avgDuration || 0),
        avgScroll: Math.round(p.avgScroll || 0),
      })),
      sources: sources.map((s) => ({
        source: s._id.source || "direct",
        medium: s._id.medium || "direct",
        sessions: s.sessions,
      })),
      devices: devices.map((d) => ({ type: d._id || "unknown", sessions: d.sessions })),
      countries: countries.map((c) => ({ code: c._id, sessions: c.sessions })),
      cities: cities.map((c) => ({ city: c._id, sessions: c.sessions })),
      browsers: browsers.map((b) => ({ browser: b._id || "Other", sessions: b.sessions })),
      topEvents: topEvents.map((e) => ({ name: e._id, count: e.count })),
      leads: {
        byStatus: Object.fromEntries(leadStats.map((l) => [l._id, l.count])),
        recent: recentLeads,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "stats_failed" },
      { status: 500 }
    );
  }
}

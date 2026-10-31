import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Session } from "@/lib/models";

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
  const match = { isBot: { $ne: true }, lastSeen: { $gte: since } };
  const group = (field: string, limit = 10) =>
    Session.aggregate([
      { $match: match },
      { $group: { _id: `$${field}`, n: { $sum: 1 } } },
      { $sort: { n: -1 } },
      { $limit: limit },
    ]);

  try {
    await dbConnect();
    const [os, browsers, devices, languages, screens, cities, countries, returning, heat, bots] =
      await Promise.all([
        group("device.os"),
        group("device.browser"),
        group("device.type"),
        group("language"),
        group("device.screen", 8),
        group("geo.city", 12),
        group("geo.countryCode", 12),
        Session.aggregate([
          { $match: match },
          { $group: { _id: "$visitorId", sessions: { $sum: 1 } } },
          {
            $group: {
              _id: null,
              newVisitors: { $sum: { $cond: [{ $eq: ["$sessions", 1] }, 1, 0] } },
              returningVisitors: { $sum: { $cond: [{ $gt: ["$sessions", 1] }, 1, 0] } },
            },
          },
        ]),
        Session.aggregate([
          { $match: match },
          {
            $group: {
              _id: {
                dow: { $dayOfWeek: { date: "$firstSeen", timezone: "Asia/Kolkata" } },
                hour: { $hour: { date: "$firstSeen", timezone: "Asia/Kolkata" } },
              },
              n: { $sum: 1 },
            },
          },
        ]),
        Session.countDocuments({ isBot: true, lastSeen: { $gte: since } }),
      ]);

    const clean = (rows: { _id: string | null; n: number }[]) =>
      rows.filter((r) => r._id).map((r) => ({ label: String(r._id), n: r.n }));

    return NextResponse.json({
      ok: true,
      days,
      os: clean(os),
      browsers: clean(browsers),
      devices: clean(devices),
      languages: clean(languages),
      screens: clean(screens),
      cities: clean(cities),
      countries: clean(countries),
      visitors: returning[0] || { newVisitors: 0, returningVisitors: 0 },
      heatmap: heat.map((h) => ({ dow: h._id.dow, hour: h._id.hour, n: h.n })),
      botSessions: bots,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

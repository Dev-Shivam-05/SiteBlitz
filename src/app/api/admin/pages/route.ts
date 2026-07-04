import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Pageview, Session } from "@/lib/models";

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
    const [pages, entries, exits] = await Promise.all([
      Pageview.aggregate([
        { $match: { ts: { $gte: since } } },
        {
          $group: {
            _id: "$path",
            views: { $sum: 1 },
            uniques: { $addToSet: "$sid" },
            avgDuration: { $avg: "$duration" },
            avgScroll: { $avg: "$scrollDepth" },
          },
        },
        {
          $project: {
            views: 1,
            uniques: { $size: "$uniques" },
            avgDuration: 1,
            avgScroll: 1,
          },
        },
        { $sort: { views: -1 } },
        { $limit: 50 },
      ]),
      Session.aggregate([
        { $match: { isBot: { $ne: true }, firstSeen: { $gte: since } } },
        { $group: { _id: "$entryPath", n: { $sum: 1 } } },
      ]),
      Session.aggregate([
        { $match: { isBot: { $ne: true }, lastSeen: { $gte: since } } },
        { $group: { _id: "$exitPath", n: { $sum: 1 } } },
      ]),
    ]);

    const entryMap = Object.fromEntries(entries.map((e) => [e._id, e.n]));
    const exitMap = Object.fromEntries(exits.map((e) => [e._id, e.n]));

    return NextResponse.json({
      ok: true,
      days,
      pages: pages.map((p) => ({
        path: p._id,
        views: p.views,
        uniques: p.uniques,
        avgDuration: Math.round(p.avgDuration || 0),
        avgScroll: Math.round(p.avgScroll || 0),
        entries: entryMap[p._id] || 0,
        exits: exitMap[p._id] || 0,
      })),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

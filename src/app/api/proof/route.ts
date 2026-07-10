import { NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, Setting } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public proof endpoint — everything here is shown on the site as
 *  verifiable first-party data. Counts only; nothing identifying. */

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export async function GET() {
  const headers = {
    "cache-control": "public, s-maxage=15, stale-while-revalidate=60",
  };
  const base = {
    builtAt: process.env.NEXT_PUBLIC_BUILD_TIME || null,
    commit: process.env.NEXT_PUBLIC_COMMIT || null,
  };
  if (!dbConfigured()) {
    return NextResponse.json({ ok: true, ...base, db: false }, { headers });
  }

  try {
    await dbConnect();
    const now = Date.now();
    const liveSince = new Date(now - 5 * 60 * 1000);
    const week = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const twoWeeks = new Date(now - 14 * 24 * 60 * 60 * 1000);
    const month = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const [liveNow, visitors7d, pageviews7d, vitalRows, capacity, daily] = await Promise.all([
      Session.countDocuments({ isBot: { $ne: true }, lastSeen: { $gte: liveSince } }),
      Session.distinct("visitorId", { isBot: { $ne: true }, lastSeen: { $gte: week } }).then(
        (v) => v.length
      ),
      Pageview.countDocuments({ ts: { $gte: week } }),
      Pageview.find({ ts: { $gte: twoWeeks }, "vitals.lcp": { $exists: true } })
        .sort({ ts: -1 })
        .limit(500)
        .select("vitals")
        .lean(),
      Setting.findOne({ key: "capacity" }).lean(),
      Pageview.aggregate([
        { $match: { ts: { $gte: month } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$ts", timezone: "Asia/Kolkata" },
            },
            n: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const lcps = vitalRows.map((r) => r.vitals?.lcp).filter((x): x is number => !!x);
    const clss = vitalRows
      .map((r) => r.vitals?.cls)
      .filter((x): x is number => x !== undefined && x !== null);
    const inps = vitalRows.map((r) => r.vitals?.inp).filter((x): x is number => !!x);

    return NextResponse.json(
      {
        ok: true,
        ...base,
        db: true,
        liveNow,
        visitors7d,
        pageviews7d,
        vitals: {
          samples: lcps.length,
          lcpMs: median(lcps),
          cls: clss.length ? (median(clss)! / 1000).toFixed(3) : null,
          inpMs: median(inps),
        },
        capacity: (capacity?.value as { slots?: number; note?: string } | undefined) ?? null,
        daily: daily.map((d) => ({ day: d._id, n: d.n })),
      },
      { headers }
    );
  } catch {
    return NextResponse.json({ ok: true, ...base, db: false }, { headers });
  }
}

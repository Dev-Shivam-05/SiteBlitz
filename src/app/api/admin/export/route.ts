import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Lead, Pageview } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: Record<string, unknown>[], headers: string[]): string {
  const lines = [headers.join(",")];
  for (const r of rows) lines.push(headers.map((h) => csvEscape(r[h])).join(","));
  return lines.join("\n");
}

export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const type = req.nextUrl.searchParams.get("type") || "leads";
  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get("days")) || 90, 1), 365);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    await dbConnect();
    let csv = "";
    let filename = "";

    if (type === "leads") {
      const leads = await Lead.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).lean();
      csv = toCsv(
        leads.map((l) => ({
          date: l.createdAt?.toISOString(),
          name: l.name,
          phone: l.phone,
          email: l.email,
          business: l.businessType,
          goal: l.goal,
          budget: l.budget,
          plan: l.plan,
          status: l.status,
          score: l.score,
          message: l.message,
          country: l.source?.country,
          device: l.source?.device,
          utmSource: l.source?.utmSource,
        })),
        ["date", "name", "phone", "email", "business", "goal", "budget", "plan", "status", "score", "message", "country", "device", "utmSource"]
      );
      filename = `siteblitz-leads-${days}d.csv`;
    } else if (type === "sessions") {
      const sessions = await Session.find({ lastSeen: { $gte: since }, isBot: { $ne: true } })
        .sort({ lastSeen: -1 })
        .limit(5000)
        .lean();
      csv = toCsv(
        sessions.map((s) => ({
          firstSeen: s.firstSeen?.toISOString(),
          lastSeen: s.lastSeen?.toISOString(),
          pages: s.pageviewCount,
          durationSec: s.totalDuration,
          entry: s.entryPath,
          exit: s.exitPath,
          device: s.device?.type,
          browser: s.device?.browser,
          os: s.device?.os,
          country: s.geo?.countryCode,
          city: s.geo?.city,
          source: s.attribution?.source,
          medium: s.attribution?.medium,
          campaign: s.attribution?.utmCampaign,
          language: s.language,
        })),
        ["firstSeen", "lastSeen", "pages", "durationSec", "entry", "exit", "device", "browser", "os", "country", "city", "source", "medium", "campaign", "language"]
      );
      filename = `siteblitz-sessions-${days}d.csv`;
    } else if (type === "pageviews") {
      const views = await Pageview.find({ ts: { $gte: since } }).sort({ ts: -1 }).limit(10000).lean();
      csv = toCsv(
        views.map((p) => ({
          ts: p.ts?.toISOString(),
          path: p.path,
          title: p.title,
          durationSec: p.duration,
          scrollDepth: p.scrollDepth,
        })),
        ["ts", "path", "title", "durationSec", "scrollDepth"]
      );
      filename = `siteblitz-pageviews-${days}d.csv`;
    } else {
      return NextResponse.json({ ok: false, error: "unknown_type" }, { status: 400 });
    }

    return new NextResponse(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

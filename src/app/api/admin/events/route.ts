import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AnalyticsEvent } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const sp = req.nextUrl.searchParams;
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  const name = sp.get("name");
  const limit = 50;

  try {
    await dbConnect();
    const q = name ? { name } : {};
    const [events, total] = await Promise.all([
      AnalyticsEvent.find(q)
        .sort({ ts: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      AnalyticsEvent.countDocuments(q),
    ]);
    return NextResponse.json({ ok: true, events, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

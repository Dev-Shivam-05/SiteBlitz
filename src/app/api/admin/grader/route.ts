import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { GraderRun } from "@/lib/models";

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
    const runs = await GraderRun.find({ ts: { $gte: since } }).sort({ ts: -1 }).limit(200).lean();
    return NextResponse.json({ ok: true, runs });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

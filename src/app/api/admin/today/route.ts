import { NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { loadTodayData } from "@/lib/todayData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  try {
    await dbConnect();
    return NextResponse.json({ ok: true, ...(await loadTodayData()) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

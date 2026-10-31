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
  const sp = req.nextUrl.searchParams;
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  const days = Math.min(Math.max(Number(sp.get("days")) || 7, 1), 90);
  const bots = sp.get("bots") === "1";
  const limit = 25;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    await dbConnect();
    const q = { lastSeen: { $gte: since }, ...(bots ? {} : { isBot: { $ne: true } }) };
    const [sessions, total] = await Promise.all([
      Session.find(q)
        .sort({ lastSeen: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Session.countDocuments(q),
    ]);
    return NextResponse.json({ ok: true, sessions, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

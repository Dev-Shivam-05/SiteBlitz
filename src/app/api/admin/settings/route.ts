import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Setting } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  try {
    await dbConnect();
    const rows = await Setting.find().lean();
    return NextResponse.json({
      ok: true,
      settings: Object.fromEntries(rows.map((r) => [r.key, r.value])),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  try {
    const { key, value } = await req.json();
    if (!key || typeof key !== "string") {
      return NextResponse.json({ ok: false, error: "key required" }, { status: 400 });
    }
    await dbConnect();
    await Setting.updateOne(
      { key: key.slice(0, 60) },
      { $set: { value, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

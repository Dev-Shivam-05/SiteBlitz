import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Lead } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const sp = req.nextUrl.searchParams;
  const status = sp.get("status");
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  const limit = 25;

  try {
    await dbConnect();
    const q = status && status !== "all" ? { status } : {};
    const [leads, total] = await Promise.all([
      Lead.find(q)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Lead.countDocuments(q),
    ]);
    return NextResponse.json({ ok: true, leads, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

const PatchInput = z.object({
  id: z.string().min(8),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]).optional(),
  note: z.string().max(2000).optional(),
});

export async function PATCH(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  let input: z.infer<typeof PatchInput>;
  try {
    input = PatchInput.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  try {
    await dbConnect();
    const update: Record<string, unknown> = {};
    if (input.status) update.status = input.status;
    const ops: Record<string, unknown> = { $set: update };
    if (input.note) ops.$push = { notes: { text: input.note, at: new Date() } };
    const lead = await Lead.findByIdAndUpdate(input.id, ops, { new: true }).lean();
    if (!lead) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

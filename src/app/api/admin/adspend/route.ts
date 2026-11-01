import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdSpend } from "@/lib/models";
import { ymdToIstDate } from "@/lib/today";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Manual ad-spend ledger: the founder copies the media spend (ex-GST) from Meta Ads Manager.
 *  Totals are read through /api/admin/today. */
const SpendInput = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((s) => ymdToIstDate(s) !== null, "invalid date"),
  amountInr: z.number().min(0).max(1_000_000),
  note: z.string().trim().max(120).optional(),
});

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  let input: z.infer<typeof SpendInput>;
  try {
    input = SpendInput.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  try {
    await dbConnect();
    const entry = await AdSpend.create({
      day: input.day,
      amountInr: Math.round(input.amountInr * 100) / 100,
      note: input.note || undefined,
    });
    return NextResponse.json({ ok: true, entry: entry.toObject() }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

/** DELETE /api/admin/adspend?id=<entry id> — undo a mistyped entry. */
export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const id = req.nextUrl.searchParams.get("id") || "";
  if (!isValidObjectId(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }
  try {
    await dbConnect();
    const r = await AdSpend.deleteOne({ _id: id });
    if (!r.deletedCount) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

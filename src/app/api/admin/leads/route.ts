import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Lead } from "@/lib/models";
import { BUSINESS_TYPES, CLOSED_STATUSES, DEFAULT_NEXT_ACTION, LEAD_STATUSES, SOURCE_CODES, channelForCode } from "@/lib/leadops";
import { createLeadWithRef, findLeadsByPhone, leadSearchFilter } from "@/lib/leads";
import { notifyNewLead } from "@/lib/notify";
import { normalizeIndianPhone } from "@/lib/phone";
import { istYmd, ymdToIstDate } from "@/lib/today";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const sp = req.nextUrl.searchParams;
  const status = sp.get("status");
  const search = leadSearchFilter(sp.get("q") || "");
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  const limit = 25;

  try {
    await dbConnect();
    const q: Record<string, unknown> = {};
    if (status && status !== "all") q.status = status;
    if (search) Object.assign(q, search);
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

const ymd = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((s) => ymdToIstDate(s) !== null, "invalid date");

/** Quick-add (phone-first form at /admin/quick-add). */
const CreateInput = z.object({
  name: z.string().trim().min(2).max(120), // person or business name
  phone: z.string().max(30).refine((p) => normalizeIndianPhone(p) !== null, "invalid Indian mobile number"),
  sourceCode: z.enum(SOURCE_CODES),
  businessType: z.enum(BUSINESS_TYPES).optional().or(z.literal("")),
  status: z.enum(LEAD_STATUSES).default("new"),
  owner: z.string().trim().max(60).optional(),
  nextAction: z.string().trim().max(200).default(DEFAULT_NEXT_ACTION),
  nextActionAt: ymd.optional(), // defaults to today (IST) below
  note: z.string().trim().max(2000).optional(),
  // The form re-submits with this set after the founder has seen the duplicate warning.
  allowDuplicate: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  let input: z.infer<typeof CreateInput>;
  try {
    input = CreateInput.parse(await req.json());
  } catch (e) {
    const issue = e instanceof z.ZodError ? e.issues[0] : null;
    return NextResponse.json(
      { ok: false, error: issue ? `${issue.path.join(".") || "input"}: ${issue.message}` : "Invalid input" },
      { status: 400 }
    );
  }
  const phone = normalizeIndianPhone(input.phone)!; // validated above
  const now = new Date();

  try {
    await dbConnect();
    if (!input.allowDuplicate) {
      const existing = await findLeadsByPhone(phone);
      if (existing.length) {
        return NextResponse.json({ ok: false, error: "duplicate", existing }, { status: 409 });
      }
    }
    const closed = CLOSED_STATUSES.includes(input.status);
    const lead = await createLeadWithRef({
      name: input.name,
      phone,
      businessType: input.businessType || undefined,
      status: input.status,
      owner: input.owner || undefined,
      nextAction: closed ? undefined : input.nextAction || undefined,
      nextActionAt: closed ? undefined : ymdToIstDate(input.nextActionAt || istYmd(now))!,
      conceptAt: input.status === "concept" ? now : undefined,
      notes: input.note ? [{ text: input.note, at: now }] : [],
      lastContactAt: input.note ? now : undefined,
      score: 0,
      source: { code: input.sourceCode, channel: channelForCode(input.sourceCode) },
    });
    await notifyNewLead(lead); // never throws; capped at ~3 s
    return NextResponse.json({ ok: true, lead: lead.toObject() }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

const PatchInput = z.object({
  id: z.string().min(8),
  status: z.enum(LEAD_STATUSES).optional(),
  note: z.string().trim().max(2000).optional(),
  owner: z.string().trim().max(60).optional(), // "" clears
  nextAction: z.string().trim().max(200).optional(), // "" clears
  nextActionAt: ymd.nullable().optional(), // null clears
  valueInr: z.number().int().min(0).max(100_000_000).nullable().optional(), // null clears
  lostReason: z.string().trim().max(200).optional(), // "" clears
});

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  let input: z.infer<typeof PatchInput>;
  try {
    input = PatchInput.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  if (!isValidObjectId(input.id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }
  try {
    await dbConnect();
    const current = await Lead.findById(input.id).select("status").lean();
    if (!current) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    const now = new Date();
    const set: Record<string, unknown> = {};
    const unset: Record<string, 1> = {};
    const setOrClear = (key: string, v: unknown) => {
      if (v === undefined) return;
      if (v === null || v === "") unset[key] = 1;
      else set[key] = v;
    };
    setOrClear("owner", input.owner);
    setOrClear("nextAction", input.nextAction);
    setOrClear("nextActionAt", input.nextActionAt === undefined ? undefined : input.nextActionAt && ymdToIstDate(input.nextActionAt));
    setOrClear("valueInr", input.valueInr);
    setOrClear("lostReason", input.lostReason);

    if (input.status) {
      set.status = input.status;
      if (input.status === "concept" && current.status !== "concept") set.conceptAt = now;
      // A closed lead has nothing left to do, so it must drop off the Today lists.
      if (CLOSED_STATUSES.includes(input.status)) {
        delete set.nextActionAt;
        unset.nextActionAt = 1;
      }
    }
    if (input.note) set.lastContactAt = now;

    const ops: Record<string, unknown> = {};
    if (Object.keys(set).length) ops.$set = set;
    if (Object.keys(unset).length) ops.$unset = unset;
    if (input.note) ops.$push = { notes: { text: input.note, at: now } };
    if (!Object.keys(ops).length) return NextResponse.json({ ok: false, error: "nothing_to_update" }, { status: 400 });

    const lead = await Lead.findByIdAndUpdate(input.id, ops, { new: true, runValidators: true }).lean();
    if (!lead) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}

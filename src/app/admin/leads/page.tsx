"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, Search } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDate, sendJson } from "@/components/admin/useApi";
import { LEAD_STATUSES, formatInr, type LeadStatus } from "@/lib/leadops";
import { istDayStart, istYmd } from "@/lib/today";

interface LeadRow {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  businessType?: string;
  budget?: string;
  goal?: string;
  message?: string;
  plan?: string;
  status: LeadStatus;
  score: number;
  createdAt: string;
  notes?: { text: string; at: string }[];
  ref?: string;
  owner?: string;
  nextAction?: string;
  nextActionAt?: string;
  lastContactAt?: string;
  valueInr?: number;
  lostReason?: string;
  source?: { path?: string; utmSource?: string; country?: string; device?: string; code?: string; channel?: string };
}

interface LeadsResp {
  ok: boolean;
  leads: LeadRow[];
  total: number;
  page: number;
  pages: number;
}

const STATUSES = ["all", ...LEAD_STATUSES] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-volt/15 text-volt",
  contacted: "bg-blue-400/15 text-blue-300",
  qualified: "bg-violet/20 text-violet",
  demo: "bg-blue-400/10 text-ink",
  concept: "bg-yellow-300/10 text-yellow-300",
  quoted: "bg-violet/10 text-ink",
  won: "bg-emerald-400/15 text-emerald-300",
  lost: "bg-red-400/10 text-red-300",
};

const field =
  "w-full min-w-0 rounded-xl border border-line bg-void px-3 py-2 text-sm text-ink outline-none focus:border-volt";

function ScoreRing({ score }: { score: number }) {
  const hue = score > 70 ? "text-volt" : score > 40 ? "text-yellow-300" : "text-faint";
  return (
    <span className={`font-display text-sm font-bold tabular-nums ${hue}`} title="Lead score">
      {score}
    </span>
  );
}

function dueText(iso: string): { text: string; late: boolean } {
  const days = Math.round((istDayStart(new Date()).getTime() - istDayStart(new Date(iso)).getTime()) / 86_400_000);
  const date = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", timeZone: "Asia/Kolkata" }).format(new Date(iso));
  if (days === 0) return { text: "today", late: false };
  if (days > 0) return { text: `${date}, ${days}d late`, late: true };
  return { text: date, late: false };
}

type Patch = {
  status?: string;
  note?: string;
  owner?: string;
  nextAction?: string;
  nextActionAt?: string | null;
  valueInr?: number | null;
  lostReason?: string;
};

interface EditState {
  owner: string;
  nextAction: string;
  nextActionAt: string;
  valueInr: string;
  lostReason: string;
}

const editFrom = (l: LeadRow): EditState => ({
  owner: l.owner || "",
  nextAction: l.nextAction || "",
  nextActionAt: l.nextActionAt ? istYmd(new Date(l.nextActionAt)) : "",
  valueInr: l.valueInr !== undefined && l.valueInr !== null ? String(l.valueInr) : "",
  lostReason: l.lostReason || "",
});

export default function LeadsPage() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("all");
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [editFor, setEditFor] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);

  // Telegram alerts link here as /admin/leads?q=SB-XXXX. Read on mount rather than with
  // useSearchParams, which would need a Suspense boundary for the static build.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q") || "";
    if (initial) { setQInput(initial); setQ(initial); }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput.trim()); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const { data, error, reload } = useApi<LeadsResp>(
    `/api/admin/leads?status=${status}&page=${page}${q ? `&q=${encodeURIComponent(q)}` : ""}`,
    30_000
  );
  const d = data && data.ok ? data : null;

  /** Every write is checked. On failure the card keeps showing the server's old value and a
   *  visible error; on success the list is reloaded from the server. */
  const update = async (id: string, patch: Patch): Promise<boolean> => {
    setBusyId(id);
    setErrors((e) => { const n = { ...e }; delete n[id]; return n; });
    const r = await sendJson("/api/admin/leads", "PATCH", { id, ...patch });
    if (!r.ok) {
      setErrors((e) => ({ ...e, [id]: `Not saved: ${r.error}` }));
      setBusyId(null);
      return false;
    }
    await reload(true);
    setBusyId(null);
    return true;
  };

  const changeStatus = async (l: LeadRow, next: string) => {
    setPendingStatus((p) => ({ ...p, [l._id]: next }));
    await update(l._id, { status: next });
    setPendingStatus((p) => { const n = { ...p }; delete n[l._id]; return n; });
  };

  const saveNote = async (id: string) => {
    const text = noteText.trim();
    if (!text) return setNoteFor(null);
    if (await update(id, { note: text })) { setNoteFor(null); setNoteText(""); }
  };

  const saveEdit = async (l: LeadRow) => {
    if (!edit) return;
    const before = editFrom(l);
    const patch: Patch = {};
    if (edit.owner.trim() !== before.owner) patch.owner = edit.owner.trim();
    if (edit.nextAction.trim() !== before.nextAction) patch.nextAction = edit.nextAction.trim();
    if (edit.nextActionAt !== before.nextActionAt) patch.nextActionAt = edit.nextActionAt || null;
    if (edit.lostReason.trim() !== before.lostReason) patch.lostReason = edit.lostReason.trim();
    if (edit.valueInr.trim() !== before.valueInr) {
      if (edit.valueInr.trim() === "") patch.valueInr = null;
      else {
        const n = Number(edit.valueInr);
        if (!Number.isInteger(n) || n < 0) {
          return setErrors((e) => ({ ...e, [l._id]: "Value must be a whole number of rupees." }));
        }
        patch.valueInr = n;
      }
    }
    if (!Object.keys(patch).length) { setEditFor(null); return; }
    if (await update(l._id, patch)) { setEditFor(null); setEdit(null); }
  };

  return (
    <AdminShell>
      <PageHeader
        title="Leads"
        sub={d ? `${d.total} lead${d.total === 1 ? "" : "s"}${q ? ` matching “${q}”` : ""}` : "Every enquiry, captured and scored"}
        right={
          <div className="flex flex-wrap gap-1 rounded-2xl border border-line p-1">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                  status === s ? "bg-volt text-void" : "text-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
      />

      <label className="mb-4 flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 focus-within:border-volt">
        <Search size={16} className="shrink-0 text-faint" />
        <input
          type="search"
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="Search name, phone, ref or business"
          aria-label="Search leads"
          className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
        />
      </label>

      <DbNotice error={error} />

      <div className="space-y-3">
        {(d?.leads || []).map((l) => {
          const due = l.nextActionAt ? dueText(l.nextActionAt) : null;
          const shownStatus = pendingStatus[l._id] ?? l.status;
          return (
            <Card key={l._id} className="transition-colors hover:border-ink/20">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="min-w-0 break-words font-display text-lg font-bold">{l.name}</h3>
                    {l.ref && (
                      <span className="rounded-full border border-line px-2.5 py-1 font-display text-[10px] font-bold tracking-wider text-ink">
                        {l.ref}
                      </span>
                    )}
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[l.status] || "text-muted"}`}>
                      {l.status}
                    </span>
                    <ScoreRing score={l.score} />
                    {l.plan && (
                      <span className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted">
                        plan: {l.plan}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 break-words text-xs text-faint">
                    {[l.source?.code, l.businessType, l.goal, l.budget].filter(Boolean).join(" · ") || "No details"}
                    {" — "}{fmtDate(l.createdAt)}
                    {l.source?.country ? ` · from ${l.source.country}` : ""}
                    {l.source?.device ? ` · ${l.source.device}` : ""}
                  </p>
                  <p className="mt-1.5 break-words text-sm">
                    <span className="text-faint">Next: </span>
                    {l.nextAction || due ? (
                      <>
                        <span className="text-ink">{l.nextAction || "follow up"}</span>
                        {due && <span className={due.late ? "font-semibold text-red-300" : "text-muted"}> ({due.text})</span>}
                      </>
                    ) : (
                      <span className="text-yellow-300">{l.status === "won" || l.status === "lost" ? "closed" : "none set"}</span>
                    )}
                    {l.owner && <span className="text-faint"> · owner {l.owner}</span>}
                    {typeof l.valueInr === "number" && <span className="text-faint"> · {formatInr(l.valueInr)}</span>}
                  </p>
                  {l.status === "lost" && l.lostReason && <p className="mt-1 text-xs text-red-300/80">Lost: {l.lostReason}</p>}
                  {l.message && <p className="mt-2 max-w-xl break-words text-sm text-muted">“{l.message}”</p>}
                  {(l.notes || []).length > 0 && (
                    <div className="mt-2 space-y-1">
                      {l.notes!.slice(-2).map((n, i) => (
                        <p key={i} className="break-words text-xs text-faint">
                          📝 {n.text} <span className="opacity-60">({fmtDate(n.at)})</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex w-full min-w-0 flex-col items-start gap-3 sm:w-auto sm:shrink-0 sm:items-end">
                  <div className="flex flex-wrap gap-2">
                    {l.phone && (
                      <>
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-line p-2.5 text-muted transition-colors hover:border-volt/50 hover:text-volt"
                          title="WhatsApp"
                        >
                          <MessageCircle size={16} />
                        </a>
                        <a
                          href={`tel:${l.phone}`}
                          className="rounded-xl border border-line p-2.5 text-muted transition-colors hover:border-volt/50 hover:text-volt"
                          title="Call"
                        >
                          <Phone size={16} />
                        </a>
                      </>
                    )}
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="rounded-xl border border-line p-2.5 text-muted transition-colors hover:border-volt/50 hover:text-volt"
                        title="Email"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <select
                      value={shownStatus}
                      disabled={busyId === l._id}
                      onChange={(e) => changeStatus(l, e.target.value)}
                      aria-label="Status"
                      className="rounded-xl border border-line bg-void px-3 py-2 text-xs outline-none focus:border-volt"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const open = editFor === l._id;
                        setEditFor(open ? null : l._id);
                        setEdit(open ? null : editFrom(l));
                      }}
                      className="rounded-xl border border-line px-3 py-2 text-xs text-muted hover:text-ink"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setNoteFor(noteFor === l._id ? null : l._id); setNoteText(""); }}
                      className="rounded-xl border border-line px-3 py-2 text-xs text-muted hover:text-ink"
                    >
                      + Note
                    </button>
                  </div>
                </div>
              </div>

              {editFor === l._id && edit && (
                <form
                  onSubmit={(e) => { e.preventDefault(); saveEdit(l); }}
                  className="mt-4 grid grid-cols-1 gap-3 border-t border-line pt-4 sm:grid-cols-2"
                >
                  <label className="min-w-0 text-xs text-faint">
                    Next action
                    <input value={edit.nextAction} onChange={(e) => setEdit({ ...edit, nextAction: e.target.value })} className={`${field} mt-1`} placeholder="e.g. Send salon demo" />
                  </label>
                  <label className="min-w-0 text-xs text-faint">
                    Due date
                    <input type="date" value={edit.nextActionAt} onChange={(e) => setEdit({ ...edit, nextActionAt: e.target.value })} className={`${field} mt-1`} />
                  </label>
                  <label className="min-w-0 text-xs text-faint">
                    Owner
                    <input value={edit.owner} onChange={(e) => setEdit({ ...edit, owner: e.target.value })} className={`${field} mt-1`} placeholder="Founder / Partner" />
                  </label>
                  <label className="min-w-0 text-xs text-faint">
                    Value (₹)
                    <input type="number" inputMode="numeric" min={0} step={1} value={edit.valueInr} onChange={(e) => setEdit({ ...edit, valueInr: e.target.value })} className={`${field} mt-1`} />
                  </label>
                  {(l.status === "lost" || shownStatus === "lost") && (
                    <label className="min-w-0 text-xs text-faint sm:col-span-2">
                      Lost reason
                      <input value={edit.lostReason} onChange={(e) => setEdit({ ...edit, lostReason: e.target.value })} className={`${field} mt-1`} />
                    </label>
                  )}
                  <div className="flex flex-wrap gap-2 sm:col-span-2">
                    <button type="submit" disabled={busyId === l._id} className="btn-volt rounded-xl px-4 py-2.5 text-xs font-semibold disabled:opacity-50">
                      {busyId === l._id ? "Saving…" : "Save"}
                    </button>
                    <button type="button" onClick={() => { setEditFor(null); setEdit(null); }} className="rounded-xl border border-line px-4 py-2.5 text-xs text-muted hover:text-ink">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {noteFor === l._id && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <input
                    autoFocus
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveNote(l._id); }}
                    placeholder="e.g. Called — asked to follow up Friday"
                    className="min-w-0 flex-1 basis-48 rounded-xl border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-volt"
                  />
                  <button
                    onClick={() => saveNote(l._id)}
                    disabled={busyId === l._id}
                    className="btn-volt rounded-xl px-4 py-2.5 text-xs font-semibold disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              )}

              {errors[l._id] && (
                <p className="mt-3 text-sm font-semibold text-red-300" role="alert">{errors[l._id]}</p>
              )}
            </Card>
          );
        })}

        {d && d.leads.length === 0 && (
          <Card className="py-14 text-center text-sm text-faint">
            {q
              ? <>No leads match “{q}”.</>
              : <>No leads {status !== "all" ? `with status “${status}”` : "yet"}. They&apos;ll appear here
                the moment someone submits the contact form or you use Quick add.</>}
          </Card>
        )}
      </div>

      {d && d.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn-ghost rounded-full px-4 py-2 text-xs disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-xs text-muted">{page} / {d.pages}</span>
          <button
            disabled={page >= d.pages}
            onClick={() => setPage((p) => p + 1)}
            className="btn-ghost rounded-full px-4 py-2 text-xs disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </AdminShell>
  );
}

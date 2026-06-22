"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDate } from "@/components/admin/useApi";

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
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  score: number;
  createdAt: string;
  notes?: { text: string; at: string }[];
  source?: { path?: string; utmSource?: string; country?: string; device?: string };
}

interface LeadsResp {
  ok: boolean;
  leads: LeadRow[];
  total: number;
  page: number;
  pages: number;
}

const STATUSES = ["all", "new", "contacted", "qualified", "won", "lost"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-volt/15 text-volt",
  contacted: "bg-blue-400/15 text-blue-300",
  qualified: "bg-violet/20 text-violet",
  won: "bg-emerald-400/15 text-emerald-300",
  lost: "bg-red-400/10 text-red-300",
};

function ScoreRing({ score }: { score: number }) {
  const hue = score > 70 ? "text-volt" : score > 40 ? "text-yellow-300" : "text-faint";
  return (
    <span className={`font-display text-sm font-bold tabular-nums ${hue}`} title="Lead score">
      {score}
    </span>
  );
}

export default function LeadsPage() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("all");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const { data, error, reload } = useApi<LeadsResp>(
    `/api/admin/leads?status=${status}&page=${page}`,
    30_000
  );
  const d = data && data.ok ? data : null;

  const update = async (id: string, patch: { status?: string; note?: string }) => {
    setBusyId(id);
    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      await reload(true);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminShell>
      <PageHeader
        title="Leads"
        sub={d ? `${d.total} lead${d.total === 1 ? "" : "s"}` : "Every enquiry, captured and scored"}
        right={
          <div className="flex flex-wrap rounded-full border border-line p-1">
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

      <DbNotice error={error} />

      <div className="space-y-3">
        {(d?.leads || []).map((l) => (
          <Card key={l._id} className="transition-colors hover:border-ink/20">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-bold">{l.name}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[l.status]}`}>
                    {l.status}
                  </span>
                  <ScoreRing score={l.score} />
                  {l.plan && (
                    <span className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted">
                      plan: {l.plan}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-faint">
                  {[l.businessType, l.goal, l.budget].filter(Boolean).join(" · ") || "No details"}
                  {" — "}{fmtDate(l.createdAt)}
                  {l.source?.country ? ` · from ${l.source.country}` : ""}
                  {l.source?.device ? ` · ${l.source.device}` : ""}
                </p>
                {l.message && <p className="mt-2 max-w-xl text-sm text-muted">“{l.message}”</p>}
                {(l.notes || []).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {l.notes!.slice(-2).map((n, i) => (
                      <p key={i} className="text-xs text-faint">
                        📝 {n.text} <span className="opacity-60">({fmtDate(n.at)})</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <div className="flex gap-2">
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
                <div className="flex items-center gap-2">
                  <select
                    value={l.status}
                    disabled={busyId === l._id}
                    onChange={(e) => update(l._id, { status: e.target.value })}
                    className="rounded-xl border border-line bg-void px-3 py-2 text-xs outline-none focus:border-volt"
                  >
                    {STATUSES.filter((s) => s !== "all").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => { setNoteFor(noteFor === l._id ? null : l._id); setNoteText(""); }}
                    className="rounded-xl border border-line px-3 py-2 text-xs text-muted hover:text-ink"
                  >
                    + Note
                  </button>
                </div>
              </div>
            </div>

            {noteFor === l._id && (
              <div className="mt-4 flex gap-2">
                <input
                  autoFocus
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && noteText.trim()) {
                      update(l._id, { note: noteText.trim() });
                      setNoteFor(null);
                    }
                  }}
                  placeholder="e.g. Called — asked to follow up Friday"
                  className="flex-1 rounded-xl border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-volt"
                />
                <button
                  onClick={() => {
                    if (noteText.trim()) update(l._id, { note: noteText.trim() });
                    setNoteFor(null);
                  }}
                  className="btn-volt rounded-xl px-4 py-2.5 text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            )}
          </Card>
        ))}

        {d && d.leads.length === 0 && (
          <Card className="py-14 text-center text-sm text-faint">
            No leads {status !== "all" ? `with status “${status}”` : "yet"}. They&apos;ll appear here
            the moment someone submits the contact form.
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

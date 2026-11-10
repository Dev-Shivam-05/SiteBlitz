"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { LEAD_STATUSES, formatInr, type LeadStatus } from "@/lib/leadops";
import { istDayStart } from "@/lib/today";
import { sendJson } from "./useApi";

export interface BoardLead {
  _id: string;
  name: string;
  ref?: string;
  phone?: string;
  businessType?: string;
  status: LeadStatus;
  score: number;
  nextAction?: string;
  nextActionAt?: string;
  valueInr?: number;
  owner?: string;
}

interface Column {
  leads: BoardLead[];
  total: number;
}

const DOT: Record<LeadStatus, string> = {
  new: "bg-volt",
  contacted: "bg-blue-300",
  qualified: "bg-violet",
  demo: "bg-blue-200",
  concept: "bg-yellow-300",
  quoted: "bg-violet/60",
  won: "bg-emerald-300",
  lost: "bg-red-300",
};

function late(iso?: string) {
  if (!iso) return false;
  return istDayStart(new Date(iso)).getTime() < istDayStart(new Date()).getTime();
}

/** Leads board (spec v4 row 14): one column per status (first 25 each, newest first, the same search as the list).
 *  Drag a card to another column, or use its status menu (keyboard and touch), and the same PATCH as the list's
 *  status select runs; the card moves at once and moves back with an error if the server refuses. */
export function LeadBoard({ q, onOpen }: { q: string; onOpen: (lead: BoardLead) => void }) {
  const [cols, setCols] = useState<Record<string, Column>>({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const qs = q ? `&q=${encodeURIComponent(q)}` : "";
    const results = await Promise.all(
      LEAD_STATUSES.map(async (st) => {
        try {
          const r = await fetch(`/api/admin/leads?status=${st}&page=1${qs}`, { cache: "no-store" });
          const j = await r.json();
          return [st, j.ok ? { leads: j.leads as BoardLead[], total: j.total as number } : { leads: [], total: 0 }] as const;
        } catch {
          return [st, { leads: [], total: 0 }] as const;
        }
      })
    );
    setCols(Object.fromEntries(results));
    setLoaded(true);
  }, [q]);

  useEffect(() => {
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, [load]);

  const move = async (lead: BoardLead, to: LeadStatus) => {
    if (lead.status === to) return;
    const from = lead.status;
    const shift = (prev: Record<string, Column>, a: LeadStatus, b: LeadStatus, l: BoardLead): Record<string, Column> => ({
      ...prev,
      [a]: { leads: prev[a].leads.filter((x) => x._id !== l._id), total: Math.max(0, prev[a].total - 1) },
      [b]: { leads: [{ ...l, status: b }, ...prev[b].leads], total: prev[b].total + 1 },
    });
    setError(null);
    setBusy(lead._id);
    setCols((prev) => shift(prev, from, to, lead));
    const r = await sendJson("/api/admin/leads", "PATCH", { id: lead._id, status: to });
    if (!r.ok) {
      setCols((prev) => shift(prev, to, from, { ...lead, status: to }));
      setError(`${lead.name} was not moved: ${r.error}`);
    }
    setBusy(null);
  };

  return (
    <div>
      {error && (
        <p role="alert" className="mb-3 rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}
      {!loaded && <p className="text-sm text-faint">Loading the board…</p>}
      <div className="admin-scroll -mx-4 flex gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        {LEAD_STATUSES.map((st) => {
          const col = cols[st] || { leads: [], total: 0 };
          return (
            <section
              key={st}
              aria-label={`${st}: ${col.total}`}
              data-board-col={st}
              onDragOver={(e) => {
                if (!dragId) return;
                e.preventDefault();
                setOver(st);
              }}
              onDragLeave={() => setOver((o) => (o === st ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                const id = e.dataTransfer.getData("text/plain");
                const lead = Object.values(cols).flatMap((c) => c.leads).find((l) => l._id === id);
                if (lead) move(lead, st);
              }}
              className={`board-col rounded-2xl border border-line bg-surface/60 p-2.5 ${over === st ? "is-over" : ""}`}
            >
              <header className="flex items-center gap-2 px-1.5 pb-2.5 pt-1">
                <span className={`h-2 w-2 rounded-full ${DOT[st]}`} aria-hidden />
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">{st}</h3>
                <span className="ml-auto rounded-full bg-raised px-2 py-0.5 text-[11px] tabular-nums text-muted">{col.total}</span>
              </header>
              <div className="flex min-h-24 flex-col gap-2">
                {col.leads.map((l) => (
                  <article
                    key={l._id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", l._id);
                      e.dataTransfer.effectAllowed = "move";
                      setDragId(l._id);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOver(null);
                    }}
                    className={`board-card cursor-grab rounded-xl border border-line bg-raised p-3 ${dragId === l._id ? "is-dragging" : ""} ${
                      busy === l._id ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button onClick={() => onOpen(l)} className="min-w-0 text-left text-sm font-semibold text-ink hover:text-volt">
                        <span className="block truncate">{l.name}</span>
                      </button>
                      <span
                        title="Lead score"
                        className={`shrink-0 text-xs font-bold tabular-nums ${l.score > 70 ? "text-volt" : l.score > 40 ? "text-yellow-300" : "text-faint"}`}
                      >
                        {l.score}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-faint">{[l.ref, l.businessType].filter(Boolean).join(" · ") || "No details"}</p>
                    {(l.nextAction || l.nextActionAt) && (
                      <p className={`mt-2 truncate text-xs ${late(l.nextActionAt) ? "font-semibold text-red-300" : "text-muted"}`}>
                        → {l.nextAction || "follow up"}
                      </p>
                    )}
                    <div className="mt-2.5 flex items-center gap-2">
                      {typeof l.valueInr === "number" && <span className="text-[11px] tabular-nums text-muted">{formatInr(l.valueInr)}</span>}
                      <select
                        value={l.status}
                        onChange={(e) => move(l, e.target.value as LeadStatus)}
                        disabled={busy === l._id}
                        aria-label={`Move ${l.name} to another status`}
                        className="ml-auto max-w-[96px] rounded-lg border border-line bg-void px-1.5 py-1 text-[11px] text-muted outline-none focus:border-volt"
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {l.phone && (
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${l.name}`}
                          className="rounded-lg border border-line p-1.5 text-muted hover:border-volt/50 hover:text-volt"
                        >
                          <MessageCircle size={13} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
                {col.total > col.leads.length && (
                  <p className="px-1 py-1 text-[11px] text-faint">+{col.total - col.leads.length} more in the list view</p>
                )}
                {loaded && col.total === 0 && <p className="px-1 py-6 text-center text-[11px] text-faint">Drop a lead here</p>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

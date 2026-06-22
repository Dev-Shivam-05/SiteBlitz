"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet, Bot, X } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDuration, fmtDate, flagEmoji } from "@/components/admin/useApi";

interface SessionRow {
  sid: string;
  firstSeen: string;
  lastSeen: string;
  pageviewCount: number;
  totalDuration: number;
  entryPath?: string;
  exitPath?: string;
  device?: { type?: string; browser?: string; os?: string; screen?: string };
  geo?: { countryCode?: string; city?: string; region?: string; timezone?: string };
  attribution?: { source?: string; medium?: string; referrerHost?: string; utmCampaign?: string; landingPage?: string };
  language?: string;
  isBot?: boolean;
}

interface VisitorsResp {
  ok: boolean;
  sessions: SessionRow[];
  total: number;
  page: number;
  pages: number;
}

interface DetailResp {
  ok: boolean;
  session: SessionRow;
  pageviews: { path: string; title?: string; ts: string; duration?: number; scrollDepth?: number }[];
  events: { name: string; path?: string; ts: string; meta?: Record<string, unknown> }[];
  lead?: { name: string; status: string } | null;
}

function DeviceIcon({ type }: { type?: string }) {
  const cls = "text-muted";
  if (type === "mobile") return <Smartphone size={15} className={cls} />;
  if (type === "tablet") return <Tablet size={15} className={cls} />;
  if (type === "bot") return <Bot size={15} className={cls} />;
  return <Monitor size={15} className={cls} />;
}

function Detail({ sid, onClose }: { sid: string; onClose: () => void }) {
  const { data } = useApi<DetailResp>(`/api/admin/visitors/${sid}`);
  const d = data && data.ok ? data : null;
  const timeline = d
    ? [
        ...d.pageviews.map((p) => ({ t: new Date(p.ts).getTime(), kind: "page" as const, ...p })),
        ...d.events.map((e) => ({ t: new Date(e.ts).getTime(), kind: "event" as const, ...e })),
      ].sort((a, b) => a.t - b.t)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-void/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="admin-scroll h-full w-full max-w-lg overflow-y-auto border-l border-line bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Session journey</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-raised hover:text-ink">
            <X size={18} />
          </button>
        </div>

        {!d ? (
          <p className="mt-6 text-sm text-faint">Loading…</p>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-raised p-3">
                <p className="text-[10px] uppercase tracking-wider text-faint">Location</p>
                <p className="mt-1">
                  {flagEmoji(d.session.geo?.countryCode)} {d.session.geo?.city || "Unknown"}
                  {d.session.geo?.countryCode ? `, ${d.session.geo.countryCode}` : ""}
                </p>
              </div>
              <div className="rounded-xl bg-raised p-3">
                <p className="text-[10px] uppercase tracking-wider text-faint">Device</p>
                <p className="mt-1">
                  {d.session.device?.type} · {d.session.device?.browser} · {d.session.device?.os}
                </p>
              </div>
              <div className="rounded-xl bg-raised p-3">
                <p className="text-[10px] uppercase tracking-wider text-faint">Source</p>
                <p className="mt-1">
                  {d.session.attribution?.source || "direct"} ({d.session.attribution?.medium || "—"})
                </p>
              </div>
              <div className="rounded-xl bg-raised p-3">
                <p className="text-[10px] uppercase tracking-wider text-faint">Time on site</p>
                <p className="mt-1">{fmtDuration(d.session.totalDuration)}</p>
              </div>
            </div>

            {d.lead && (
              <div className="mt-4 rounded-xl border border-volt/30 bg-volt/5 p-3 text-sm">
                🎯 This visitor became a lead: <span className="font-semibold">{d.lead.name}</span>{" "}
                <span className="text-xs text-muted">({d.lead.status})</span>
              </div>
            )}

            <h3 className="mt-6 text-xs uppercase tracking-widest text-faint">Timeline</h3>
            <ol className="mt-3 space-y-0">
              {timeline.map((item, i) => (
                <li key={i} className="relative border-l border-line pb-4 pl-5">
                  <span
                    className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${
                      item.kind === "page" ? "bg-volt" : "bg-violet"
                    }`}
                  />
                  {item.kind === "page" ? (
                    <>
                      <p className="text-sm text-ink">{(item as { path: string }).path}</p>
                      <p className="text-xs text-faint">
                        {fmtDate(new Date(item.t))}
                        {"duration" in item && item.duration
                          ? ` · ${fmtDuration(item.duration as number)} · ${(item as { scrollDepth?: number }).scrollDepth || 0}% scrolled`
                          : ""}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-violet">⚡ {(item as { name: string }).name}</p>
                      <p className="text-xs text-faint">{fmtDate(new Date(item.t))}</p>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

export default function VisitorsPage() {
  const [page, setPage] = useState(1);
  const [days, setDays] = useState(7);
  const [selected, setSelected] = useState<string | null>(null);
  const { data, error } = useApi<VisitorsResp>(
    `/api/admin/visitors?page=${page}&days=${days}`,
    30_000
  );
  const d = data && data.ok ? data : null;

  return (
    <AdminShell>
      <PageHeader
        title="Visitors"
        sub={d ? `${d.total} sessions in the last ${days} days` : "Every session, every journey"}
        right={
          <div className="flex rounded-full border border-line p-1">
            {[1, 7, 30, 90].map((v) => (
              <button
                key={v}
                onClick={() => { setDays(v); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  days === v ? "bg-volt text-void" : "text-muted hover:text-ink"
                }`}
              >
                {v === 1 ? "24h" : `${v}d`}
              </button>
            ))}
          </div>
        }
      />

      <DbNotice error={error} />

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
              <th className="px-5 py-3.5">When</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Device</th>
              <th className="px-5 py-3.5">Source</th>
              <th className="px-5 py-3.5">Entry page</th>
              <th className="px-5 py-3.5 text-right">Pages</th>
              <th className="px-5 py-3.5 text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {(d?.sessions || []).map((s) => (
              <tr
                key={s.sid}
                onClick={() => setSelected(s.sid)}
                className="cursor-pointer border-b border-line/50 transition-colors hover:bg-raised"
              >
                <td className="px-5 py-3 text-muted">{fmtDate(s.lastSeen)}</td>
                <td className="px-5 py-3">
                  {flagEmoji(s.geo?.countryCode)}{" "}
                  <span className="text-ink">{s.geo?.city || s.geo?.countryCode || "Unknown"}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-2 text-muted">
                    <DeviceIcon type={s.device?.type} />
                    {s.device?.browser || "—"}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted">{s.attribution?.source || "direct"}</td>
                <td className="max-w-40 truncate px-5 py-3 text-muted">{s.entryPath || "/"}</td>
                <td className="px-5 py-3 text-right tabular-nums">{s.pageviewCount}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted">
                  {fmtDuration(s.totalDuration)}
                </td>
              </tr>
            ))}
            {d && d.sessions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-faint">
                  No visitors in this range yet. Share your site link and watch this fill up.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {d && d.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn-ghost rounded-full px-4 py-2 text-xs disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-xs text-muted">
            {page} / {d.pages}
          </span>
          <button
            disabled={page >= d.pages}
            onClick={() => setPage((p) => p + 1)}
            className="btn-ghost rounded-full px-4 py-2 text-xs disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}

      {selected && <Detail sid={selected} onClose={() => setSelected(null)} />}
    </AdminShell>
  );
}

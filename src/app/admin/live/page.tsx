"use client";

import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDuration, fmtDate, flagEmoji } from "@/components/admin/useApi";
import { LiveGlobe } from "@/components/admin/LiveGlobe";

interface LiveResp {
  ok: boolean;
  liveSessions: {
    sid: string;
    lastSeen: string;
    pageviewCount: number;
    totalDuration: number;
    exitPath?: string;
    entryPath?: string;
    device?: { type?: string; browser?: string };
    geo?: { countryCode?: string; city?: string };
    attribution?: { source?: string };
  }[];
  feed: { kind: "pageview" | "event"; sid: string; label: string; ts: string; meta?: Record<string, unknown> }[];
}

export default function LivePage() {
  const { data, error } = useApi<LiveResp>("/api/admin/live", 8_000);
  const d = data && data.ok ? data : null;

  return (
    <AdminShell>
      <PageHeader
        title="Live"
        sub="Who's on the site right now — refreshes every 8 seconds"
        right={
          <div className="flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-2">
            <span className="h-2.5 w-2.5 animate-pulse-soft rounded-full bg-volt" />
            <span className="font-display text-lg font-bold tabular-nums text-volt">
              {d?.liveSessions.length ?? 0}
            </span>
            <span className="text-xs text-muted">on site</span>
          </div>
        }
      />
      <DbNotice error={error} />

      {/* spec v4 row 13: the globe, with the same visitors as the list below */}
      <Card className="mb-4 overflow-hidden">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <LiveGlobe visitors={(d?.liveSessions || []).map((s) => ({ city: s.geo?.city, countryCode: s.geo?.countryCode }))} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">On the site now</p>
            <p className="admin-title mt-3 text-[clamp(64px,9vw,120px)] tabular-nums text-volt">{d?.liveSessions.length ?? 0}</p>
            <p className="mt-2 text-sm text-muted">
              {d && d.liveSessions.length === 0
                ? "Nobody right now. Each visitor appears as a volt dot on the globe."
                : "Each volt dot is a visitor in the last 5 minutes. Drag the globe to turn it."}
            </p>
            {d && d.liveSessions.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {d.liveSessions.slice(0, 12).map((s) => (
                  <li key={s.sid} className="rounded-full border border-line bg-raised px-3 py-1.5 text-xs">
                    {flagEmoji(s.geo?.countryCode)} {s.geo?.city || s.geo?.countryCode || "Unknown"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold">Active visitors (last 5 min)</h3>
          <div className="mt-3 space-y-2">
            {(d?.liveSessions || []).map((s) => (
              <div key={s.sid} className="flex items-center justify-between rounded-xl bg-raised px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate">
                    {flagEmoji(s.geo?.countryCode)}{" "}
                    <span className="text-ink">{s.geo?.city || "Unknown"}</span>
                    <span className="ml-2 text-xs text-faint">
                      {s.device?.type} · {s.device?.browser} · via {s.attribution?.source || "direct"}
                    </span>
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    Now on <span className="text-volt">{s.exitPath || s.entryPath || "/"}</span>
                    {" · "}{s.pageviewCount} pages · {fmtDuration(s.totalDuration)}
                  </p>
                </div>
                <span className="ml-3 shrink-0 text-[10px] uppercase tracking-wider text-faint">
                  {fmtDate(s.lastSeen)}
                </span>
              </div>
            ))}
            {d && d.liveSessions.length === 0 && (
              <p className="py-8 text-center text-sm text-faint">
                Nobody on the site at this moment. Share the link and watch this light up.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold">Live activity stream (last 30 min)</h3>
          <div className="admin-scroll mt-3 max-h-[32rem] space-y-0 overflow-y-auto pr-1">
            {(d?.feed || []).map((f, i) => (
              <div key={i} className="relative border-l border-line py-2 pl-5">
                <span
                  className={`absolute -left-[4.5px] top-3.5 h-2 w-2 rounded-full ${
                    f.kind === "pageview" ? "bg-volt" : "bg-violet"
                  }`}
                />
                <p className="text-sm">
                  {f.kind === "pageview" ? (
                    <>Viewed <span className="text-volt">{f.label}</span></>
                  ) : (
                    <>
                      <span className="text-violet">⚡ {f.label}</span>
                      {f.meta && "text" in f.meta && f.meta.text ? (
                        <span className="ml-1 text-xs text-faint">“{String(f.meta.text).slice(0, 40)}”</span>
                      ) : null}
                    </>
                  )}
                </p>
                <p className="text-[11px] text-faint">{fmtDate(f.ts)}</p>
              </div>
            ))}
            {d && d.feed.length === 0 && (
              <p className="py-8 text-center text-sm text-faint">No activity in the last 30 minutes.</p>
            )}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}

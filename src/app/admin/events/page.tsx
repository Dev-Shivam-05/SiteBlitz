"use client";

import { useState } from "react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDate } from "@/components/admin/useApi";

interface EventRow {
  _id: string;
  sid: string;
  name: string;
  path?: string;
  ts: string;
  meta?: Record<string, unknown>;
}

interface EventsResp {
  ok: boolean;
  events: EventRow[];
  total: number;
  page: number;
  pages: number;
}

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const { data, error } = useApi<EventsResp>(`/api/admin/events?page=${page}`, 20_000);
  const d = data && data.ok ? data : null;

  return (
    <AdminShell>
      <PageHeader
        title="Activity"
        sub="Raw event stream — every button click, form step and interaction"
      />
      <DbNotice error={error} />

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
              <th className="px-5 py-3.5">When</th>
              <th className="px-5 py-3.5">Event</th>
              <th className="px-5 py-3.5">Page</th>
              <th className="px-5 py-3.5">Details</th>
            </tr>
          </thead>
          <tbody>
            {(d?.events || []).map((e) => (
              <tr key={e._id} className="border-b border-line/50">
                <td className="whitespace-nowrap px-5 py-3 text-muted">{fmtDate(e.ts)}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-violet/15 px-2.5 py-1 text-xs text-violet">
                    {e.name}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted">{e.path || "—"}</td>
                <td className="max-w-72 truncate px-5 py-3 text-xs text-faint">
                  {e.meta ? JSON.stringify(e.meta) : "—"}
                </td>
              </tr>
            ))}
            {d && d.events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-faint">
                  No activity yet.
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

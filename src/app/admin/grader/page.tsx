"use client";

import { useState } from "react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDate } from "@/components/admin/useApi";

interface Run {
  _id: string;
  url: string;
  score?: number;
  categories?: { seo: number; performance: number; trust: number; ux: number };
  findings?: { check: string; ok: boolean; note: string }[];
  sid?: string;
  ts: string;
}

function scoreClass(n?: number) {
  if (n === undefined) return "text-faint";
  return n >= 80 ? "text-volt" : n >= 55 ? "text-yellow-300" : "text-red-300";
}

export default function GraderInboxPage() {
  const [days, setDays] = useState(30);
  const [open, setOpen] = useState<string | null>(null);
  const { data, error } = useApi<{ ok: boolean; runs: Run[] }>(`/api/admin/grader?days=${days}`, 30_000);
  const runs = data?.ok ? data.runs : [];

  return (
    <AdminShell>
      <PageHeader
        title="Grader inbox"
        sub="Every website someone audited with the free grader — these are warm leads"
        right={
          <div className="flex rounded-full border border-line p-1">
            {[7, 30, 90].map((v) => (
              <button
                key={v}
                onClick={() => setDays(v)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  days === v ? "bg-volt text-void" : "text-muted hover:text-ink"
                }`}
              >
                {v}d
              </button>
            ))}
          </div>
        }
      />
      <DbNotice error={error} />

      <Card className="p-0">
        {runs.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-faint">
            No grader runs in this window yet. Share /tools/grader — every run lands here with the
            full report.
          </p>
        )}
        <div className="divide-y divide-line/60">
          {runs.map((r) => {
            const failed = (r.findings || []).filter((f) => !f.ok);
            const isOpen = open === r._id;
            return (
              <div key={r._id}>
                <button
                  onClick={() => setOpen(isOpen ? null : r._id)}
                  className="flex w-full flex-wrap items-center gap-x-5 gap-y-1 px-5 py-3.5 text-left hover:bg-raised/50"
                >
                  <span className={`font-display w-12 text-xl font-bold tabular-nums ${scoreClass(r.score)}`}>
                    {r.score ?? "—"}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">{r.url}</span>
                  <span className="text-xs text-red-300">{failed.length} issues</span>
                  {r.categories && (
                    <span className="hidden gap-3 text-[11px] tabular-nums text-faint md:flex">
                      <span>SEO {r.categories.seo}</span>
                      <span>Perf {r.categories.performance}</span>
                      <span>Trust {r.categories.trust}</span>
                      <span>UX {r.categories.ux}</span>
                    </span>
                  )}
                  <span className="text-[11px] text-faint">{fmtDate(r.ts)}</span>
                  <span className={`text-volt transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="space-y-1.5 bg-void/40 px-5 pb-4 pt-1">
                    {(r.findings || []).filter((f) => !f.ok).map((f) => (
                      <p key={f.check} className="text-xs text-muted">
                        <span className="text-red-300">✕ {f.check}:</span> {f.note}
                      </p>
                    ))}
                    <div className="pt-2">
                      <a
                        className="text-xs text-volt hover:underline"
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Hi! We noticed ${r.url} scored ${r.score}/100 on our website audit. The top issues are fixable fast — want the free fix plan? — SiteBlitz`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Draft outreach message →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface Finding {
  check: string;
  ok: boolean;
  note: string;
  category: "seo" | "performance" | "trust" | "ux";
}
interface GradeResult {
  url: string;
  finalUrl: string;
  score: number;
  categories: { seo: number; performance: number; trust: number; ux: number };
  findings: Finding[];
  fetchMs: number;
  htmlKB: number;
}

const CAT_LABEL: Record<string, string> = {
  seo: "Search visibility",
  performance: "Speed",
  trust: "Trust signals",
  ux: "Mobile & UX",
};

function scoreColor(n: number) {
  return n >= 80 ? "text-volt" : n >= 55 ? "text-yellow-300" : "text-red-300";
}
function barColor(n: number) {
  return n >= 80 ? "bg-volt" : n >= 55 ? "bg-yellow-300" : "bg-red-400";
}

export function GraderTool() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);

  const run = async () => {
    if (!url.trim() || state === "running") return;
    setState("running");
    setError("");
    setResult(null);
    window.sbTrack?.("grader_run", { url: url.trim().slice(0, 120) });
    try {
      const r = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const j = await r.json();
      if (!j.ok) {
        setError(j.error || "Audit failed");
        setState("error");
        return;
      }
      setResult(j.result);
      setState("done");
      window.sbTrack?.("grader_done", { score: j.result.score });
    } catch {
      setError("Network hiccup — try once more.");
      setState("error");
    }
  };

  const failed = result?.findings.filter((f) => !f.ok) || [];

  return (
    <div>
      <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            inputMode="url"
            placeholder="yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            aria-label="Your website address"
            className="flex-1 rounded-full border border-line bg-void px-6 py-4 text-base text-ink outline-none placeholder:text-faint focus:border-volt"
          />
          <button
            onClick={run}
            disabled={state === "running"}
            data-track="grader_submit"
            className="btn-volt rounded-full px-8 py-4 text-base font-semibold disabled:opacity-60"
          >
            {state === "running" ? "Auditing…" : "Grade it free →"}
          </button>
        </div>
        <p className="mt-3 text-xs text-faint">
          ~20 real checks on the live page: titles, schema, speed signals, mobile setup, trust
          basics. No email required to see the result.
        </p>
        {state === "error" && <p className="mt-3 text-sm text-red-300">{error}</p>}
        {state === "running" && (
          <div className="mt-6 space-y-2" aria-live="polite">
            <p className="font-accent text-lg italic text-muted">Fetching the page like Google does…</p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-raised">
              <div className="h-full w-1/3 animate-marquee rounded-full bg-volt" />
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          {/* score header */}
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-8 md:flex-row md:p-10">
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,245,240,0.08)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={result.score >= 80 ? "#CCFF00" : result.score >= 55 ? "#fde047" : "#f87171"}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 326.7} 326.7`}
                />
              </svg>
              <div className="text-center">
                <p className={`font-display text-5xl font-bold tabular-nums ${scoreColor(result.score)}`}>
                  {result.score}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-faint">/ 100</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs text-faint">{result.finalUrl}</p>
              <p className="font-display mt-1 text-2xl font-bold md:text-3xl">
                {result.score >= 80
                  ? "Solid foundation — sharpen the edges."
                  : result.score >= 55
                    ? "Working, but leaking visitors."
                    : "This site is costing you business."}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {Object.entries(result.categories).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">{CAT_LABEL[k]}</span>
                      <span className={`font-display font-bold tabular-nums ${scoreColor(v)}`}>{v}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-raised">
                      <div className={`h-full rounded-full ${barColor(v)}`} style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* findings */}
          <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-lg font-bold">
              {failed.length === 0
                ? "Every check passed — genuinely rare."
                : `${failed.length} things to fix (found in ${(result.fetchMs / 1000).toFixed(1)}s)`}
            </h3>
            <div className="mt-4 space-y-2">
              {[...result.findings]
                .sort((a, b) => Number(a.ok) - Number(b.ok))
                .map((f) => (
                  <div
                    key={f.check}
                    className={`flex gap-3 rounded-xl border p-4 text-sm ${
                      f.ok ? "border-line/50 bg-void/40" : "border-red-400/20 bg-red-400/5"
                    }`}
                  >
                    <span className={f.ok ? "text-volt" : "text-red-300"}>{f.ok ? "✓" : "✕"}</span>
                    <div>
                      <p className="font-semibold text-ink">
                        {f.check}
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-faint">{CAT_LABEL[f.category]}</span>
                      </p>
                      <p className="mt-0.5 text-muted">{f.note}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* conversion */}
          <div className="rounded-3xl border border-volt/30 bg-surface p-8 text-center">
            <p className="font-display text-2xl font-bold">
              {failed.length > 0 ? (
                <>Every ✕ above is fixable in <span className="text-volt">one 48-hour build</span>.</>
              ) : (
                <>Imagine what we could do <span className="text-volt">beyond the basics</span>.</>
              )}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Send us this report — the brief call is free and you&rsquo;ll get the fix plan even
              if you never hire us.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" data-track="grader_to_book" className="btn-volt rounded-full px-7 py-3.5 text-sm font-semibold">
                Book the free brief →
              </Link>
              <a
                href={SITE.whatsapp(
                  `Hi SiteBlitz! I graded ${result.finalUrl} — it scored ${result.score}/100. Can we talk about fixing it?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-track="grader_to_wa"
                className="btn-ghost rounded-full px-7 py-3.5 text-sm text-ink"
              >
                WhatsApp the score →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

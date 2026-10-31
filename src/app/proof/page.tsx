import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview } from "@/lib/models";
import { SITE } from "@/lib/site";

// Fresh enough for a proof page, cheap enough for a public one: re-rendered
// at most once a minute instead of six Mongo queries per hit. The live-now
// number on the strip stays real-time via /api/proof polling.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Live Proof — Real Numbers, Publicly Measured",
  description:
    "SiteBlitz publishes its own live analytics: real visitors, real-user Core Web Vitals, and deploy history, measured on this site and published as it happens.",
  alternates: { canonical: "/proof" },
};

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function Sparkline({ points }: { points: { day: string; n: number }[] }) {
  if (points.length < 2) return null;
  const w = 640, h = 80, pad = 4;
  const max = Math.max(...points.map((p) => p.n), 1);
  const step = (w - pad * 2) / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(pad + i * step).toFixed(1)},${(h - pad - (p.n / max) * (h - pad * 2)).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Daily pageviews, last 30 days" role="img">
      <path d={`${path} L${w - pad},${h} L${pad},${h} Z`} fill="rgba(204,255,0,0.08)" stroke="none" />
      <path d={path} fill="none" stroke="#CCFF00" strokeWidth="1.5" />
      <circle
        cx={pad + (points.length - 1) * step}
        cy={h - pad - (points[points.length - 1].n / max) * (h - pad * 2)}
        r="3"
        fill="#CCFF00"
      />
    </svg>
  );
}

async function getData() {
  if (!dbConfigured()) return null;
  try {
    await dbConnect();
    const now = Date.now();
    const liveSince = new Date(now - 5 * 60 * 1000);
    const week = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const twoWeeks = new Date(now - 14 * 24 * 60 * 60 * 1000);
    const month = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const [liveNow, visitors7d, pageviews7d, sessions30d, vitalRows, daily] = await Promise.all([
      Session.countDocuments({ isBot: { $ne: true }, lastSeen: { $gte: liveSince } }),
      Session.distinct("visitorId", { isBot: { $ne: true }, lastSeen: { $gte: week } }).then((v) => v.length),
      Pageview.countDocuments({ ts: { $gte: week } }),
      Session.countDocuments({ isBot: { $ne: true }, lastSeen: { $gte: month } }),
      Pageview.find({ ts: { $gte: twoWeeks }, "vitals.lcp": { $exists: true } })
        .sort({ ts: -1 }).limit(500).select("vitals").lean(),
      Pageview.aggregate([
        { $match: { ts: { $gte: month } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$ts", timezone: "Asia/Kolkata" } }, n: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);
    const lcps = vitalRows.map((r) => r.vitals?.lcp).filter((x): x is number => !!x);
    const clss = vitalRows.map((r) => r.vitals?.cls).filter((x): x is number => x !== undefined && x !== null);
    const inps = vitalRows.map((r) => r.vitals?.inp).filter((x): x is number => !!x);
    return {
      liveNow, visitors7d, pageviews7d, sessions30d,
      vitals: { samples: lcps.length, lcpMs: median(lcps), cls: clss.length ? median(clss)! / 1000 : null, inpMs: median(inps) },
      daily: daily.map((d) => ({ day: d._id as string, n: d.n as number })),
    };
  } catch {
    return null;
  }
}

const COMMITMENTS = [
  { metric: "Largest Contentful Paint (mobile)", budget: "< 2.5 s", why: "Google's own 'good' threshold" },
  { metric: "Cumulative Layout Shift", budget: "< 0.05", why: "nothing jumps while you read" },
  { metric: "JavaScript on landing pages", budget: "< 150 KB", why: "phones on 4G stay fast" },
  { metric: "Server-rendered content", budget: "100%", why: "search engines see everything" },
  { metric: "Dead links / dead CTAs", budget: "0", why: "smoke-tested on every deploy" },
];

export default function ProofPage() {
  return (
    <Shell>
      <ProofContent />
    </Shell>
  );
}

async function ProofContent() {
  const d = await getData();
  const builtAt = process.env.NEXT_PUBLIC_BUILD_TIME;
  const commit = process.env.NEXT_PUBLIC_COMMIT;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
          Live proof
        </p>
        <h1
          className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          data-anim="chars"
          data-now
        >
          Real numbers<span className="text-volt">,</span> measured in public<span className="text-volt">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted" data-anim="fade-up" data-now data-delay="0.3">
          Most agency websites show you counters that animate to invented numbers. This page is
          the opposite: everything below is measured by our own analytics engine — the same one we
          build for clients — from real visits to this site.{" "}
          <span className="font-accent italic text-ink">No estimates. No decoration.</span>
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-volt/30 bg-surface p-6" data-anim="scale-in">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
              <p className="font-display text-4xl font-bold tabular-nums">{Math.max(d?.liveNow ?? 0, 1)}</p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-faint">people on this site right now</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6" data-anim="scale-in" data-delay="0.08">
            <p className="font-display text-4xl font-bold tabular-nums">{d?.visitors7d ?? "—"}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-faint">unique visitors, last 7 days</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6" data-anim="scale-in" data-delay="0.16">
            <p className="font-display text-4xl font-bold tabular-nums">{d?.pageviews7d ?? "—"}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-faint">pageviews, last 7 days</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6" data-anim="scale-in" data-delay="0.24">
            <p className="font-display text-4xl font-bold tabular-nums">{d?.sessions30d ?? "—"}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-faint">sessions, last 30 days</p>
          </div>
        </div>

        {d && d.daily.length > 1 && (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6" data-anim="fade-up">
            <p className="mb-4 text-xs uppercase tracking-widest text-faint">daily pageviews · last 30 days</p>
            <Sparkline points={d.daily} />
          </div>
        )}
      </section>

      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Speed, measured on <span className="font-accent italic text-volt">real visitors&rsquo;</span> devices
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted" data-anim="fade-up">
            Lab tests flatter everyone. These are field numbers — Core Web Vitals collected from
            actual people loading this site on their actual phones and laptops
            {d?.vitals.samples ? ` (median of the last ${d.vitals.samples} measured loads)` : ""}.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-void p-6">
              <p className="font-display text-4xl font-bold tabular-nums text-volt">
                {d?.vitals.lcpMs ? `${(d.vitals.lcpMs / 1000).toFixed(1)}s` : "collecting…"}
              </p>
              <p className="mt-2 text-sm text-ink">Largest Contentful Paint</p>
              <p className="mt-1 text-xs text-faint">how fast the main content appears · good &lt; 2.5s</p>
            </div>
            <div className="rounded-2xl border border-line bg-void p-6">
              <p className="font-display text-4xl font-bold tabular-nums text-volt">
                {d?.vitals.cls !== null && d?.vitals.cls !== undefined ? d.vitals.cls.toFixed(3) : "collecting…"}
              </p>
              <p className="mt-2 text-sm text-ink">Cumulative Layout Shift</p>
              <p className="mt-1 text-xs text-faint">how much the page jumps around · good &lt; 0.1</p>
            </div>
            <div className="rounded-2xl border border-line bg-void p-6">
              <p className="font-display text-4xl font-bold tabular-nums text-volt">
                {d?.vitals.inpMs ? `${d.vitals.inpMs}ms` : "collecting…"}
              </p>
              <p className="mt-2 text-sm text-ink">Interaction latency</p>
              <p className="mt-1 text-xs text-faint">how fast taps respond · good &lt; 200ms</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
          Our public performance budget
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted" data-anim="fade-up">
          Every SiteBlitz build — including this one — ships against these budgets. If we miss one,
          you&rsquo;ll see it on this page before we do damage control.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line" data-anim="fade-up">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-[11px] uppercase tracking-wider text-faint">
                <th className="px-5 py-3.5">Metric</th>
                <th className="px-5 py-3.5">Budget</th>
                <th className="px-5 py-3.5">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {COMMITMENTS.map((c) => (
                <tr key={c.metric} className="border-b border-line/50 last:border-0">
                  <td className="px-5 py-3 text-ink">{c.metric}</td>
                  <td className="px-5 py-3 font-display font-bold tabular-nums text-volt">{c.budget}</td>
                  <td className="px-5 py-3 text-muted">{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-faint" data-anim="fade-up">
          {builtAt && (
            <span>
              Last deployed:{" "}
              <b className="text-muted">
                {new Date(builtAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST
              </b>
            </span>
          )}
          {commit && <span>build <b className="font-display text-muted">{commit}</b></span>}
          <span>stack: Next.js 15 · MongoDB Atlas · Vercel edge</span>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Want your website measured like this?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted" data-anim="fade-up">
            Every site we ship includes this same first-party analytics engine — visitors, sources,
            funnels and Core Web Vitals — in your own private dashboard. Or start by grading your
            current site free.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4" data-anim="fade-up">
            <a href="/tools/grader" data-track="proof_to_grader" className="btn-volt rounded-full px-7 py-4 text-sm font-semibold">
              Grade my current website free →
            </a>
            <a
              href={SITE.whatsapp("Hi SiteBlitz! I saw your live proof page. Let's talk.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="proof_whatsapp"
              className="btn-ghost rounded-full px-7 py-4 text-sm text-ink"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

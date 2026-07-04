import { PROCESS_STEPS } from "@/lib/site";

export function Process() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">The process</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Brief on Monday<span className="text-volt">.</span>
            <br />
            Live by <span className="font-accent italic">Wednesday</span><span className="text-volt">.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative bg-void p-7 transition-colors duration-300 hover:bg-surface md:p-8"
              data-delay={String(i * 100)}
            >
              <span className="font-display text-5xl font-bold text-outline transition-colors duration-300 group-hover:text-volt group-hover:[-webkit-text-stroke:0]">
                {s.n}
              </span>
              <h3 className="font-display mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-volt">{s.time}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

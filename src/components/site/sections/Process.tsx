import { PROCESS_STEPS } from "@/lib/site";

export function Process() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">The process</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Brief on Monday<span className="text-volt">.</span>
            <br />
            Live by <span className="font-accent italic">Wednesday</span><span className="text-volt">.</span>
          </h2>
        </div>

        {/* scroll-driven progress line */}
        <div className="mt-14 hidden h-px w-full bg-line md:block">
          <div data-progress-line className="h-full w-full bg-volt" style={{ transform: "scaleX(0)" }} />
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-0 md:rounded-t-none md:border-t-0 lg:grid-cols-4 md:grid-cols-2 mt-14">
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              data-anim="fade-up"
              data-delay={String(i * 0.1)}
              className="group relative bg-void p-7 transition-colors duration-300 hover:bg-surface md:p-8"
            >
              <span className="font-display text-5xl font-bold text-outline transition-colors duration-300 group-hover:text-volt group-hover:[-webkit-text-stroke:0]">
                {s.n}
              </span>
              <h3 className="font-display mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-volt">{s.time}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.text}</p>
              <span className="absolute bottom-6 right-6 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-volt">
                ⟶
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

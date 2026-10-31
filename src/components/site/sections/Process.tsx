import { PROCESS_STEPS } from "@/lib/site";

/** Beat 3 — "from brief to live" as a sticky card stack (signature scene A, X1). Each step card pins,
 *  then compresses and dims as the next slides over it (Motion engine: [data-stack]). Reduced motion /
 *  no JS: four static cards in order. The SiteBlitz principle (formerly the Manifesto section) closes it. */
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
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Four steps, each with a fixed output. Launch-plan sites go from brief to live in as little as
            48 hours; bigger scopes follow the same steps on a longer clock.
          </p>
        </div>

        <div data-stack className="mt-14 flex flex-col gap-6 md:gap-8">
          {PROCESS_STEPS.map((s, i) => (
            <article
              key={s.n}
              data-stack-item
              className="sticky grid gap-6 overflow-hidden rounded-3xl border border-line bg-void p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-12"
              style={{ top: `${92 + i * 14}px` }}
            >
              <span className="font-display text-6xl font-bold leading-none text-outline md:w-36 md:text-8xl">{s.n}</span>
              <div>
                <h3 className="font-display text-2xl font-bold md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">{s.text}</p>
              </div>
              <p className="w-fit rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-volt">
                {s.time}
              </p>
            </article>
          ))}
        </div>

        <p
          className="font-accent mx-auto mt-20 max-w-4xl text-center text-2xl italic leading-snug text-ink md:mt-28 md:text-4xl"
          data-anim="words-scrub"
        >
          “Most business websites are digital brochures nobody reads. We build salespeople that never
          sleep — fast enough for Google, sharp enough for humans, measured down to every single visitor.”
        </p>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-faint" data-anim="fade-up">
          — The SiteBlitz principle
        </p>
      </div>
    </section>
  );
}

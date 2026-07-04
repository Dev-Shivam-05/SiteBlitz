import { TESTIMONIALS } from "@/lib/site";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="flex w-max gap-5 animate-marquee-slow"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((t, i) => (
          <figure
            key={i}
            className="w-[320px] shrink-0 rounded-2xl border border-line bg-surface p-6 md:w-[380px]"
          >
            <blockquote className="text-sm leading-relaxed text-ink">“{t.text}”</blockquote>
            <figcaption className="mt-4">
              <p className="font-display text-sm font-bold">{t.name}</p>
              <p className="text-xs text-faint">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">Client words</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            They took the <span className="font-accent italic">leap</span>
            <span className="text-volt">.</span>
          </h2>
        </div>
      </div>
      <div className="reveal mt-12 space-y-5" data-delay="150">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}

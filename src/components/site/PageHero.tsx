import type { CSSProperties, ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

/**
 * Inner-page opening in the v4 brand (SEO-3): breadcrumb trail, volt kicker, giant display H1 whose lines rise out of
 * a mask, a lead paragraph and an optional aside (the page's own "moment"). The entrance is CSS only (globals.css,
 * "page hero"): it runs at first paint without waiting for JavaScript, moves with transform alone so the H1 is painted
 * from the first frame, waits for the preloader on the first page of a session and is off under reduced motion.
 */
export function PageHero({
  crumbs,
  kicker,
  lines,
  lead,
  actions,
  aside,
  id = "page-title",
  size = "xl",
}: {
  crumbs: readonly Crumb[];
  kicker: string;
  /** One entry per visual line of the H1. */
  lines: ReactNode[];
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  id?: string;
  /** "lg" for long question-style headings (research), "xl" for short page names. */
  size?: "xl" | "lg";
}) {
  const scale =
    size === "lg"
      ? "text-[clamp(30px,7.6vw,52px)] md:text-[clamp(46px,4.4vw,84px)]"
      : "text-[clamp(40px,11vw,64px)] md:text-[clamp(64px,7vw,128px)]";
  return (
    <section aria-labelledby={id} className="page-hero relative overflow-clip bg-void pb-[9vh] pt-28 md:pb-[12vh] md:pt-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Breadcrumbs crumbs={crumbs} className="ph-soft" />
        <div className={`mt-8 grid items-end gap-12 md:mt-12 ${aside ? "lg:grid-cols-[1.25fr_1fr] lg:gap-16" : ""} [&>*]:min-w-0`}>
          <div>
            <p className="kicker ph-soft text-volt" style={i(1)}>
              {kicker}
            </p>
            <h1 id={id} className={`display mt-5 ${scale}`}>
              {lines.map((l, n) => (
                <span key={n} className="ph-mask">
                  <span className="ph-line" style={i(n + 1)}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <div className="ph-soft mt-8 max-w-[58ch] text-lg leading-relaxed text-ink/75 md:text-xl" style={i(lines.length + 1)}>
              {lead}
            </div>
            {actions && (
              <div className="ph-soft mt-9 flex flex-wrap items-center gap-3" style={i(lines.length + 2)}>
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className="ph-soft" style={i(lines.length + 2)}>
              {aside}
            </div>
          )}
        </div>
      </div>
      <span aria-hidden className="ph-rule" />
    </section>
  );
}

/** A typographic hero aside: one big figure with a drawn volt underline and a short caption. Used where a page has a
 *  number worth stating (two prices, a count) so the hero's right half carries a fact instead of empty ground. */
export function HeroFigure({ rows, caption }: { rows: { value: string; label: string }[]; caption?: string }) {
  return (
    <div className="w-fit">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:pt-0">
          <span className="display text-[clamp(48px,14vw,80px)] leading-none md:text-[clamp(64px,6vw,112px)]">{r.value}</span>
          <span className="kicker text-right text-muted">{r.label}</span>
        </div>
      ))}
      {caption && <p className="kicker mt-6 max-w-[34ch] text-volt">{caption}</p>}
    </div>
  );
}

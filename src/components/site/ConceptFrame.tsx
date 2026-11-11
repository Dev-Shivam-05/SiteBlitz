/**
 * Image-free visual for a concept study: a browser frame drawn in CSS. Deliberately not a mockup
 * image, so nothing on the page can be mistaken for a real client's site (claims register, C1).
 */
export function ConceptFrame({ title, goal, index }: { title: string; goal: string; index?: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-surface">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-raised" />
        <span className="h-2 w-2 rounded-full bg-raised" />
        <span className="h-2 w-2 rounded-full bg-raised" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-raised" />
      </div>
      <div className="blueprint-grid relative flex flex-1 flex-col justify-between gap-5 p-5 md:p-7">
        <div>
          <span className="inline-block rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-volt">
            Concept study
          </span>
          <p className="font-display mt-4 max-w-[16ch] text-2xl font-bold leading-tight text-ink md:text-3xl">{title}</p>
        </div>
        <div className="space-y-2" aria-hidden>
          <span className="block h-2 w-3/4 rounded-full bg-raised" />
          <span className="block h-2 w-1/2 rounded-full bg-raised" />
          <span className="mt-3 block h-8 w-32 rounded-full bg-volt/80" />
        </div>
        <p className="max-w-sm text-sm leading-snug text-muted">{goal}</p>
        {index !== undefined && (
          <span className="font-display absolute right-5 top-4 text-5xl font-bold text-ink/10" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}

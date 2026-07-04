import { Shell } from "@/components/site/Shell";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Shell>
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-3 text-xs uppercase tracking-widest text-faint">Last updated: {updated}</p>
        <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_strong]:text-ink">
          {children}
        </div>
      </section>
    </Shell>
  );
}

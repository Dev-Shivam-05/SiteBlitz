import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/** Visible trail that matches the page's BreadcrumbList JSON-LD (same names, same URLs), so Google can show the
 *  trail instead of the raw URL and a reader always has a way one level up. */
export function Breadcrumbs({ crumbs, className = "" }: { crumbs: readonly Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="inline-flex min-h-6 items-center underline-offset-4 transition-colors hover:text-volt hover:underline">
                  {c.name}
                </Link>
              )}
              {!last && (
                <span aria-hidden className="text-faint">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

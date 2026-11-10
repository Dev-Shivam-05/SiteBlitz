import { PHOTOS, type PhotoId } from "@/lib/photos";

/** The one credit line for the photographs a page shows (CC BY / CC BY-SA need author, licence and source). */
export function PhotoCredits({ ids, className = "" }: { ids: readonly PhotoId[]; className?: string }) {
  return (
    <p className={className}>
      Photographs (Wikimedia Commons):{" "}
      {ids.map((id, i) => {
        const p = PHOTOS[id];
        return (
          <span key={id}>
            <a href={p.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-2 md:min-h-0">
              {p.author}
            </a>
            , {p.licence}
            {i < ids.length - 1 ? " · " : "."}
          </span>
        );
      })}
    </p>
  );
}

import { STUDY, num, pct, share, type Split } from "@/lib/research";

/** Shared pieces of the Gujarat study pages (hub + city pages): one bar, one legend, one method list, so the classes
 *  are drawn and defined identically everywhere. Every bar's values are also printed as text. */

export const CLASS_LABEL = {
  own: "Own website URL",
  shared: "Shared or chain URL",
  directory: "Directory or marketplace URL",
  none: "No URL recorded",
} as const;

export function SplitBar({ s, label }: { s: Split; label: string }) {
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-raised" role="img" aria-label={label}>
      <span className="h-full bg-volt" style={{ width: `${share(s.own, s.n)}%` }} />
      <span className="h-full bg-ink/45" style={{ width: `${share(s.shared, s.n)}%` }} />
      <span className="h-full bg-ink/20" style={{ width: `${share(s.directory, s.n)}%` }} />
    </div>
  );
}

export const splitLabel = (name: string, s: Split) =>
  `${name}: ${pct(s.own, s.n)} own website URL, ${pct(s.shared, s.n)} shared or chain URL, ${pct(s.directory, s.n)} directory URL, ${pct(
    s.none,
    s.n
  )} no URL, of ${num(s.n)} records`;

export function Legend() {
  const dot = (cls: string) => <span aria-hidden className={`h-3 w-3 rounded-full ${cls}`} />;
  return (
    <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
      <span className="inline-flex items-center gap-2">{dot("bg-volt")} {CLASS_LABEL.own}</span>
      <span className="inline-flex items-center gap-2">{dot("bg-ink/45")} {CLASS_LABEL.shared}</span>
      <span className="inline-flex items-center gap-2">{dot("bg-ink/20")} {CLASS_LABEL.directory}</span>
      <span className="inline-flex items-center gap-2">{dot("bg-raised ring-1 ring-line")} {CLASS_LABEL.none}</span>
    </p>
  );
}

const OUTCOME_LABEL: Record<string, string> = {
  ok: "answered with a page (2xx)",
  "no-dns": "had no DNS record",
  timeout: "timed out",
  refused: "refused an automated client (401/403/429)",
  "http-4xx": "returned another 4xx error",
  "http-5xx": "returned a server error",
  failed: "failed to connect",
  parked: "showed a parked or for-sale page",
};

/** The method, worded per debate round 3: selection by activity, the no-brand population named as such, shared hosts
 *  as a flag, the live check as one diagnostic run with defined outcomes, and no "upper bound" claim. */
export function MethodList() {
  const live = STUDY.liveCheck;
  const ran = new Date(live.ranAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  const outcomes = Object.entries(live.outcomes)
    .map(([k, v]) => `${v} ${OUTCOME_LABEL[k] ?? k}`)
    .join(", ");
  return (
    <ol className="list-decimal space-y-5 pl-5 text-base leading-relaxed text-muted marker:text-volt md:text-lg">
      <li>
        <strong className="text-ink">Source.</strong> {STUDY.source}, India extract, with places marked permanently closed
        removed. Overture combines several data providers. A place record is a map listing, not a registered business,
        and one business can have more than one record.
      </li>
      <li>
        <strong className="text-ink">Which records.</strong> Records in Gujarat in 17 selected trades, chosen by what the
        business does (the category lists are below), and only records with no brand recorded in the source. A missing
        brand is missing information, not proof that a business is independent. Each record has one category, so it is
        counted once. Places of worship, schools, banks, ATMs, landmarks and transport are not in the trades.
      </li>
      <li>
        <strong className="text-ink">Four classes.</strong> Every record falls in one: an <em>own website URL</em> (its
        host is used by at most one other trade record); a <em>shared or chain URL</em> (a host used by{" "}
        {STUDY.sharedHostMin} or more records, or a chain&rsquo;s store-locator page: branches, franchises or duplicate
        listings, a flag rather than proof); a <em>directory or marketplace URL</em> (a listing about the business, such as
        IndiaMART, Justdial, OYO or a Google profile link); or <em>no URL recorded</em>. Social media profiles never count
        as a website. Sites on builders such as Wix or Blogger count as own, each by its own address.
      </li>
      <li>
        <strong className="text-ink">Shared hosts.</strong> Of {num(STUDY.validation.tradeRecordsWithUrl)} trade records with
        a URL, {num(STUDY.validation.hostsSharedBy3Plus)} hosts were used by {STUDY.sharedHostMin} or more records; the
        largest belong to pharmacy, phone-shop and store-locator networks whose brand field was empty. The rule can
        misjudge both ways: a family business with three branches loses its real website to this class, and a chain with
        two records in the data stays in the own class.
      </li>
      <li>
        <strong className="text-ink">City.</strong> The city as the source gives it in the address. A record without a
        state took the state most other records of the same city carry. These are not municipal boundaries.
      </li>
      <li>
        <strong className="text-ink">One diagnostic fetch.</strong> On {ran} IST we made one automated request (10 seconds,
        no retry) for each of {live.sample} listing records picked at random (seed {live.seed}) from the{" "}
        {num(STUDY.total.own)} records in the own-website class. Of those {live.sample}:{" "}
        {outcomes}. This describes one run from one connection. It does not estimate how many Gujarat businesses have a
        working website.
      </li>
      <li>
        <strong className="text-ink">What the numbers are.</strong> A recorded URL does not establish that a website is
        live, usable or correctly linked to the business. Our classification can both miss genuine business websites and
        include URLs that no longer work. These figures measure classified website links in the source records, not
        verified website ownership or availability, and no margin of error applies to them.
      </li>
    </ol>
  );
}

export function TradeCategories() {
  return (
    <details className="faq-item group border-y border-ink/15">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
        The categories in each trade
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <dl className="grid gap-x-10 gap-y-4 pb-8 text-sm md:grid-cols-2">
        {STUDY.tradeRules.map((t) => (
          <div key={t.id}>
            <dt className="font-semibold text-ink">{t.label}</dt>
            <dd className="mt-1 text-muted">{t.categories.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

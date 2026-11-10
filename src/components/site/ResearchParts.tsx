import { STUDY, num, pct, share, type Split } from "@/lib/research";

/** Shared pieces of the Gujarat study pages (hub + city pages): one bar, one legend, one method list, so the classes
 *  are drawn and defined identically everywhere. Every bar's values are also printed as text. */

export const CLASS_LABEL = {
  own: "Retained URL: low-reuse host",
  shared: "Retained URL: shared host or locator pattern",
  directory: "Retained URL: directory or marketplace",
  none: "No URL retained after filtering",
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
  `${name}: ${pct(s.own, s.n)} retained URL with a low-reuse host, ${pct(s.shared, s.n)} shared host or locator pattern, ${pct(s.directory, s.n)} directory or marketplace, ${pct(
    s.none,
    s.n
  )} no URL retained, of ${num(s.n)} records`;

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

/** Diagnostic outcome labels (debate round 4): what the HTTP exchange was, not whether the page serves the business. */
const OUTCOME_LABEL: Record<string, string> = {
  ok: "HTTP 2xx response (pages flagged parked or for sale counted separately)",
  "no-dns": "DNS resolution failure during this attempt",
  timeout: "10-second request deadline exceeded",
  refused: "HTTP 401, 403 or 429 response",
  "http-4xx": "other HTTP 4xx response",
  "http-5xx": "HTTP 5xx response",
  failed: "other connection failure",
  parked: "response flagged as parked or for sale",
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
        brand is missing information, not proof that a business is independent. For this analysis each retained record is
        assigned to exactly one of the 17 trade groups using its main source category; alternate categories are not
        expanded into extra rows. Places of worship, schools, banks, ATMs, landmarks and transport are not in the trades.
      </li>
      <li>
        <strong className="text-ink">Retained URL.</strong> Our extract keeps one URL per record: the first that passes its
        exclusions (social profiles and common listing pages such as Google, Justdial, Practo and Zomato are filtered out
        when the extract is built). An empty retained field can mean that no URL was present in the source or that the
        available links were filtered out, and a retained directory URL does not show that the record had no other link.
      </li>
      <li>
        <strong className="text-ink">Four classes.</strong> Each record receives one class: <em>retained URL with a low-reuse
        host</em>, <em>retained URL with a shared host or locator pattern</em>, <em>retained directory or marketplace URL</em>{" "}
        or <em>no URL retained after filtering</em>. These describe retained URLs and our rules; they do not verify
        website ownership, chain membership, independence or availability. A low-reuse host is outside the directory and
        locator patterns and appears in one or two of the {num(STUDY.total.n)} study records. The
        shared-host class holds hosts appearing in {STUDY.sharedHostMin} or more records, or URLs matching the published
        locator patterns (a host on singleinterface.com, or one beginning with nearme., store., stores., location.,
        locations., branch., branches. or pin.). Either class can contain a genuine business website. Directory URLs are
        listings on sites such as IndiaMART, Justdial, OYO, Practo, Zomato, MagicBricks or Google profile short links.
        Builder sites such as Wix or Blogger are judged by their own address like any other.
      </li>
      <li>
        <strong className="text-ink">Host frequency.</strong> Host frequency counts distinct study records containing each
        retained host, across all {num(STUDY.total.n)} records before splitting by city or trade. It does not count every
        URL originally present in Overture.
        Of {num(STUDY.validation.tradeRecordsWithUrl)} records with a URL, {num(STUDY.validation.hostsSharedBy3Plus)} hosts
        appear in {STUDY.sharedHostMin} or more; the largest belong to pharmacy, phone-shop and store-locator networks
        whose brand field was empty. The rule can misjudge both ways: a family business with three branches lands in the
        shared-host class, and a chain with two records in the data stays in the low-reuse class.
      </li>
      <li>
        <strong className="text-ink">City.</strong> The city as the source gives it in the address. A record without a
        state took the state most other records of the same city carry. These are not municipal boundaries.
      </li>
      <li>
        <strong className="text-ink">One diagnostic fetch.</strong> On {ran} IST we made one automated request (10 seconds,
        no retry, redirects followed) for each of {live.sample} listing records picked at random (seed {live.seed}) from
        the {num(STUDY.total.own)} records whose retained URL has a low-reuse host. The outcomes are mutually exclusive: the HTTP status and
        a parked-page flag (page text saying the domain is for sale, parked or expired) were recorded first, then one
        outcome assigned. Of those {live.sample}: {outcomes}. A successful HTTP response does not confirm that the page
        belongs to the business. This describes one run from one connection; it does not estimate how many Gujarat
        businesses have a working website.
      </li>
      <li>
        <strong className="text-ink">What the numbers are.</strong> A recorded URL does not establish that a website is
        live, usable or correctly linked to the business. Our classification can both miss genuine business websites and
        include URLs that no longer work. These figures measure classified website links in the source records, not
        verified website ownership or availability, and no margin of error applies to them. Percentages are calculated
        from the counts before rounding. These figures describe the filtered extract; they do not measure the share of
        all businesses with websites.
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

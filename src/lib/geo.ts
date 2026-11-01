/**
 * Visitor geography from the hosting edge, host-neutral so the site can run on Vercel or Netlify.
 * Vercel sends x-vercel-ip-* headers; Netlify sends x-nf-geo, a base64 JSON blob
 * ({ city, country: { code }, subdivision: { code }, timezone }). The Netlify header format is not in its
 * official docs (research 2026-11-01), so it is parsed defensively: any surprise yields "unknown", never
 * a thrown error, because /api/track must never fail on geography.
 */

export interface Geo {
  countryCode?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

function decodeCity(v: string | null): string | undefined {
  if (!v) return undefined;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function netlifyGeo(raw: string | null): Geo {
  if (!raw) return {};
  try {
    const json = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    const str = (x: unknown) => (typeof x === "string" && x.length <= 120 ? x : undefined);
    return {
      countryCode: str(json?.country?.code),
      region: str(json?.subdivision?.code),
      city: str(json?.city),
      timezone: str(json?.timezone),
    };
  } catch {
    return {};
  }
}

export function geoFromHeaders(h: Headers): Geo {
  const vercel: Geo = {
    countryCode: h.get("x-vercel-ip-country") || undefined,
    region: h.get("x-vercel-ip-country-region") || undefined,
    city: decodeCity(h.get("x-vercel-ip-city")),
    timezone: h.get("x-vercel-ip-timezone") || undefined,
  };
  if (vercel.countryCode) return vercel;
  const nf = netlifyGeo(h.get("x-nf-geo"));
  return { ...nf, countryCode: nf.countryCode || h.get("x-country") || undefined };
}

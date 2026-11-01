import { describe, expect, it } from "vitest";
import { geoFromHeaders } from "@/lib/geo";

const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64");

describe("geoFromHeaders", () => {
  it("reads Vercel headers and decodes the city", () => {
    const h = new Headers({
      "x-vercel-ip-country": "IN",
      "x-vercel-ip-country-region": "GJ",
      "x-vercel-ip-city": "Navsari%20City",
      "x-vercel-ip-timezone": "Asia/Kolkata",
    });
    expect(geoFromHeaders(h)).toEqual({ countryCode: "IN", region: "GJ", city: "Navsari City", timezone: "Asia/Kolkata" });
  });

  it("falls back to Netlify's x-nf-geo blob", () => {
    const h = new Headers({
      "x-nf-geo": b64({ city: "Surat", country: { code: "IN", name: "India" }, subdivision: { code: "GJ" }, timezone: "Asia/Kolkata" }),
    });
    expect(geoFromHeaders(h)).toEqual({ countryCode: "IN", region: "GJ", city: "Surat", timezone: "Asia/Kolkata" });
  });

  it("never throws on malformed input", () => {
    expect(geoFromHeaders(new Headers({ "x-nf-geo": "%%%not-base64" }))).toEqual({ countryCode: undefined });
    expect(geoFromHeaders(new Headers({ "x-vercel-ip-country": "IN", "x-vercel-ip-city": "%E0%A4" }))).toMatchObject({ city: "%E0%A4" });
    expect(geoFromHeaders(new Headers())).toEqual({ countryCode: undefined });
  });

  it("uses x-country when that is all there is", () => {
    expect(geoFromHeaders(new Headers({ "x-country": "IN" })).countryCode).toBe("IN");
  });
});

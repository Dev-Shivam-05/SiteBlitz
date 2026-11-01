import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/offer";
import { SITE } from "@/lib/site";

/* src/lib/offer.ts is the single source of truth for the offer. These checks fail the build-time test
   run if a payment split stops adding up, or if a withdrawn price, currency or false claim reappears
   anywhere a visitor can read it. */

function files(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.(tsx?|json)$/.test(name)) out.push(p);
  }
  return out;
}

const PUBLIC_SOURCES = files("src").filter(
  (f) => !f.includes(join("src", "app", "admin")) && !f.includes(join("api", "admin"))
);

describe("offer config", () => {
  it("payment stages add up to the package price", () => {
    for (const p of PACKAGES) {
      if (p.priceInr === null) {
        expect(p.payments).toBeNull();
        continue;
      }
      expect(p.payments, p.id).not.toBeNull();
      expect(p.payments![0] + p.payments![1], p.id).toBe(p.priceInr);
    }
  });

  it("has exactly one recommended package", () => {
    expect(PACKAGES.filter((p) => p.recommended)).toHaveLength(1);
  });
});

describe("public copy stays truthful", () => {
  const withdrawn: [RegExp, string][] = [
    [/\$\s?(99|189|329)\b/, "withdrawn USD price"],
    [/14,999|24,999/, "withdrawn Growth/Scale price"],
    [/indexing (and [a-z ]+ )?(are|is) guaranteed/i, "indexing guarantee (Google guarantees nothing)"],
    [/24\/7/, "24/7 support claim"],
    [/Most chosen|100% on-time/i, "unsupported popularity/delivery claim"],
  ];

  it.each(withdrawn)("no %s in public sources", (pattern, label) => {
    const hits = PUBLIC_SOURCES.filter((f) => pattern.test(readFileSync(f, "utf8")));
    expect(hits, label).toEqual([]);
  });

  it("never claims a Mumbai location outside comments", () => {
    const hits = PUBLIC_SOURCES.filter((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .some((line) => /Mumbai/.test(line) && !/^\s*(\/\/|\*|\/\*)/.test(line))
    );
    expect(hits).toEqual([]);
  });

  it("does not publish the email address until the mailbox is live", () => {
    expect(SITE.emailLive).toBe(false);
    const unguarded = PUBLIC_SOURCES.filter((f) => {
      const src = readFileSync(f, "utf8");
      return /SITE\.email\b/.test(src) && !/SITE\.emailLive/.test(src) && !f.endsWith("site.ts");
    });
    expect(unguarded).toEqual([]);
  });
});

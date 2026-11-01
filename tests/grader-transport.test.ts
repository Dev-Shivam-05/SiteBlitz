import { describe, it, expect, vi, beforeEach } from "vitest";
import { gzipSync } from "node:zlib";

/** The grader's request path with the network mocked out (no internet in tests).
 *  The fake node:http(s) `request` behaves like Node's: it resolves the host with
 *  the `lookup` option if one is given — else with an unchecked resolution, which
 *  is the bug this guards against — then "dials" the first address. Servers are
 *  keyed by IP, so whatever address gets dialed is what answers. */

type Reply = { status: number; headers?: Record<string, string>; body?: string | Buffer };
type LookupCb = (err: NodeJS.ErrnoException | null, address: string | { address: string; family: number }[]) => void;

const net = vi.hoisted(() => {
  const state = {
    // host -> queue of answers; the last answer sticks
    dns: new Map<string, string[][]>(),
    servers: new Map<string, (host: string, path: string) => Reply>(),
    dialed: [] as string[],
    resolve: async (host: string) => {
      const q = state.dns.get(host);
      if (!q || !q.length) throw Object.assign(new Error(`ENOTFOUND ${host}`), { code: "ENOTFOUND" });
      const ips = q.length > 1 ? q.shift()! : q[0];
      return ips.map((address) => ({ address, family: address.includes(":") ? 6 : 4 }));
    },
  };
  return state;
});

vi.mock("node:dns/promises", () => {
  const lookup = (host: string) => net.resolve(host);
  return { lookup, default: { lookup } };
});

async function fakeTransport(importOriginal: () => Promise<unknown>) {
  const real = (await importOriginal()) as Record<string, unknown>;
  const { EventEmitter } = await import("node:events");
  const { Readable } = await import("node:stream");

  const request = (url: URL, opts: { lookup?: (h: string, o: object, cb: LookupCb) => void }, onRes: (res: unknown) => void) => {
    const req = new EventEmitter() as InstanceType<typeof EventEmitter> & { end: () => void };
    req.end = () => {
      const host = url.hostname;
      const addrs = opts.lookup
        ? new Promise<{ address: string }[]>((ok, fail) =>
            opts.lookup!(host, { all: true }, (err, a) => (err ? fail(err) : ok(a as { address: string }[])))
          )
        : net.resolve(host);
      addrs.then(
        (list) => {
          const ip = list[0].address;
          net.dialed.push(`${host}->${ip}`);
          const server = net.servers.get(ip);
          if (!server) return req.emit("error", Object.assign(new Error("ECONNREFUSED"), { code: "ECONNREFUSED" }));
          const reply = server(host, url.pathname);
          const res = new Readable({ read() {} }) as InstanceType<typeof Readable> & {
            statusCode: number;
            headers: Record<string, string>;
          };
          res.statusCode = reply.status;
          res.headers = reply.headers ?? {};
          if (reply.body !== undefined) res.push(Buffer.from(reply.body));
          res.push(null);
          onRes(res);
        },
        (err) => req.emit("error", err)
      );
    };
    return req;
  };
  return { ...real, request, default: { ...(real.default as object), request } };
}

vi.mock("node:http", (importOriginal) => fakeTransport(importOriginal));
vi.mock("node:https", (importOriginal) => fakeTransport(importOriginal));

import { gradeWebsite } from "@/lib/grader";

const PAGE =
  `<!doctype html><html lang="en"><head><title>Acme Plumbing — Same-day repairs</title>` +
  `<meta name="viewport" content="width=device-width"></head><body><h1>Acme</h1>` +
  `<a href="tel:+911234567890">Call</a></body></html>`;

const METADATA = (): Reply => ({
  status: 200,
  headers: { "content-type": "text/html" },
  body: "<html><head><title>instance metadata credentials leak</title></head><body>ami-id</body></html>",
});

beforeEach(() => {
  net.dns.clear();
  net.servers.clear();
  net.dialed = [];
  // anything that reaches the metadata address "succeeds" — so a leak shows up as a pass
  net.servers.set("169.254.169.254", METADATA);
});

describe("grader transport — public hosts still work", () => {
  it("grades a public host and decodes a gzip body (fetch() did this for us before)", async () => {
    net.dns.set("shop.example", [["93.184.216.34"]]);
    net.servers.set("93.184.216.34", () => ({
      status: 200,
      headers: { "content-type": "text/html", "content-encoding": "gzip" },
      body: gzipSync(PAGE),
    }));

    const result = await gradeWebsite("shop.example");
    if ("error" in result) throw new Error(`unexpected error: ${result.error}`);
    expect(result.url).toBe("https://shop.example");
    expect(result.finalUrl).toBe("https://shop.example/");
    expect(result.findings.find((f) => f.check === "Page title")?.ok).toBe(true);
    expect(result.findings.find((f) => f.check === "Compression")?.note).toBe("gzip enabled.");
    expect(result.findings.find((f) => f.check === "Mobile viewport")?.ok).toBe(true);
    expect(net.dialed).toEqual(["shop.example->93.184.216.34"]);
  });

  it("follows a public redirect and reports the final URL", async () => {
    net.dns.set("old.example", [["93.184.216.34"]]);
    net.dns.set("new.example", [["93.184.216.35"]]);
    net.servers.set("93.184.216.34", () => ({ status: 301, headers: { location: "https://new.example/home" } }));
    net.servers.set("93.184.216.35", () => ({ status: 200, headers: { "content-type": "text/html" }, body: PAGE }));

    const result = await gradeWebsite("http://old.example/");
    if ("error" in result) throw new Error(`unexpected error: ${result.error}`);
    expect(result.finalUrl).toBe("https://new.example/home");
  });

  it("still surfaces a non-2xx status as a finding-style error", async () => {
    net.dns.set("down.example", [["93.184.216.34"]]);
    net.servers.set("93.184.216.34", () => ({ status: 503, body: "busy" }));
    await expect(gradeWebsite("down.example")).resolves.toEqual({
      error: "The site responded with HTTP 503 — that's the first thing to fix.",
    });
  });

  it("stops after 5 redirect hops", async () => {
    net.dns.set("loop.example", [["93.184.216.34"]]);
    net.servers.set("93.184.216.34", () => ({ status: 302, headers: { location: "/again" } }));
    await expect(gradeWebsite("loop.example")).resolves.toEqual({
      error: "Too many redirects (5+) — that's a finding in itself.",
    });
    expect(net.dialed).toHaveLength(5);
  });
});

describe("grader transport — private destinations are never dialed", () => {
  it("refuses a first hop that rebinds to a private address at connect time", async () => {
    net.dns.set("rebind.example", [["93.184.216.34"], ["10.0.0.5"]]);
    net.servers.set("10.0.0.5", () => ({ status: 200, body: PAGE }));
    await expect(gradeWebsite("rebind.example")).resolves.toEqual({
      error: "We couldn't reach that site (timeout or connection refused). Is it online?",
    });
    expect(net.dialed).toEqual([]);
  });

  it("refuses a redirect to a host that resolves to 169.254.169.254", async () => {
    net.dns.set("evil.example", [["93.184.216.34"]]);
    net.dns.set("metadata.example", [["169.254.169.254"]]);
    net.servers.set("93.184.216.34", () => ({
      status: 302,
      headers: { location: "http://metadata.example/latest/meta-data/" },
    }));
    await expect(gradeWebsite("evil.example")).resolves.toEqual({
      error: "The site redirected somewhere we won't follow (non-public destination).",
    });
    expect(net.dialed).toEqual(["evil.example->93.184.216.34"]);
  });

  it("refuses a redirect hop that passes the check, then rebinds to 169.254.169.254", async () => {
    net.dns.set("evil.example", [["93.184.216.34"]]);
    net.dns.set("hop.example", [["93.184.216.36"], ["169.254.169.254"]]);
    net.servers.set("93.184.216.34", () => ({ status: 302, headers: { location: "http://hop.example/" } }));
    await expect(gradeWebsite("evil.example")).resolves.toEqual({
      error: "We couldn't reach that site (timeout or connection refused). Is it online?",
    });
    expect(net.dialed).toEqual(["evil.example->93.184.216.34"]);
  });

  it("refuses a redirect straight to the literal metadata IP", async () => {
    net.dns.set("evil.example", [["93.184.216.34"]]);
    net.servers.set("93.184.216.34", () => ({
      status: 302,
      headers: { location: "http://169.254.169.254/latest/meta-data/" },
    }));
    await expect(gradeWebsite("evil.example")).resolves.toEqual({
      error: "The site redirected somewhere we won't follow (non-public destination).",
    });
    expect(net.dialed).toEqual(["evil.example->93.184.216.34"]);
  });
});

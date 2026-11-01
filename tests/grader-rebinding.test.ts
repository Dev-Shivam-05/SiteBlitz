import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { LookupAddress } from "node:dns";

/** DNS rebinding, end to end over the real node:http stack. The resolver answers
 *  public for validatePublicUrl() and loopback for the connection itself; a real
 *  server listens on loopback, so if the connect-time guard ever stops running
 *  the grade succeeds against it and `hits` goes up. */

const dns = vi.hoisted(() => ({ script: [] as string[][], calls: [] as string[] }));

vi.mock("node:dns/promises", () => {
  const lookup = async (host: string) => {
    dns.calls.push(host);
    const ips = dns.script.shift();
    if (!ips) throw Object.assign(new Error(`ENOTFOUND ${host}`), { code: "ENOTFOUND" });
    return ips.map((address) => ({ address, family: address.includes(":") ? 6 : 4 }));
  };
  return { lookup, default: { lookup } };
});

import { gradeWebsite, guardedLookup } from "@/lib/grader";

let server: Server;
let port = 0;
let hits = 0;

beforeAll(async () => {
  server = createServer((_req, res) => {
    hits++;
    res.setHeader("content-type", "text/html");
    res.end("<html lang=en><head><title>Internal admin console page</title></head><body><h1>secret</h1></body></html>");
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  port = (server.address() as AddressInfo).port;
});

afterAll(() => new Promise<void>((r) => server.close(() => r())));

beforeEach(() => {
  dns.script = [];
  dns.calls = [];
  hits = 0;
});

describe("grader — connect-time DNS pinning (real sockets)", () => {
  it("refuses a host that resolves public at check time and loopback at connect time", async () => {
    dns.script = [["93.184.216.34"], ["127.0.0.1"]];
    const result = await gradeWebsite(`http://rebind.example:${port}/`);
    expect(result).toEqual({
      error: "We couldn't reach that site (timeout or connection refused). Is it online?",
    });
    expect(hits).toBe(0);
    // two resolutions: the pre-check, then the one the socket actually used
    expect(dns.calls).toEqual(["rebind.example", "rebind.example"]);
  });

  it("refuses when the connect-time answer mixes a public and a private address", async () => {
    dns.script = [["93.184.216.34"], ["93.184.216.34", "127.0.0.1"]];
    const result = await gradeWebsite(`http://mixed.example:${port}/`);
    expect("error" in result).toBe(true);
    expect(hits).toBe(0);
  });
});

describe("guardedLookup — the resolver handed to every socket", () => {
  const call = (host: string, options: { all?: boolean; family?: number }) =>
    new Promise<{ err: NodeJS.ErrnoException | null; address: string | LookupAddress[]; family?: number }>((r) =>
      guardedLookup(host, options, (err, address, family) => r({ err, address, family }))
    );

  it("errors with ENOTFOUND for a cloud-metadata answer", async () => {
    dns.script = [["169.254.169.254"]];
    const { err } = await call("meta.example", { all: true });
    expect(err?.code).toBe("ENOTFOUND");
  });

  it("returns the validated list when Node asks for all addresses", async () => {
    dns.script = [["93.184.216.34", "2001:4860:4860::8888"]];
    const { err, address } = await call("ok.example", { all: true });
    expect(err).toBeNull();
    expect(address).toEqual([
      { address: "93.184.216.34", family: 4 },
      { address: "2001:4860:4860::8888", family: 6 },
    ]);
  });

  it("returns a single address/family pair, honouring the family hint", async () => {
    dns.script = [["93.184.216.34", "2001:4860:4860::8888"]];
    const { err, address, family } = await call("ok.example", { family: 6 });
    expect(err).toBeNull();
    expect(address).toBe("2001:4860:4860::8888");
    expect(family).toBe(6);
  });

  it("passes resolver failures through as errors", async () => {
    dns.script = [];
    const { err } = await call("gone.example", { all: true });
    expect(err?.code).toBe("ENOTFOUND");
  });
});

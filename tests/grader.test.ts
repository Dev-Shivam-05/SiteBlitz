import { describe, it, expect } from "vitest";
import { isPrivateIp, normalizeInput, validatePublicUrl } from "@/lib/grader";

/** The grader fetches arbitrary visitor-supplied URLs, so these two functions
 *  are the whole SSRF boundary. A regression here is a security incident, not
 *  a cosmetic bug — which is why this is the first suite in the repo. */

describe("isPrivateIp — must reject every non-public address", () => {
  const PRIVATE = [
    ["loopback v4", "127.0.0.1"],
    ["this-network", "0.0.0.0"],
    ["private 10/8", "10.0.0.1"],
    ["private 172.16/12 low", "172.16.0.1"],
    ["private 172.16/12 high", "172.31.255.255"],
    ["private 192.168/16", "192.168.1.1"],
    ["cloud metadata", "169.254.169.254"],
    ["link-local", "169.254.0.1"],
    ["CGNAT", "100.64.0.1"],
    ["192.0.0.0/24 special", "192.0.0.1"],
    ["benchmarking 198.18", "198.18.0.1"],
    ["multicast", "224.0.0.1"],
    ["reserved high", "240.0.0.1"],
    ["unspecified v6", "::"],
    ["loopback v6", "::1"],
    ["link-local v6", "fe80::1"],
    ["unique local fc", "fc00::1"],
    ["unique local fd", "fd00::1"],
    ["multicast v6", "ff02::1"],
    ["v4-mapped loopback", "::ffff:127.0.0.1"],
    ["v4-mapped private", "::ffff:10.0.0.1"],
  ] as const;

  for (const [label, ip] of PRIVATE) {
    it(`rejects ${label} (${ip})`, () => {
      expect(isPrivateIp(ip)).toBe(true);
    });
  }
});

describe("isPrivateIp — must allow genuinely public addresses", () => {
  const PUBLIC = ["8.8.8.8", "1.1.1.1", "93.184.216.34", "2001:4860:4860::8888"];

  for (const ip of PUBLIC) {
    it(`allows ${ip}`, () => {
      expect(isPrivateIp(ip)).toBe(false);
    });
  }
});

describe("normalizeInput", () => {
  it("assumes https for a bare hostname", () => {
    expect(normalizeInput("example.com")).toBe("https://example.com");
  });

  it("preserves an explicit scheme", () => {
    expect(normalizeInput("http://example.com")).toBe("http://example.com");
    expect(normalizeInput("https://example.com")).toBe("https://example.com");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeInput("  example.com  ")).toBe("https://example.com");
  });

  it("returns null for empty input", () => {
    expect(normalizeInput("")).toBeNull();
    expect(normalizeInput("   ")).toBeNull();
  });
});

describe("validatePublicUrl — the branches that need no DNS", () => {
  const REJECTED = [
    ["non-http scheme: ftp", "ftp://example.com"],
    ["non-http scheme: file", "file:///etc/passwd"],
    ["non-http scheme: javascript", "javascript:alert(1)"],
    ["non-http scheme: data", "data:text/html,<script>1</script>"],
    ["localhost by name", "http://localhost"],
    ["localhost with port", "http://localhost:3000"],
    [".local mDNS name", "http://printer.local"],
    [".internal name", "http://db.internal"],
    ["hostname with no dot", "http://intranet"],
    ["unparseable", "not a url at all"],
    ["literal loopback ip", "http://127.0.0.1"],
    ["literal private ip", "http://10.0.0.1"],
    ["literal metadata ip", "http://169.254.169.254/latest/meta-data/"],
    ["literal v6 loopback", "http://[::1]/"],
  ] as const;

  for (const [label, url] of REJECTED) {
    it(`rejects ${label}`, async () => {
      await expect(validatePublicUrl(url)).resolves.toBeNull();
    });
  }
});

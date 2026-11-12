import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { emailHash, signToken, verifyToken } from "@/lib/outreachToken";

/** Unsubscribe tokens (docs/spec/outreach-contract.md, "Known-answer vector"). The vector below is fixed: the lead
 *  generator's Python tests use the same inputs and must produce the same token, character for character. */

const KAT = {
  email: "  Owner@Example.com ",
  hash: "c8cd3c6427301eaf6665bccacd65ddb614527acc843a15463e3faba57124c351",
  sendId: "send-0001",
  secret: "kat-secret-not-for-production-0123456789",
  payload: '{"h":"c8cd3c6427301eaf6665bccacd65ddb614527acc843a15463e3faba57124c351","m":"send-0001","v":1}',
  token:
    "eyJoIjoiYzhjZDNjNjQyNzMwMWVhZjY2NjViY2NhY2Q2NWRkYjYxNDUyN2FjYzg0M2ExNTQ2M2UzZmFiYTU3MTI0YzM1MSIsIm0iOiJzZW5kLTAwMDEiLCJ2IjoxfQ" +
    ".CyQyXv0246O-c9S4tTeSF4c3xo-pCWu4M_Uj6ituq3Y",
};

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");

describe("known-answer vector", () => {
  it("hashes the address as sha256_hex(email.strip().lower())", () => {
    expect(emailHash(KAT.email)).toBe(KAT.hash);
  });

  it("signs to the fixed token", () => {
    expect(signToken(KAT.hash, KAT.sendId, KAT.secret)).toBe(KAT.token);
  });

  it("encodes the sorted compact payload", () => {
    expect(KAT.token.split(".")[0]).toBe(b64(KAT.payload));
  });

  it("verifies the fixed token", () => {
    expect(verifyToken(KAT.token, KAT.secret)).toEqual({ ok: true, hash: KAT.hash, sendId: KAT.sendId });
  });
});

describe("tampering is rejected", () => {
  const [p, sig] = KAT.token.split(".");
  const flip = (s: string, i: number) => s.slice(0, i) + (s[i] === "A" ? "B" : "A") + s.slice(i + 1);

  it("wrong secret", () => {
    expect(verifyToken(KAT.token, KAT.secret + "x")).toEqual({ ok: false, reason: "signature" });
  });

  it("changed payload character (signature no longer matches)", () => {
    expect(verifyToken(`${flip(p, 10)}.${sig}`, KAT.secret)).toEqual({ ok: false, reason: "signature" });
  });

  it("changed signature character", () => {
    expect(verifyToken(`${p}.${flip(sig, 5)}`, KAT.secret)).toEqual({ ok: false, reason: "signature" });
  });

  it("a different address re-using the signature", () => {
    const other = b64(JSON.stringify({ h: emailHash("someone@else.test"), m: KAT.sendId, v: 1 }));
    expect(verifyToken(`${other}.${sig}`, KAT.secret).ok).toBe(false);
  });

  it("non-canonical last signature character (same decoded bytes, different spelling)", () => {
    // 43 base64url chars carry 258 bits; the last character's low 2 bits are padding. Changing them keeps the decoded
    // digest but must still fail, so each signature has exactly one valid spelling.
    const last = sig[sig.length - 1];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const i = alphabet.indexOf(last);
    const twin = alphabet[(i & ~3) | ((i + 1) & 3)];
    expect(Buffer.from(sig.slice(0, -1) + twin, "base64url")).toEqual(Buffer.from(sig, "base64url"));
    expect(verifyToken(`${p}.${sig.slice(0, -1)}${twin}`, KAT.secret)).toEqual({ ok: false, reason: "signature" });
  });

  it.each([
    ["empty", ""],
    ["no dot", p],
    ["two dots", `${p}.${sig}.x`],
    ["padding", `${p}=.${sig}`],
    ["short signature", `${p}.${sig.slice(1)}`],
    ["invalid characters", `${p}.${sig.slice(0, -1)}+`],
    ["too long", `${"A".repeat(1100)}.${sig}`],
    ["not a string", 42 as unknown as string],
  ])("malformed: %s", (_label, token) => {
    expect(verifyToken(token, KAT.secret)).toEqual({ ok: false, reason: "malformed" });
  });

  it("refuses to verify without a secret", () => {
    expect(() => verifyToken(KAT.token, "")).toThrow();
  });
});

describe("payload rules (correctly signed, wrong content)", () => {
  const secret = KAT.secret;
  // signs an arbitrary payload exactly the way signToken does
  const signRaw = (payload: string) => {
    const p = b64(payload);
    return `${p}.${createHmac("sha256", Buffer.from(secret, "utf8")).update(p, "ascii").digest("base64url")}`;
  };

  it.each([
    ["version 2", JSON.stringify({ h: KAT.hash, m: "1", v: 2 })],
    ["uppercase hash", JSON.stringify({ h: KAT.hash.toUpperCase(), m: "1", v: 1 })],
    ["short hash", JSON.stringify({ h: "abc", m: "1", v: 1 })],
    ["missing m", JSON.stringify({ h: KAT.hash, v: 1 })],
    ["empty m", JSON.stringify({ h: KAT.hash, m: "", v: 1 })],
    ["not JSON", "hello"],
    ["JSON array", "[1,2]"],
  ])("rejects %s", (_label, payload) => {
    expect(verifyToken(signRaw(payload), secret)).toEqual({ ok: false, reason: "payload" });
  });

  it("accepts a signed numeric send id as its string form", () => {
    const tok = signRaw(JSON.stringify({ h: KAT.hash, m: 42, v: 1 }));
    expect(verifyToken(tok, secret)).toEqual({ ok: true, hash: KAT.hash, sendId: "42" });
  });
});

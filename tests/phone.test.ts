import { describe, it, expect } from "vitest";
import { normalizeIndianPhone, phoneMatchPattern } from "@/lib/phone";

describe("normalizeIndianPhone", () => {
  const valid: [string, string][] = [
    ["9876543210", "+919876543210"],
    ["98765 43210", "+919876543210"],
    ["98765-43210", "+919876543210"],
    ["098765 43210", "+919876543210"],
    ["919876543210", "+919876543210"],
    ["91 98765 43210", "+919876543210"],
    ["+91 98765 43210", "+919876543210"],
    ["+91-98765-43210", "+919876543210"],
    ["+91 (98765) 43210", "+919876543210"],
    ["0091 9876543210", "+919876543210"],
    ["  6000000001  ", "+916000000001"],
    ["+919876543210", "+919876543210"],
  ];
  for (const [input, want] of valid) {
    it(`accepts "${input}"`, () => expect(normalizeIndianPhone(input)).toBe(want));
  }

  const invalid = [
    "", "   ", "abc", "12345", "987654321", // too short
    "98765432101", // 11 digits without a leading 0
    "5876543210", // not a mobile prefix
    "0000000000",
    "+1 415 555 0100", // not Indian
    "+44 7911 123456",
    "9876543210 ext 2",
    "98765+43210",
    "91 5876543210",
  ];
  for (const input of invalid) {
    it(`rejects "${input}"`, () => expect(normalizeIndianPhone(input)).toBeNull());
  }

  it("tolerates null and undefined", () => {
    expect(normalizeIndianPhone(null)).toBeNull();
    expect(normalizeIndianPhone(undefined)).toBeNull();
  });
});

describe("phoneMatchPattern (duplicate detection against legacy formats)", () => {
  const rx = phoneMatchPattern("+919876543210")!;
  it("matches the same number in every stored format", () => {
    for (const stored of ["+919876543210", "9876543210", "98765 43210", "098765-43210", "+91 98765 43210", "91-98765-43210", "0091 98765 43210"]) {
      expect(rx.test(stored), stored).toBe(true);
    }
  });
  it("does not match a different number or a longer one that contains it", () => {
    for (const stored of ["9876543211", "19876543210", "98765432100", "+91 98765 4321", "+1 9876543210"]) {
      expect(rx.test(stored), stored).toBe(false);
    }
  });
  it("returns null for a non-normalised input", () => {
    expect(phoneMatchPattern("9876543210")).toBeNull();
  });
});

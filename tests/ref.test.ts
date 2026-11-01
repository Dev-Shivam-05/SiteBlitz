import { describe, it, expect, vi } from "vitest";
import { REF_PATTERN, generateRef, isDuplicateRefError, withUniqueRef } from "@/lib/ref";

describe("generateRef", () => {
  it("has the SB-XXXX format with no look-alike characters", () => {
    for (let i = 0; i < 500; i++) {
      const r = generateRef();
      expect(r).toMatch(REF_PATTERN);
      expect(r.slice(3)).not.toMatch(/[01OIL]/);
    }
  });

  it("is effectively unique across a realistic batch (not sequential)", () => {
    // 31^4 ≈ 923k values: 200 draws collide with probability ≈ 2%, so allow at most one repeat.
    const refs = Array.from({ length: 200 }, generateRef);
    expect(new Set(refs).size).toBeGreaterThanOrEqual(199);
    // consecutive refs are not neighbours in sort order the way a counter would be
    expect(refs[0]).not.toBe(refs[1]);
  });
});

describe("withUniqueRef", () => {
  const dup = Object.assign(new Error("E11000 duplicate key error index: ref_1"), { code: 11000, keyPattern: { ref: 1 } });

  it("retries with a fresh ref when the ref collides", async () => {
    const gen = vi.fn().mockReturnValueOnce("SB-AAAA").mockReturnValueOnce("SB-BBBB");
    const create = vi.fn().mockRejectedValueOnce(dup).mockImplementationOnce(async (ref: string) => ({ ref }));
    await expect(withUniqueRef(create, gen)).resolves.toEqual({ ref: "SB-BBBB" });
    expect(create).toHaveBeenCalledTimes(2);
    expect(create.mock.calls.map((c) => c[0])).toEqual(["SB-AAAA", "SB-BBBB"]);
  });

  it("does not retry other errors", async () => {
    const other = Object.assign(new Error("E11000 dup on email"), { code: 11000, keyPattern: { email: 1 } });
    const create = vi.fn().mockRejectedValue(other);
    await expect(withUniqueRef(create)).rejects.toBe(other);
    expect(create).toHaveBeenCalledTimes(1);
  });

  it("gives up after the retry budget", async () => {
    const create = vi.fn().mockRejectedValue(dup);
    await expect(withUniqueRef(create, generateRef, 3)).rejects.toBe(dup);
    expect(create).toHaveBeenCalledTimes(3);
  });

  it("recognises duplicate-ref errors by keyPattern or index name", () => {
    expect(isDuplicateRefError(dup)).toBe(true);
    expect(isDuplicateRefError({ code: 11000, message: "index: ref_1 dup key" })).toBe(true);
    expect(isDuplicateRefError({ code: 121 })).toBe(false);
    expect(isDuplicateRefError(null)).toBe(false);
  });
});

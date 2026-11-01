/** Server-side lead helpers shared by /api/leads (website form) and /api/admin/leads (Quick-add,
 *  list, edit). */

import { Lead, type LeadDoc } from "./models";
import { normalizeIndianPhone, phoneMatchPattern } from "./phone";
import { withUniqueRef } from "./ref";

/** Lead.create with a fresh public ref; retries only on a ref collision. */
export function createLeadWithRef(data: Partial<LeadDoc> & { name: string }) {
  return withUniqueRef((ref) => Lead.create({ ...data, ref }));
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Mongo filter for the admin search box: a phone number (any format) matches the stored phone in
 *  any format; anything else is a case-insensitive substring match on name, ref, business type
 *  and phone. User input is regex-escaped. */
export function leadSearchFilter(q: string): Record<string, unknown> | null {
  const term = q.trim().slice(0, 80);
  if (!term) return null;
  const norm = normalizeIndianPhone(term);
  const pattern = norm ? phoneMatchPattern(norm) : null;
  if (pattern) return { phone: { $regex: pattern } };
  const rx = { $regex: escapeRegex(term), $options: "i" };
  return { $or: [{ name: rx }, { ref: rx }, { businessType: rx }, { phone: rx }] };
}

/** Existing leads with the same phone number, whatever format they were stored in. */
export async function findLeadsByPhone(normalized: string) {
  const pattern = phoneMatchPattern(normalized);
  if (!pattern) return [];
  return Lead.find({ phone: { $regex: pattern } })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name ref status createdAt")
    .lean();
}

/** Indian phone normalisation — pure, no I/O, unit-tested in tests/phone.test.ts.
 *
 *  Accepts what people actually type on a phone or paste from WhatsApp:
 *  "98765 43210", "098765-43210", "91 98765 43210", "+91 (98765) 43210", "0091 9876543210".
 *  Returns "+91XXXXXXXXXX", or null when the input is not a valid Indian mobile number.
 *
 *  Only mobile numbers (first digit 6-9) are accepted: every lead arrives over WhatsApp or a
 *  phone call, and rejecting other 10-digit strings catches typos like "0000000000". */
export function normalizeIndianPhone(input: string | null | undefined): string | null {
  if (!input) return null;
  const raw = String(input).trim();
  // Anything other than digits, spaces, dashes, dots, brackets and one leading "+" is not a phone.
  if (!/^\+?[\d\s\-().]+$/.test(raw)) return null;
  let digits = raw.replace(/\D/g, "");

  if (digits.length === 14 && digits.startsWith("0091")) digits = digits.slice(4);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);

  if (digits.length !== 10) return null;
  if (!/^[6-9]/.test(digits)) return null;
  return `+91${digits}`;
}

/** Mongo regex that matches a stored phone in ANY of the formats old leads were saved with
 *  ("98765 43210", "+91-98765-43210", "09876543210", ...), given a normalised "+91XXXXXXXXXX".
 *  Old website leads stored the raw string, and there are no migrations, so duplicate detection
 *  has to match loosely. The pattern is built from digits only, so it is safe to hand to $regex. */
export function phoneMatchPattern(normalized: string): RegExp | null {
  const m = /^\+91([6-9]\d{9})$/.exec(normalized);
  if (!m) return null;
  const body = m[1].split("").join("\\D*");
  return new RegExp(`^\\D*(?:0091|91|0)?\\D*${body}\\D*$`);
}

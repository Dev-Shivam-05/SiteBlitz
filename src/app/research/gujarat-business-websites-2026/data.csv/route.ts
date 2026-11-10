import { csv } from "@/lib/research";

export const runtime = "nodejs";
// Static: the aggregates only change when the study JSON does.
export const dynamic = "force-static";

export function GET() {
  return new Response(csv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="siteblitz-gujarat-business-websites-2026.csv"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}

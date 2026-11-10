import { indiaCsv } from "@/lib/researchIndia";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return new Response(indiaCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="siteblitz-india-business-website-records-2026.csv"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}

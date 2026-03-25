interface ComparisonRow {
  feature: string;
  siteblitz: string;
  wix: string;
  godaddy: string;
  agencies: string;
}

const comparisonRows: ComparisonRow[] = [
  { feature: "Price", siteblitz: "₹7,999", wix: "₹12K/year", godaddy: "₹15K", agencies: "₹50K-2L" },
  { feature: "Delivery", siteblitz: "24 hours", wix: "DIY (weeks)", godaddy: "7-14 days", agencies: "30-60 days" },
  { feature: "Admin Panel", siteblitz: "Included", wix: "Limited", godaddy: "Basic", agencies: "Extra ₹20K" },
  { feature: "Mobile Optimized", siteblitz: "Yes", wix: "Templates", godaddy: "No", agencies: "Sometimes" },
  { feature: "SEO Included", siteblitz: "Yes", wix: "Pay extra", godaddy: "No", agencies: "Extra ₹30K" },
  { feature: "Support", siteblitz: "Lifetime", wix: "Email only", godaddy: "Paid", agencies: "Limited" },
  { feature: "Custom Design", siteblitz: "Yes", wix: "Templates", godaddy: "Templates", agencies: "Yes" },
  { feature: "Payment Gateway", siteblitz: "Included", wix: "Extra $$", godaddy: "No", agencies: "Extra ₹10K" }
];

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">Why Businesses Choose SiteBlitz Over Wix, GoDaddy & Agencies</h2>
        </div>

        <div className="overflow-x-auto bg-white border border-border rounded-3xl shadow-sm">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-gray-50 text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Feature</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">SiteBlitz</th>
                <th className="text-left px-6 py-4 font-semibold">Wix/Canva</th>
                <th className="text-left px-6 py-4 font-semibold">GoDaddy</th>
                <th className="text-left px-6 py-4 font-semibold">Agencies</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-t border-border">
                  <td className="px-6 py-4 font-medium">{row.feature}</td>
                  <td className="px-6 py-4 text-primary font-semibold">{row.siteblitz}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.wix}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.godaddy}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.agencies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center text-primary font-semibold">🏆 Winner: SiteBlitz (50% cheaper, 10X faster, better support)</div>
      </div>
    </section>
  );
}

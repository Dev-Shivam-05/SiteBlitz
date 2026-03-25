import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ROICalculatorProps {
  whatsappLink: string;
}

const currencyFormatter = new Intl.NumberFormat("en-IN");

export function ROICalculator({ whatsappLink }: ROICalculatorProps) {
  const [customersPerMonth, setCustomersPerMonth] = useState(30);
  const [avgOrderValue, setAvgOrderValue] = useState(1200);

  const roiMetrics = useMemo(() => {
    const lostMonthly = Math.round(customersPerMonth * avgOrderValue * 0.3);
    const lostYearly = lostMonthly * 12;
    const additionalMonthly = lostMonthly;
    const dailyGain = additionalMonthly / 30;
    const daysToPay = dailyGain > 0 ? Math.ceil(7999 / dailyGain) : 0;
    return { lostMonthly, lostYearly, additionalMonthly, daysToPay };
  }, [customersPerMonth, avgOrderValue]);

  return (
    <section id="roi" className="py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">Calculate What You're Losing Without a Website</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
              <label className="text-sm font-semibold text-muted-foreground">How many customers do you get per month?</label>
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={customersPerMonth}
                  onChange={(e) => setCustomersPerMonth(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Customers per month"
                />
                <span className="w-16 text-right font-bold text-lg text-foreground">{customersPerMonth}</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
              <label className="text-sm font-semibold text-muted-foreground">Average order value?</label>
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Average order value"
                />
                <span className="w-24 text-right font-bold text-lg text-foreground">₹{avgOrderValue}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-border rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-sm font-semibold text-muted-foreground">Without Website</div>
              <div className="mt-3 text-3xl font-extrabold text-red-500">₹{currencyFormatter.format(roiMetrics.lostMonthly)}</div>
              <div className="text-sm text-muted-foreground mt-2">Yearly Lost: ₹{currencyFormatter.format(roiMetrics.lostYearly)}</div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="text-sm font-semibold text-muted-foreground">With SiteBlitz Website</div>
              <div className="mt-2 text-sm text-muted-foreground">30% More Customers (industry avg)</div>
              <div className="mt-3 text-2xl font-bold text-green-600">₹{currencyFormatter.format(roiMetrics.additionalMonthly)} extra/month</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Website pays for itself in <span className="font-semibold text-foreground">{roiMetrics.daysToPay} days</span>
              </div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold text-lg hover:bg-primary/90 transition-colors">
              Stop Losing Money. Get Website Now <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

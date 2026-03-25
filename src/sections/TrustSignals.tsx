import { ReactNode } from "react";
import { BadgeCheck, ShieldCheck, Star, Zap } from "lucide-react";

interface TrustItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const trustSignals: TrustItem[] = [
  { title: "Secure Payment", description: "256-bit SSL encryption. Your data is safe.", icon: <ShieldCheck className="w-6 h-6" /> },
  { title: "Money-Back Guarantee", description: "Not happy? Full refund. No questions.", icon: <BadgeCheck className="w-6 h-6" /> },
  { title: "24-Hour Delivery", description: "Guaranteed or you don't pay.", icon: <Zap className="w-6 h-6" /> },
  { title: "5-Year Track Record", description: "142+ happy clients. 98% satisfaction.", icon: <Star className="w-6 h-6" /> }
];

export function TrustSignals() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 border-y border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">Trust Signals That Close the Deal</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="bg-white border border-border rounded-3xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                {signal.icon}
              </div>
              <h3 className="font-bold text-lg">{signal.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2, Clock } from "lucide-react";

export interface PricingPlan {
  badge: string;
  name: string;
  subtitle: string;
  marketPrice: string;
  price: string;
  save: string;
  delivery: string;
  bestFor: string;
  features: string[];
  tech: string;
  cta: string;
  highlight?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  whatsappBaseLink: string;
  recommended: boolean;
}

export function PricingCard({ plan, whatsappBaseLink, recommended }: PricingCardProps) {
  const message = `Hi! I want the ${plan.name} plan (${plan.price}). How do we get started?`;
  const highlight = plan.highlight || recommended;

  return (
    <div className={`relative bg-white border border-border rounded-3xl p-6 flex flex-col h-full shadow-sm transition-transform hover:-translate-y-2 ${highlight ? "md:-mt-4 md:mb-[-1rem] ring-2 ring-primary/40" : ""}`}>
      {plan.highlight && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}
      {recommended && !plan.highlight && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] uppercase tracking-wider">
            Recommended
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="text-4xl mb-2">{plan.badge}</div>
        <h3 className="font-display font-bold text-xl">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="text-muted-foreground line-through text-sm mb-1">{plan.marketPrice}</div>
        <div className="text-4xl sm:text-5xl font-extrabold font-display text-foreground">{plan.price}</div>
        <span className="inline-flex mt-3 text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">{plan.save}</span>
      </div>

      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 mb-4 w-fit">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium">{plan.delivery}</span>
      </div>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Best For</div>
        <div className="text-sm font-medium">{plan.bestFor}</div>
      </div>

      <div className="flex-grow space-y-3 mb-6">
        {plan.features.map((feat) => (
          <div key={feat} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80">{feat}</span>
          </div>
        ))}
      </div>

      <div className="mb-5 text-xs font-semibold text-muted-foreground">Tech: <span className="text-foreground">{plan.tech}</span></div>

      <a
        href={`${whatsappBaseLink}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noreferrer"
        className={`w-full px-6 py-3 rounded-md font-bold text-center transition-all ${
          highlight ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-[0_0_20px_rgba(0,102,255,0.35)] hover:shadow-[0_0_30px_rgba(0,102,255,0.45)]" : "bg-gray-100 hover:bg-gray-200 text-foreground border border-border"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  result: string;
  quote: string;
  plan: string;
  image: string;
  badge: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onView: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, onView }: PortfolioCardProps) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <span className="absolute top-4 left-4 bg-white/90 text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-border">
          {item.badge}
        </span>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onView(item)}
            className="px-6 py-3 bg-white text-foreground font-bold rounded-md flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            View Live Site <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
          <CheckCircle2 className="w-3 h-3" /> {item.result}
        </div>
        <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground italic">"{item.quote}"</p>
        <div className="mt-4 text-xs font-semibold text-primary">{item.plan}</div>
      </div>
    </div>
  );
}

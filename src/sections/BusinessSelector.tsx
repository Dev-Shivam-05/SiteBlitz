import { ReactNode, useState } from "react";
import { Building2, Dumbbell, Scissors, ShoppingBag, Stethoscope, UtensilsCrossed } from "lucide-react";

interface BusinessSelectorProps {
  onSelectPlan: (plan: string | null) => void;
  whatsappBaseLink: string;
}

interface BusinessOption {
  id: string;
  label: string;
  plan: string;
  icon: ReactNode;
  message: string;
  detail: string;
}

const options: BusinessOption[] = [
  {
    id: "restaurant",
    label: "Restaurant/Cafe",
    plan: "BUSINESS",
    icon: <UtensilsCrossed className="w-10 h-10" />,
    message: "Hi! I selected RESTAURANT as my business type. I'm interested in the BUSINESS plan with online ordering. Can you share more details?",
    detail: "Based on restaurants in India, we recommend BUSINESS plan with online ordering."
  },
  {
    id: "clinic",
    label: "Clinic/Doctor",
    plan: "PROFESSIONAL",
    icon: <Stethoscope className="w-10 h-10" />,
    message: "Hi! I selected CLINIC as my business type. I'm interested in the PROFESSIONAL plan. Can you share more details?",
    detail: "Clinics grow faster with PROFESSIONAL plan and online booking."
  },
  {
    id: "shop",
    label: "Shop/Retail",
    plan: "BUSINESS",
    icon: <ShoppingBag className="w-10 h-10" />,
    message: "Hi! I selected SHOP as my business type. I'm interested in the BUSINESS plan. Can you share more details?",
    detail: "Shops convert best with BUSINESS plan and product catalog."
  },
  {
    id: "salon",
    label: "Salon/Spa",
    plan: "PROFESSIONAL",
    icon: <Scissors className="w-10 h-10" />,
    message: "Hi! I selected SALON as my business type. I'm interested in the PROFESSIONAL plan. Can you share more details?",
    detail: "Salons win with PROFESSIONAL plan and appointment bookings."
  },
  {
    id: "gym",
    label: "Gym/Fitness",
    plan: "PROFESSIONAL",
    icon: <Dumbbell className="w-10 h-10" />,
    message: "Hi! I selected GYM as my business type. I'm interested in the PROFESSIONAL plan. Can you share more details?",
    detail: "Gyms grow faster with PROFESSIONAL plan and memberships."
  },
  {
    id: "other",
    label: "Other Business",
    plan: "VIEW",
    icon: <Building2 className="w-10 h-10" />,
    message: "Hi! I want help choosing the best plan for my business. Can you guide me?",
    detail: "We will help you pick the best plan for your business."
  }
];

export function BusinessSelector({ onSelectPlan, whatsappBaseLink }: BusinessSelectorProps) {
  const [selected, setSelected] = useState<BusinessOption | null>(options[0]);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">What Type of Business Do You Have?</h2>
          <p className="text-muted-foreground mt-3">Pick your business type to see the recommended plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelected(option);
                onSelectPlan(option.plan === "VIEW" ? null : option.plan);
              }}
              className={`p-8 border-2 rounded-md text-left hover:border-primary hover:shadow-xl transition-all ${
                selected?.id === option.id ? "border-primary shadow-[0_0_20px_rgba(0,102,255,0.2)]" : "border-border"
              }`}
            >
              <div className="text-primary mb-4">{option.icon}</div>
              <h3 className="text-xl font-bold mb-2">{option.label}</h3>
              <span className="text-sm text-secondary font-semibold">
                {option.plan === "VIEW" ? "View All Plans →" : `${option.plan} Plan →`}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-8 bg-gray-50 border border-border rounded-2xl p-6 text-center">
            <p className="text-sm font-semibold text-foreground">{selected.detail}</p>
            <a
              href={`${whatsappBaseLink}?text=${encodeURIComponent(selected.message)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors"
            >
              Chat About {selected.plan === "VIEW" ? "Plans" : `${selected.plan} Plan`}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

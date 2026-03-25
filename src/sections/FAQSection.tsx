import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  { question: "How can you deliver so fast?", answer: "We use pre-optimized templates + automation, then customize every site for your business." },
  { question: "Is ₹7,999 really worth it?", answer: "One customer = ₹10K profit. Website pays for itself with 1 sale. Plus 1 year free hosting (₹3K value)." },
  { question: "Can I trust you won't scam me?", answer: "Pay only ₹999 advance. See the live website. Then pay rest. 100% money-back if unhappy." },
  { question: "What if I need changes later?", answer: "Admin panel lets you update content. Need developer? ₹500/hour (competitors charge ₹2K)." },
  { question: "Do you provide domain + hosting?", answer: "Yes. Domain ₹999/year. Hosting FREE first year (then ₹2,999/year)." },
  { question: "Will my website rank on Google?", answer: "We include SEO, submit to Google, and give a ranking guide. 80% of clients rank first page in 60 days." },
  { question: "What if my area doesn't have internet users?", answer: "Even tier-3 cities: 70% Google before buying. You're invisible without a website." },
  { question: "Can I see the website before paying full amount?", answer: "Yes. We build it, show you, you approve, then you pay. Zero risk." },
  { question: "What if I don't like the design?", answer: "Unlimited revisions until you're happy. 98% approve the first design." },
  { question: "How do I update content after launch?", answer: "Professional+ plans include an admin panel. Login, click edit, done. We also provide a training video." }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-gray-50 border-y border-border">
      <div className="container max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">Questions? We've Got Answers.</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="bg-white border border-border rounded-2xl px-6">
              <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

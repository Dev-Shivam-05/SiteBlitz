export function SocialProofMarquee() {
  return (
    <section className="py-6 border-y border-border bg-gray-50 overflow-hidden relative flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4 whitespace-nowrap">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="font-medium">Ramesh Kumar, Plumber</span>
            <span className="text-muted-foreground italic">"Got 60 calls in first month"</span>
            <span className="text-primary">•</span>
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="font-medium">Dr. Priya Clinic</span>
            <span className="text-muted-foreground italic">"Bookings increased 3x"</span>
            <span className="text-primary">•</span>
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="font-medium">Anand Sweets</span>
            <span className="text-muted-foreground italic">"Best investment ever"</span>
            <span className="text-primary">•</span>
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="font-medium">Fitness Hub</span>
            <span className="text-muted-foreground italic">"ROI in 30 days"</span>
            <span className="text-primary">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}

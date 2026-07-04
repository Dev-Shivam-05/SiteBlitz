export function Marquee({
  items,
  className = "",
  slow = false,
  reverse = false,
}: {
  items: string[];
  className?: string;
  slow?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-mask overflow-hidden ${className}`} aria-hidden>
      <div
        className={`flex w-max whitespace-nowrap ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-4">{item}</span>
            <span className="text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

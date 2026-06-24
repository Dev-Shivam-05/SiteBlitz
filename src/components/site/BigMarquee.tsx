/** Giant outline-type marquee band — velocity-reactive via the Motion engine. */
export function BigMarquee({ words }: { words: string[] }) {
  const row = [...words, ...words];
  return (
    <div className="marquee-mask overflow-hidden border-y border-line py-6 md:py-10" aria-hidden>
      <div data-marquee-inner data-duration="34" className="flex w-max items-center whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display px-6 text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl ${
                i % 2 === 0 ? "text-outline" : "text-volt"
              }`}
            >
              {w}
            </span>
            <span className="text-3xl text-volt md:text-5xl">⚡</span>
          </span>
        ))}
      </div>
    </div>
  );
}

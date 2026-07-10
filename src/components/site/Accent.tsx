/** Renders a headline where one *phrase* (asterisk-marked) becomes the
 *  italic serif accent in volt. */
export function Accent({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-accent italic text-volt">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Server-rendered JSON-LD. `<` is escaped so a string inside the data (an FAQ answer, a title) can never close the
 *  script tag early - JSON.stringify alone does not protect against `</script>`. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

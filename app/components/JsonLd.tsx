type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

// Renders structured data as a JSON-LD <script>. The `<` escape prevents
// XSS via any string that closes the script tag early.
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

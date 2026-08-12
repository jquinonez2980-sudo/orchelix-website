/* Named operators from PRODUCT.md — names and plain facts only.
   No quotes, logos, or outcome metrics unless assets and numbers are real. */

import { Section, SectionTitle, Prose } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";

export default function Operators({ t }: { t: Messages }) {
  const o = t.operators;
  return (
    <Section id="operators" tone="stock">
      <SectionTitle tone="stock" max="16ch">
        {o.title}
      </SectionTitle>
      <Prose size="1.0625rem" max="48ch" tone="stock" style={{ marginTop: "1.5rem" }}>
        {o.lede}
      </Prose>
      <ul
        className="mt-12 m-0 grid list-none gap-0 p-0 sm:grid-cols-3"
        style={{ borderTop: "2px solid var(--lg-rule)" }}
      >
        {o.items.map((item) => (
          <li
            key={item.name}
            style={{
              borderBottom: "1px solid var(--lg-hair)",
              padding: "1.4rem 1.1rem 1.5rem 0",
            }}
          >
            <p
              className="lg-fig"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "var(--lg-ink-3)",
                margin: "0 0 0.55rem",
              }}
            >
              Operator
            </p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStretch: "88%",
                  fontWeight: 600,
                  fontSize: "1.0625rem",
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink)",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </a>
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStretch: "88%",
                  fontWeight: 600,
                  fontSize: "1.0625rem",
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink)",
                  margin: 0,
                }}
              >
                {item.name}
              </p>
            )}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: 1.55,
                color: "var(--lg-ink-2)",
                margin: "0.55rem 0 0",
                maxWidth: "28ch",
              }}
            >
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

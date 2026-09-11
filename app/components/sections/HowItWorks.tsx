/* The pilot, set as a ruled schedule on ledger stock. The sequence carries
   real information — these are dated stages, not decorative numbering.
   React Bits: ScrollReveal on each stage (one motion language). */

import { Section, SectionTitle, Prose, ink3For } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";
import ScrollReveal from "@/app/components/react-bits/ScrollReveal";

export default function HowItWorks({ t }: { t: Messages }) {
  return (
    <Section id="how" tone="stock" scene>
      <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div style={{ position: "sticky", top: "6.5rem", alignSelf: "start" }}>
          <SectionTitle tone="stock" max="14ch">
            {t.home.pilotTitle}
          </SectionTitle>
        </div>

        <div>
          <Prose tone="stock" size="1.0625rem" max="58ch" style={{ marginBottom: "3rem" }}>
            {t.home.pilotBody}
          </Prose>

          <ol className="m-0 list-none p-0" style={{ borderTop: "2px solid var(--lg-rule)" }}>
            {t.home.stages.map((s, i) => (
              <li
                key={s.day}
                className="lg-row"
                style={{
                  gridTemplateColumns: "minmax(0,1fr)",
                  padding: "1.6rem 0",
                  borderBottomColor: "var(--lg-hair)",
                  gap: "0.45rem",
                }}
              >
                <ScrollReveal delay={i * 0.04}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className="lg-fig"
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        /* Was `--lg-rule` — a ruling colour, 2.93:1 as text
                           on this ground. The dated margin is text. */
                        color: ink3For("stock"),
                        minWidth: "6rem",
                      }}
                    >
                      {s.day}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStretch: "var(--lg-stretch)",
                        fontWeight: "var(--lg-w-title)",
                        fontSize: "1.25rem",
                        letterSpacing: "var(--lg-track-title)",
                        textTransform: "uppercase",
                        color: "var(--lg-ink-on-stock)",
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <Prose tone="stock" size="0.9375rem" max="60ch">
                    {s.desc}
                  </Prose>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

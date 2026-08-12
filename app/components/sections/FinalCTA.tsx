/* The close. The page ends anchored on the foil — the stamp that signs the
   book, at the scale a signature block has in life. */

import { Section, SectionTitle, Prose, Stamp, QuietAction } from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import enMessages, { type Messages } from "@/app/i18n/messages/en";

/* Defaults to English: /ai-receptionist and its industry pages live under
   `app/(site)/` and share this close without threading a catalogue through. */
export default function FinalCTA({
  locale = "en",
  t = enMessages,
}: {
  locale?: Locale;
  t?: Messages;
} = {}) {
  return (
    <Section id="book" tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
      <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <SectionTitle scale="display" max="16ch">
            {t.common.startWithOneWorkflow}
          </SectionTitle>
          <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
            {t.common.startWithOneWorkflowBody}
          </Prose>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
          <Stamp href={localizedHref("/book", locale)} size="1rem">
            {t.common.bookPilot}
          </Stamp>
          <QuietAction href={locale === "es" ? "/try-esmi?lang=es" : "/try-esmi"}>
            {t.common.hearRealCall}
          </QuietAction>
          <QuietAction href={localizedHref("/pricing", locale)}>{t.common.seePricing}</QuietAction>
        </div>
      </div>

      {/* Journey continuum: persuade → experience → commit → operate */}
      <ol
        className="mt-14 grid gap-6 border-t sm:grid-cols-2 lg:grid-cols-4"
        style={{
          borderColor: "var(--lg-hair)",
          paddingTop: "2rem",
          listStyle: "none",
          margin: "2.5rem 0 0",
          paddingLeft: 0,
        }}
      >
        {(
          locale === "es"
            ? [
                ["01", "Escucha", "Una grabación real de Esmi"],
                ["02", "Agenda", "Piloto de 14 días con un consultor"],
                ["03", "Mapa", "Un flujo de trabajo, tu número real"],
                ["04", "Registro", "Cada acción en la consola de operador"],
              ]
            : [
                ["01", "Hear", "A real Esmi call on this site"],
                ["02", "Book", "A 14-day pilot with a senior consultant"],
                ["03", "Map", "One workflow on your real line"],
                ["04", "Operate", "Every action on the operator register"],
              ]
        ).map(([n, title, body]) => (
          <li key={n}>
            <p
              className="lg-fig"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--lg-ink-3)",
                margin: "0 0 0.5rem",
              }}
            >
              {n} · {title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: 1.5,
                color: "var(--lg-ink-2)",
                margin: 0,
              }}
            >
              {body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

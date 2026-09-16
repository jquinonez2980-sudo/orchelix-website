/* The close. The page ends anchored on the foil — the stamp that signs the
   book, at the scale a signature block has in life.

   One of the three night bands. Dark is punctuation here, not a stripe: this
   is the last thing on the page and it stops, rather than trailing into the
   footer. The stamp on this ground carries the night accent and near-black
   ink — white on it is 3.58:1 and fails — which `.lg-night` has already
   arranged through `--lg-foil` / `--lg-foil-ink`, so `Stamp` is unchanged. */

import {
  Section,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  ink2For,
  ink3For,
} from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import { ESMI_PILOT_PAYMENT_LINK } from "@/app/lib/pilotPayment";
import enMessages, { type Messages } from "@/app/i18n/messages/en";

/* Defaults to English: /ai-receptionist and its industry pages live under
   `app/(site)/` and share this close without threading a catalogue through. */
const TONE = "night" as const;

export default function FinalCTA({
  locale = "en",
  t = enMessages,
}: {
  locale?: Locale;
  t?: Messages;
} = {}) {
  return (
    <Section id="book" tone={TONE} scene style={{ borderTop: "2px solid var(--lg-foil)" }}>
      <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <SectionTitle tone={TONE} scale="display" max="16ch">
            {t.common.startWithOneWorkflow}
          </SectionTitle>
          <Prose tone={TONE} size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
            {t.common.startWithOneWorkflowBody}
          </Prose>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
          <Stamp href={ESMI_PILOT_PAYMENT_LINK} size="1rem">
            {t.common.startPilot}
          </Stamp>
          <QuietAction tone={TONE} href={locale === "es" ? "/try-esmi?lang=es" : "/try-esmi"}>
            {t.common.hearRealCall}
          </QuietAction>
          <QuietAction tone={TONE} href={localizedHref("/book", locale)}>
            {t.common.bookPilot}
          </QuietAction>
          <QuietAction tone={TONE} href={localizedHref("/pricing", locale)}>
            {t.common.seePricing}
          </QuietAction>
        </div>
      </div>

      {/* The continuum: persuade -> experience -> commit -> operate. Both
          languages used to be written out here as a ternary; they are in the
          catalogue now. The 01/02/03/04 markers are gone with them — an
          ordered list is already ordered. */}
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
        {t.common.journey.map((step) => (
          <li key={step.title}>
            <p
              className="lg-fig"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ink3For(TONE),
                margin: "0 0 0.5rem",
              }}
            >
              {step.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: 1.5,
                color: ink2For(TONE),
                margin: 0,
              }}
            >
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

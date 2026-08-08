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
          <QuietAction href={localizedHref("/pricing", locale)}>{t.common.seePricing}</QuietAction>
        </div>
      </div>
    </Section>
  );
}

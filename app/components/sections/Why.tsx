/* Four commitments, set as ruled entries. Not four identical icon cards —
   the weight sits in the claim, and each one is checkable. */

import { Section, SectionTitle, EntryList } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";

export default function Why({ t }: { t: Messages }) {
  return (
    <Section id="why" tone="field">
      <SectionTitle max="18ch">{t.home.whyTitle}</SectionTitle>

      <div className="mt-14">
        <EntryList columns={2} entries={t.home.commitments} />
      </div>
    </Section>
  );
}

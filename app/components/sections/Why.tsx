/* Four commitments, set as ruled entries. Not four identical icon cards —
   the weight sits in the claim, and each one is checkable. */

import { Section, SectionTitle, EntryList, Plate } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";
import editorialLedger from "@/public/editorial-ledger.jpg";

export default function Why({ t }: { t: Messages }) {
  return (
    <Section id="why" tone="field" scene>
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
        <SectionTitle max="18ch">{t.home.whyTitle}</SectionTitle>
        <Plate src={editorialLedger} alt={t.visuals.editorialLedger} max={560} />
      </div>

      <div className="mt-14">
        <EntryList columns={2} entries={t.home.commitments} />
      </div>
    </Section>
  );
}

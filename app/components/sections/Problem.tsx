/* What goes unrecorded. Set as arrears on ledger stock — the entries a
   business never gets to write because the work happened without them. */

import { Section, SectionTitle, EntryList } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";

export default function Problem({ t }: { t: Messages }) {
  return (
    <Section id="problem" tone="stock-2" tight>
      <SectionTitle tone="stock-2" max="24ch">
        {t.home.problemTitle}
      </SectionTitle>

      <div className="mt-12">
        <EntryList
          tone="stock-2"
          columns={2}
          entries={t.home.arrears.map((a) => ({ title: a.entry, desc: a.desc }))}
        />
      </div>
    </Section>
  );
}

/* Four commitments, set as ruled entries. Not four identical icon cards —
   the weight sits in the claim, and each one is checkable.

   This is the page's proof moment and the second of its three night bands.
   The still beside it was shot under both lights; `TonePlate` picks the night
   exposure from the band's own tone, so the artwork and the ground cannot
   disagree. It used to be chosen at runtime by a client component subscribed
   to the Inscription scene's theme store — a hydration flip to answer a
   question the markup already knew. */

import { Section, SectionTitle, EntryList, TonePlate } from "@/app/components/ledger";
import type { Messages } from "@/app/i18n/messages/en";
import { UserRound, Languages, ScrollText, Hand } from "lucide-react";
import editorialLedger from "@/public/editorial-ledger.jpg";
import editorialLedgerNight from "@/public/editorial-ledger-night.jpg";

const TONE = "night" as const;

export default function Why({ t }: { t: Messages }) {
  return (
    <Section id="why" tone={TONE} scene>
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
        <SectionTitle tone={TONE} max="18ch">
          {t.home.whyTitle}
        </SectionTitle>
        <TonePlate
          tone={TONE}
          day={editorialLedger}
          night={editorialLedgerNight}
          alt={t.visuals.editorialLedger}
          max={560}
        />
      </div>

      <div className="mt-14">
        <EntryList
          tone={TONE}
          columns={2}
          entries={t.home.commitments}
          glass
          icons={[<UserRound key="a" />, <Languages key="b" />, <ScrollText key="c" />, <Hand key="d" />]}
        />
      </div>
    </Section>
  );
}

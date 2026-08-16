/* The live Esmi clip, given its own section so it cannot hide under the
   register. Title and play control are the first things in the band. */

import { Section, SectionTitle, Prose } from "@/app/components/ledger";
import type { Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import HeroProof from "./HeroProofLazy";

export default function HearCall({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <Section id="hear-esmi" tone="field-2" scene className="lg-hear">
      <SectionTitle scale="display" max="14ch">
        {t.common.hearRealCall}
      </SectionTitle>
      <Prose size="1.125rem" max="44ch" style={{ marginTop: "1.35rem" }}>
        {t.home.hearLede}
      </Prose>
      <div className="lg-hear-stage">
        <HeroProof locale={locale} hideLabel />
      </div>
    </Section>
  );
}

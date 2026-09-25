/* The live Esmi clip, given its own section so it cannot hide under the
   register. Title first, then the listening stage and the sample call. */

import { Section, SectionTitle, Prose } from "@/app/components/ledger";
import type { Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import HeroProof from "./HeroProofLazy";

export default function HearCall({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <Section id="hear-esmi" tone="field" scene className="lg-hear">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <SectionTitle scale="display" max="14ch">
          {t.common.hearRealCall}
        </SectionTitle>
        <Prose size="1.125rem" max="36ch">
          {t.home.hearLede}
        </Prose>
      </div>
      <div className="lg-hear-stage">
        <HeroProof locale={locale} />
      </div>
    </Section>
  );
}

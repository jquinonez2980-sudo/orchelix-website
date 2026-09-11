"use client";

import Overview from "./Overview";
import { useDashI18n } from "./i18n";

export default function OverviewPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto w-full max-w-[1560px] px-4 py-6 sm:px-6">
      {/* The console opens on the line, not on a display headline: that
          heading cost a full fold and answered no question an operator has
          at 6am. The page still needs one h1, so it stays for screen
          readers and the visible opener is the line's state (an h2 inside
          LineBlock). The lede moved in there with it. */}
      <h1 className="sr-only">{t.overview.title}</h1>
      <Overview />
    </main>
  );
}

"use client";

import Appointments from "./Appointments";
import PageTitle, { PageLede } from "../PageTitle";
import { useDashI18n } from "../i18n";

export default function AppointmentsPage() {
  const { t } = useDashI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>
          {t.pages.appointmentsTitle}
        </PageTitle>
        <PageLede>
          {t.pages.appointmentsLede}
        </PageLede>
      </div>
      <Appointments />
    </main>
  );
}

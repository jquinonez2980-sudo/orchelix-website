"use client";

/* Tonight's work — open reviews + escalated leads + after-hours at a glance. */

import { useEffect, useState } from "react";
import { SectionTitle } from "./PageTitle";
import Link from "next/link";
import {
  fetchReviews,
  fetchLeads,
  type CallReviewsResponse,
} from "@/app/lib/esmiPlatform";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import { useDashI18n } from "./i18n";

export default function TonightWork({
  afterHours,
  leadsEscalated,
}: {
  afterHours: number;
  leadsEscalated: number;
}) {
  const { t, locale } = useDashI18n();
  const orgSlug = useActiveOrgSlug();
  const [reviews, setReviews] = useState<CallReviewsResponse | null>(null);
  const [newLeads, setNewLeads] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchReviews("call")
      .then((r) => active && setReviews(r))
      .catch(() => active && setReviews({ tenant_id: "", reviews: {} }));
    fetchLeads({ status: "new", limit: 1, offset: 0 })
      .then((d) => active && setNewLeads(d.total))
      .catch(() => active && setNewLeads(null));
    return () => {
      active = false;
    };
  }, [orgSlug]);

  const openReviews = reviews
    ? Object.values(reviews.reviews).filter(
        (r) => r.status === "open" || r.status === "needs_followup",
      ).length
    : null;

  const items = [
    {
      key: "reviews",
      label: locale === "es" ? "Necesitan revisión" : "Need review",
      value: openReviews,
      href: "/dashboard/calls?review=open",
      hint:
        locale === "es"
          ? "Llamadas abiertas o con seguimiento"
          : "Open or follow-up calls",
    },
    {
      key: "leads",
      label: locale === "es" ? "Prospectos nuevos" : "New leads",
      value: newLeads ?? leadsEscalated,
      href: "/dashboard/leads?status=new",
      hint:
        locale === "es"
          ? "Bandeja de prospectos sin contactar"
          : "Uncontacted leads in the inbox",
    },
    {
      key: "after",
      label: t.overview.afterHours,
      value: afterHours,
      href: "/dashboard/calls",
      hint:
        locale === "es"
          ? "Últimos 7 días"
          : "Last 7 days",
    },
  ];

  return (
    <section
      className="border border-line bg-surface p-5"
      style={{ borderTop: "2px solid var(--lg-rule)" }}
    >
      <SectionTitle>
        {locale === "es" ? "Trabajo de esta noche" : "Tonight's work"}
      </SectionTitle>
      <p className="mt-0.5 text-xs text-ink-3">
        {locale === "es"
          ? "Lo que necesita una persona esta mañana — no un tablero de KPIs."
          : "What needs a person this morning — not a KPI farm."}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="block border border-line bg-surface-2 px-4 py-3 transition-colors hover:bg-surface"
            >
              <p
                className="lg-fig text-xs uppercase text-ink-3"
                style={{ letterSpacing: "0.1em" }}
              >
                {item.label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">
                {item.value == null ? "…" : item.value}
              </p>
              <p className="mt-1 text-xs text-ink-3">{item.hint}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

/* Tonight's work — what needs a person: calls to review, the uncontacted
   leads inbox, and callers who hung up or left a voicemail. Esmi answers
   every call, so that tile is labelled by what the caller did, never as
   "missed". The after-hours count lives in the line block above and is not
   repeated here.

   "Uncontacted leads" is the whole inbox (status=new, any age), not this
   week's routed count in the band above — the two come from different
   sources (`/leads` vs `/overview`) and answer different questions, so the
   labels say so rather than one silently standing in for the other. */

import { useEffect, useState } from "react";
import { SectionTitle } from "./PageTitle";
import Link from "next/link";
import {
  fetchCalls,
  fetchReviews,
  fetchLeads,
  type CallReviewsResponse,
} from "@/app/lib/esmiPlatform";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import { useDashI18n } from "./i18n";

// null while loading, "err" when the fetch failed — shown as "—", never as
// a borrowed number from somewhere else.
type Count = number | null | "err";

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function TonightWork() {
  const { t } = useDashI18n();
  const tw = t.overview.tonight;
  const orgSlug = useActiveOrgSlug();
  const [reviews, setReviews] = useState<CallReviewsResponse | null>(null);
  const [newLeads, setNewLeads] = useState<Count>(null);
  const [missed, setMissed] = useState<Count>(null);

  useEffect(() => {
    let active = true;
    fetchReviews("call")
      .then((r) => active && setReviews(r))
      .catch(() => active && setReviews({ tenant_id: "", reviews: {} }));
    fetchLeads({ status: "new", limit: 1, offset: 0 })
      .then((d) => active && setNewLeads(d.total))
      .catch(() => active && setNewLeads("err"));
    // Hung up (`abandoned`) + left a voicemail, last 7 days.
    const from_date = isoDaysAgo(6);
    Promise.all([
      fetchCalls({ outcome: "abandoned", from_date, limit: 1 }),
      fetchCalls({ outcome: "voicemail", from_date, limit: 1 }),
    ])
      .then(([a, v]) => active && setMissed(a.total + v.total))
      .catch(() => active && setMissed("err"));
    return () => {
      active = false;
    };
  }, [orgSlug]);

  const openReviews = reviews
    ? Object.values(reviews.reviews).filter(
        (r) => r.status === "open" || r.status === "needs_followup",
      ).length
    : null;

  const items: { key: string; label: string; value: Count; href: string; hint: string }[] = [
    {
      key: "reviews",
      label: tw.review,
      value: openReviews,
      href: "/dashboard/calls?review=open",
      hint: tw.reviewHint,
    },
    {
      key: "leads",
      label: tw.uncontacted,
      value: newLeads,
      href: "/dashboard/leads?status=new",
      hint: tw.uncontactedHint,
    },
    {
      key: "missed",
      label: tw.missed,
      value: missed,
      href: "/dashboard/calls",
      hint: tw.missedHint,
    },
  ];

  return (
    <section
      className="border border-line bg-surface p-5"
      style={{ borderTop: "2px solid var(--lg-rule)" }}
    >
      <SectionTitle>{tw.title}</SectionTitle>
      <p className="mt-0.5 text-xs text-ink-3">{tw.lede}</p>
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
                {item.value == null ? "…" : item.value === "err" ? "—" : item.value}
              </p>
              <p className="mt-1 text-xs text-ink-3">{item.hint}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

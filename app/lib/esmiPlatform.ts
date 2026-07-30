/* Types + client fetch helper for the Esmi platform API, reached through the
   same-origin proxy at /api/platform/* (never call Railway directly from the
   browser — the platform secret lives server-side only). */

export const CALL_OUTCOMES = [
  "booked",
  "info",
  "escalated",
  "voicemail",
  "abandoned",
  "other",
] as const;

export type CallOutcome = (typeof CALL_OUTCOMES)[number];

export type TranscriptMessage = {
  role?: string;
  message?: string;
  [key: string]: unknown;
};

export type CallTranscript = {
  text?: string;
  messages?: TranscriptMessage[];
} | null;

export type PlatformCall = {
  id: string;
  vapi_call_id: string | null;
  caller: string | null;
  started_at: string | null;
  ended_at: string | null;
  duration_sec: number | null;
  outcome: CallOutcome | null;
  summary: string | null;
  transcript: CallTranscript;
  recording_url: string | null;
  cost_vapi: number | null;
  cost_llm: number | null;
};

export type CallsResponse = {
  tenant_id: string;
  total: number;
  limit: number;
  offset: number;
  calls: PlatformCall[];
};

export type CallsQuery = {
  limit?: number;
  offset?: number;
  outcome?: CallOutcome | "";
  from_date?: string; // YYYY-MM-DD
  to_date?: string; // YYYY-MM-DD
};

export type OverviewBucket = {
  from: string;
  to: string;
  calls_answered: number;
  appointments_booked: number;
  leads_escalated: number;
  after_hours_calls: number;
  minutes_used: number;
  est_revenue_booked: number | null;
};

export type OverviewResponse = {
  tenant_id: string;
  business_tz: string;
  window_days: number;
  current: OverviewBucket;
  previous: OverviewBucket;
};

export type AppointmentStatus = "upcoming" | "past";

export type Appointment = {
  id: string;
  starts_at: string;
  ends_at: string | null;
  customer_name: string;
  contact_phone: string | null;
  contact_email: string | null;
  service: string | null;
  location: string;
  source: string | null; // voice | chat | website | null (added manually)
  status: AppointmentStatus;
  esmi_booked: boolean;
};

export type AppointmentsResponse = {
  tenant_id: string;
  total: number;
  upcoming_count: number;
  limit: number;
  offset: number;
  appointments: Appointment[];
};

export type AppointmentsQuery = {
  status?: "upcoming" | "past" | "all";
  search?: string;
  limit?: number;
  offset?: number;
};

export async function fetchAppointments(
  q: AppointmentsQuery,
): Promise<AppointmentsResponse> {
  const params = new URLSearchParams();
  if (q.status) params.set("status", q.status);
  if (q.search) params.set("search", q.search);
  if (q.limit) params.set("limit", String(q.limit));
  if (q.offset) params.set("offset", String(q.offset));
  const res = await fetch(`/api/platform/appointments?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") detail = body.error;
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* keep default */
    }
    throw new Error(detail);
  }
  return res.json();
}

export async function fetchOverview(): Promise<OverviewResponse> {
  const res = await fetch("/api/platform/overview", { cache: "no-store" });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") detail = body.error;
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* keep default */
    }
    throw new Error(detail);
  }
  return res.json();
}

export const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadCall = {
  id: string;
  vapi_call_id: string | null;
  started_at: string | null;
  outcome: CallOutcome | null;
  summary: string | null;
};

export type Lead = {
  // Real leads: the LangGraph thread_id. Derived (voice, not yet promoted):
  // "voice:<call id>" — see platform_api/leads.py.
  id: string;
  contact: string | null;
  summary: string | null;
  lead_score: number | null;
  qualified: boolean;
  status: LeadStatus;
  last_updated: string | null;
  source_call_id: string | null;
  // True when this row has no persisted `leads` record yet — it's computed
  // from an escalated call (voice bypasses the graph, so it's never recorded
  // the way a qualified web chat is). The first status change promotes it.
  derived: boolean;
  call: LeadCall | null;
};

export type LeadsResponse = {
  tenant_id: string;
  total: number;
  limit: number;
  offset: number;
  leads: Lead[];
};

export type LeadsQuery = {
  status?: LeadStatus | "";
  search?: string;
  limit?: number;
  offset?: number;
};

export async function fetchLeads(q: LeadsQuery): Promise<LeadsResponse> {
  const params = new URLSearchParams();
  if (q.status) params.set("status", q.status);
  if (q.search) params.set("search", q.search);
  if (q.limit) params.set("limit", String(q.limit));
  if (q.offset) params.set("offset", String(q.offset));
  const res = await fetch(`/api/platform/leads?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") detail = body.error;
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* keep default */
    }
    throw new Error(detail);
  }
  return res.json();
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
): Promise<Lead> {
  const res = await fetch(`/api/platform/leads/${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") detail = body.error;
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* keep default */
    }
    throw new Error(detail);
  }
  const data = await res.json();
  return data.lead as Lead;
}

/* ── Settings (Business Profile + Hours + Services + Greeting) ────────────── */

export type LocationSettings = {
  name: string;
  address: string;
  phone: string;
  business_hours: [number, number];
  business_days: number[];
  booking_days: number[] | null;
  day_hours: Record<string, [number, number]>;
};

export type ServiceSettings = {
  name: string;
  duration_min: number;
  price: string;
  price_by_location: Record<string, string>;
  // Spanish display name for get_pricing(lang="es"). No dedicated input in
  // the Settings form yet — carried through fetch/save so it survives an
  // unrelated save instead of being silently wiped back to empty.
  name_es: string;
};

export type PlatformConfig = {
  company_name: string;
  greeting: string;
  transfer_phone: string;
  business_hours: [number, number];
  business_days: number[];
  has_locations: boolean;
  locations: Record<string, LocationSettings>;
  services: Record<string, ServiceSettings>;
  emails: {
    booking_to: string;
    escalation_to: string;
  };
};

export type ConfigResponse = {
  tenant_id: string;
  version: number | null;
  config: PlatformConfig;
};

// Partial update sent to PUT /api/platform/config — every field optional,
// only the ones the form touched need to be present. expected_version enables
// optimistic-concurrency: omit it to always overwrite.
export type ConfigUpdate = Partial<{
  company_name: string;
  greeting: string;
  transfer_phone: string;
  business_hours: [number, number];
  business_days: number[];
  locations: Record<string, Partial<Omit<LocationSettings, "day_hours">> & {
    day_hours?: Record<string, [number, number]>;
  }>;
  services: Record<string, ServiceSettings>;
  emails: Partial<PlatformConfig["emails"]>;
  expected_version: number;
}>;

async function readErrorDetail(res: Response): Promise<string> {
  let detail = `Request failed (${res.status})`;
  try {
    const body = await res.json();
    if (typeof body?.error === "string") detail = body.error;
    if (typeof body?.detail === "string") detail = body.detail;
  } catch {
    /* keep default */
  }
  return detail;
}

export async function fetchConfig(): Promise<ConfigResponse> {
  const res = await fetch("/api/platform/config", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export async function updateConfig(update: ConfigUpdate): Promise<ConfigResponse> {
  const res = await fetch("/api/platform/config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export type ConfigVersionSummary = {
  version: number;
  created_at: string | null;
  created_by: string | null;
  summary: string;
};

export type ConfigVersionsResponse = {
  tenant_id: string;
  versions: ConfigVersionSummary[];
};

export type ConfigVersionDetail = {
  tenant_id: string;
  version: number;
  created_at: string | null;
  created_by: string | null;
  config: PlatformConfig;
};

export async function fetchConfigVersions(): Promise<ConfigVersionsResponse> {
  const res = await fetch("/api/platform/config/versions", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export async function fetchConfigVersion(version: number): Promise<ConfigVersionDetail> {
  const res = await fetch(`/api/platform/config/versions/${version}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

/* ── Knowledge base (FAQ / text entries) ───────────────────────────────────── */

export type KnowledgeEntry = {
  id: string;
  question: string | null;
  answer: string;
  created_at: string;
};

export type KnowledgePdfEntry = {
  id: string;
  filename: string;
  size_bytes: number | null;
  pages: number | null;
  truncated: boolean;
  has_original: boolean;
  created_at: string;
};

export type KnowledgeListResponse = {
  tenant_id: string;
  entries: KnowledgeEntry[];
  pdfs: KnowledgePdfEntry[];
  other_docs_count: number;
};

// PDFs are capped well under Vercel's ~4.5MB serverless request body limit
// (see platform_api/knowledge.py) — going bigger needs a presigned
// direct-to-R2 upload, not a bump to this constant.
export const MAX_PDF_MB = 4;

export async function fetchKnowledge(): Promise<KnowledgeListResponse> {
  const res = await fetch("/api/platform/knowledge", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export async function addKnowledgeEntry(
  entry: { question?: string; answer: string },
): Promise<KnowledgeEntry> {
  const res = await fetch("/api/platform/knowledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  const data = await res.json();
  return data.entry as KnowledgeEntry;
}

export async function deleteKnowledgeEntry(id: string): Promise<void> {
  const res = await fetch(`/api/platform/knowledge/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await readErrorDetail(res));
}

export async function uploadKnowledgePdf(file: File): Promise<KnowledgePdfEntry> {
  const form = new FormData();
  form.append("file", file);
  // No Content-Type header here — the browser sets multipart/form-data with
  // the correct boundary itself; setting it manually would break the parse.
  const res = await fetch("/api/platform/knowledge/pdf", {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  const data = await res.json();
  return data.entry as KnowledgePdfEntry;
}

export async function testKnowledge(query: string): Promise<{ query: string; result: string }> {
  const res = await fetch("/api/platform/knowledge/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

/* ── Usage (Phase 3 tickets 3.1 + 3.2 — read-only, no Stripe/hard limits) ──── */

// null included_minutes/percent_used/status = managed/unlimited plan — no
// soft limit configured, nothing to warn about.
export type PlanUsage = {
  key: string;
  label: string;
  included_minutes: number | null;
  percent_used: number | null;
  status: "ok" | "approaching" | "over" | null;
};

export type UsageResponse = {
  tenant_id: string;
  business_tz: string;
  period_start: string; // YYYY-MM-DD, first of the current month
  period_end: string; // ISO timestamp, now
  calls: number;
  minutes: number;
  cost_vapi: number | null;
  cost_llm: number | null;
  plan: PlanUsage;
};

export async function fetchUsage(): Promise<UsageResponse> {
  const res = await fetch("/api/platform/usage", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

/* ── Billing (Phase 3 ticket 3.3 — read-only, no Stripe sync yet) ─────────── */

export type AccountStatus = "trial" | "live" | "past_due" | "suspended" | "archived";

export type BillingMode = "managed" | "stripe";

export type BillingResponse = {
  tenant_id: string;
  account_status: AccountStatus;
  billing_mode: BillingMode;
  period_start: string; // YYYY-MM-DD, first of the current month
  period_end: string; // ISO timestamp, now
  calls: number;
  minutes: number;
  plan: PlanUsage;
};

export async function fetchBilling(): Promise<BillingResponse> {
  const res = await fetch("/api/platform/billing", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

/* ── Admin: tenant plan assignment (Phase 3 ticket 3.5) ────────────────────
   Orchelix-staff-only (active org "default") — see platformProxy.ts. */

export const PLAN_KEYS = ["local", "pro", "enterprise", "managed"] as const;
export type PlanKey = (typeof PLAN_KEYS)[number];

export const ACCOUNT_STATUSES: AccountStatus[] = [
  "trial",
  "live",
  "past_due",
  "suspended",
  "archived",
];

export type AdminTenantRow = {
  tenant_id: string;
  account_status: AccountStatus;
  calls: number;
  minutes: number;
  period_start: string;
  period_end: string;
  plan: PlanUsage;
  // Phase 3 ticket 3.6 — admin-only surface. The client-facing Billing page
  // never receives these raw IDs, only billing_mode.
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  billing_mode: BillingMode;
};

export type AdminTenantsResponse = { tenants: AdminTenantRow[] };

export async function fetchAdminTenants(): Promise<AdminTenantsResponse> {
  const res = await fetch("/api/platform/admin/tenants", { cache: "no-store" });
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export async function updateTenantPlan(
  tenantId: string,
  update: { plan: PlanKey; status?: AccountStatus },
): Promise<AdminTenantRow> {
  const res = await fetch(
    `/api/platform/admin/tenants/${encodeURIComponent(tenantId)}/plan`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    },
  );
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

// Fields omitted from `update` are left unchanged server-side; pass `null`
// explicitly to clear one. The admin UI always sends both (converting an
// empty input back to null), so it never relies on that distinction itself
// — kept on the wire for API completeness / future callers.
export async function updateTenantStripe(
  tenantId: string,
  update: { stripe_customer_id?: string | null; stripe_subscription_id?: string | null },
): Promise<AdminTenantRow> {
  const res = await fetch(
    `/api/platform/admin/tenants/${encodeURIComponent(tenantId)}/stripe`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    },
  );
  if (!res.ok) throw new Error(await readErrorDetail(res));
  return res.json();
}

export async function fetchCalls(q: CallsQuery): Promise<CallsResponse> {
  const params = new URLSearchParams();
  if (q.limit) params.set("limit", String(q.limit));
  if (q.offset) params.set("offset", String(q.offset));
  if (q.outcome) params.set("outcome", q.outcome);
  if (q.from_date) params.set("from_date", q.from_date);
  if (q.to_date) params.set("to_date", q.to_date);

  const res = await fetch(`/api/platform/calls?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") detail = body.error;
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* keep default */
    }
    throw new Error(detail);
  }
  return res.json();
}

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

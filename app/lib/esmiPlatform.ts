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

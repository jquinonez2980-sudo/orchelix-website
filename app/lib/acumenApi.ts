/* ───────────────────────────────────────────────────────────────────────────
   acumenApi — typed client for the AcumenAI dashboard API (Cloud Run, vtx-os).

   Base URL comes from NEXT_PUBLIC_ACUMEN_API_BASE (e.g. the acumenai-api Cloud Run
   URL). Authenticated calls send `Authorization: Bearer <token>` where the token is
   minted by the site's identity provider (Clerk). See app/app/useAcumenToken.ts.

   Public endpoints (no token): /api/health, /api/demo/run.
   Live endpoints (token):      /api/live/*  → 401 without a valid JWT.
   ─────────────────────────────────────────────────────────────────────────── */

const BASE = process.env.NEXT_PUBLIC_ACUMEN_API_BASE ?? "";

export type Summary = {
  period: string;
  client: string | null;
  total_transactions: number;
  auto_categorized: number;
  needs_review: number;
  auto_pct: number;
  deposits: string;
  withdrawals: string;
  net_movement: string;
  pending_approvals: number;
};

export type Txn = {
  txn_date: string;
  description: string;
  amount: string;
  balance: string | null;
  gl_account_no: string | null;
  gl_account_name: string | null;
  category: string | null;
  confidence: number | null;
  needs_review: boolean;
  bank_code: string | null;
};

export type ApprovalItem = {
  queue_id: string;
  txn_date: string;
  description: string;
  amount: string;
  suggested_gl_no: string | null;
  suggested_gl_name: string | null;
  confidence: number | null;
  status: string;
  period: string | null;
};

export type ClientConfig = {
  client_id: string | null;
  account_masked: string | null;
  bank: string | null;
  gl_bank_account: string | null;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function get<T>(path: string, token: string | null): Promise<T> {
  if (!BASE) throw new ApiError(0, "NEXT_PUBLIC_ACUMEN_API_BASE is not set");
  const res = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });
  if (!res.ok) throw new ApiError(res.status, `${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, token: string | null): Promise<T> {
  if (!BASE) throw new ApiError(0, "NEXT_PUBLIC_ACUMEN_API_BASE is not set");
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });
  if (!res.ok) throw new ApiError(res.status, `${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ── Demo types ──────────────────────────────────────────────────────────────

export type DemoRun = {
  brand: string;
  client: string;
  period: string;
  mode: string;
  generated_at: string;
  ok: boolean;
  beats: {
    ingest: {
      transactions: number;
      bank_code: string;
      money_in: string;
      money_out: string;
      deposits: number;
      payments: number;
    };
    verify: {
      reconciled: number;
      total: number;
      all_reconciled: boolean;
    };
    categorize: {
      total: number;
      auto_categorized: number;
      needs_review: number;
      queued: number;
      auto_pct: number;
      chat_notified: boolean;
    };
    audit: {
      event_count: number;
      event_types: string[];
    };
    approve: {
      pending_before: number;
      pending_after: number;
      approved: {
        txn_date: string;
        description: string;
        final_gl_no: string;
      };
    };
  };
  recap: {
    duration_ms: number;
    headline: string;
  };
};

export const acumenApi = {
  summary: (token: string | null, period: string, client?: string) =>
    get<Summary>(`/api/live/summary?period=${encodeURIComponent(period)}${client ? `&client=${encodeURIComponent(client)}` : ""}`, token),

  transactions: (token: string | null, period: string, client?: string, limit = 200) =>
    get<Txn[]>(`/api/live/transactions?period=${encodeURIComponent(period)}${client ? `&client=${encodeURIComponent(client)}` : ""}&limit=${limit}`, token),

  approvals: (token: string | null, accountNo?: string, includeApproved = true) =>
    get<ApprovalItem[]>(
      `/api/live/approvals?include_approved=${includeApproved}${accountNo ? `&account_no=${encodeURIComponent(accountNo)}` : ""}`,
      token,
    ),

  clients: (token: string | null) => get<ClientConfig[]>(`/api/live/clients`, token),

  approve: (token: string | null, queueId: string, glNo: string) =>
    post<{ ok: boolean }>(`/api/live/approvals/${encodeURIComponent(queueId)}/approve?final_gl_no=${encodeURIComponent(glNo)}`, token),

  reject: (token: string | null, queueId: string) =>
    post<{ ok: boolean }>(`/api/live/approvals/${encodeURIComponent(queueId)}/reject`, token),

  demoRun: () => get<DemoRun>("/api/demo/run", null),
};

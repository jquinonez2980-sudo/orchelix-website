/* Durable call-review store for the operator console.

   Primary: Clerk organization privateMetadata (`esmiCallReviews`) so reviews
   survive refresh and multi-device without a Railway schema change.

   Secondary: when PLATFORM review endpoints exist, callers may try upstream
   first; this module is the Next-side source of truth until then.

   Metadata size is bounded — we keep at most MAX_REVIEWS (oldest open-status
   pruned first, then oldest by reviewedAt). */

import { auth, clerkClient } from "@clerk/nextjs/server";

export const REVIEW_STATUSES = ["open", "reviewed", "needs_followup"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export type CallReview = {
  status: ReviewStatus;
  note: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  updated_at: string;
};

export type CallReviewsMap = Record<string, CallReview>;

const META_KEY = "esmiCallReviews";
const MAX_REVIEWS = 400;

function isReviewStatus(v: unknown): v is ReviewStatus {
  return typeof v === "string" && (REVIEW_STATUSES as readonly string[]).includes(v);
}

function parseReviews(raw: unknown): CallReviewsMap {
  if (!raw || typeof raw !== "object") return {};
  const out: CallReviewsMap = {};
  for (const [id, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!val || typeof val !== "object") continue;
    const o = val as Record<string, unknown>;
    if (!isReviewStatus(o.status)) continue;
    out[id] = {
      status: o.status,
      note: typeof o.note === "string" ? o.note : null,
      reviewed_at: typeof o.reviewed_at === "string" ? o.reviewed_at : null,
      reviewed_by: typeof o.reviewed_by === "string" ? o.reviewed_by : null,
      updated_at:
        typeof o.updated_at === "string" ? o.updated_at : new Date().toISOString(),
    };
  }
  return out;
}

function prune(map: CallReviewsMap): CallReviewsMap {
  const entries = Object.entries(map);
  if (entries.length <= MAX_REVIEWS) return map;
  entries.sort((a, b) => {
    /* Drop oldest "reviewed" first; keep open / needs_followup longer. */
    const rank = (s: ReviewStatus) =>
      s === "open" ? 2 : s === "needs_followup" ? 1 : 0;
    const dr = rank(a[1].status) - rank(b[1].status);
    if (dr !== 0) return dr;
    return (a[1].updated_at || "").localeCompare(b[1].updated_at || "");
  });
  const keep = entries.slice(-(MAX_REVIEWS));
  return Object.fromEntries(keep);
}

export async function requireOrgAuth(): Promise<
  | { ok: true; userId: string; orgId: string; orgSlug: string }
  | { ok: false; response: Response }
> {
  const { userId, orgId, orgSlug } = await auth();
  if (!userId) {
    return {
      ok: false,
      response: Response.json({ error: "Not signed in." }, { status: 401 }),
    };
  }
  if (!orgId || !orgSlug) {
    return {
      ok: false,
      response: Response.json(
        { error: "No active organization — pick one in the switcher." },
        { status: 403 },
      ),
    };
  }
  return { ok: true, userId, orgId, orgSlug };
}

export async function getCallReviews(orgId: string): Promise<CallReviewsMap> {
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({ organizationId: orgId });
  const meta = (org.privateMetadata ?? {}) as Record<string, unknown>;
  return parseReviews(meta[META_KEY]);
}

export async function setCallReview(
  orgId: string,
  userId: string,
  callId: string,
  update: { status: ReviewStatus; note?: string | null },
): Promise<CallReview> {
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({ organizationId: orgId });
  const meta = { ...((org.privateMetadata ?? {}) as Record<string, unknown>) };
  const map = parseReviews(meta[META_KEY]);
  const now = new Date().toISOString();
  const prev = map[callId];
  const reviewed =
    update.status === "reviewed" || update.status === "needs_followup";

  const next: CallReview = {
    status: update.status,
    note:
      update.note !== undefined
        ? update.note
        : prev?.note ?? null,
    reviewed_at: reviewed ? now : null,
    reviewed_by: reviewed ? userId : null,
    updated_at: now,
  };
  map[callId] = next;
  meta[META_KEY] = prune(map);

  await client.organizations.updateOrganizationMetadata(orgId, {
    privateMetadata: meta,
  });
  return next;
}

export function countOpenReviews(map: CallReviewsMap): number {
  return Object.values(map).filter(
    (r) => r.status === "open" || r.status === "needs_followup",
  ).length;
}

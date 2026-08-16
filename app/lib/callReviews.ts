/* Review state for the operator console — calls and chats.

   Storage is Postgres now (`reviews`, migration 0016 in the backend repo),
   reached through the platform API like every other piece of dashboard data.

   IT USED TO BE CLERK ORGANIZATION METADATA, and that mattered: the old store
   pruned itself to MAX_REVIEWS = 400 to stay under Clerk's metadata size cap,
   dropping the oldest reviewed entries. That is silent data loss — you mark a
   call reviewed, and months later it is open again with no error anywhere.

   The lift below carries the old metadata across on first read. See its own
   note for when to delete it. */

import { auth, clerkClient } from "@clerk/nextjs/server";

import { RAILWAY_URL } from "./platformProxy";

export const REVIEW_STATUSES = ["open", "reviewed", "needs_followup"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

/** 'call' | 'chat' — a review is the same fact over either subject. */
export const REVIEW_SUBJECTS = ["call", "chat"] as const;
export type ReviewSubject = (typeof REVIEW_SUBJECTS)[number];

export type CallReview = {
  status: ReviewStatus;
  note: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  updated_at: string;
};

export type CallReviewsMap = Record<string, CallReview>;

/* ── the legacy Clerk store, read-only, kept only for the lift ───────────── */

const LEGACY_META_KEY = "esmiCallReviews";
/* Set on the org once its calls have been carried over, so a tenant with
   genuinely zero reviews doesn't pay a Clerk round-trip on every load. */
const LIFTED_FLAG = "esmiReviewsLiftedToPostgres";

function isReviewStatus(v: unknown): v is ReviewStatus {
  return typeof v === "string" && (REVIEW_STATUSES as readonly string[]).includes(v);
}

function parseLegacy(raw: unknown): CallReviewsMap {
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

/* ── platform API ───────────────────────────────────────────────────────── */

function platformBase(): string {
  return RAILWAY_URL.replace(/\/$/, "");
}

function platformHeaders(orgSlug: string): HeadersInit {
  const secret = process.env.PLATFORM_API_SECRET;
  if (!secret) throw new Error("PLATFORM_API_SECRET is not configured.");
  return {
    "Content-Type": "application/json",
    "X-Platform-Secret": secret,
    "X-Tenant-Id": orgSlug,
  };
}

export async function getReviews(
  orgSlug: string,
  subject: ReviewSubject = "call",
): Promise<CallReviewsMap> {
  const res = await fetch(
    `${platformBase()}/platform/reviews?subject_type=${subject}`,
    { headers: platformHeaders(orgSlug), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`Could not load reviews (${res.status}).`);
  const body = await res.json();
  return (body?.reviews ?? {}) as CallReviewsMap;
}

export async function setReview(
  orgSlug: string,
  userId: string,
  subject: ReviewSubject,
  subjectId: string,
  update: { status: ReviewStatus; note?: string | null },
): Promise<CallReview> {
  const res = await fetch(
    `${platformBase()}/platform/reviews/${subject}/${encodeURIComponent(subjectId)}`,
    {
      method: "PUT",
      headers: platformHeaders(orgSlug),
      cache: "no-store",
      body: JSON.stringify({
        status: update.status,
        note: update.note ?? null,
        reviewed_by: userId,
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `Could not save review (${res.status}).`);
  }
  return (await res.json()) as CallReview;
}

/* ── one-time lift out of Clerk ──────────────────────────────────────────

   TRANSITIONAL. Delete this function, LEGACY_META_KEY, LIFTED_FLAG and
   parseLegacy once every active org has been read at least once after this
   deploy — check by confirming no org still has `esmiCallReviews` without
   `esmiReviewsLiftedToPostgres`.

   Runs on read rather than as a script because the two secrets it needs
   (Clerk's and the platform's) both already exist in this runtime, and a
   migration nobody has to remember to run is a migration that actually
   happens. Writes are idempotent upserts keyed by (tenant, subject, id), so
   two tabs racing here is harmless. */
export async function liftLegacyReviewsIfNeeded(
  orgId: string,
  orgSlug: string,
): Promise<CallReviewsMap | null> {
  try {
    const client = await clerkClient();
    const org = await client.organizations.getOrganization({ organizationId: orgId });
    const meta = { ...((org.privateMetadata ?? {}) as Record<string, unknown>) };
    if (meta[LIFTED_FLAG]) return null;

    const legacy = parseLegacy(meta[LEGACY_META_KEY]);
    for (const [callId, review] of Object.entries(legacy)) {
      await setReview(orgSlug, review.reviewed_by ?? "", "call", callId, {
        status: review.status,
        note: review.note,
      });
    }

    // Flag even when there was nothing to carry — that is the case worth
    // short-circuiting, since it is every tenant that never used the feature.
    meta[LIFTED_FLAG] = new Date().toISOString();
    await client.organizations.updateOrganizationMetadata(orgId, {
      privateMetadata: meta,
    });
    return Object.keys(legacy).length ? legacy : null;
  } catch (e) {
    // Never fail the page over the lift. Worst case it retries next load.
    console.error("review lift failed", e);
    return null;
  }
}

export function countOpenReviews(map: CallReviewsMap): number {
  return Object.values(map).filter(
    (r) => r.status === "open" || r.status === "needs_followup",
  ).length;
}

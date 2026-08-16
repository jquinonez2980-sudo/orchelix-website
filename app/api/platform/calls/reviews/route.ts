import { NextRequest } from "next/server";
import {
  REVIEW_SUBJECTS,
  getReviews,
  liftLegacyReviewsIfNeeded,
  requireOrgAuth,
  type ReviewSubject,
} from "@/app/lib/callReviews";

export const dynamic = "force-dynamic";

/* GET /api/platform/calls/reviews?subject=call|chat
   Every review of one kind for the active tenant, keyed by subject id.

   The path still says /calls for the sake of the existing client; the resource
   is subject-scoped now and `subject=chat` returns chat reviews from the same
   table. */

export async function GET(req: NextRequest) {
  const authz = await requireOrgAuth();
  if (!authz.ok) return authz.response;

  const raw = req.nextUrl.searchParams.get("subject") ?? "call";
  if (!(REVIEW_SUBJECTS as readonly string[]).includes(raw)) {
    return Response.json(
      { error: `subject must be one of: ${REVIEW_SUBJECTS.join(", ")}` },
      { status: 400 },
    );
  }
  const subject = raw as ReviewSubject;

  try {
    // Transitional: carries any pre-Postgres reviews across on first read.
    // See liftLegacyReviewsIfNeeded for when to delete this.
    if (subject === "call") {
      await liftLegacyReviewsIfNeeded(authz.orgId, authz.orgSlug);
    }
    const reviews = await getReviews(authz.orgSlug, subject);
    return Response.json(
      { tenant_id: authz.orgSlug, subject_type: subject, reviews },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not load reviews.";
    return Response.json({ error: message }, { status: 502 });
  }
}

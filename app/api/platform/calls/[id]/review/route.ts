import { NextRequest } from "next/server";
import {
  REVIEW_STATUSES,
  REVIEW_SUBJECTS,
  requireOrgAuth,
  setReview,
  type ReviewStatus,
  type ReviewSubject,
} from "@/app/lib/callReviews";

export const dynamic = "force-dynamic";

/* PATCH /api/platform/calls/{id}/review?subject=call|chat
   Body: { status: "open" | "reviewed" | "needs_followup", note?: string | null }

   `subject` defaults to "call" so existing callers are unchanged; the chat
   row expander passes subject=chat and writes to the same table. */

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authz = await requireOrgAuth();
  if (!authz.ok) return authz.response;

  const { id } = await params;
  if (!id?.trim()) {
    return Response.json({ error: "Missing subject id." }, { status: 400 });
  }

  const rawSubject = req.nextUrl.searchParams.get("subject") ?? "call";
  if (!(REVIEW_SUBJECTS as readonly string[]).includes(rawSubject)) {
    return Response.json(
      { error: `subject must be one of: ${REVIEW_SUBJECTS.join(", ")}` },
      { status: 400 },
    );
  }

  let body: { status?: string; note?: string | null };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.status || !(REVIEW_STATUSES as readonly string[]).includes(body.status)) {
    return Response.json(
      { error: `status must be one of: ${REVIEW_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const review = await setReview(
      authz.orgSlug,
      authz.userId,
      rawSubject as ReviewSubject,
      id,
      { status: body.status as ReviewStatus, note: body.note },
    );
    return Response.json(
      { tenant_id: authz.orgSlug, subject_type: rawSubject, call_id: id, review },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not save review.";
    return Response.json({ error: message }, { status: 502 });
  }
}

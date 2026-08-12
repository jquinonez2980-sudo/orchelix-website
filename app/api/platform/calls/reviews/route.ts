import { getCallReviews, requireOrgAuth } from "@/app/lib/callReviews";

export const dynamic = "force-dynamic";

/* GET /api/platform/calls/reviews — all review states for the active tenant. */

export async function GET() {
  const authz = await requireOrgAuth();
  if (!authz.ok) return authz.response;

  try {
    const reviews = await getCallReviews(authz.orgId);
    return Response.json(
      { tenant_id: authz.orgSlug, reviews },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not load reviews.";
    return Response.json({ error: message }, { status: 502 });
  }
}

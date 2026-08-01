import { NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

/* Step 2 of the 3-call signup sequence: create the Clerk organization whose
   slug IS the Esmi tenant_id.

   Next-only — there is no Railway equivalent. CLERK_SECRET_KEY lives on Vercel
   (it's what auth() runs on) and deliberately isn't copied to Railway, so org
   creation has to happen here. Server-side rather than the client's
   useOrganizationList().createOrganization() because the slug must be exactly
   what POST /platform/signup reserved; letting the browser name it is only
   self-harm (their own dashboard would 400 on every /platform call, since
   require_tenant resolves the tenant from orgSlug) but it's free to rule out.

   AUTHORIZATION: creating an org is a real side effect, so this doesn't take
   the caller's word for which tenant it's for. It re-reads the backend's
   GET /platform/signup/mine and only proceeds when that says this user has a
   pending application for exactly this tenant_id AND still needs an org. That
   makes the endpoint idempotent-ish and un-spammable: once the org exists,
   needs_clerk_org flips false and further calls are refused. */

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

type MineResponse = {
  tenant: { tenant_id: string; company_name: string | null } | null;
  needs_clerk_org: boolean;
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const secret = process.env.PLATFORM_API_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Signup is not configured (missing PLATFORM_API_SECRET)." },
      { status: 503 },
    );
  }

  let body: { tenant_id?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const tenantId = (body.tenant_id ?? "").trim();
  if (!tenantId) {
    return Response.json({ error: "tenant_id is required." }, { status: 400 });
  }

  /* Confirm against the backend that this user really owns a pending
     application for this tenant and that it still needs an org. */
  let mine: MineResponse;
  try {
    const res = await fetch(`${RAILWAY_URL}/platform/signup/mine`, {
      headers: { "X-Platform-Secret": secret, "X-Platform-User": userId },
      cache: "no-store",
    });
    if (!res.ok) {
      return Response.json(
        { error: "Could not verify your application — try again shortly." },
        { status: 502 },
      );
    }
    mine = await res.json();
  } catch {
    return Response.json(
      { error: "Could not reach the Esmi backend — try again shortly." },
      { status: 502 },
    );
  }

  if (!mine.tenant || mine.tenant.tenant_id !== tenantId) {
    return Response.json(
      { error: "No pending application found for that business." },
      { status: 409 },
    );
  }
  if (!mine.needs_clerk_org) {
    return Response.json(
      { error: "This business already has an organization." },
      { status: 409 },
    );
  }

  const name = (body.name ?? mine.tenant.company_name ?? tenantId).trim();

  try {
    const client = await clerkClient();
    const org = await client.organizations.createOrganization({
      name,
      slug: tenantId,
      createdBy: userId,
    });
    return Response.json({ clerk_org_id: org.id, slug: org.slug });
  } catch (e) {
    /* Surfaced to the caller so the wizard can report the failure to
       POST /platform/signup/{tid}/clerk-org, which marks the provisioning
       step `failed` and puts it in the admin queue rather than letting it sit
       at `pending` forever. */
    const detail = e instanceof Error ? e.message : "Unknown error";
    return Response.json(
      { error: `Could not create the organization: ${detail}` },
      { status: 502 },
    );
  }
}

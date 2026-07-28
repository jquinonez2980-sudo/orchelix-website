import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

/* Server-side proxy: browser → (Clerk session) → this handler → Railway.
   The platform secret NEVER reaches the browser, and the tenant id is derived
   from the caller's active Clerk organization — a client cannot ask for
   another tenant's data no matter what it sends.

   Tenant mapping convention: each Clerk Organization's SLUG equals the Esmi
   tenant_id (e.g. org slug "otro-nivel" ↔ tenants/otro-nivel). Create orgs
   with the right slug and membership IS authorization. */

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

// Query params forwarded verbatim after allow-listing; FastAPI validates values.
const ALLOWED_PARAMS = ["limit", "offset", "outcome", "from_date", "to_date"];

export async function GET(req: NextRequest) {
  const { userId, orgSlug } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!orgSlug) {
    return Response.json(
      { error: "No active organization — pick one in the switcher." },
      { status: 403 },
    );
  }

  const secret = process.env.PLATFORM_API_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Dashboard is not configured (missing PLATFORM_API_SECRET)." },
      { status: 503 },
    );
  }

  const qs = new URLSearchParams();
  for (const key of ALLOWED_PARAMS) {
    const v = req.nextUrl.searchParams.get(key);
    if (v) qs.set(key, v);
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}/platform/calls?${qs}`, {
      headers: {
        "X-Platform-Secret": secret,
        "X-Tenant-Id": orgSlug,
      },
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "Could not reach the Esmi backend — try again shortly." },
      { status: 502 },
    );
  }

  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

/* Shared server-side proxy for /api/platform/* route handlers.
   One place enforces the security pattern: Clerk session → active org slug ==
   Esmi tenant_id → X-Tenant-Id + X-Platform-Secret injected server-side.
   The browser never sees the secret and can never choose the tenant. */

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

export async function proxyPlatformGET(
  req: NextRequest,
  upstreamPath: string,
  allowedParams: string[] = [],
): Promise<Response> {
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
  for (const key of allowedParams) {
    const v = req.nextUrl.searchParams.get(key);
    if (v) qs.set(key, v);
  }
  const query = qs.size > 0 ? `?${qs}` : "";

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}${upstreamPath}${query}`, {
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

export async function proxyPlatformPATCH(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  return proxyPlatformWrite(req, upstreamPath, "PATCH");
}

export async function proxyPlatformPUT(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  return proxyPlatformWrite(req, upstreamPath, "PUT");
}

export async function proxyPlatformPOST(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  return proxyPlatformWrite(req, upstreamPath, "POST");
}

export async function proxyPlatformDELETE(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  return proxyPlatformWrite(req, upstreamPath, "DELETE");
}

/* Multipart file uploads (e.g. PDF knowledge upload) can't reuse
   proxyPlatformWrite: that reads the body as text (would corrupt binary
   content) and hardcodes Content-Type: application/json (would drop the
   multipart boundary, making the upstream unable to parse the form data).
   This forwards the raw bytes and the original Content-Type verbatim. */
export async function proxyPlatformUpload(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
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

  const contentType = req.headers.get("content-type") ?? "";
  const body = await req.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}${upstreamPath}`, {
      method: "POST",
      headers: {
        "X-Platform-Secret": secret,
        "X-Tenant-Id": orgSlug,
        "X-Platform-User": userId,
        "Content-Type": contentType,
      },
      body,
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "Could not reach the Esmi backend — try again shortly." },
      { status: 502 },
    );
  }

  const respBody = await upstream.text();
  return new Response(respBody, {
    status: upstream.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/* Admin-only proxy helpers (Phase 3 ticket 3.5 — tenant plan assignment).
   Two independent layers, both required: (1) orgSlug must be
   ADMIN_ORG_SLUG (Orchelix staff's own Clerk org — client orgs can never
   match this), and (2) a secret DISTINCT from PLATFORM_API_SECRET, so a
   leaked client-dashboard secret alone can never reach admin actions. */

// Orchelix staff's Clerk organization slug — NOT the same "default" used
// elsewhere as the Esmi tenant_id for Orchelix's own AI receptionist config;
// those are two unrelated systems (Clerk orgs vs. Esmi tenants) that just
// happened to both use the word "default" before this slug was corrected.
export const ADMIN_ORG_SLUG = "orchelix-ai-consulting";

function requireAdminOrg(orgSlug: string | null | undefined): Response | null {
  if (orgSlug !== ADMIN_ORG_SLUG) {
    return Response.json(
      { error: "Admin access requires the Orchelix organization." },
      { status: 403 },
    );
  }
  return null;
}

export async function proxyPlatformAdminGET(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  const { userId, orgSlug } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }
  const orgError = requireAdminOrg(orgSlug);
  if (orgError) return orgError;

  const secret = process.env.PLATFORM_ADMIN_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Admin API is not configured (missing PLATFORM_ADMIN_SECRET)." },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}${upstreamPath}`, {
      headers: { "X-Platform-Admin-Secret": secret },
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

export async function proxyPlatformAdminPATCH(
  req: NextRequest,
  upstreamPath: string,
): Promise<Response> {
  const { userId, orgSlug } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }
  const orgError = requireAdminOrg(orgSlug);
  if (orgError) return orgError;

  const secret = process.env.PLATFORM_ADMIN_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Admin API is not configured (missing PLATFORM_ADMIN_SECRET)." },
      { status: 503 },
    );
  }

  const payload = await req.text();
  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}${upstreamPath}`, {
      method: "PATCH",
      headers: {
        "X-Platform-Admin-Secret": secret,
        // Best-effort audit trail — who made this admin change. The backend
        // defaults to "dashboard" if this is absent.
        "X-Platform-User": userId,
        "Content-Type": "application/json",
      },
      body: payload,
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

async function proxyPlatformWrite(
  req: NextRequest,
  upstreamPath: string,
  method: "PATCH" | "PUT" | "POST" | "DELETE",
): Promise<Response> {
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

  const payload = await req.text();

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}${upstreamPath}`, {
      method,
      headers: {
        "X-Platform-Secret": secret,
        "X-Tenant-Id": orgSlug,
        // Best-effort audit trail — who published this config version.
        // The backend defaults to "dashboard" if this is absent.
        "X-Platform-User": userId,
        "Content-Type": "application/json",
      },
      body: payload,
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

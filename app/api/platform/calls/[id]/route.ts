import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

/* Single-call detail — deep-link target. CallLog.tsx itself expands a row
   from the list response in place (that already carries every field), so
   this proxy exists for direct navigation to one call rather than because
   the list is missing data — see platform_api/calls.py's
   platform_call_detail docstring. */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformGET(req, `/platform/calls/${encodeURIComponent(id)}`);
}

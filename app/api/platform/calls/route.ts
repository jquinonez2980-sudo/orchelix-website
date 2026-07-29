import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../lib/platformProxy";

export const dynamic = "force-dynamic";

/* Tenant mapping convention: each Clerk Organization's SLUG equals the Esmi
   tenant_id (e.g. org slug "otro-nivel" ↔ tenants/otro-nivel). Create orgs
   with the right slug and membership IS authorization. Enforced centrally in
   app/lib/platformProxy.ts. */

export async function GET(req: NextRequest) {
  return proxyPlatformGET(req, "/platform/calls", [
    "limit",
    "offset",
    "outcome",
    "from_date",
    "to_date",
  ]);
}

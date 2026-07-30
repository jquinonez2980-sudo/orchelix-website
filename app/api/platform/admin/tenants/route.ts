import { NextRequest } from "next/server";
import { proxyPlatformAdminGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformAdminGET(req, "/platform/admin/tenants");
}

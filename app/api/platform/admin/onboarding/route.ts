import { NextRequest } from "next/server";
import { proxyPlatformAdminGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const include = req.nextUrl.searchParams.get("include");
  const qs = include === "all" ? "?include=all" : "";
  return proxyPlatformAdminGET(req, `/platform/admin/onboarding${qs}`);
}

import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformGET(req, "/platform/scheduling/status");
}

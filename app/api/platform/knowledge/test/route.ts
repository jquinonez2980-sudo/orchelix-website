import { NextRequest } from "next/server";
import { proxyPlatformPOST } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return proxyPlatformPOST(req, "/platform/knowledge/test");
}

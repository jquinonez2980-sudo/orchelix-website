import { NextRequest } from "next/server";
import { proxyPlatformGET, proxyPlatformPOST } from "../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformGET(req, "/platform/knowledge");
}

export async function POST(req: NextRequest) {
  return proxyPlatformPOST(req, "/platform/knowledge");
}

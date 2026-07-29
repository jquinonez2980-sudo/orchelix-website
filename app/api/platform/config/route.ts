import { NextRequest } from "next/server";
import { proxyPlatformGET, proxyPlatformPUT } from "../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformGET(req, "/platform/config");
}

export async function PUT(req: NextRequest) {
  return proxyPlatformPUT(req, "/platform/config");
}

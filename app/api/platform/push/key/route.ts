import { NextRequest } from "next/server";
import { proxyPlatformGET } from "@/app/lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformGET(req, "/platform/push/key");
}

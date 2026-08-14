import { NextRequest } from "next/server";
import { proxyPlatformDELETE, proxyPlatformPOST } from "@/app/lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return proxyPlatformPOST(req, "/platform/push/subscriptions");
}

export async function DELETE(req: NextRequest) {
  return proxyPlatformDELETE(req, "/platform/push/subscriptions");
}

import { NextRequest } from "next/server";
import {
  proxyPlatformDELETE,
  proxyPlatformPUT,
} from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformPUT(req, `/platform/knowledge/${encodeURIComponent(id)}`);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformDELETE(req, `/platform/knowledge/${encodeURIComponent(id)}`);
}

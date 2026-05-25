import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, useCase, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !useCase?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: pipe to email delivery — add RESEND_API_KEY to Vercel env vars and install `resend`
    console.log("[contact]", {
      name, company, email, phone, useCase, message,
      ts: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

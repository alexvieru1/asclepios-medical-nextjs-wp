import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_NAME = "cookie_consent_v1";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const c = body as Partial<Consent>;
  const consent: Consent = {
    necessary: true,
    analytics: !!c.analytics,
    marketing: !!c.marketing,
  };

  const res = NextResponse.json({ ok: true, consent });
  res.cookies.set({
    name: COOKIE_NAME,
    value: JSON.stringify(consent),
    httpOnly: false,
    sameSite: "lax",
    secure: true, // keep true in production (HTTPS)
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { SESSION_COOKIE } from "@/lib/session";
import { getSessionUser } from "@/lib/session";

const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

export async function POST(request) {
  const { idToken } = await request.json().catch(() => ({}));
  if (!idToken) return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });
  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    const session = await adminAuth().createSessionCookie(idToken, { expiresIn: FIVE_DAYS });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, session, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
      path: "/", maxAge: FIVE_DAYS / 1000,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "That sign-in link is invalid or expired." }, { status: 401 });
  }
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ authenticated: false });
  return NextResponse.json({ authenticated: true, email: user.email || "", name: user.name || "" });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}

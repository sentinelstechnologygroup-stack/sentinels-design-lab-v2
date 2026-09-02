import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  connectionCookieOptions,
  decryptConnection,
  getConnection,
  selectionCookieName,
  tokenCookieName,
} from "@/lib/google-connections";

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { service } = await request.json().catch(() => ({}));
  if (!getConnection(service)) return NextResponse.json({ error: "Unknown connection." }, { status: 400 });

  const cookieName = tokenCookieName(service);
  const token = decryptConnection(request.cookies.get(cookieName)?.value || "");
  if (token?.accessToken) {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token.accessToken)}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      cache: "no-store",
    }).catch(() => null);
  }

  const response = NextResponse.json({ disconnected: true });
  response.cookies.set(cookieName, "", connectionCookieOptions(0));
  response.cookies.set(selectionCookieName(service), "", connectionCookieOptions(0));
  return response;
}

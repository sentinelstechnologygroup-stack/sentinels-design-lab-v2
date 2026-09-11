import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  CONNECTION_MAX_AGE_SECONDS,
  connectionCookieOptions,
  decryptConnection,
  encryptConnection,
  getConnection,
  tokenCookieName,
} from "@/lib/google-connections";
import { saveCalendarConnection } from "@/db/firestore";

export const runtime = "nodejs";

function productionOrigin() {
  return new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sentinelsdesignlab.com").origin;
}

export async function GET(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url));
  const returnUrl = new URL("/dashboard", request.nextUrl.origin);
  returnUrl.searchParams.set("view", "accounts");
  const savedState = decryptConnection(request.cookies.get("sis_google_oauth_state")?.value || "");
  const receivedState = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");
  const providerError = request.nextUrl.searchParams.get("error");

  if (providerError) {
    returnUrl.searchParams.set("connection", "cancelled");
    return NextResponse.redirect(returnUrl);
  }
  if (!savedState || savedState.state !== receivedState || !code || !getConnection(savedState.service)) {
    returnUrl.searchParams.set("connection", "invalid");
    return NextResponse.redirect(returnUrl);
  }

  try {
    const callbackUrl = new URL("/api/connections/google/callback", productionOrigin());
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        code,
        code_verifier: savedState.codeVerifier,
        grant_type: "authorization_code",
        redirect_uri: callbackUrl.toString(),
      }),
      cache: "no-store",
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok || !tokens.access_token) throw new Error("Google did not return an access token.");
    if (savedState.service === "calendar") {
      await saveCalendarConnection(user.uid, {
        accessToken: encryptConnection({ accessToken: tokens.access_token, expiresAt: Date.now() + (tokens.expires_in || 3600) * 1000 }),
        refreshToken: tokens.refresh_token ? encryptConnection({ refreshToken: tokens.refresh_token }) : undefined,
        connectedAt: new Date().toISOString(),
      });
    }

    const expiresIn = Math.min(tokens.expires_in || CONNECTION_MAX_AGE_SECONDS, CONNECTION_MAX_AGE_SECONDS);
    const successUrl = new URL("/dashboard", request.nextUrl.origin);
    successUrl.searchParams.set("view", "accounts");
    successUrl.searchParams.set("connection", "success");
    successUrl.searchParams.set("service", savedState.service);
    const response = NextResponse.redirect(successUrl);
    response.cookies.set(
      tokenCookieName(savedState.service),
      encryptConnection({
        accessToken: tokens.access_token,
        scope: tokens.scope,
        connectedAt: new Date().toISOString(),
        expiresAt: Date.now() + expiresIn * 1000,
      }),
      connectionCookieOptions(expiresIn),
    );
    response.cookies.delete("sis_google_oauth_state");
    return response;
  } catch {
    returnUrl.searchParams.set("connection", "failed");
    return NextResponse.redirect(returnUrl);
  }
}

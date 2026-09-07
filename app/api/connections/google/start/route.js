import crypto from "node:crypto";
import { getSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import {
  connectionCookieOptions,
  encryptConnection,
  getConnection,
  isGoogleConfigured,
} from "@/lib/google-connections";

export const runtime = "nodejs";

export async function GET(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const userId = user.uid;
  const service = request.nextUrl.searchParams.get("service");
  const connection = getConnection(service);
  const dashboardUrl = (status) => {
    const url = new URL("/dashboard", request.url);
    url.searchParams.set("view", "accounts");
    url.searchParams.set("connection", status);
    if (service) url.searchParams.set("service", service);
    return url;
  };

  if (!connection) {
    return NextResponse.redirect(dashboardUrl("unknown"));
  }
  if (!isGoogleConfigured()) {
    return NextResponse.redirect(dashboardUrl("setup"));
  }

  const state = crypto.randomBytes(24).toString("base64url");
  const codeVerifier = crypto.randomBytes(48).toString("base64url");
  const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
  const callbackUrl = new URL("/api/connections/google/callback", request.nextUrl.origin);
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizationUrl.searchParams.set("client_id", process.env.GOOGLE_OAUTH_CLIENT_ID);
  authorizationUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", `openid email ${connection.scope}`);
  authorizationUrl.searchParams.set("access_type", "online");
  authorizationUrl.searchParams.set("include_granted_scopes", "true");
  authorizationUrl.searchParams.set("prompt", "consent select_account");
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(
    "sis_google_oauth_state",
    encryptConnection({ state, service, codeVerifier, createdAt: Date.now() }),
    connectionCookieOptions(10 * 60),
  );
  return response;
}

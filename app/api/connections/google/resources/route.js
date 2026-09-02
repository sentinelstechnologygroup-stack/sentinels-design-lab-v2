import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  connectionCookieOptions,
  decryptConnection,
  encryptConnection,
  getConnection,
  listGoogleResources,
  selectionCookieName,
  tokenCookieName,
} from "@/lib/google-connections";

export const dynamic = "force-dynamic";

function activeToken(request, service) {
  return decryptConnection(request.cookies.get(tokenCookieName(service))?.value || "");
}

export async function GET(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const service = new URL(request.url).searchParams.get("service");
  if (!getConnection(service)) return NextResponse.json({ error: "Unknown connection." }, { status: 400 });
  const token = activeToken(request, service);
  if (!token?.accessToken || token.expiresAt <= Date.now()) return NextResponse.json({ error: "This connection has expired. Please reconnect." }, { status: 401 });
  try {
    return NextResponse.json({ resources: await listGoogleResources(service, token.accessToken) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { service, resourceId } = await request.json().catch(() => ({}));
  if (!getConnection(service) || typeof resourceId !== "string") return NextResponse.json({ error: "Choose a valid account." }, { status: 400 });
  const token = activeToken(request, service);
  if (!token?.accessToken || token.expiresAt <= Date.now()) return NextResponse.json({ error: "This connection has expired. Please reconnect." }, { status: 401 });
  try {
    const resources = await listGoogleResources(service, token.accessToken);
    const selected = resources.find((resource) => resource.id === resourceId);
    if (!selected) return NextResponse.json({ error: "That account is not available through this connection." }, { status: 403 });
    const maxAge = Math.max(1, Math.floor((token.expiresAt - Date.now()) / 1000));
    const response = NextResponse.json({ selected });
    response.cookies.set(selectionCookieName(service), encryptConnection({ ...selected, expiresAt: token.expiresAt }), connectionCookieOptions(maxAge));
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}

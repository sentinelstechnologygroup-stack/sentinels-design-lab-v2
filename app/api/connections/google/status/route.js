import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  decryptConnection,
  GOOGLE_CONNECTIONS,
  isGoogleConfigured,
  selectionCookieName,
  tokenCookieName,
} from "@/lib/google-connections";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const connections = Object.fromEntries(
    Object.keys(GOOGLE_CONNECTIONS).map((service) => {
      const token = decryptConnection(request.cookies.get(tokenCookieName(service))?.value || "");
      return [service, Boolean(token?.accessToken && token.expiresAt > Date.now())];
    }),
  );
  const selections = Object.fromEntries(
    Object.keys(GOOGLE_CONNECTIONS).map((service) => {
      const selection = decryptConnection(request.cookies.get(selectionCookieName(service))?.value || "");
      return [service, selection?.expiresAt > Date.now() ? { id: selection.id, label: selection.label, detail: selection.detail } : null];
    }),
  );
  return NextResponse.json({ configured: isGoogleConfigured(), connections, selections });
}

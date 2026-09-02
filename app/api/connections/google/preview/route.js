import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  decryptConnection,
  getSearchConsolePreview,
  selectionCookieName,
  tokenCookieName,
} from "@/lib/google-connections";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const service = new URL(request.url).searchParams.get("service");
  if (service !== "search-console") return NextResponse.json({ error: "A data preview is not available for this connection yet." }, { status: 400 });
  const token = decryptConnection(request.cookies.get(tokenCookieName(service))?.value || "");
  const selected = decryptConnection(request.cookies.get(selectionCookieName(service))?.value || "");
  if (!token?.accessToken || token.expiresAt <= Date.now()) return NextResponse.json({ error: "This connection has expired. Please reconnect." }, { status: 401 });
  if (!selected?.id || selected.expiresAt <= Date.now()) return NextResponse.json({ error: "Choose a Search Console property first." }, { status: 400 });
  try {
    return NextResponse.json({ preview: await getSearchConsolePreview(token.accessToken, selected.id) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}

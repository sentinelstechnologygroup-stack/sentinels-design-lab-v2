import { NextResponse } from "next/server";
import { listOwned } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const websites = await listOwned("websites", user.uid);
  return NextResponse.json({ websites: websites.map(({ id, businessName, url }) => ({ id, businessName, url })) });
}

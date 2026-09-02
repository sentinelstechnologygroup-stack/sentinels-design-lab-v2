import { NextResponse } from "next/server";
import { listOwned } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const orders = await listOwned("orders", user.uid);
  return NextResponse.json({ orders: orders.map(({ id, offerCode, status, generationStatus, reevaluationUsedAt, paidAt, createdAt }) => ({ id, offerCode, status, generationStatus, reevaluationUsedAt, paidAt, createdAt })) });
}

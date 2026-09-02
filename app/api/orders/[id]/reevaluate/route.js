import { NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";
import { generateOrderReports } from "@/lib/advanced-report-generator";
import { decryptConnection, getConnectedReportPreview, selectionCookieName, tokenCookieName } from "@/lib/google-connections";
import { REPORT_CATALOG_BY_CODE } from "@/lib/report-catalog";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await params;
  const order = await getOrder(id);
  if (!order || order.uid !== user.uid) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  if (order.status !== "paid") return NextResponse.json({ error: "Only paid reports can be reevaluated." }, { status: 409 });
  if (order.reevaluationUsedAt) return NextResponse.json({ error: "The complimentary reevaluation has already been used." }, { status: 409 });
  const paidAt = new Date(order.paidAt || order.createdAt);
  if (Date.now() - paidAt.getTime() > 60 * 24 * 60 * 60 * 1000) return NextResponse.json({ error: "The 60-day complimentary reevaluation window has ended." }, { status: 410 });

  const needed = new Set((order.selectedReports || []).flatMap((code) => REPORT_CATALOG_BY_CODE[code]?.requiredConnections || []));
  const connectedData = {};
  const missing = [];
  for (const service of needed) {
    const token = decryptConnection(request.cookies.get(tokenCookieName(service))?.value || "");
    const selection = decryptConnection(request.cookies.get(selectionCookieName(service))?.value || "");
    if (!token?.accessToken || token.expiresAt <= Date.now() || !selection?.id) { missing.push(service); continue; }
    try { connectedData[service] = await getConnectedReportPreview(service, token.accessToken, selection.id); }
    catch (error) { missing.push(`${service}: ${error.message}`); }
  }
  if (missing.length) return NextResponse.json({ error: "Connect every required account and choose its business property before using the complimentary reevaluation.", missing }, { status: 409 });

  const reportIds = await generateOrderReports(order, { force: true, connectedData });
  await updateOrder(order.id, { reevaluationUsedAt: new Date(), reevaluationReportIds: reportIds });
  return NextResponse.json({ ok: true, reportIds });
}

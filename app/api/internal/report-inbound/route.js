import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { createCommunication } from "@/db/firestore";

export const runtime = "nodejs";

function authorized(request) {
  const configured = process.env.INMOTION_WORKER_SHARED_SECRET || "";
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!configured || !provided) return false;
  const a = Buffer.from(createHash("sha256").update(configured).digest("hex"));
  const b = Buffer.from(createHash("sha256").update(provided).digest("hex"));
  return timingSafeEqual(a, b);
}

export async function POST(request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.messageId) return NextResponse.json({ error: "Invalid intake payload" }, { status: 400 });
  await createCommunication({ idempotencyKey: `inbound-report:${body.id}`, type: "inbound-report", source: "inmotion-imap", messageId: String(body.messageId).slice(0, 500), sender: String(body.from || "").slice(0, 500), subject: String(body.subject || "").slice(0, 500), bodyText: String(body.text || "").slice(0, 12000), attachmentNames: Array.isArray(body.attachmentNames) ? body.attachmentNames.slice(0, 10) : [], status: "received" });
  return NextResponse.json({ ok: true, id: body.id });
}

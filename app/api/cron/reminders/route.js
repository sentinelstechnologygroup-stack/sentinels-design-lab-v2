import { NextResponse } from "next/server";
import { listDueCommunications, updateCommunication } from "@/db/firestore";
import { sendMail } from "@/lib/smtp";

export const runtime = "nodejs";

function authorized(request) {
  const expected = process.env.CRON_SECRET;
  return expected && request.headers.get("authorization") === `Bearer ${expected}`;
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const due = await listDueCommunications();
  let sent = 0;
  for (const message of due) {
    try {
      const result = await sendMail({ from: process.env.SIS_FROM_EMAIL || "Sentinels Design Lab <reports@sentinelsdesignlab.com>", to: message.recipient, subject: message.type === "appointment-confirmation" ? "Your Sentinels Design Lab review is confirmed" : "Reminder: your Sentinels Design Lab review", html: `<p>Your Sentinels Design Lab review is scheduled.</p><p><a href="${message.meetingUrl || "https://sentinelsdesignlab.com"}">Join the meeting</a></p>` });
      await updateCommunication(message.id, { status: result.sent ? "sent" : "failed", sentAt: result.sent ? new Date() : null, lastError: result.reason || null });
      if (result.sent) sent += 1;
    } catch (error) {
      await updateCommunication(message.id, { status: "failed", lastError: error.message });
    }
  }
  return NextResponse.json({ ok: true, processed: due.length, sent });
}

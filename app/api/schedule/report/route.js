import { NextResponse } from "next/server";
import { readSchedulingToken } from "@/lib/report-follow-up";

export async function GET(request) {
  const invite = readSchedulingToken(new URL(request.url).searchParams.get("token"));
  if (!invite) return NextResponse.json({ error: "This scheduling link is invalid or expired." }, { status: 410 });
  return NextResponse.json({ ok: true, reportId: invite.reportId, email: invite.email, provider: process.env.CALENDAR_PROVIDER || "google-calendar", calendarConnected: Boolean(process.env.GOOGLE_CALENDAR_REFRESH_TOKEN) });
}

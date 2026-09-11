import { NextResponse } from "next/server";
import { readSchedulingToken } from "@/lib/report-follow-up";
import { createAppointment } from "@/db/firestore";
import { createGoogleMeetAppointment, findCalendarAvailability } from "@/lib/google-calendar";
import { resolveCalendarAccessToken } from "@/lib/google-calendar";
import { getCalendarConnection, getReportById } from "@/db/firestore";
import { queueAppointmentReminders } from "@/lib/appointment-reminders";

export async function GET(request) {
  const invite = readSchedulingToken(new URL(request.url).searchParams.get("token"));
  if (!invite) return NextResponse.json({ error: "This scheduling link is invalid or expired." }, { status: 410 });
  const report = await getReportById(invite.reportId);
  const calendarConnection = await getCalendarConnection(report?.uid || process.env.GOOGLE_CALENDAR_OWNER_UID || "");
  return NextResponse.json({ ok: true, reportId: invite.reportId, email: invite.email, provider: process.env.CALENDAR_PROVIDER || "google-calendar", calendarConnected: Boolean(calendarConnection?.accessToken) });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const invite = readSchedulingToken(body?.token);
  if (!invite) return NextResponse.json({ error: "This scheduling link is invalid or expired." }, { status: 410 });
  const { start, end, timeZone = "America/Chicago" } = body || {};
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (!start || !end || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate || endDate.getTime() - startDate.getTime() > 60 * 60 * 1000) return NextResponse.json({ error: "Choose a valid appointment window of 60 minutes or less." }, { status: 400 });
  const report = await getReportById(invite.reportId);
  const connection = await getCalendarConnection(report?.uid || process.env.GOOGLE_CALENDAR_OWNER_UID || "");
  const accessToken = await resolveCalendarAccessToken(connection);
  if (!accessToken) return NextResponse.json({ error: "Calendar booking is not connected yet." }, { status: 503 });
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const busy = await findCalendarAvailability({ accessToken, calendarId, timeMin: startDate.toISOString(), timeMax: endDate.toISOString(), timeZone });
  if (busy.calendars?.[calendarId]?.busy?.length) return NextResponse.json({ error: "That time is no longer available." }, { status: 409 });
  const event = await createGoogleMeetAppointment({ accessToken, calendarId, start: startDate.toISOString(), end: endDate.toISOString(), timeZone, attendee: invite.email, summary: "Sentinels Design Lab website evaluation review", description: `Review appointment for report ${invite.reportId}.` });
  const appointment = await createAppointment({ reportId: invite.reportId, attendeeEmail: invite.email, startAt: startDate.toISOString(), endAt: endDate.toISOString(), provider: "google-calendar", providerEventId: event.id, meetingUrl: event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri || null, status: "confirmed" });
  await queueAppointmentReminders({ appointmentId: appointment.id, attendeeEmail: invite.email, startAt: startDate.toISOString(), meetingUrl: appointment.meetingUrl });
  return NextResponse.json({ ok: true, appointment: { id: appointment.id, status: appointment.status, startAt: appointment.startAt, meetingUrl: appointment.meetingUrl } }, { status: 201 });
}

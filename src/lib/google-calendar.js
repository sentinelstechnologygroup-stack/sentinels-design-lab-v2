import crypto from "node:crypto";

const calendarApi = "https://www.googleapis.com/calendar/v3";

async function googleRequest(path, accessToken, init = {}) {
  const response = await fetch(`${calendarApi}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || `Google Calendar request failed (${response.status})`);
  return body;
}

export async function findCalendarAvailability({ accessToken, calendarId = "primary", timeMin, timeMax, timeZone = "America/Chicago" }) {
  return googleRequest("/freeBusy", accessToken, { method: "POST", body: JSON.stringify({ timeMin, timeMax, timeZone, items: [{ id: calendarId }] }) });
}

export async function createGoogleMeetAppointment({ accessToken, calendarId = "primary", start, end, timeZone = "America/Chicago", attendee, summary, description }) {
  return googleRequest(`/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, accessToken, {
    method: "POST",
    body: JSON.stringify({ summary, description, start: { dateTime: start, timeZone }, end: { dateTime: end, timeZone }, attendees: [{ email: attendee }], conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } } } }),
  });
}

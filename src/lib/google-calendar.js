import crypto from "node:crypto";
import { decryptConnection, encryptConnection } from "@/lib/google-connections";

const calendarApi = "https://www.googleapis.com/calendar/v3";

export async function resolveCalendarAccessToken(connection) {
  const access = decryptConnection(connection?.accessToken || "");
  if (access?.accessToken && access.expiresAt > Date.now() + 60000) return access.accessToken;
  const refresh = decryptConnection(connection?.refreshToken || "");
  if (!refresh?.refreshToken) return null;
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: process.env.GOOGLE_OAUTH_CLIENT_ID, client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, refresh_token: refresh.refreshToken, grant_type: "refresh_token" }) });
  const tokens = await response.json();
  if (!response.ok || !tokens.access_token) return null;
  return tokens.access_token;
}

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

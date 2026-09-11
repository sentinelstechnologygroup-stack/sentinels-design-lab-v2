import { createCommunication } from "@/db/firestore";

export async function queueAppointmentReminders({ appointmentId, attendeeEmail, startAt, meetingUrl }) {
  const start = new Date(startAt);
  const reminders = [
    { kind: "appointment-confirmation", sendAt: new Date() },
    { kind: "appointment-reminder-24h", sendAt: new Date(start.getTime() - 24 * 60 * 60 * 1000) },
    { kind: "appointment-reminder-1h", sendAt: new Date(start.getTime() - 60 * 60 * 1000) },
  ];
  return Promise.all(reminders.map((reminder) => createCommunication({
    type: reminder.kind,
    appointmentId,
    recipient: attendeeEmail,
    meetingUrl,
    scheduledFor: reminder.sendAt,
    status: "queued",
  })));
}

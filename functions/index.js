const crypto = require("node:crypto");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { defineSecret, defineString } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { ImapFlow } = require("imapflow");
const { simpleParser } = require("mailparser");

initializeApp();
const db = getFirestore();
const imapPassword = defineSecret("inmotion-reports-imap-password");
const workerSecret = defineSecret("inmotion-worker-shared-secret");
const imapHost = defineString("INMOTION_IMAP_HOST", { default: "mail.sentinelsdesignlab.com" });
const imapUser = defineString("INMOTION_IMAP_USER", { default: "reports@sentinelsdesignlab.com" });
const ingestUrl = defineString("SDL_REPORT_INGEST_URL", { default: "https://sentinelsdesignlab.com/api/internal/report-inbound" });

function fingerprint(messageId, raw) {
  return crypto.createHash("sha256").update(messageId || raw).digest("hex");
}

function safeText(value, max = 8000) {
  return String(value || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max);
}

async function processMessage(message) {
  const raw = message.source?.toString("utf8") || "";
  const parsed = await simpleParser(raw);
  const messageId = safeText(parsed.messageId || message.uid, 500);
  const id = fingerprint(messageId, raw);
  const ref = db.collection("inboundReportMessages").doc(id);
  const existing = await ref.get();
  if (existing.exists && existing.data().status === "forwarded") return { status: "duplicate", id };

  const data = {
    id,
    source: "inmotion-imap",
    messageId,
    from: safeText(parsed.from?.text, 500),
    subject: safeText(parsed.subject, 500),
    receivedAt: parsed.date || new Date(),
    text: safeText(parsed.text, 12000),
    attachmentNames: (parsed.attachments || []).map((item) => safeText(item.filename, 300)).slice(0, 10),
    status: "received",
    createdAt: FieldValue.serverTimestamp(),
  };
  if (!existing.exists) await ref.create(data);

  const response = await fetch(ingestUrl.value(), {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-SDL-Worker-Message": id, Authorization: `Bearer ${workerSecret.value()}` },
    body: JSON.stringify({ id, messageId: data.messageId, from: data.from, subject: data.subject, receivedAt: data.receivedAt, text: data.text, attachmentNames: data.attachmentNames }),
  });
  if (!response.ok) {
    await ref.update({ status: "queued", lastError: `Vercel intake returned ${response.status}`, updatedAt: FieldValue.serverTimestamp() });
    throw new Error(`Vercel intake returned ${response.status}`);
  }
  await ref.update({ status: "forwarded", forwardedAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return { status: "forwarded", id };
}

exports.pollInmotionReports = onSchedule({ schedule: "every 5 minutes", timeZone: "America/Chicago", secrets: [imapPassword, workerSecret], timeoutSeconds: 120, memory: "256MiB" }, async () => {
  const client = new ImapFlow({ host: imapHost.value(), port: 993, secure: true, auth: { user: imapUser.value(), pass: imapPassword.value() }, logger: false });
  try {
    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
      const uids = await client.search({ seen: false });
      for (const uid of uids.slice(0, 25)) {
        const message = await client.fetchOne(uid, { source: true, uid: true });
        await processMessage(message);
        await client.messageFlagsAdd(uid, ["\\Seen"]);
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
});

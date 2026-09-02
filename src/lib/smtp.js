import "server-only";
import nodemailer from "nodemailer";

let transporter;

export function getSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      requireTLS: port !== 465,
      tls: { minVersion: "TLSv1.2" },
    });
  }
  return transporter;
}

export async function sendMail(message) {
  const smtp = getSmtpTransport();
  if (!smtp) return { sent: false, reason: "not_configured" };
  await smtp.sendMail(message);
  return { sent: true };
}

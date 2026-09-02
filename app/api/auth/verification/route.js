import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { sendMail } from "@/lib/smtp";

export const runtime = "nodejs";

function escape(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function verificationEmailHtml({ name, verificationUrl }) {
  return `<!doctype html><html><body style="margin:0;background:#eef2f7;font-family:Arial,sans-serif;color:#0f172a"><div style="display:none">Verify your email address for Sentinels Design Lab.</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.08)"><tr><td style="background:#0b1220;padding:30px 34px"><div style="color:#fff;font-size:22px;font-weight:800;letter-spacing:.04em">SENTINELS DESIGN LAB</div><div style="color:#22d3ee;font-size:11px;letter-spacing:.12em;margin-top:8px">SECURE CUSTOMER REPORT PORTAL</div></td></tr><tr><td style="padding:36px 34px"><p style="margin:0 0 12px;color:#64748b;font-size:14px">Hello ${escape(name || "there")},</p><h1 style="margin:0;font-size:27px;line-height:1.25">Verify your email address</h1><p style="margin:18px 0;color:#475569;line-height:1.7;font-size:15px">Confirm this email address to finish securing your Sentinels Design Lab report account.</p><div style="margin:28px 0;text-align:center"><a href="${escape(verificationUrl)}" style="display:inline-block;background:#2f6fed;color:#fff;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:9px">Verify My Email</a></div><p style="margin:0;color:#64748b;font-size:12px;line-height:1.6">If you did not create this account, you can safely ignore this message. Sentinels Design Lab will never ask you to send a password by email.</p></td></tr><tr><td style="background:#f8fafc;padding:20px 34px;color:#64748b;font-size:11px">Sentinels Design Lab - Magnolia, Texas - (832) 432-0224 - Info@SentinelsDesignLab.com</td></tr></table></td></tr></table></body></html>`;
}

export async function POST() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const user = await adminAuth().getUser(session.uid);
  if (!user.email) return NextResponse.json({ error: "This account does not have an email address." }, { status: 400 });
  if (user.emailVerified) return NextResponse.json({ ok: true, alreadyVerified: true });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reports.sentinelsdesignlab.com";
  const firebaseLink = new URL(await adminAuth().generateEmailVerificationLink(user.email, { url: `${appUrl}/dashboard` }));
  const verificationUrl = new URL("/verify-email", appUrl);
  ["mode", "oobCode", "apiKey", "continueUrl", "lang"].forEach((key) => {
    const value = firebaseLink.searchParams.get(key);
    if (value) verificationUrl.searchParams.set(key, value);
  });
  const result = await sendMail({
    from: process.env.SIS_FROM_EMAIL || "Sentinels Design Lab <reports@sentinelsdesignlab.com>",
    to: user.email,
    replyTo: process.env.SIS_NOTIFICATION_EMAIL || "Info@SentinelsDesignLab.com",
    subject: "Verify your email for Sentinels Design Lab",
    html: verificationEmailHtml({ name: user.displayName, verificationUrl: verificationUrl.toString() }),
  });
  if (!result.sent) return NextResponse.json({ error: "Branded email delivery is not configured." }, { status: 503 });
  return NextResponse.json({ ok: true });
}

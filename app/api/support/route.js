import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { sendMail } from "@/lib/smtp";

const SUPPORT_EMAIL = "Support@SentinelsDesignLab.com";
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const frame = (content) => `<div style="background:#050914;padding:28px;font-family:Arial,sans-serif;color:#e8eef8"><div style="max-width:620px;margin:auto;background:#0b1220;border:1px solid #22304a;border-radius:16px;overflow:hidden"><div style="padding:22px 26px;border-bottom:1px solid #22304a;color:#38bdf8;font-size:11px;font-weight:700;letter-spacing:.16em">SENTINELS DESIGN LAB</div><div style="padding:26px;line-height:1.65">${content}</div></div></div>`;

export async function POST(request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const user = await adminAuth().getUser(session.uid);
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim().slice(0, 100);
  const email = String(body.email || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 30);
  const message = String(body.message || "").trim().slice(0, 4000);
  const topic = String(body.topic || "Dashboard help").trim().slice(0, 100);
  const preferred = body.preferredContact === "phone" ? "Phone" : "Email";
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Confirm your name, email, and message." }, { status: 400 });
  if (preferred === "Phone" && !phone) return NextResponse.json({ error: "Confirm your phone number." }, { status: 400 });

  const safe = Object.fromEntries(Object.entries({ name, email, phone: phone || "Not provided", message, topic, preferred, business: body.businessName || "Not provided", account: user.email || session.uid }).map(([key, value]) => [key, escapeHtml(value)]));
  const from = process.env.SIS_FROM_EMAIL || "Sentinels Design Lab <reports@sentinelsdesignlab.com>";
  const support = await sendMail({ from, to: SUPPORT_EMAIL, replyTo: email, subject: `Customer support request: ${topic}`, html: frame(`<h1 style="margin:0 0 18px;color:white;font-size:22px">New customer support request</h1><p><b>Customer:</b> ${safe.name}<br><b>Business:</b> ${safe.business}<br><b>Authenticated account:</b> ${safe.account}<br><b>Reply email:</b> ${safe.email}<br><b>Phone:</b> ${safe.phone}<br><b>Preferred contact:</b> ${safe.preferred}<br><b>Topic:</b> ${safe.topic}</p><div style="margin-top:18px;padding:16px;background:#101b31;border-radius:10px"><b>Message</b><p>${safe.message.replace(/\n/g, "<br>")}</p></div>`) });
  if (!support.sent) return NextResponse.json({ error: "Support email is not configured." }, { status: 503 });
  await sendMail({ from, to: email, replyTo: SUPPORT_EMAIL, subject: "We received your Sentinels support request", html: frame(`<h1 style="margin:0 0 12px;color:white;font-size:22px">Thank you, ${safe.name}</h1><p>We received your request regarding <b>${safe.topic}</b>.</p><p>A Sentinels Design Lab team member will typically contact you within one business day using your preferred method: <b>${safe.preferred}</b>.</p><p style="color:#9fb0c9">You do not need to submit another request. Reply to this email if you need to add information.</p>`) });
  return NextResponse.json({ ok: true });
}

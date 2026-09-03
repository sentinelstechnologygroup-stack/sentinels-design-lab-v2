import { sendMail } from "@/lib/smtp";

function escape(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function scoreRows(categories) {
  return categories.map((item) => `<tr><td style="padding:10px 0;color:#334155;font-size:14px">${escape(item.label)}</td><td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a">${item.score}/100</td></tr>`).join("");
}

function unknownRows(items = []) {
  return items.map((item) => `<tr><td style="padding:10px 0;color:#334155;font-size:14px"><strong>${escape(item.label)}</strong><br><span style="color:#64748b;font-size:12px">${escape(item.reason)}</span></td><td style="padding:10px 0;text-align:right;color:#b45309;font-size:12px;font-weight:700">${escape(item.status)}</td></tr>`).join("");
}

function priorityList(priorities) {
  return priorities.slice(0, 4).map((item, index) => `<tr><td style="vertical-align:top;padding:8px 12px 8px 0"><span style="display:inline-block;background:#2f76f6;color:#fff;width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;font-weight:700">${index + 1}</span></td><td style="padding:8px 0;color:#334155;font-size:14px;line-height:1.6"><strong style="color:#0f172a">${escape(item.title)}</strong><br>${escape(item.recommendation)}</td></tr>`).join("");
}

export function customerEmailHtml(evaluation, name) {
  return `<!doctype html><html><body style="margin:0;background:#eef2f7;font-family:Arial,sans-serif;color:#0f172a"><div style="display:none">Your Sentinels Design Lab website readiness snapshot is ready.</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.08)"><tr><td style="background:#050c1e;padding:30px 34px"><div style="color:#fff;font-size:22px;font-weight:800;letter-spacing:.04em">SENTINELS DESIGN LAB</div><div style="color:#7dd3fc;font-size:11px;letter-spacing:.12em;margin-top:8px">SENTINEL INTELLIGENCE SYSTEM</div></td></tr><tr><td style="padding:34px"><p style="margin:0 0 10px;color:#64748b;font-size:14px">Hello ${escape(name)},</p><h1 style="margin:0;font-size:27px;line-height:1.25">Your website readiness snapshot is ready</h1><p style="color:#475569;line-height:1.7;font-size:15px">We reviewed the public homepage for <strong>${escape(evaluation.businessName)}</strong>. Each score below describes one measured area; there is intentionally no overall SEO-health score.</p><div style="margin:24px 0;padding:18px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;color:#9a3412;font-size:14px;line-height:1.6"><strong>Important:</strong> Strong homepage fundamentals do not prove that a site ranks, receives traffic, or generates leads.</div><h2 style="font-size:17px;margin:26px 0 8px">Measured homepage readiness</h2><table role="presentation" width="100%" style="border-collapse:collapse">${scoreRows(evaluation.categories)}</table><h2 style="font-size:17px;margin:28px 0 8px">Critical areas still unverified</h2><table role="presentation" width="100%" style="border-collapse:collapse">${unknownRows(evaluation.unverifiedDimensions)}</table><h2 style="font-size:17px;margin:28px 0 8px">Highest-priority actions</h2><table role="presentation" width="100%">${priorityList(evaluation.priorities)}</table><div style="margin-top:28px;padding:18px;background:#050c1e;border-radius:12px;color:#fff"><strong>Complete the evidence picture</strong><p style="margin:8px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6">The comprehensive SEO and PPC reports add rankings, traffic, competitors, backlinks, local visibility, advertising, and conversion evidence.</p></div><p style="margin:26px 0 0;color:#64748b;font-size:12px;line-height:1.6">Your branded PDF report is attached. Reply to this email if you would like help interpreting the findings.</p></td></tr><tr><td style="background:#f8fafc;padding:20px 34px;color:#64748b;font-size:11px">Sentinels Design Lab - Magnolia, Texas - (832) 432-0224 - Info@SentinelsDesignLab.com</td></tr></table></td></tr></table></body></html>`;
}

export function adminEmailHtml(evaluation, lead) {
  return `<!doctype html><html><body style="margin:0;background:#eef2f7;font-family:Arial,sans-serif"><table role="presentation" width="100%"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" style="max-width:620px;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="background:#050c1e;padding:26px 32px;color:#fff"><div style="font-size:20px;font-weight:800">NEW SENTINELS INTELLIGENCE SUITE EVALUATION LEAD</div><div style="color:#7dd3fc;margin-top:6px">${escape(evaluation.businessName)} - readiness snapshot</div></td></tr><tr><td style="padding:30px 32px;color:#334155;font-size:14px;line-height:1.7"><h2 style="margin-top:0;color:#0f172a">Contact</h2><p><strong>Name:</strong> ${escape(lead.name)}<br><strong>Email:</strong> <a href="mailto:${escape(lead.email)}">${escape(lead.email)}</a><br><strong>Phone:</strong> ${escape(lead.phone || "Not provided")}<br><strong>Business:</strong> ${escape(lead.businessName)}<br><strong>Website:</strong> <a href="${escape(evaluation.url)}">${escape(evaluation.url)}</a><br><strong>Primary service:</strong> ${escape(lead.primaryService)}<br><strong>Market:</strong> ${escape(lead.location || "Not provided")}</p><h2 style="color:#0f172a">Measured homepage readiness</h2><table role="presentation" width="100%">${scoreRows(evaluation.categories)}</table><h2 style="color:#0f172a">Still unverified</h2><table role="presentation" width="100%">${unknownRows(evaluation.unverifiedDimensions)}</table><h2 style="color:#0f172a">Recommended follow-up</h2><table role="presentation" width="100%">${priorityList(evaluation.priorities)}</table></td></tr></table></td></tr></table></body></html>`;
}

export async function sendEvaluationEmails({ evaluation, lead, pdf, portalUrl }) {
  const from = process.env.SIS_FROM_EMAIL || "Sentinels Design Lab <reports@sentinelsdesignlab.com>";
  const admin = process.env.SIS_NOTIFICATION_EMAIL || "reports@sentinelsdesignlab.com";
  const attachment = { filename: `Sentinels-Design-Lab-Website-Evaluation-${evaluation.businessName.replace(/[^a-z0-9]+/gi, "-")}.pdf`, content: Buffer.from(pdf), contentType: "application/pdf" };
  const customerMessage = {
    from,
    to: lead.email,
    cc: admin,
    replyTo: admin,
    subject: `${evaluation.businessName} website readiness snapshot`,
    html: customerEmailHtml(evaluation, lead.name).replace('</td></tr><tr><td style="background:#f8fafc', `<div style="margin:26px 0;text-align:center"><a href="${escape(portalUrl)}" style="display:inline-block;background:#2f76f6;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:9px">View My Reports &amp; Additional Bundles</a></div></td></tr><tr><td style="background:#f8fafc`),
    attachments: [attachment],
  };
  const customer = await sendMail(customerMessage);
  if (!customer.sent) return { sent: false, customerSent: false, adminSent: false, reason: customer.reason };

  const adminResult = await sendMail({ from, to: admin, replyTo: lead.email, subject: `New Sentinels Intelligence Suite lead: ${evaluation.businessName} readiness snapshot`, html: adminEmailHtml(evaluation, lead), attachments: [attachment] });
  return { sent: true, customerSent: true, adminSent: adminResult.sent, adminReason: adminResult.reason || null };
}

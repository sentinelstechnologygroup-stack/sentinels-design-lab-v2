import { jsPDF } from "jspdf";

const COLORS = { navy: [6, 14, 30], ink: [24, 36, 55], muted: [92, 108, 130], blue: [47, 111, 237], cyan: [34, 211, 238], line: [210, 220, 232], pale: [244, 247, 251], amber: [180, 83, 9], amberBg: [255, 247, 237], green: [21, 128, 61] };
const P = { width: 612, height: 792, left: 42, right: 570, top: 82, bottom: 734 };

function text(doc, value, x, y, options = {}) {
  const { size = 9, color = COLORS.ink, bold = false, maxWidth = 528, align } = options;
  doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size); doc.setTextColor(...color); doc.setLineHeightFactor(1.22);
  const lines = doc.splitTextToSize(String(value ?? ""), maxWidth);
  doc.text(lines, x, y, align ? { align } : {});
  return lines.length * size * 1.22;
}

function header(doc, report, continued = false) {
  doc.setFillColor(...COLORS.navy); doc.rect(0, 0, P.width, 64, "F");
  text(doc, "SENTINELS DESIGN LAB", P.left, 31, { size: 11, color: [255,255,255], bold: true });
  text(doc, "SENTINELS INTELLIGENCE SUITE", P.right, 31, { size: 7, color: COLORS.cyan, bold: true, align: "right" });
  text(doc, continued ? `${report.title} - continued` : report.title, P.left, 52, { size: 7.5, color: [203,213,225], bold: true });
}

function footer(doc, page, total, generatedAt) {
  doc.setDrawColor(...COLORS.line); doc.line(P.left, 748, P.right, 748);
  text(doc, `Generated ${new Date(generatedAt).toLocaleString("en-US")} | Evidence is time-stamped | Page ${page} of ${total}`, P.width / 2, 763, { size: 6.3, color: COLORS.muted, align: "center" });
}

function pageIfNeeded(doc, report, y, needed = 90) {
  if (y + needed <= P.bottom) return y;
  doc.addPage(); header(doc, report, true); return P.top;
}

function section(doc, report, item, y) {
  y = pageIfNeeded(doc, report, y, 112);
  const pending = item.status === "pending_access";
  doc.setFillColor(...(pending ? COLORS.amberBg : COLORS.pale)); doc.setDrawColor(...(pending ? [235, 184, 112] : COLORS.line));
  const detailLines = doc.splitTextToSize(String(item.detail || ""), 490);
  const actionLines = doc.splitTextToSize(String(item.action || ""), 490);
  const height = 64 + detailLines.length * 9 + actionLines.length * 9;
  if (y + height > P.bottom) { doc.addPage(); header(doc, report, true); y = P.top; }
  doc.roundedRect(P.left, y, P.right - P.left, height, 8, 8, "FD");
  text(doc, item.title, P.left + 14, y + 20, { size: 10, bold: true, maxWidth: 390 });
  text(doc, pending ? "PENDING ACCESS" : (item.status || "VERIFIED").replaceAll("_", " ").toUpperCase(), P.right - 14, y + 20, { size: 6.5, color: pending ? COLORS.amber : COLORS.green, bold: true, align: "right" });
  let innerY = y + 38; innerY += text(doc, item.detail, P.left + 14, innerY, { size: 8, color: COLORS.muted, maxWidth: 490 });
  if (item.action) { innerY += 8; text(doc, `Next step: ${item.action}`, P.left + 14, innerY, { size: 7.4, color: pending ? COLORS.amber : COLORS.blue, bold: true, maxWidth: 490 }); }
  return y + height + 12;
}

export function generateAdvancedReportPdf(report) {
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  header(doc, report);
  let y = 98;
  text(doc, report.title, P.left, y, { size: 21, bold: true, maxWidth: 420 });
  text(doc, report.businessName, P.right, y, { size: 9, color: COLORS.blue, bold: true, maxWidth: 160, align: "right" });
  y += 34; text(doc, report.website, P.left, y, { size: 9, color: COLORS.blue });
  y += 23; doc.setFillColor(...COLORS.pale); doc.roundedRect(P.left, y, P.right - P.left, 82, 9, 9, "F");
  text(doc, "EXECUTIVE SUMMARY", P.left + 14, y + 20, { size: 7, color: COLORS.muted, bold: true });
  text(doc, report.summary, P.left + 14, y + 38, { size: 9.2, bold: true, maxWidth: 496 });
  y += 104;
  text(doc, "EVIDENCE AND FINDINGS", P.left, y, { size: 12, bold: true }); y += 22;
  for (const item of report.sections || []) y = section(doc, report, item, y);
  y = pageIfNeeded(doc, report, y, 180);
  text(doc, "PRIORITIZED ACTION PLAN", P.left, y, { size: 12, bold: true }); y += 20;
  for (const step of report.actionPlan || []) {
    y = pageIfNeeded(doc, report, y, 45);
    doc.setFillColor(...COLORS.blue); doc.circle(P.left + 12, y + 7, 10, "F");
    text(doc, String(step.day), P.left + 12, y + 10, { size: 6.5, color: [255,255,255], bold: true, align: "center", maxWidth: 20 });
    text(doc, step.action, P.left + 34, y + 3, { size: 8.5, bold: true, maxWidth: 485 });
    y += 38;
  }
  if (report.sources?.length) {
    y = pageIfNeeded(doc, report, y + 8, 90); text(doc, "DATA SOURCES", P.left, y, { size: 10, bold: true }); y += 17;
    text(doc, report.sources.join(" | "), P.left, y, { size: 7, color: COLORS.muted });
  }
  const total = doc.getNumberOfPages();
  for (let page = 1; page <= total; page += 1) { doc.setPage(page); footer(doc, page, total, report.generatedAt); }
  doc.setProperties({ title: report.title, subject: "Sentinels Intelligence Suite advanced report", author: "Sentinels Design Lab", creator: "Sentinels Design Lab" });
  return Buffer.from(doc.output("arraybuffer"));
}

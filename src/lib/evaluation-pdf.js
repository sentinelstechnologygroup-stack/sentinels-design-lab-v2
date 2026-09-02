import { jsPDF } from "jspdf";

const C = { navy: [6, 15, 31], ink: [20, 32, 51], slate: [83, 101, 126], line: [218, 226, 236], blue: [37, 99, 235], green: [22, 139, 83], amber: [194, 104, 0], red: [190, 38, 51], paleBlue: [239, 246, 255], paleAmber: [255, 248, 235], paleSlate: [247, 249, 252], white: [255, 255, 255] };
const PAGE = { w: 612, left: 48, right: 564 };

function scoreColor(score) { return score >= 85 ? C.green : score >= 70 ? C.blue : score >= 50 ? C.amber : C.red; }
function scoreLabel(score) { return score >= 85 ? "Strong measured foundation" : score >= 70 ? "Targeted improvements needed" : score >= 50 ? "Meaningful gaps found" : "Priority attention needed"; }

function text(doc, value, x, y, options = {}) {
  const { size = 9, color = C.ink, style = "normal", maxWidth, align, lineHeight = 1.25 } = options;
  doc.setFont("helvetica", style); doc.setFontSize(size); doc.setTextColor(...color); doc.setLineHeightFactor(lineHeight);
  doc.text(maxWidth ? doc.splitTextToSize(String(value || ""), maxWidth) : String(value || ""), x, y, { align });
}

function pageHeader(doc, label) {
  doc.setFillColor(...C.navy); doc.rect(0, 0, PAGE.w, 54, "F");
  text(doc, "SDL", PAGE.left, 30, { size: 17, color: C.white, style: "bold" });
  text(doc, "SENTINELS DESIGN LAB", 86, 25, { size: 8.5, color: C.white, style: "bold" });
  text(doc, "SENTINEL INTELLIGENCE SYSTEM", 86, 37, { size: 6.5, color: [125, 211, 252], style: "bold" });
  text(doc, label.toUpperCase(), PAGE.right, 31, { size: 7, color: [203, 213, 225], style: "bold", align: "right" });
}

function pageFooter(doc, page, total) {
  doc.setDrawColor(...C.line); doc.line(PAGE.left, 754, PAGE.right, 754);
  text(doc, "SentinelsDesignLab.com  |  Info@SentinelsDesignLab.com  |  (832) 432-0224", PAGE.left, 770, { size: 7, color: C.slate });
  text(doc, `${page} / ${total}`, PAGE.right, 770, { size: 7, color: C.slate, align: "right" });
}

function sectionTitle(doc, eyebrow, titleValue, y) {
  text(doc, eyebrow.toUpperCase(), PAGE.left, y, { size: 7, color: C.blue, style: "bold" });
  text(doc, titleValue, PAGE.left, y + 22, { size: 17, color: C.ink, style: "bold" });
}

function scoreCard(doc, category, x, y, w) {
  doc.setFillColor(...C.paleSlate); doc.setDrawColor(...C.line); doc.roundedRect(x, y, w, 68, 8, 8, "FD");
  const color = scoreColor(category.score); doc.setFillColor(...color); doc.roundedRect(x + 12, y + 13, 5, 42, 2.5, 2.5, "F");
  text(doc, `${category.score}`, x + 28, y + 31, { size: 18, color, style: "bold" });
  text(doc, category.label, x + 28, y + 47, { size: 7.5, color: C.ink, style: "bold", maxWidth: w - 42 });
  text(doc, scoreLabel(category.score), x + 28, y + 59, { size: 6.5, color: C.slate, maxWidth: w - 42 });
}

function priorityBlock(doc, item, index, y) {
  const statusColor = item.status === "Warning" ? C.amber : C.red;
  const body = item.evidence || item.recommendation || "Review this finding on the tested page.";
  const action = item.recommendation || "Confirm the finding, correct it if applicable, and retest the page.";
  const bodyLines = doc.splitTextToSize(body, 430); const actionLines = doc.splitTextToSize(action, 430);
  const h = 62 + (bodyLines.length + actionLines.length) * 8;
  doc.setFillColor(...C.paleSlate); doc.setDrawColor(...C.line); doc.roundedRect(PAGE.left, y, PAGE.right - PAGE.left, h, 8, 8, "FD");
  doc.setFillColor(...statusColor); doc.circle(PAGE.left + 17, y + 19, 9, "F");
  text(doc, index + 1, PAGE.left + 17, y + 22, { size: 8, color: C.white, style: "bold", align: "center" });
  text(doc, item.title, PAGE.left + 34, y + 18, { size: 10, color: C.ink, style: "bold", maxWidth: 385 });
  text(doc, (item.status || "Failed").toUpperCase(), PAGE.right - 14, y + 18, { size: 7, color: statusColor, style: "bold", align: "right" });
  text(doc, "EVIDENCE", PAGE.left + 34, y + 39, { size: 6.5, color: C.slate, style: "bold" });
  text(doc, body, PAGE.left + 34, y + 51, { size: 7.6, color: C.slate, maxWidth: 430 });
  const actionY = y + 57 + bodyLines.length * 8;
  text(doc, "RECOMMENDED NEXT STEP", PAGE.left + 34, actionY, { size: 6.5, color: C.slate, style: "bold" });
  text(doc, action, PAGE.left + 34, actionY + 12, { size: 7.6, color: C.ink, maxWidth: 430 });
  return h;
}

export function generateEvaluationPdf(evaluation) {
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  const categories = evaluation.categories || []; const priorities = (evaluation.priorities || []).slice(0, 5); const unknowns = evaluation.unverifiedDimensions || [];
  const testedAt = new Date(evaluation.generatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  pageHeader(doc, "Free Website Evaluation");
  text(doc, "WEBSITE READINESS SNAPSHOT", PAGE.left, 88, { size: 8, color: C.blue, style: "bold" });
  text(doc, evaluation.businessName, PAGE.left, 119, { size: 25, color: C.ink, style: "bold", maxWidth: 390 });
  text(doc, evaluation.url, PAGE.left, 143, { size: 9, color: C.blue, maxWidth: 420 });
  text(doc, `Evaluated ${testedAt}`, PAGE.left, 161, { size: 7.5, color: C.slate });
  const review = evaluation.assessment?.reviewRecommended;
  doc.setFillColor(...(review ? C.paleAmber : C.paleBlue)); doc.setDrawColor(...(review ? [238, 198, 126] : [164, 202, 255])); doc.roundedRect(PAGE.left, 184, PAGE.right - PAGE.left, 88, 10, 10, "FD");
  text(doc, review ? "PROFESSIONAL REVIEW RECOMMENDED" : "MEASURED HOMEPAGE FOUNDATION", PAGE.left + 16, 205, { size: 7.5, color: review ? C.amber : C.blue, style: "bold" });
  text(doc, evaluation.verdict, PAGE.left + 16, 226, { size: 12, color: C.ink, style: "bold", maxWidth: 475, lineHeight: 1.2 });
  text(doc, "This report intentionally does not combine unlike categories into one reassuring overall score.", PAGE.left + 16, 258, { size: 7.5, color: C.slate, maxWidth: 475 });
  sectionTitle(doc, "Seven separate measurements", "What the public homepage shows", 302);
  const cardW = 164; const gap = 12;
  categories.forEach((category, i) => scoreCard(doc, category, PAGE.left + (i % 3) * (cardW + gap), 342 + Math.floor(i / 3) * 80, cardW));
  doc.setFillColor(...C.navy); doc.roundedRect(PAGE.left, 590, PAGE.right - PAGE.left, 104, 10, 10, "F");
  text(doc, "WHAT THESE SCORES DO NOT PROVE", PAGE.left + 16, 612, { size: 7.5, color: [125, 211, 252], style: "bold" });
  text(doc, "A technically functional homepage can still have no rankings, no traffic, weak local visibility, ineffective advertising, or poor conversion performance.", PAGE.left + 16, 633, { size: 10, color: C.white, style: "bold", maxWidth: 475 });
  text(doc, "Those outcomes require market data and, for the most accurate advanced reports, owner-authorized Search Console, Analytics, Business Profile or advertising data.", PAGE.left + 16, 672, { size: 7.8, color: [203, 213, 225], maxWidth: 475 });

  doc.addPage(); pageHeader(doc, "Priority Findings"); sectionTitle(doc, "Evidence before opinion", "The changes that deserve attention first", 86);
  text(doc, "Each finding below includes observable evidence. These are not estimates of traffic or keyword rank.", PAGE.left, 126, { size: 8, color: C.slate, maxWidth: 500 });
  let y = 150; priorities.forEach((item, index) => { y += priorityBlock(doc, item, index, y) + 10; });

  doc.addPage(); pageHeader(doc, "Limits and Next Steps"); sectionTitle(doc, "Critical unknowns", "What must still be measured", 86);
  text(doc, "The free evaluation does not guess at these business outcomes. It labels them honestly and shows what evidence is needed next.", PAGE.left, 126, { size: 8, color: C.slate, maxWidth: 500 });
  y = 153; unknowns.forEach((item, index) => {
    const x = PAGE.left + (index % 2) * 264; const rowY = y + Math.floor(index / 2) * 76;
    doc.setFillColor(...C.paleAmber); doc.setDrawColor(240, 215, 166); doc.roundedRect(x, rowY, 252, 64, 8, 8, "FD");
    text(doc, item.label, x + 13, rowY + 19, { size: 8.5, color: C.ink, style: "bold" });
    text(doc, item.status.toUpperCase(), x + 239, rowY + 19, { size: 6, color: C.amber, style: "bold", align: "right" });
    text(doc, item.reason, x + 13, rowY + 37, { size: 7, color: C.slate, maxWidth: 222 });
  });
  y = 405; sectionTitle(doc, "Recommended path", "Turn this snapshot into a business decision", y);
  const steps = [["1", "Review the priority findings", "Confirm visible issues and correct urgent security, search, trust and conversion gaps."], ["2", "Choose the report that answers the business question", "Use a focused report, a five-report bundle, or the complete ten-report SIS series."], ["3", "Connect only the required data sources", "First-party access improves accuracy and can be removed at any time from the customer dashboard."]];
  steps.forEach(([number, heading, body], index) => { const rowY = y + 42 + index * 66; doc.setFillColor(...C.blue); doc.circle(PAGE.left + 13, rowY + 8, 13, "F"); text(doc, number, PAGE.left + 13, rowY + 12, { size: 9, color: C.white, style: "bold", align: "center" }); text(doc, heading, PAGE.left + 38, rowY + 5, { size: 9.5, color: C.ink, style: "bold" }); text(doc, body, PAGE.left + 38, rowY + 22, { size: 7.5, color: C.slate, maxWidth: 445 }); });
  doc.setFillColor(...C.paleBlue); doc.roundedRect(PAGE.left, 663, PAGE.right - PAGE.left, 58, 8, 8, "F");
  text(doc, "VIEW SAVED REPORTS AND ADVANCED OPTIONS", PAGE.left + 16, 684, { size: 7, color: C.blue, style: "bold" });
  text(doc, "reports.sentinelsdesignlab.com/dashboard", PAGE.left + 16, 704, { size: 11, color: C.ink, style: "bold" });
  const total = doc.getNumberOfPages(); for (let i = 1; i <= total; i += 1) { doc.setPage(i); pageFooter(doc, i, total); }
  doc.setProperties({ title: `${evaluation.businessName} Website Readiness Snapshot`, subject: "Sentinel Intelligence System Free Website Evaluation", author: "Sentinels Design Lab", creator: "Sentinels Design Lab" });
  return Buffer.from(doc.output("arraybuffer"));
}

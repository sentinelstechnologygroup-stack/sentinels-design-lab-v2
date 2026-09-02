import { jsPDF } from "jspdf";

const NAVY = [5, 12, 30];
const BLUE = [47, 118, 246];
const INK = [25, 37, 59];
const MUTED = [100, 116, 139];

function scoreColor(score) {
  return score >= 85 ? [22, 163, 74] : score >= 70 ? BLUE : score >= 50 ? [217, 119, 6] : [220, 38, 38];
}

function footer(doc, page, total) {
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  doc.setTextColor(...MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
  doc.text("Sentinels Design Lab | SentinelsDesignLab.com | Info@SentinelsDesignLab.com | (832) 432-0224", 44, height - 28);
  doc.text(`Page ${page} of ${total}`, width - 44, height - 28, { align: "right" });
  doc.text("This evaluation is informational and reflects public website data available at the recorded test time.", 44, height - 16);
}

function header(doc, evaluation, subtitle) {
  const width = doc.internal.pageSize.getWidth();
  doc.setFillColor(...NAVY); doc.rect(0, 0, width, 112, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.text("SENTINELS DESIGN LAB", 44, 43);
  doc.setFontSize(8.5); doc.setTextColor(125, 211, 252); doc.text(subtitle, 44, 63);
  doc.setTextColor(226, 232, 240); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
  doc.text(evaluation.businessName, 44, 88); doc.text(evaluation.url, width - 44, 88, { align: "right", maxWidth: 260 });
}

export function generateEvaluationPdf(evaluation) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const width = doc.internal.pageSize.getWidth();
  const categories = evaluation.categories || [];
  const priorities = (evaluation.priorities || []).slice(0, 5);
  const testedAt = new Date(evaluation.generatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  header(doc, evaluation, "SENTINEL INTELLIGENCE SYSTEM - FREE WEBSITE EVALUATION");
  let y = 140;
  doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
  doc.text("Visible homepage evidence, with clear limits", 44, y);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...MUTED);
  doc.text(`Tested ${testedAt}. ${categories.length} measured areas; ${evaluation.unverifiedDimensions?.length || 0} critical dimensions remain unverified.`, 44, y + 19);
  y += 43;
  categories.forEach((category) => {
    doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.text(category.label, 44, y + 8);
    doc.setFillColor(226, 232, 240); doc.roundedRect(190, y, 280, 10, 5, 5, "F");
    doc.setFillColor(...scoreColor(category.score)); doc.roundedRect(190, y, 280 * (category.score / 100), 10, 5, 5, "F");
    doc.setTextColor(...MUTED); doc.text(`${category.score}/100`, 536, y + 8, { align: "right" }); y += 23;
  });
  y += 8; doc.setFillColor(255, 247, 237); doc.roundedRect(44, y, width - 88, 56, 10, 10, "F");
  doc.setTextColor(154, 52, 18); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.text("NOT VERIFIED", 60, y + 19);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.8);
  doc.text(doc.splitTextToSize("Rankings, organic traffic, backlinks, local visibility, paid search, and actual conversions require additional data. A strong homepage score does not establish performance in those areas.", width - 120), 60, y + 35);
  y += 76; doc.setTextColor(...BLUE); doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("TOP FINDINGS", 44, y); y += 20;
  priorities.forEach((item, index) => {
    doc.setFillColor(248, 250, 252); doc.roundedRect(44, y, width - 88, 50, 8, 8, "F");
    doc.setFillColor(...(item.status === "Warning" ? [217, 119, 6] : [220, 38, 38])); doc.circle(59, y + 16, 8, "F");
    doc.setTextColor(255, 255, 255); doc.setFontSize(8); doc.text(String(index + 1), 59, y + 19, { align: "center" });
    doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.text(doc.splitTextToSize(`${item.status || "Failed"}: ${item.title}`, width - 150), 74, y + 15);
    doc.setTextColor(...MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.text(doc.splitTextToSize(item.evidence || item.recommendation, width - 150), 74, y + 31); y += 58;
  });
  footer(doc, 1, 2);

  doc.addPage(); header(doc, evaluation, "VERIFIABLE FINDINGS AND REPRODUCTION STEPS"); y = 140;
  priorities.forEach((item, index) => {
    const evidenceLines = doc.splitTextToSize(item.evidence || item.recommendation || "Review the finding on the tested page.", width - 120);
    const reproduceLines = doc.splitTextToSize(item.reproduce || `Review ${item.pageUrl || evaluation.url} and confirm the finding.`, width - 120);
    const boxHeight = 78 + evidenceLines.length * 9 + reproduceLines.length * 9;
    if (y + boxHeight > 728) { footer(doc, doc.getNumberOfPages(), doc.getNumberOfPages() + 1); doc.addPage(); header(doc, evaluation, "VERIFIABLE FINDINGS AND REPRODUCTION STEPS"); y = 140; }
    doc.setFillColor(248, 250, 252); doc.roundedRect(44, y, width - 88, boxHeight, 10, 10, "F");
    doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.text(`${index + 1}. ${item.title}`, 60, y + 22);
    doc.setTextColor(...(item.status === "Warning" ? [180, 83, 9] : [185, 28, 28])); doc.setFontSize(7.5); doc.text((item.status || "Failed").toUpperCase(), width - 60, y + 22, { align: "right" });
    doc.setTextColor(...INK); doc.text("WHAT WE OBSERVED", 60, y + 43); doc.setFont("helvetica", "normal"); doc.setTextColor(...MUTED); doc.text(evidenceLines, 60, y + 56);
    let detailY = y + 65 + evidenceLines.length * 9; doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.text("VERIFY IT YOURSELF", 60, detailY);
    doc.setFont("helvetica", "normal"); doc.setTextColor(...MUTED); doc.text(reproduceLines, 60, detailY + 13); detailY += 24 + reproduceLines.length * 9;
    doc.setFontSize(7); doc.text(`Page: ${item.pageUrl || evaluation.url} | Tested: ${testedAt}`, 60, detailY); y += boxHeight + 12;
  });
  if (y < 680) {
    doc.setFillColor(...NAVY); doc.roundedRect(44, y + 4, width - 88, 64, 10, 10, "F"); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text("SCOPE OF THIS FREE REPORT", 60, y + 25);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(203, 213, 225); doc.text(doc.splitTextToSize(evaluation.scopeNote, width - 120), 60, y + 41);
  }
  const totalPages = doc.getNumberOfPages();
  for (let page = 2; page <= totalPages; page += 1) { doc.setPage(page); footer(doc, page, totalPages); }
  return Buffer.from(doc.output("arraybuffer"));
}

import { jsPDF } from "jspdf";

const C = {
  midnight: [11, 18, 32],
  charcoal: [31, 41, 55],
  slate: [100, 116, 139],
  silver: [203, 213, 225],
  offwhite: [244, 246, 249],
  white: [255, 255, 255],
  blue: [47, 111, 237],
  cyan: [34, 211, 238],
  green: [21, 128, 61],
  greenBg: [232, 245, 233],
  amber: [180, 83, 9],
  amberBg: [254, 243, 226],
  red: [185, 28, 28],
  redBg: [253, 236, 236],
};
const PAGE = { w: 612, h: 792, left: 36, right: 576, footerY: 757 };

function setText(
  doc,
  value,
  x,
  y,
  {
    size = 9,
    color = C.charcoal,
    style = "normal",
    align,
    maxWidth,
    lineHeight = 1.18,
  } = {},
) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.setLineHeightFactor(lineHeight);
  doc.text(
    maxWidth
      ? doc.splitTextToSize(String(value || ""), maxWidth)
      : String(value || ""),
    x,
    y,
    { align },
  );
}

function scoreStyle(score) {
  if (score >= 70) return { text: C.green, bg: C.greenBg };
  if (score >= 40) return { text: C.amber, bg: C.amberBg };
  return { text: C.red, bg: C.redBg };
}

function brandBand(doc) {
  doc.setFillColor(...C.midnight);
  doc.rect(PAGE.left, 36, PAGE.right - PAGE.left, 28, "F");
  setText(doc, "SENTINELS DESIGN LAB", PAGE.left + 10, 54, {
    size: 9,
    color: C.white,
    style: "bold",
  });
  setText(doc, "SENTINELS INTELLIGENCE SUITE", PAGE.right - 10, 54, {
    size: 6.5,
    color: C.cyan,
    style: "bold",
    align: "right",
  });
}

function footer(doc, page, total) {
  doc.setDrawColor(...C.silver);
  doc.line(PAGE.left, PAGE.footerY - 12, PAGE.right, PAGE.footerY - 12);
  setText(
    doc,
    "Sentinels Design Lab  |  SentinelsDesignLab.com  |  Info@SentinelsDesignLab.com  |  (832) 432-0224",
    PAGE.w / 2,
    PAGE.footerY,
    { size: 6.3, color: C.slate, align: "center" },
  );
  setText(
    doc,
    `This evaluation is informational and reflects public website data available at the recorded test time.   Page ${page} of ${total}`,
    PAGE.w / 2,
    PAGE.footerY + 10,
    { size: 5.7, color: C.silver, style: "italic", align: "center" },
  );
}

function scoreRow(doc, category, y) {
  const style = scoreStyle(category.score);
  const barX = 255;
  const barW = 166;
  const valueX = 482;
  setText(doc, category.label, PAGE.left, y + 8, { size: 8.5, style: "bold" });
  doc.setFillColor(229, 233, 240);
  doc.rect(barX, y, barW, 10, "F");
  if (category.score > 0) {
    doc.setFillColor(...style.text);
    doc.rect(barX, y, Math.max(2, (barW * category.score) / 100), 10, "F");
  }
  doc.setFillColor(...style.bg);
  doc.rect(valueX, y - 5, 74, 20, "F");
  setText(doc, `${category.score}/100`, valueX + 37, y + 8, {
    size: 7.5,
    color: style.text,
    style: "bold",
    align: "center",
  });
}

function summaryFinding(doc, item, index, y) {
  const color = item.status === "Warning" ? C.amber : C.red;
  setText(doc, String(index + 1), PAGE.left + 5, y + 2, {
    size: 9,
    color: C.slate,
    style: "bold",
  });
  setText(
    doc,
    `${item.status === "Warning" ? "Warning" : "Failed"}:`,
    PAGE.left + 34,
    y + 2,
    { size: 8, color, style: "bold" },
  );
  setText(doc, item.title, PAGE.left + 72, y + 2, {
    size: 8,
    style: "bold",
    maxWidth: 445,
  });
  const observed =
    item.evidence ||
    item.recommendation ||
    "Review the finding on the tested page.";
  setText(doc, observed, PAGE.left + 34, y + 15, {
    size: 7.2,
    color: C.slate,
    maxWidth: 482,
  });
  return 27 + doc.splitTextToSize(observed, 482).length * 4;
}

function detailBlock(doc, evaluation, item, index, y, testedAt) {
  const observed =
    item.evidence ||
    item.recommendation ||
    "Review the finding on the tested page.";
  const verify =
    item.reproduce ||
    item.recommendation ||
    `Review ${item.pageUrl || evaluation.url} and confirm this finding.`;
  const observedLines = doc.splitTextToSize(observed, 510);
  const verifyLines = doc.splitTextToSize(verify, 510);
  const blockH = 66 + observedLines.length * 7 + verifyLines.length * 7;
  doc.setFillColor(...C.midnight);
  doc.rect(PAGE.left, y, PAGE.right - PAGE.left, 20, "F");
  setText(doc, `${index + 1}. ${item.title}`, PAGE.left + 14, y + 14, {
    size: 7.7,
    color: C.white,
    style: "bold",
    maxWidth: 430,
  });
  setText(
    doc,
    (item.status || "Failed").toUpperCase(),
    PAGE.right - 14,
    y + 14,
    {
      size: 6.5,
      color: item.status === "Warning" ? [252, 211, 77] : [252, 165, 165],
      style: "bold",
      align: "right",
    },
  );
  setText(doc, "WHAT WE OBSERVED", PAGE.left, y + 34, {
    size: 6.5,
    color: C.slate,
    style: "bold",
  });
  setText(doc, observed, PAGE.left, y + 45, { size: 7.5, maxWidth: 510 });
  const verifyY = y + 51 + observedLines.length * 7;
  setText(doc, "VERIFY IT YOURSELF", PAGE.left, verifyY, {
    size: 6.5,
    color: C.slate,
    style: "bold",
  });
  setText(doc, verify, PAGE.left, verifyY + 11, { size: 7.5, maxWidth: 510 });
  setText(
    doc,
    `Page: ${item.pageUrl || evaluation.url}  |  Tested: ${testedAt}`,
    PAGE.left,
    verifyY + 19 + verifyLines.length * 7,
    { size: 6.3, color: C.slate, style: "italic", maxWidth: 510 },
  );
  return blockH;
}

export function generateEvaluationPdf(evaluation) {
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  const categories = evaluation.categories || [];
  const priorities = (evaluation.priorities || []).slice(0, 5);
  const findings = (evaluation.findings || priorities).slice(0, 14);
  const unknowns = evaluation.unverifiedDimensions || [];
  const testedAt = new Date(evaluation.generatedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  brandBand(doc);
  setText(doc, "FREE WEBSITE EVALUATION", PAGE.left, 93, {
    size: 16,
    color: C.midnight,
    style: "bold",
  });
  setText(doc, evaluation.businessName, PAGE.left, 111, {
    size: 11,
    style: "bold",
    maxWidth: 260,
  });
  setText(doc, evaluation.url, 260, 111, {
    size: 9,
    color: C.blue,
    maxWidth: 295,
  });
  setText(
    doc,
    `${evaluation.score}/100 - ${evaluation.scoreLabel}`,
    PAGE.left,
    126,
    { size: 9, color: scoreStyle(evaluation.score).text, style: "bold" },
  );
  setText(
    doc,
    `Tested ${testedAt}  -  ${categories.length} measured areas, ${unknowns.length} critical dimensions not yet verified.`,
    PAGE.left,
    140,
    { size: 7.2, color: C.slate },
  );

  let y = 164;
  categories.forEach((category) => {
    scoreRow(doc, category, y);
    y += 19;
  });
  y += 10;
  doc.setFillColor(...C.offwhite);
  doc.setDrawColor(...C.slate);
  doc.rect(PAGE.left, y, PAGE.right - PAGE.left, 58, "FD");
  setText(doc, "NOT VERIFIED", PAGE.left + 12, y + 16, {
    size: 7.2,
    color: C.slate,
    style: "bold",
  });
  const labels = unknowns.map((item) => item.label.toLowerCase());
  setText(
    doc,
    `This evaluation is based on visible homepage evidence only. ${labels.join(", ").replace(/, ([^,]*)$/, ", and $1")} require additional data and are not reflected in the scores above. A strong homepage score does not establish performance in those areas.`,
    PAGE.left + 12,
    y + 31,
    { size: 7.2, color: C.slate, style: "italic", maxWidth: 510 },
  );

  if (evaluation.connectedInsights?.length) {
    const insight = evaluation.connectedInsights[0];
    y += 66;
    doc.setFillColor(232, 240, 254);
    doc.setDrawColor(...C.blue);
    doc.rect(PAGE.left, y, PAGE.right - PAGE.left, 45, "FD");
    setText(
      doc,
      `${insight.label.toUpperCase()} — ${insight.source}`,
      PAGE.left + 12,
      y + 15,
      { size: 6.8, color: C.blue, style: "bold" },
    );
    setText(
      doc,
      `${Number(insight.clicks || 0).toLocaleString()} clicks | ${Number(insight.impressions || 0).toLocaleString()} impressions | ${((insight.ctr || 0) * 100).toFixed(1)}% CTR | ${insight.period}`,
      PAGE.left + 12,
      y + 29,
      { size: 7.2, color: C.charcoal },
    );
    setText(
      doc,
      "Enhanced free context only; this is not equivalent to the paid SEO Intelligence analysis.",
      PAGE.left + 12,
      y + 39,
      { size: 6.2, color: C.slate, style: "italic" },
    );
  }

  y += 82;
  setText(doc, "TOP FINDINGS", PAGE.left, y, {
    size: 10,
    color: C.midnight,
    style: "bold",
  });
  y += 21;
  priorities.forEach((item, index) => {
    y += summaryFinding(doc, item, index, y);
  });
  doc.setFillColor(...C.amberBg);
  doc.setDrawColor(234, 179, 101);
  doc.rect(PAGE.left, 684, PAGE.right - PAGE.left, 42, "FD");
  setText(doc, "PROFESSIONAL REVIEW RECOMMENDED", PAGE.left + 12, 700, {
    size: 7,
    color: C.amber,
    style: "bold",
  });
  setText(doc, evaluation.verdict, PAGE.left + 12, 714, {
    size: 7.2,
    color: C.charcoal,
    style: "bold",
    maxWidth: 510,
  });

  doc.addPage();
  brandBand(doc);
  setText(doc, "VERIFIABLE FINDINGS AND REPRODUCTION STEPS", PAGE.left, 93, {
    size: 12,
    color: C.midnight,
    style: "bold",
  });
  setText(doc, evaluation.businessName, PAGE.left, 111, {
    size: 9,
    style: "bold",
    maxWidth: 250,
  });
  setText(doc, evaluation.url, 260, 111, {
    size: 8,
    color: C.blue,
    maxWidth: 295,
  });
  y = 132;
  findings.forEach((item, index) => {
    const anticipated = 95;
    if (y + anticipated > 724) {
      doc.addPage();
      brandBand(doc);
      setText(
        doc,
        "VERIFIABLE FINDINGS AND REPRODUCTION STEPS",
        PAGE.left,
        93,
        { size: 12, color: C.midnight, style: "bold" },
      );
      y = 118;
    }
    y += detailBlock(doc, evaluation, item, index, y, testedAt) + 10;
  });

  doc.addPage();
  brandBand(doc);
  setText(doc, "CONTENT AND CONTACT SIGNALS COLLECTED", PAGE.left, 93, {
    size: 12,
    color: C.midnight,
    style: "bold",
  });
  setText(
    doc,
    "These are extracted page signals, not inferred marketing claims.",
    PAGE.left,
    109,
    { size: 7.5, color: C.slate, style: "italic" },
  );
  const observed = evaluation.observedContent || {};
  const contentRows = [
    ["Page title", observed.pageTitle],
    ["Meta description", observed.metaDescription],
    ["H1 headings", observed.h1Count],
    ["Visible words", observed.visibleWordCount],
    ["Calls to action", observed.callsToAction],
    ["Forms", observed.forms],
    ["Telephone links", observed.telephoneLinks],
    ["Email links", observed.emailLinks],
  ];
  y = 136;
  contentRows.forEach(([label, value]) => {
    setText(doc, label, PAGE.left, y, {
      size: 7.5,
      color: C.slate,
      style: "bold",
    });
    setText(doc, String(value ?? "Not detected"), 155, y, {
      size: 7.5,
      maxWidth: 410,
    });
    y += Math.max(
      22,
      doc.splitTextToSize(String(value ?? "Not detected"), 410).length * 10 + 8,
    );
  });
  const domains = observed.alternateDomains || [];
  setText(doc, "Alternate or lookalike business domains", PAGE.left, y + 8, {
    size: 8,
    color: C.midnight,
    style: "bold",
  });
  setText(
    doc,
    domains.length
      ? domains
          .map(
            (item) => `${item.url} - ${item.live ? "live" : "not reachable"}`,
          )
          .join("; ")
      : "None detected.",
    PAGE.left,
    y + 23,
    {
      size: 7.5,
      color: domains.some((item) => !item.live) ? C.red : C.charcoal,
      maxWidth: 510,
    },
  );

  const total = doc.getNumberOfPages();
  for (let page = 1; page <= total; page += 1) {
    doc.setPage(page);
    footer(doc, page, total);
  }
  doc.setProperties({
    title: `${evaluation.businessName} Website Readiness Snapshot`,
    subject: "Sentinels Intelligence Suite Free Website Evaluation",
    author: "Sentinels Design Lab",
    creator: "Sentinels Design Lab",
  });
  return Buffer.from(doc.output("arraybuffer"));
}

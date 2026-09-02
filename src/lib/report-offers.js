export const REPORT_OFFERS = {
  individual: { code: "individual", name: "Individual advanced report", amountCents: 1900, reportCredits: 1, hostingCredit: "$19 for 1 month", summary: "Choose one focused analysis from the ten-report Sentinels Intelligence Suite." },
  three: { code: "three", name: "Choose any 3 advanced reports", amountCents: 4900, reportCredits: 3, hostingCredit: "$49 for 1 month", summary: "Select three report areas for a broader, decision-ready view." },
  five: { code: "five", name: "Choose any 5 advanced reports", amountCents: 7900, reportCredits: 5, hostingCredit: "$39.50/month for 2 months", summary: "Select five reports for a deeper website-performance or market-visibility analysis." },
  complete: { code: "complete", name: "Complete Sentinels Intelligence Suite bundle", amountCents: 9900, reportCredits: 10, hostingCredit: "$33/month for 3 months", summary: "All ten advanced reports plus the official executive rollup." },
  "complete-review": { code: "complete-review", name: "Complete suite bundle + expert review", amountCents: 16000, reportCredits: 10, includesReview: true, hostingCredit: "$40/month for 4 months", summary: "The complete series, executive rollup, and a professional findings review." },
};

export function getReportOffer(code) {
  return REPORT_OFFERS[code] || null;
}

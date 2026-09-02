export const REPORT_OFFERS = {
  individual: { code: "individual", name: "Individual SIS report", amountCents: 1900, reportCredits: 1, hostingCredit: "$19 for 1 month", summary: "Choose one focused analysis from the ten-report SIS series." },
  three: { code: "three", name: "Any 3 SIS reports", amountCents: 4900, reportCredits: 3, hostingCredit: "$49 for 1 month", summary: "Combine three related report areas for a broader decision-ready view." },
  five: { code: "five", name: "Any 5 SIS reports", amountCents: 7900, reportCredits: 5, hostingCredit: "$39.50/month for 2 months", summary: "A half-series analysis for website performance or market visibility." },
  complete: { code: "complete", name: "Complete SIS report bundle", amountCents: 9900, reportCredits: 10, hostingCredit: "$33/month for 3 months", summary: "All ten advanced reports plus the official executive rollup." },
  "complete-review": { code: "complete-review", name: "Complete SIS bundle + expert review", amountCents: 16000, reportCredits: 10, includesReview: true, hostingCredit: "$40/month for 4 months", summary: "The complete series, executive rollup, and a professional findings review." },
};

export function getReportOffer(code) {
  return REPORT_OFFERS[code] || null;
}

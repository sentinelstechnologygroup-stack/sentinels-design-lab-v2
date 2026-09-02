export const REPORT_OFFERS = {
  individual: { code: "individual", name: "Individual SIS report", amountCents: 1900, reportCredits: 1, hostingCredit: "$19 for 1 month" },
  three: { code: "three", name: "Any 3 SIS reports", amountCents: 4900, reportCredits: 3, hostingCredit: "$49 for 1 month" },
  five: { code: "five", name: "Any 5 SIS reports", amountCents: 7900, reportCredits: 5, hostingCredit: "$39.50/month for 2 months" },
  complete: { code: "complete", name: "Complete SIS report bundle", amountCents: 9900, reportCredits: 10, hostingCredit: "$33/month for 3 months" },
  "complete-review": { code: "complete-review", name: "Complete SIS bundle + expert review", amountCents: 16000, reportCredits: 10, includesReview: true, hostingCredit: "$40/month for 4 months" },
};

export function getReportOffer(code) {
  return REPORT_OFFERS[code] || null;
}

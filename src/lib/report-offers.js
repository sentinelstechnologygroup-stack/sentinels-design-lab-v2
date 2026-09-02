export const REPORT_OFFERS = {
  seo: { code: "seo", name: "SEO Intelligence", amountCents: 9900, reportCredits: 1, includedReports: ["seo-intelligence"], summary: "Technical, organic, competitor, local, and reputation intelligence in one focused report." },
  ppc: { code: "ppc", name: "PPC Intelligence", amountCents: 9900, reportCredits: 1, includedReports: ["ppc-intelligence"], summary: "Paid-search, landing-page, tracking, and conversion intelligence in one focused report." },
  comprehensive: { code: "comprehensive", name: "Website & Conversion Deep Dive", amountCents: 14900, reportCredits: 1, includedReports: ["website-conversion"], summary: "A comprehensive website, usability, trust, analytics, and conversion-path investigation." },
  complete: { code: "complete", name: "Complete Growth Intelligence Bundle", amountCents: 34900, reportCredits: 3, includedReports: ["seo-intelligence", "ppc-intelligence", "website-conversion"], summary: "All three advanced analyses combined with an executive 30 / 60 / 90 / 120-day action plan." },
};

export function getReportOffer(code) {
  return REPORT_OFFERS[code] || null;
}

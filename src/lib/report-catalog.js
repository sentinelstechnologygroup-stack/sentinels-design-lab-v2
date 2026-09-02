export const REPORT_MODULES = [
  { code: "website-evaluation", name: "Website Evaluation Report", description: "A detailed review of technical health, usability, content readiness, conversion paths, trust signals, and priority improvements." },
  { code: "technical-evaluation", name: "Technical SEO Evaluation Report", description: "Crawlability, indexing controls, site architecture, performance, structured data, mobile readiness, and technical search barriers." },
  { code: "search-competitor", name: "Search Competitor Report", description: "Organic competitors, keyword overlap, ranking gaps, search-result visibility, and practical opportunities to compete." },
  { code: "landing-page", name: "Landing Page Performance Report", description: "Search intent, message alignment, user experience, engagement evidence, conversion friction, and page-level recommendations." },
  { code: "conversion-optimization", name: "Conversion Optimization Report", description: "Calls to action, forms, tracking, user journeys, lead friction, and opportunities to improve measurable conversions." },
  { code: "google-business", name: "Google Business Profile Report", description: "Profile completeness, local visibility, categories, reviews, customer actions, and local-search improvement priorities." },
  { code: "competitive-analysis", name: "Competitive Analysis Report", description: "A cross-channel comparison of key competitors, positioning, visibility, authority, offers, and market opportunities." },
  { code: "reputation-reviews", name: "Reputation and Reviews Report", description: "Review volume, ratings, recency, response patterns, reputation risks, and a prioritized review-growth plan." },
  { code: "social-media", name: "Social Media Readiness Report", description: "Profile consistency, publishing activity, audience signals, content gaps, and alignment with business goals." },
  { code: "paid-advertising", name: "Paid Advertising Performance Report", description: "Campaign structure, keywords, search terms, spend efficiency, competitor pressure, tracking, and paid-conversion opportunities." },
];

export const REPORT_CATALOG = [
  { code: "seo-intelligence", name: "SEO Intelligence Report", description: "Technical SEO, rankings, keyword and competitor gaps, backlinks, local visibility, Business Profile, and reputation evidence.", requiredConnections: ["search-console", "analytics", "business-profile"] },
  { code: "ppc-intelligence", name: "PPC Intelligence Report", description: "Google Ads structure, search terms, spend, conversions, tracking, landing pages, and competitor pressure.", requiredConnections: ["ads", "analytics", "tag-manager"] },
  { code: "website-conversion", name: "Website & Conversion Deep Dive", description: "Full-site technical quality, usability, messaging, landing pages, calls to action, forms, trust, analytics, and conversion friction.", requiredConnections: ["analytics", "tag-manager"] },
];

export const REPORT_CATALOG_BY_CODE = Object.fromEntries(REPORT_CATALOG.map((report) => [report.code, report]));

export function validateReportSelection(offer, selectedReports) {
  if (offer.includedReports) return [...offer.includedReports];
  const requested = [...new Set(Array.isArray(selectedReports) ? selectedReports : [])];
  const valid = requested.filter((code) => REPORT_CATALOG_BY_CODE[code]);
  if (offer.reportCredits >= REPORT_CATALOG.length) return REPORT_CATALOG.map((report) => report.code);
  if (valid.length !== offer.reportCredits) return null;
  return valid;
}

import "server-only";

const API_BASE = "https://api.dataforseo.com/v3";
const DEFAULT_LOCATION_CODE = 2840;

function authorization() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("DataForSEO credentials are not configured.");
  return `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`;
}

async function live(path, task) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { Authorization: authorization(), "Content-Type": "application/json" },
    body: JSON.stringify([task]),
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  const apiTask = payload.tasks?.[0];
  if (!response.ok || payload.status_code !== 20000 || apiTask?.status_code !== 20000) {
    throw new Error(apiTask?.status_message || payload.status_message || `DataForSEO ${path} request failed.`);
  }
  return { result: apiTask.result || [], cost: Number(apiTask.cost || 0), endpoint: path };
}

function domainOf(url) {
  return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./i, "");
}

/** Public-market evidence used by paid reports. Customer-owned performance remains separate. */
export async function collectAdvancedPublicData({ reportCode, website, businessName, locationCode = DEFAULT_LOCATION_CODE, languageCode = "en", keywords = [] }) {
  const target = domainOf(website);
  const locale = { location_code: locationCode, language_code: languageCode };
  const requests = [];

  if (["seo-intelligence", "ppc-intelligence"].includes(reportCode)) {
    requests.push(live("dataforseo_labs/google/domain_rank_overview/live", { target, ...locale }));
    requests.push(live("dataforseo_labs/google/ranked_keywords/live", { target, ...locale, limit: 100 }));
    requests.push(live("dataforseo_labs/google/competitors_domain/live", { target, ...locale, exclude_top_domains: true, limit: 20 }));
  }
  if (reportCode === "seo-intelligence") {
    requests.push(live("backlinks/summary/live", { target, include_subdomains: true }));
    if (businessName) requests.push(live("business_data/google/my_business_info/live", { keyword: businessName, ...locale }));
  }
  if (reportCode === "ppc-intelligence" && keywords.length) {
    requests.push(live("keywords_data/google_ads/search_volume/live", { keywords: keywords.slice(0, 1000), ...locale }));
  }

  return Promise.all(requests);
}

export const DATAFORSEO_ADVANCED_ENDPOINTS = Object.freeze({
  seo: ["dataforseo_labs/google/domain_rank_overview/live", "dataforseo_labs/google/ranked_keywords/live", "dataforseo_labs/google/competitors_domain/live", "backlinks/summary/live", "business_data/google/my_business_info/live"],
  ppc: ["dataforseo_labs/google/domain_rank_overview/live", "dataforseo_labs/google/ranked_keywords/live", "dataforseo_labs/google/competitors_domain/live", "keywords_data/google_ads/search_volume/live"],
  website: ["on_page/instant_pages"],
});

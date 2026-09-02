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

async function apiJson(path, options = {}) {
  const response = await fetch(`${API_BASE}/${path}`, { ...options, headers: { Authorization: authorization(), "Content-Type": "application/json", ...options.headers }, cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.status_code !== 20000) throw new Error(payload.status_message || `DataForSEO ${path} request failed.`);
  return payload;
}

export async function crawlSite(website, maxCrawlPages = 50) {
  const target = domainOf(website);
  const created = await apiJson("on_page/task_post", { method: "POST", body: JSON.stringify([{ target, max_crawl_pages: maxCrawlPages, max_crawl_depth: 4, respect_sitemap: true, enable_javascript: true, load_resources: true, enable_www_redirect_check: true, accept_language: "en-US" }]) });
  const task = created.tasks?.[0];
  if (!task?.id || ![20000, 20100].includes(task.status_code)) throw new Error(task?.status_message || "DataForSEO site crawl could not be started.");
  let summary;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const payload = await apiJson(`on_page/summary/${task.id}`);
    const result = payload.tasks?.[0]?.result?.[0];
    if (result?.crawl_progress === "finished") { summary = result; break; }
  }
  if (!summary) throw new Error("DataForSEO site crawl did not finish within the report-generation window.");
  const pagesPayload = await apiJson("on_page/pages", { method: "POST", body: JSON.stringify([{ id: task.id, limit: Math.min(maxCrawlPages, 1000) }]) });
  const pagesResult = pagesPayload.tasks?.[0]?.result?.[0] || {};
  return { taskId: task.id, summary, pages: pagesResult.items || [], pagesCrawled: pagesResult.crawl_status?.pages_crawled || summary.crawl_status?.pages_crawled || 0 };
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

  const settled = await Promise.allSettled(requests);
  const completed = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
  if (reportCode === "ppc-intelligence" && !keywords.length) {
    const ranked = completed.find((item) => item.endpoint.includes("ranked_keywords"));
    const discovered = (ranked?.result?.[0]?.items || []).map((item) => item.keyword_data?.keyword).filter(Boolean).slice(0, 1000);
    if (discovered.length) {
      try { completed.push(await live("keywords_data/google_ads/search_volume/live", { keywords: discovered, ...locale })); } catch { /* Paid report retains ranked-keyword evidence if volume enrichment is unavailable. */ }
    }
  }
  if (!completed.length && requests.length) throw settled.find((item) => item.status === "rejected")?.reason || new Error("No DataForSEO source completed.");
  return completed;
}

export const DATAFORSEO_ADVANCED_ENDPOINTS = Object.freeze({
  seo: ["dataforseo_labs/google/domain_rank_overview/live", "dataforseo_labs/google/ranked_keywords/live", "dataforseo_labs/google/competitors_domain/live", "backlinks/summary/live", "business_data/google/my_business_info/live"],
  ppc: ["dataforseo_labs/google/domain_rank_overview/live", "dataforseo_labs/google/ranked_keywords/live", "dataforseo_labs/google/competitors_domain/live", "keywords_data/google_ads/search_volume/live"],
  website: ["on_page/instant_pages"],
});

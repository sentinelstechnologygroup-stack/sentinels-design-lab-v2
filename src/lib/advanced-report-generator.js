import "server-only";
import { collectAdvancedPublicData, crawlSite } from "@/lib/dataforseo-advanced";
import { buildBasicEvaluation, inspectPage } from "@/lib/dataforseo";
import { generateAdvancedReportPdf } from "@/lib/advanced-report-pdf";
import { createReport, findReportsByOrder, getWebsite, updateOrder, updateReport } from "@/db/firestore";
import { storeReportPdf } from "@/lib/report-storage";
import { REPORT_CATALOG_BY_CODE } from "@/lib/report-catalog";
import { sendMail } from "@/lib/smtp";
import { schedulingUrl } from "@/lib/report-follow-up";
import { adminAuth } from "@/lib/firebase-admin";
import { buildPpcTemplateData, buildSeoTemplateData, buildWebsiteTemplateData } from "@/lib/report-template-data";

const CONNECT = "https://sentinelsdesignlab.com/dashboard#connections";
const REPORT_TEMPLATE_VERSION = "SDL Report Templates v2";
const required = {
  "seo-intelligence": [["Google Search Console", "rankings, queries, clicks, impressions, and indexing"], ["Google Analytics 4", "organic visits, engagement, and conversions"], ["Google Business Profile", "owner-verified local visibility and customer actions"]],
  "ppc-intelligence": [["Google Ads", "campaigns, spend, search terms, and paid conversions"], ["Google Analytics 4", "post-click engagement and conversion paths"], ["Google Tag Manager", "conversion-tag and tracking configuration"]],
  "website-conversion": [["Google Analytics 4", "traffic, journeys, engagement, and conversions"], ["Google Tag Manager", "event and conversion tracking configuration"]],
};

function pendingSections(code, connectedData = {}) {
  const keys = { "Google Search Console": "search-console", "Google Analytics 4": "analytics", "Google Business Profile": "business-profile", "Google Ads": "ads", "Google Tag Manager": "tag-manager" };
  return required[code].map(([name, purpose]) => {
    const data = connectedData[keys[name]];
    if (data) return { title: `${name}: Verified customer data`, status: "verified_customer", detail: `${purpose} were retrieved from the customer-authorized account. Snapshot: ${JSON.stringify(data).slice(0, 900)}`, action: "Use this owner-verified evidence alongside the public benchmarks and retain the source export for comparison." };
    return { title: `${name}: 0 - Pending access`, status: "pending_access", detail: `This is not a zero-performance result. ${name} access is required to calculate ${purpose}.`, action: `Connect ${name} securely at ${CONNECT}. One complimentary paid-report reevaluation is included within 60 days.` };
  });
}

function firstMetric(collection, channel) {
  const rank = collection.find((item) => item.endpoint.includes("domain_rank_overview"));
  return rank?.result?.[0]?.items?.[0]?.metrics?.[channel] || {};
}

function publicSections(code, collection, evaluation, crawl) {
  if (code === "website-conversion") {
    const sitewide = crawl ? [{ title: `Full-site crawl: ${crawl.pagesCrawled} pages evaluated`, status: "verified_public", detail: `DataForSEO crawled up to 50 pages using the site's internal links and sitemap. The crawl found ${crawl.summary?.crawl_status?.pages_with_errors || 0} pages with errors and ${crawl.summary?.crawl_status?.pages_with_warnings || 0} pages with warnings.`, action: "Resolve sitewide errors first, then page-level warnings that affect high-intent journeys." }] : [];
    return [...sitewide, ...(evaluation.categories || []).map((category) => ({ title: `${category.label}: ${category.score}/100`, status: "verified_public", detail: `${category.checks.filter((check) => check.pass).length} of ${category.checks.length} tested homepage checks passed. The report keeps these findings distinct from the full-site crawl and customer analytics.`, action: category.checks.find((check) => !check.pass)?.recommendation || "Maintain the verified controls and monitor changes." }))];
  }
  const organic = firstMetric(collection, "organic"); const paid = firstMetric(collection, "paid");
  const competitors = collection.find((item) => item.endpoint.includes("competitors_domain"));
  const ranked = collection.find((item) => item.endpoint.includes("ranked_keywords"));
  const backlinks = collection.find((item) => item.endpoint.includes("backlinks/summary"));
  const sections = code === "seo-intelligence" ? [
    { title: "Public organic visibility", status: "verified_public", detail: `Estimated traffic: ${Math.round(organic.etv || 0).toLocaleString()}; ranking keywords: ${(organic.count || 0).toLocaleString()}; top-10 presence: ${((organic.pos_1 || 0) + (organic.pos_2_3 || 0) + (organic.pos_4_10 || 0)).toLocaleString()}. No observed footprint is reported as public-market evidence, not missing customer access.`, action: "Compare the highest-value ranking pages and gaps against actual Search Console performance." },
    { title: "Ranking keyword evidence", status: "verified_public", detail: `${ranked?.result?.[0]?.items_count || 0} ranked-keyword records were returned in this collection window.`, action: "Prioritize relevant terms with attainable difficulty and commercial intent." },
    { title: "Search competitors", status: "verified_public", detail: `${competitors?.result?.[0]?.items_count || 0} competing domains were identified from overlapping search visibility.`, action: "Benchmark content coverage, authority, offers, and SERP ownership against the strongest relevant competitors." },
    { title: "Backlink authority", status: "verified_public", detail: backlinks ? "DataForSEO backlink summary evidence was collected for the domain and its subdomains." : "The backlink source did not return usable evidence during this run.", action: "Review referring-domain quality and prioritize credible, relevant authority opportunities." },
  ] : [
    { title: "Public paid-search footprint", status: "verified_public", detail: `Estimated paid traffic: ${Math.round(paid.etv || 0).toLocaleString()}; paid ranking keywords: ${(paid.count || 0).toLocaleString()}. This public estimate cannot replace the customer's Google Ads ledger.`, action: "Reconcile public competitor pressure with actual spend, terms, conversions, and cost per result." },
    { title: "Paid keyword and competitor evidence", status: "verified_public", detail: `${ranked?.result?.[0]?.items_count || 0} keyword records and ${competitors?.result?.[0]?.items_count || 0} competitor records were available for public benchmarking.`, action: "Use verified account search terms to separate demand, waste, and expansion opportunities." },
  ];
  return sections;
}

function actionPlan(code) {
  const focus = code === "seo-intelligence" ? "organic visibility" : code === "ppc-intelligence" ? "paid efficiency" : "website conversion";
  return [30,60,90,120].map((day, index) => ({ day, action: [
    `Connect required owner accounts, validate measurement, and resolve the highest-risk ${focus} blockers.`,
    `Implement the first prioritized improvements and establish a verified performance baseline.`,
    `Compare movement against the baseline, expand winning areas, and correct weak signals.`,
    `Complete the reevaluation, document outcomes, and set the next-quarter optimization plan.`,
  ][index] }));
}

async function buildReport(code, website, connectedData = {}) {
  const catalog = REPORT_CATALOG_BY_CODE[code];
  let publicData = []; let evaluation = null; let crawl = null;
  if (code === "website-conversion") [evaluation, crawl] = await Promise.all([inspectPage(website.url).then((inspection) => buildBasicEvaluation(website.url, inspection, website)), crawlSite(website.url, 50)]);
  else publicData = await collectAdvancedPublicData({ reportCode: code, website: website.url, businessName: website.businessName });
  const sections = [...publicSections(code, publicData, evaluation, crawl), ...pendingSections(code, connectedData)];
  const generatedAt = new Date().toISOString();
  const templateData = code === "seo-intelligence" ? buildSeoTemplateData({ website: website.url, businessName: website.businessName, generatedAt, collection: publicData }) : code === "ppc-intelligence" ? buildPpcTemplateData({ website: website.url, businessName: website.businessName, generatedAt, collection: publicData }) : buildWebsiteTemplateData({ website: website.url, businessName: website.businessName, generatedAt, crawl });
  return { reportType: code, templateVersion: REPORT_TEMPLATE_VERSION, title: catalog.name, businessName: website.businessName, website: website.url, generatedAt, summary: `This ${catalog.name} follows the ${REPORT_TEMPLATE_VERSION} data contract and combines current public evidence with explicit customer-data boundaries. ${sections.filter((item) => item.status === "pending_access").length} customer-owned source section(s) remain pending access and are not interpreted as poor performance.`, sections, actionPlan: actionPlan(code), sources: [REPORT_TEMPLATE_VERSION, "DataForSEO API v3", ...(code === "website-conversion" ? ["Live website inspection"] : []), ...required[code].map(([name]) => `${name} - pending access`)], templateData };
}

export async function generateOrderReports(order, { force = false, connectedData = {} } = {}) {
  const existing = await findReportsByOrder(order.id);
  const completedTypes = force ? new Set() : new Set(existing.filter((report) => report.status === "complete").map((report) => report.reportType));
  const website = await getWebsite(order.websiteId);
  if (!website || website.uid !== order.uid) throw new Error("The purchased website could not be found.");
  await updateOrder(order.id, { generationStatus: "generating", generationStartedAt: new Date() });
  const generated = [];
  const generatedContents = [];
  const failures = [];
  let customerEmail = order.customerEmail || order.email || "";
  if (!customerEmail && order.uid) {
    try { customerEmail = (await adminAuth().getUser(order.uid)).email || ""; } catch { /* The report remains available in the portal if identity lookup is unavailable. */ }
  }
  async function notifyCustomer(content, pdf, reportId) {
    if (!customerEmail) return { sent: false, reason: "customer_email_unavailable" };
    const from = process.env.SIS_FROM_EMAIL || "Sentinels Design Lab <reports@sentinelsdesignlab.com>";
    const admin = process.env.SIS_NOTIFICATION_EMAIL || "reports@sentinelsdesignlab.com";
    const schedule = schedulingUrl({ reportId, email: customerEmail });
    return sendMail({
      from,
      to: customerEmail,
      cc: admin,
      replyTo: admin,
      subject: `${content.businessName} - ${content.title} is ready`,
      html: `<div style="font-family:Arial,sans-serif;color:#172033;line-height:1.6"><h2 style="color:#0b1220">Your ${content.title} is ready</h2><p>Your report for <strong>${content.businessName}</strong> has finished generating and is attached to this email.</p><p><a href="${schedule}" style="display:inline-block;background:#2f76f6;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Schedule a 30-minute review</a></p><p style="color:#64748b;font-size:13px">Use the scheduling link to select an available Google Meet time. If calendar booking is temporarily unavailable, reply to this email and we will arrange a time directly.</p></div>`,
      attachments: [{ filename: `${content.businessName}-${content.title}.pdf`.replace(/[^a-z0-9.]+/gi, "-"), content: Buffer.from(pdf), contentType: "application/pdf" }],
    });
  }
  try {
    for (const code of order.selectedReports || []) {
      if (completedTypes.has(code)) continue;
      let content;
      try { content = await buildReport(code, website, connectedData); }
      catch (error) {
        content = { reportType: code, title: REPORT_CATALOG_BY_CODE[code].name, businessName: website.businessName, website: website.url, generatedAt: new Date().toISOString(), summary: "The report artifact was generated, but one or more public-data providers did not complete during this run. Missing evidence is disclosed and is not scored as poor performance.", sections: [{ title: "Public intelligence collection", status: "source_unavailable", detail: `The public-data collection did not complete: ${error.message}`, action: "The report can be regenerated without an additional purchase." }, ...pendingSections(code, connectedData)], actionPlan: actionPlan(code), sources: ["DataForSEO API v3 - collection incomplete", ...required[code].map(([name]) => `${name} - pending access`)] };
        failures.push(`${code}: ${error.message}`);
      }
      const reportId = await createReport(order.uid, { orderId: order.id, websiteId: website.id, reportType: code, title: `${website.businessName} - ${content.title}${force ? " Reevaluation" : ""}`, status: "generating", reevaluation: force, findings: { summary: content.summary, pendingAccess: content.sections.some((item) => item.status === "pending_access") } });
      try {
        const pdf = generateAdvancedReportPdf(content);
        const storagePath = await storeReportPdf({ uid: order.uid, reportId, pdf });
        const delivery = await notifyCustomer(content, pdf, reportId);
        await updateReport(reportId, { storagePath, status: "complete", completedAt: new Date(), deliveryStatus: delivery.sent ? "emailed" : "portal_only", deliveryReason: delivery.reason || null }); generated.push(reportId); generatedContents.push({ code, content });
        if (!delivery.sent) failures.push(`${code} email: ${delivery.reason || "not sent"}`);
      } catch (error) { await updateReport(reportId, { status: "failed", error: error.message }); failures.push(`${code} PDF: ${error.message}`); }
    }
    if ((order.selectedReports || []).length > 1 && !completedTypes.has("executive-rollup")) {
      const content = { reportType: "executive-rollup", title: "Complete Growth Intelligence Executive Rollup", businessName: website.businessName, website: website.url, generatedAt: new Date().toISOString(), summary: "This executive rollup contains the complete SEO, PPC, and website-conversion evidence in one report while preserving every source limitation and pending-access requirement.", sections: generatedContents.flatMap(({ code, content }) => [{ title: REPORT_CATALOG_BY_CODE[code].name, status: "included", detail: content.summary, action: `See the detailed ${REPORT_CATALOG_BY_CODE[code].name} findings below.` }, ...(content.sections || []).map((item) => ({ ...item, title: `${REPORT_CATALOG_BY_CODE[code].name}: ${item.title}` }))]), actionPlan: actionPlan("website-conversion"), sources: ["SEO Intelligence PDF", "PPC Intelligence PDF", "Website & Conversion Deep Dive PDF"], templateData: { client: { name: website.businessName, url: website.url, generatedAt: new Date().toISOString() }, scores: { overall: 0, seo: 0, ppc: 0, website: 0 }, narrative: "Combined report generated from the underlying approved report data objects.", topPriority: { title: "Connect customer-owned data sources", body: "Google and Meta-dependent evidence is currently unavailable until the customer authorizes the appropriate accounts." }, connections: [], priorities: [], seoSnapshot: {}, ppcSnapshot: {}, websiteSnapshot: {}, plan: actionPlan("website-conversion"), sources: "DataForSEO API v3 • Google and Meta customer sources currently unavailable" } };
      const reportId = await createReport(order.uid, { orderId: order.id, websiteId: website.id, reportType: "executive-rollup", title: `${website.businessName} - ${content.title}`, status: "generating", findings: { summary: content.summary } });
      const pdf = generateAdvancedReportPdf(content);
      const storagePath = await storeReportPdf({ uid: order.uid, reportId, pdf });
      const delivery = await notifyCustomer(content, pdf, reportId);
      await updateReport(reportId, { storagePath, status: "complete", completedAt: new Date(), deliveryStatus: delivery.sent ? "emailed" : "portal_only", deliveryReason: delivery.reason || null }); generated.push(reportId);
      if (!delivery.sent) failures.push(`executive-rollup email: ${delivery.reason || "not sent"}`);
    }
    await updateOrder(order.id, { generationStatus: failures.length ? "complete_with_warnings" : "complete", generatedReportIds: generated, generationWarnings: failures, generationCompletedAt: new Date() });
    return generated;
  } catch (error) { await updateOrder(order.id, { generationStatus: "failed", generationError: error.message }); throw error; }
}


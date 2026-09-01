const API_BASE = "https://api.dataforseo.com/v3";

function credentials() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    throw new Error("DataForSEO credentials are not configured.");
  }

  return Buffer.from(`${login}:${password}`).toString("base64");
}

export async function inspectPage(url) {
  const response = await fetch(`${API_BASE}/on_page/instant_pages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        url,
        enable_javascript: true,
        load_resources: true,
        check_spell: true,
      },
    ]),
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload.status_code !== 20000 || payload.tasks_error) {
    throw new Error(payload.status_message || "DataForSEO could not inspect this website.");
  }

  const task = payload.tasks?.[0];
  if (!task || task.status_code !== 20000) {
    throw new Error(task?.status_message || "The website inspection did not complete.");
  }

  return { task, cost: Number(task.cost || payload.cost || 0) };
}

export function buildBasicEvaluation(url, inspection) {
  const taskResult = inspection.task.result?.[0] || {};
  const page = taskResult.items?.[0] || taskResult;
  const checks = page.checks || {};
  const meta = page.meta || {};
  const timing = page.page_timing || {};
  const brokenLinks = Number(page.broken_links || 0);

  const positives = [
    [!checks.no_title && Boolean(meta.title), "Page title is present"],
    [!checks.no_description && Boolean(meta.description), "Meta description is present"],
    [!checks.no_h1_tag, "Primary heading is present"],
    [!checks.is_http, "HTTPS is active"],
    [brokenLinks === 0, "No broken links found on the inspected page"],
  ].filter(([ok]) => ok).map(([, label]) => label);

  const priorities = [
    [checks.no_title || !meta.title, "Add a clear, keyword-relevant page title."],
    [checks.no_description || !meta.description, "Add a persuasive meta description."],
    [checks.no_h1_tag, "Add one clear H1 heading that states the primary offer."],
    [checks.is_http, "Redirect all traffic to HTTPS."],
    [brokenLinks > 0, `Repair ${brokenLinks} broken link${brokenLinks === 1 ? "" : "s"}.`],
    [checks.large_page_size, "Reduce page weight to improve mobile speed."],
    [checks.is_redirect, "Review the homepage redirect path for unnecessary hops."],
  ].filter(([flag]) => flag).map(([, label]) => label).slice(0, 5);

  const rawScore = Number(page.onpage_score ?? taskResult.onpage_score ?? 0);
  const score = rawScore > 0 ? Math.round(rawScore) : Math.min(100, 45 + positives.length * 10 - priorities.length * 5);

  return {
    url,
    generatedAt: new Date().toISOString(),
    score: Math.max(0, Math.min(100, score)),
    verdict: score >= 80 ? "Strong foundation" : score >= 60 ? "Good foundation with clear opportunities" : "Immediate improvements recommended",
    highlights: positives.slice(0, 5),
    priorities: priorities.length ? priorities : ["Run the complete SIS report series to identify deeper competitive and growth opportunities."],
    metrics: {
      statusCode: page.status_code ?? null,
      pageSizeKb: page.size ? Math.round(Number(page.size) / 1024) : null,
      loadTimeMs: timing.time_to_interactive ? Math.round(Number(timing.time_to_interactive)) : null,
      brokenLinks,
    },
  };
}

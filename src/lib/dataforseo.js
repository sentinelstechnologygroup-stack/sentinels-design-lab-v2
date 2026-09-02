const API_BASE = "https://api.dataforseo.com/v3";

function credentials() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("DataForSEO credentials are not configured.");
  return Buffer.from(`${login}:${password}`).toString("base64");
}

export async function inspectPage(url) {
  const customJs = `result={};links=Array.from(document.querySelectorAll('a'));buttons=Array.from(document.querySelectorAll('button'));text=(document.body&&document.body.innerText)||'';result.forms=document.forms.length;result.tel_links=links.filter(function(el){return (el.getAttribute('href')||'').indexOf('tel:')===0;}).length;result.mailto_links=links.filter(function(el){return (el.getAttribute('href')||'').indexOf('mailto:')===0;}).length;result.ctas=Array.from(document.querySelectorAll('a,button')).filter(function(el){return /contact|quote|book|call|estimate|get started|schedule|consult/i.test(el.innerText||'');}).length;result.dead_controls=Array.from(document.querySelectorAll('a,button')).filter(function(el){href=el.getAttribute('href');return (el.tagName==='A'&&(!href||href==='#'||/^javascript:/i.test(href)))||(el.tagName==='BUTTON'&&el.disabled);}).slice(0,10).map(function(el){return (el.innerText||el.getAttribute('aria-label')||el.outerHTML).trim().slice(0,120);});result.images_without_alt=Array.from(document.images).filter(function(img){return !img.alt;}).length;result.has_viewport=Boolean(document.querySelector('meta[name="viewport"]'));result.mixed_content=Array.from(document.querySelectorAll('[src],[href]')).filter(function(el){value=el.getAttribute('src')||el.getAttribute('href')||'';return location.protocol==='https:'&&/^http:\/\//i.test(value);}).slice(0,10).map(function(el){return el.getAttribute('src')||el.getAttribute('href');});result.insecure_forms=Array.from(document.forms).filter(function(form){action=form.action||location.href;return location.protocol==='https:'&&/^http:\/\//i.test(action);}).map(function(form){return form.action;});result.privacy_links=links.filter(function(el){return /privacy/i.test((el.innerText||'')+' '+(el.href||''));}).length;result.terms_links=links.filter(function(el){return /terms|conditions/i.test((el.innerText||'')+' '+(el.href||''));}).length;result.expired_timer=Array.from(document.querySelectorAll('[class*="countdown"],[id*="countdown"],[class*="timer"],[id*="timer"]')).filter(function(el){return /(^|\D)0{1,2}\s*:\s*0{1,2}(\s*:\s*0{1,2})?(\D|$)|expired|ended/i.test(el.innerText||'');}).slice(0,5).map(function(el){return (el.innerText||'').trim().slice(0,160);});result.promo_text=(text.match(/.{0,70}(sale ends|offer ends|limited time|ends on|expires|promotion).{0,100}/ig)||[]).slice(0,5);years=text.match(/\b20\d{2}\b/g)||[];result.oldest_visible_year=years.length?Math.min.apply(null,years.map(Number)):null;result.has_current_year=years.indexOf(String(new Date().getFullYear()))>=0;result;`;
  const freshnessJs = String.raw`result.expired_timer=Array.from(document.querySelectorAll('[class*="countdown"],[id*="countdown"],[class*="timer"],[id*="timer"]')).filter(function(el){return /(^|\D)0{1,2}\s*:\s*0{1,2}(\s*:\s*0{1,2})?(\D|$)|expired|ended/i.test(el.innerText||'');}).slice(0,5).map(function(el){return (el.innerText||'').trim().slice(0,160);});years=text.match(/\b20\d{2}\b/g)||[];result.oldest_visible_year=years.length?Math.min.apply(null,years.map(Number)):null;result.has_current_year=years.indexOf(String(new Date().getFullYear()))>=0;`;
  const finalCustomJs = customJs.replace(/result;$/, `${freshnessJs}result;`);
  const safeCustomJs = `r={};a=Array.from(document.querySelectorAll('a'));q=Array.from(document.querySelectorAll('a,button'));r.forms=document.forms.length;r.tel_links=a.filter(x=>(x.getAttribute('href')||'').startsWith('tel:')).length;r.mailto_links=a.filter(x=>(x.getAttribute('href')||'').startsWith('mailto:')).length;r.ctas=q.filter(x=>/contact|quote|book|call|estimate|get started|schedule|consult/i.test(x.innerText||'')).length;r.dead_controls=q.filter(x=>x.tagName==='A'&&(!x.getAttribute('href')||x.getAttribute('href')==='#')||x.tagName==='BUTTON'&&x.disabled).slice(0,10).map(x=>(x.innerText||x.outerHTML).trim().slice(0,120));r.images_without_alt=Array.from(document.images).filter(x=>!x.alt).length;r.has_viewport=!!document.querySelector('meta[name="viewport"]');r.privacy_links=a.filter(x=>/privacy/i.test((x.innerText||'')+(x.href||''))).length;r.terms_links=a.filter(x=>/terms|conditions/i.test((x.innerText||'')+(x.href||''))).length;r;`;
  const response = await fetch(`${API_BASE}/on_page/instant_pages`, {
    method: "POST",
    headers: { Authorization: `Basic ${credentials()}`, "Content-Type": "application/json" },
    body: JSON.stringify([{ url, enable_javascript: true, load_resources: true, check_spell: true, custom_js: safeCustomJs }]),
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok || payload.status_code !== 20000) throw new Error(payload.status_message || "DataForSEO could not inspect this website.");
  const task = payload.tasks?.[0];
  if (!task || task.status_code !== 20000) throw new Error(task?.status_message || "The website inspection did not complete.");
  return { task, cost: Number(task.cost || payload.cost || 0), visibleSignals: await inspectVisibleSignals(url) };
}

async function inspectVisibleSignals(url) {
  try {
    const response = await fetch(url, { redirect: "follow", cache: "no-store", signal: AbortSignal.timeout(12000), headers: { "User-Agent": "SentinelsDesignLab-SIS/1.0" } });
    const html = await response.text();
    const plain = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const years = plain.match(/\b20\d{2}\b/g)?.map(Number) || [];
    const assets = [...html.matchAll(/(?:src|href)=["'](http:\/\/[^"']+)["']/gi)].map((match) => match[1]);
    const forms = [...html.matchAll(/<form\b[^>]*action=["'](http:\/\/[^"']+)["']/gi)].map((match) => match[1]);
    const timers = [...html.matchAll(/<(?:[^>]+)(?:class|id)=["'][^"']*(?:countdown|timer)[^"']*["'][^>]*>([\s\S]{0,300}?)<\//gi)].map((match) => match[1].replace(/<[^>]+>/g, " ").trim()).filter((text) => /expired|ended|(^|\D)0{1,2}\s*:\s*0{1,2}/i.test(text));
    return {
      mixed_content: url.startsWith("https:") ? assets.slice(0, 10) : [], insecure_forms: url.startsWith("https:") ? forms.slice(0, 10) : [],
      expired_timer: timers.slice(0, 5), promo_text: (plain.match(/.{0,70}(?:sale ends|offer ends|limited time|ends on|expires|promotion).{0,100}/ig) || []).slice(0, 5),
      oldest_visible_year: years.length ? Math.min(...years) : null, has_current_year: years.includes(new Date().getFullYear()),
      security_headers: { contentSecurityPolicy: response.headers.has("content-security-policy"), frameProtection: response.headers.has("x-frame-options") || response.headers.get("content-security-policy")?.includes("frame-ancestors"), strictTransportSecurity: response.headers.has("strict-transport-security") },
    };
  } catch { return {}; }
}

function scoreChecks(checks) {
  return Math.round((checks.filter((item) => item.pass).length / Math.max(1, checks.length)) * 100);
}

export function buildBasicEvaluation(url, inspection, business = {}) {
  const taskResult = inspection.task.result?.[0] || {};
  const page = taskResult.items?.[0] || taskResult;
  const checks = page.checks || {};
  const meta = page.meta || {};
  const content = meta.content || {};
  const timing = page.page_timing || {};
  let custom = page.custom_js_response || {};
  if (typeof custom === "string") {
    try { custom = JSON.parse(custom); } catch { custom = {}; }
  }
  custom = { ...(inspection.visibleSignals || {}), ...custom };
  const brokenLinks = Number(page.broken_links || 0);
  const wordCount = Math.round(Number(content.plain_text_word_count || 0));
  const pageSizeKb = page.size ? Math.round(Number(page.size) / 1024) : null;
  const loadTimeMs = Number(timing.duration_time || timing.time_to_interactive || 0);

  const observedAt = new Date().toISOString();
  const evidence = (value, fallback) => Array.isArray(value) && value.length ? value.join("; ") : fallback;
  const check = (pass, label, details = {}) => ({
    pass,
    status: pass ? "Passed" : "Failed",
    label,
    pageUrl: url,
    observedAt,
    ...details,
  });
  const categories = [
    { key: "technical", label: "Technical Health", checks: [
      check(!checks.is_broken && !checks.is_4xx_code && !checks.is_5xx_code, "Homepage responds successfully", { evidence: `Observed HTTP status: ${page.status_code ?? "available"}.`, reproduce: `Open ${url} in a private browser window.` }),
      check(!checks.high_loading_time, "Homepage load time is within the tested threshold", { evidence: loadTimeMs ? `Measured load duration: ${loadTimeMs} ms.` : "No high-loading-time flag was returned.", reproduce: `Open ${url} and observe whether the primary content becomes usable promptly.` }),
      check(custom.has_viewport !== false, "Mobile viewport is configured", { evidence: custom.has_viewport === false ? "No mobile viewport declaration was detected." : "A mobile viewport declaration was detected.", reproduce: `Open ${url} on a phone or resize the browser window.` }),
    ] },
    { key: "functionality", label: "Links & Functionality", checks: [
      check(brokenLinks === 0, "No broken destinations detected from the tested homepage", { failTitle: "Broken destinations detected from the tested homepage", evidence: brokenLinks ? `${brokenLinks} broken destination${brokenLinks === 1 ? "" : "s"} detected.` : "No broken destination was returned for the tested homepage.", reproduce: `Open ${url} and test its visible navigation and action links. Full-site verification requires a crawl.` }),
      check(Number(custom.dead_controls?.length || 0) === 0, "No visibly dead links or disabled controls detected", { failTitle: "Dead links or disabled controls detected", evidence: evidence(custom.dead_controls, "No empty, placeholder, JavaScript-only, or disabled control was detected."), reproduce: `On ${url}, select the named control and confirm it completes the promised action.` }),
      check(Number(custom.images_without_alt || 0) === 0, "All tested images have descriptions", { evidence: `${Number(custom.images_without_alt || 0)} image${Number(custom.images_without_alt || 0) === 1 ? "" : "s"} without alt text detected.`, reproduce: `Inspect images on ${url}; decorative images may intentionally use empty alt text and should be manually confirmed.` }),
    ] },
    { key: "security", label: "Security & Risk", checks: [
      check(checks.is_https === true || !checks.is_http, "HTTPS is active on the tested page", { evidence: `Tested address: ${url}`, reproduce: `Open ${url} and confirm the browser shows an HTTPS connection without a certificate warning.` }),
      check(Number(custom.mixed_content?.length || 0) === 0, "No visibly insecure resources detected", { failTitle: "Insecure resources detected on the HTTPS page", evidence: evidence(custom.mixed_content, "No HTTP resource was detected on the tested HTTPS page."), reproduce: `Open the browser security or developer console on ${url} and look for mixed-content warnings.` }),
      check(Number(custom.insecure_forms?.length || 0) === 0, "No visibly insecure form destination detected", { failTitle: "Insecure form destination detected", evidence: evidence(custom.insecure_forms, "No HTTPS form posting to an HTTP destination was detected."), reproduce: `Inspect each form on ${url} and confirm its submission destination uses HTTPS.` }),
    ] },
    { key: "search", label: "Search Foundation", checks: [
      check(Boolean(meta.title) && !checks.no_title, "Page title present"),
      check(Boolean(meta.description) && !checks.no_description, "Meta description present"),
      check(!checks.no_h1_tag, "Primary heading present"),
      check(checks.canonical === true || !checks.no_canonical, "Canonical signal present"),
      check(!checks.no_doctype, "Valid document foundation"),
    ] },
    { key: "freshness", label: "Content Accuracy & Freshness", checks: [
      check(wordCount === 0 || wordCount >= 300, "Homepage provides useful content depth", { evidence: wordCount ? `${wordCount} visible words detected.` : "A reliable visible word count was not returned.", reproduce: `Review ${url} and confirm it clearly explains the business, services, and next step.` }),
      check(Number(custom.expired_timer?.length || 0) === 0, "No expired or zeroed timer detected", { failTitle: "Expired or zeroed timer detected", evidence: evidence(custom.expired_timer, "No visibly expired countdown element was detected."), reproduce: `Review promotional and countdown elements on ${url}.` }),
      check(Number(custom.promo_text?.length || 0) === 0, "No promotion requiring a date review detected", { failTitle: "Time-sensitive promotion needs a date review", status: Number(custom.promo_text?.length || 0) === 0 ? "Passed" : "Warning", evidence: evidence(custom.promo_text, "No time-sensitive promotional language was detected."), reproduce: `Check the quoted promotion on ${url} and confirm it is still current.` }),
      check(custom.oldest_visible_year == null || custom.has_current_year || custom.oldest_visible_year >= new Date().getFullYear() - 1, "Visible dates do not appear obviously outdated", { failTitle: "A visible date may be outdated", status: custom.oldest_visible_year == null || custom.has_current_year || custom.oldest_visible_year >= new Date().getFullYear() - 1 ? "Passed" : "Warning", evidence: custom.oldest_visible_year ? `Oldest visible four-digit year detected: ${custom.oldest_visible_year}.` : "No four-digit year requiring review was detected.", reproduce: `Search the visible text on ${url} for old dates, events, promotions, and copyright notices.` }),
    ] },
    { key: "conversion", label: "Conversion Path", checks: [
      check(Number(custom.ctas || 0) > 0, "Clear action prompts"),
      check(Number(custom.forms || 0) > 0, "Lead form detected"),
      check(Number(custom.tel_links || 0) > 0, "Tap-to-call available"),
      check(Number(custom.mailto_links || 0) > 0, "Direct email path"),
    ] },
    { key: "trust", label: "Trust & Compliance", checks: [
      check(!checks.has_micromarkup_errors, "Structured data has no detected errors"),
      check(Number(custom.privacy_links || 0) > 0, "Privacy information is visibly linked", { evidence: Number(custom.privacy_links || 0) > 0 ? "A privacy link was detected." : "No visible privacy link was detected on the tested page.", reproduce: `Check the header and footer of ${url} for a working privacy link.` }),
      check(Number(custom.terms_links || 0) > 0, "Terms or conditions are visibly linked", { evidence: Number(custom.terms_links || 0) > 0 ? "A terms or conditions link was detected." : "No visible terms or conditions link was detected on the tested page.", reproduce: `Check the header and footer of ${url} for working terms or conditions.` }),
    ] },
  ].map((category) => ({ ...category, score: scoreChecks(category.checks) }));

  const failed = categories.flatMap((category) => category.checks.filter((item) => !item.pass).map((item) => ({ ...item, category: category.label, title: item.label, displayTitle: item.failTitle || item.label })));
  const recommendations = {
    "Lead form detected": "Add a short, low-friction form near the primary call to action.",
    "Tap-to-call available": "Make the business phone number clickable on mobile devices.",
    "Direct email path": "Add a visible direct-contact option for visitors who are not ready to complete a form.",
    "Useful homepage depth": "Expand the homepage copy so visitors and search engines can clearly understand the offer.",
    "Image descriptions present": "Add descriptive alt text to every meaningful image.",
    "Clear action prompts": "Use one clear next-step call to action throughout the page.",
  };
  const priorityOrder = {
    "No broken destinations detected from the tested homepage": 0,
    "No visibly dead links or disabled controls detected": 1,
    "No visibly insecure resources detected": 2,
    "No visibly insecure form destination detected": 3,
    "No expired or zeroed timer detected": 4,
    "No promotion requiring a date review detected": 5,
    "Visible dates do not appear obviously outdated": 6,
  };
  const priorities = failed
    .sort((a, b) => (priorityOrder[a.title] ?? 20) - (priorityOrder[b.title] ?? 20))
    .slice(0, 5)
    .map((item) => ({ ...item, originalTitle: item.title, title: item.displayTitle, recommendation: recommendations[item.title] || `Review the ${item.displayTitle.toLowerCase()} finding, correct it if confirmed, and retest the exact page.` }));
  const strengths = categories.flatMap((category) => category.checks.filter((item) => item.pass).map((item) => ({ ...item, category: category.label, title: item.label }))).slice(0, 5);
  const overall = Math.round(categories.reduce((sum, item) => sum + item.score, 0) / categories.length);
  const unverifiedDimensions = [
    { key: "rankings", label: "Keyword Rankings", status: "Not measured", reason: "Requires keyword and market-level search data." },
    { key: "traffic", label: "Organic Traffic", status: "Not verified", reason: "Requires Search Console or Analytics access." },
    { key: "authority", label: "Backlinks & Authority", status: "Not measured", reason: "Requires backlink and competitor analysis." },
    { key: "local", label: "Local / Google Profile", status: "Not verified", reason: "Requires business-profile and local search analysis." },
    { key: "paid", label: "Paid Search / PPC", status: "Not measured", reason: "Requires advertising and keyword-market data." },
    { key: "outcomes", label: "Leads & Conversions", status: "Not verified", reason: "A visible form does not prove that it generates leads." },
  ];

  return {
    url,
    businessName: business.businessName || new URL(url).hostname,
    contactName: business.name || "",
    generatedAt: new Date().toISOString(),
    score: overall,
    scoreLabel: "Homepage readiness average",
    verdict: "Technical readiness does not prove search visibility or traffic",
    categories,
    unverifiedDimensions,
    strengths,
    priorities: priorities.length ? priorities : [{ category: "Growth", title: "Competitive visibility", recommendation: "Continue with the complete SIS series to benchmark rankings, competitors, local presence, reputation, and conversion opportunities." }],
    metrics: { statusCode: page.status_code ?? null, pageSizeKb, loadTimeMs: loadTimeMs || null, brokenLinks, wordCount },
    scopeNote: "This free snapshot reviews one public page and its visible controls at the recorded time. It is not a full-site crawl, accessibility audit, compliance opinion, or security penetration test. Rankings, traffic, backlinks, competitors, local visibility, paid media, and conversions remain unverified until the appropriate data sources are analyzed.",
  };
}

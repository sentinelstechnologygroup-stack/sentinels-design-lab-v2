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
    const parsed = new URL(url);
    const requestedHost = parsed.hostname.replace(/^www\./i, "");
    const request = (target, redirect = "follow") => fetch(target, { redirect, cache: "no-store", signal: AbortSignal.timeout(12000), headers: { "User-Agent": "SentinelsDesignLab-SIS/1.0" } });
    const response = await request(url);
    const html = await response.text();
    const plain = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const years = plain.match(/\b20\d{2}\b/g)?.map(Number) || [];
    const assets = [...html.matchAll(/(?:src|href)=["'](http:\/\/[^"']+)["']/gi)].map((match) => match[1]);
    const forms = [...html.matchAll(/<form\b[^>]*action=["'](http:\/\/[^"']+)["']/gi)].map((match) => match[1]);
    const timers = [...html.matchAll(/<(?:[^>]+)(?:class|id)=["'][^"']*(?:countdown|timer)[^"']*["'][^>]*>([\s\S]{0,300}?)<\//gi)].map((match) => match[1].replace(/<[^>]+>/g, " ").trim()).filter((text) => /expired|ended|(^|\D)0{1,2}\s*:\s*0{1,2}/i.test(text));
    const matchContent = (pattern) => html.match(pattern)?.[1]?.replace(/&amp;/gi, "&").trim() || "";
    const canonical = matchContent(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/i) || matchContent(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i);
    const title = matchContent(/<title[^>]*>([\s\S]*?)<\/title>/i).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const description = matchContent(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || matchContent(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    const variantUrls = [`http://${requestedHost}/`, `http://www.${requestedHost}/`, `https://${requestedHost}/`, `https://www.${requestedHost}/`];
    const variants = await Promise.all(variantUrls.map(async (target) => {
      try {
        const result = await request(target);
        return { requested: target, final: result.url, status: result.status };
      } catch { return { requested: target, final: null, status: null }; }
    }));
    const canonicalFinal = new URL(response.url).hostname.replace(/^www\./i, "");
    const httpSecure = variants.filter((item) => item.requested.startsWith("http://") && item.final).every((item) => item.final.startsWith("https://"));
    const hostConsolidated = variants.filter((item) => item.final).every((item) => new URL(item.final).hostname.replace(/^www\./i, "") === canonicalFinal && new URL(item.final).hostname === new URL(response.url).hostname);
    const policyCandidates = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>[\s\S]{0,180}?<\/a>/gi)]
      .filter((match) => /privacy|terms|conditions/i.test(match[0]))
      .map((match) => { try { return new URL(match[1], response.url).toString(); } catch { return null; } }).filter(Boolean).slice(0, 6);
    const policies = await Promise.all(policyCandidates.map(async (target) => { try { const result = await request(target); return { url: target, status: result.status, final: result.url }; } catch { return { url: target, status: null, final: null }; } }));
    return {
      mixed_content: url.startsWith("https:") ? assets.slice(0, 10) : [], insecure_forms: url.startsWith("https:") ? forms.slice(0, 10) : [],
      expired_timer: timers.slice(0, 5), promo_text: (plain.match(/.{0,70}(?:sale ends|offer ends|limited time|ends on|expires|promotion).{0,100}/ig) || []).slice(0, 5),
      oldest_visible_year: years.length ? Math.min(...years) : null, has_current_year: years.includes(new Date().getFullYear()),
      canonical, titleLength: title.length, descriptionLength: description.length,
      schemaBlocks: (html.match(/<script\b[^>]*type=["']application\/ld\+json["']/gi) || []).length,
      httpRedirectsToHttps: httpSecure, hostConsolidated, variants,
      policyLinksWork: policies.length > 0 && policies.every((item) => item.status >= 200 && item.status < 400), policies,
      security_headers: {
        contentSecurityPolicy: response.headers.has("content-security-policy"),
        frameProtection: response.headers.has("x-frame-options") || response.headers.get("content-security-policy")?.includes("frame-ancestors"),
        strictTransportSecurity: response.headers.has("strict-transport-security"),
        contentTypeProtection: response.headers.get("x-content-type-options")?.toLowerCase() === "nosniff",
        referrerPolicy: response.headers.has("referrer-policy"),
      },
    };
  } catch { return {}; }
}

function scoreChecks(checks) {
  const earned = checks.reduce((sum, item) => sum + (item.pass ? (item.weight || 1) : 0), 0);
  const possible = checks.reduce((sum, item) => sum + (item.weight || 1), 0);
  return Math.round((earned / Math.max(1, possible)) * 100);
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
      check(!checks.is_broken && !checks.is_4xx_code && !checks.is_5xx_code, "Homepage responds successfully", { weight: 2, evidence: `Observed HTTP status: ${page.status_code ?? "available"}.`, reproduce: `Open ${url} in a private browser window.` }),
      check(!checks.high_loading_time, "Homepage load time is within the tested threshold", { failTitle: "Homepage load time exceeded the tested threshold", evidence: loadTimeMs ? `Measured load duration: ${loadTimeMs} ms.` : "A high-loading-time flag was returned.", reproduce: `Open ${url} and observe whether the primary content becomes usable promptly.` }),
      check(custom.has_viewport !== false, "Mobile viewport is configured", { evidence: custom.has_viewport === false ? "No mobile viewport declaration was detected." : "A mobile viewport declaration was detected.", reproduce: `Open ${url} on a phone or resize the browser window.` }),
      check(custom.hostConsolidated === true, "WWW and non-WWW addresses resolve to one preferred host", { failTitle: "Website host versions are not consolidated", evidence: custom.hostConsolidated === true ? "The tested host variants resolve to one preferred hostname." : "WWW and non-WWW variants did not all resolve to one preferred hostname.", reproduce: `Open both the www and non-www versions and compare the final browser address.` }),
    ] },
    { key: "functionality", label: "Links & Functionality", checks: [
      check(brokenLinks === 0, "No broken destinations detected from the tested homepage", { failTitle: "Broken destinations detected from the tested homepage", evidence: brokenLinks ? `${brokenLinks} broken destination${brokenLinks === 1 ? "" : "s"} detected.` : "No broken destination was returned for the tested homepage.", reproduce: `Open ${url} and test its visible navigation and action links. Full-site verification requires a crawl.` }),
      check(Number(custom.dead_controls?.length || 0) === 0, "No visibly dead links or disabled controls detected", { failTitle: "Dead links or disabled controls detected", evidence: evidence(custom.dead_controls, "No empty, placeholder, JavaScript-only, or disabled control was detected."), reproduce: `On ${url}, select the named control and confirm it completes the promised action.` }),
      check(Number(custom.images_without_alt || 0) === 0, "All tested images have descriptions", { evidence: `${Number(custom.images_without_alt || 0)} image${Number(custom.images_without_alt || 0) === 1 ? "" : "s"} without alt text detected.`, reproduce: `Inspect images on ${url}; decorative images may intentionally use empty alt text and should be manually confirmed.` }),
    ] },
    { key: "security", label: "Security & Risk", checks: [
      check(new URL(url).protocol === "https:" && checks.is_https !== false, "HTTPS is active on the tested page", { weight: 2, evidence: `Tested address: ${url}`, reproduce: `Open ${url} and confirm the browser shows an HTTPS connection without a certificate warning.` }),
      check(custom.httpRedirectsToHttps === true, "HTTP traffic is forced to HTTPS", { weight: 2, failTitle: "Visitors can still reach an unencrypted HTTP version", evidence: custom.httpRedirectsToHttps === true ? "HTTP variants redirected to HTTPS." : "At least one HTTP variant remained accessible without an HTTPS redirect.", reproduce: `Open http://${new URL(url).hostname.replace(/^www\./, "")} and confirm the browser is redirected to HTTPS.` }),
      check(Number(custom.mixed_content?.length || 0) === 0, "No visibly insecure resources detected", { failTitle: "Insecure resources detected on the HTTPS page", evidence: evidence(custom.mixed_content, "No HTTP resource was detected on the tested HTTPS page."), reproduce: `Open the browser security or developer console on ${url} and look for mixed-content warnings.` }),
      check(Number(custom.insecure_forms?.length || 0) === 0, "No visibly insecure form destination detected", { failTitle: "Insecure form destination detected", evidence: evidence(custom.insecure_forms, "No HTTPS form posting to an HTTP destination was detected."), reproduce: `Inspect each form on ${url} and confirm its submission destination uses HTTPS.` }),
      check(custom.security_headers?.strictTransportSecurity === true, "Strict Transport Security is enabled", { failTitle: "Strict Transport Security is not enabled", evidence: "The HSTS response header was not detected.", reproduce: `Inspect the response headers for ${url} and look for Strict-Transport-Security.` }),
      check(custom.security_headers?.contentSecurityPolicy === true, "A Content Security Policy is present", { failTitle: "No Content Security Policy was detected", evidence: "The Content-Security-Policy response header was not detected.", reproduce: `Inspect the response headers for ${url} and look for Content-Security-Policy.` }),
      check(custom.security_headers?.frameProtection === true, "Clickjacking protection is present", { failTitle: "No clickjacking protection was detected", evidence: "Neither X-Frame-Options nor a frame-ancestors policy was detected.", reproduce: `Inspect response headers for X-Frame-Options or CSP frame-ancestors.` }),
      check(custom.security_headers?.contentTypeProtection === true, "Content-type sniffing protection is present", { failTitle: "Content-type sniffing protection was not detected", evidence: "X-Content-Type-Options: nosniff was not detected.", reproduce: `Inspect response headers for X-Content-Type-Options: nosniff.` }),
      check(custom.security_headers?.referrerPolicy === true, "A referrer policy is present", { failTitle: "No referrer policy was detected", evidence: "The Referrer-Policy response header was not detected.", reproduce: `Inspect response headers for Referrer-Policy.` }),
    ] },
    { key: "search", label: "Search Foundation", checks: [
      check(Boolean(meta.title) && !checks.no_title, "Page title present"),
      check(custom.titleLength >= 30 && custom.titleLength <= 65, "Page title length is search-friendly", { failTitle: "Page title length needs attention", evidence: `Detected title length: ${custom.titleLength ?? "unknown"} characters.`, reproduce: "Review the homepage title; a concise, descriptive title is normally easier to display in search results." }),
      check(Boolean(meta.description) && !checks.no_description, "Meta description present"),
      check(custom.descriptionLength >= 70 && custom.descriptionLength <= 170, "Meta description length is search-friendly", { failTitle: "Meta description length needs attention", evidence: `Detected description length: ${custom.descriptionLength ?? "unknown"} characters.`, reproduce: "Review the homepage description for a concise explanation that can display well in search results." }),
      check(!checks.no_h1_tag, "Primary heading present"),
      check(Boolean(custom.canonical) && !checks.no_canonical, "Canonical signal present", { weight: 2, failTitle: "No canonical page address was detected", evidence: custom.canonical ? `Canonical address: ${custom.canonical}` : "No canonical link was found in the homepage HTML.", reproduce: `View the source of ${url} and search for rel=\"canonical\".` }),
      check(Number(custom.schemaBlocks || 0) > 0, "Structured business data is present", { failTitle: "No structured business data was detected", evidence: `${Number(custom.schemaBlocks || 0)} JSON-LD block(s) detected.`, reproduce: "Test the homepage with Google Rich Results Test or Schema Markup Validator." }),
      check(!checks.no_doctype, "Valid document foundation"),
    ] },
    { key: "freshness", label: "Content Accuracy & Freshness", checks: [
      check(wordCount === 0 || wordCount >= 300, "Homepage provides useful content depth", { evidence: wordCount ? `${wordCount} visible words detected.` : "A reliable visible word count was not returned.", reproduce: `Review ${url} and confirm it clearly explains the business, services, and next step.` }),
      check(Number(custom.expired_timer?.length || 0) === 0, "No expired or zeroed timer detected", { failTitle: "Expired or zeroed timer detected", evidence: evidence(custom.expired_timer, "No visibly expired countdown element was detected."), reproduce: `Review promotional and countdown elements on ${url}.` }),
      check(Number(custom.promo_text?.length || 0) === 0, "No promotion requiring a date review detected", { failTitle: "Time-sensitive promotion needs a date review", status: Number(custom.promo_text?.length || 0) === 0 ? "Passed" : "Warning", evidence: evidence(custom.promo_text, "No time-sensitive promotional language was detected."), reproduce: `Check the quoted promotion on ${url} and confirm it is still current.` }),
      check(custom.oldest_visible_year == null || custom.has_current_year || custom.oldest_visible_year >= new Date().getFullYear() - 1, "Visible dates do not appear obviously outdated", { failTitle: "A visible date may be outdated", status: custom.oldest_visible_year == null || custom.has_current_year || custom.oldest_visible_year >= new Date().getFullYear() - 1 ? "Passed" : "Warning", evidence: custom.oldest_visible_year ? `Oldest visible four-digit year detected: ${custom.oldest_visible_year}.` : "No four-digit year requiring review was detected.", reproduce: `Search the visible text on ${url} for old dates, events, promotions, and copyright notices.` }),
    ] },
    { key: "conversion", label: "Conversion Path", checks: [
      check(Number(custom.ctas || 0) > 0, "Clear action prompts", { failTitle: "No clear action prompt was detected" }),
      check(Number(custom.forms || 0) > 0, "Lead form detected", { failTitle: "No working lead form was confirmed" }),
      check(Number(custom.tel_links || 0) > 0, "Tap-to-call available", { failTitle: "No tap-to-call link was detected" }),
      check(Number(custom.mailto_links || 0) > 0, "Direct email path", { failTitle: "No direct email link was detected" }),
    ] },
    { key: "trust", label: "Trust & Compliance", checks: [
      check(!checks.has_micromarkup_errors, "Structured data has no detected errors"),
      check(Number(custom.privacy_links || 0) > 0, "Privacy information is visibly linked", { evidence: Number(custom.privacy_links || 0) > 0 ? "A privacy link was detected." : "No visible privacy link was detected on the tested page.", reproduce: `Check the header and footer of ${url} for a working privacy link.` }),
      check(Number(custom.terms_links || 0) > 0, "Terms or conditions are visibly linked", { evidence: Number(custom.terms_links || 0) > 0 ? "A terms or conditions link was detected." : "No visible terms or conditions link was detected on the tested page.", reproduce: `Check the header and footer of ${url} for working terms or conditions.` }),
      check(custom.policyLinksWork === true, "Visible policy links open successfully", { weight: 2, failTitle: "Policy pages are missing or do not open", evidence: custom.policies?.length ? custom.policies.map((item) => `${item.url}: ${item.status || "unavailable"}`).join("; ") : "No working privacy or terms page was confirmed.", reproduce: `Open every privacy and terms link shown on ${url} and confirm each page loads.` }),
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
    "HTTP traffic is forced to HTTPS": 0,
    "All tested HTTP addresses redirect to HTTPS": 1,
    "Canonical signal present": 2,
    "Visible policy links open successfully": 3,
    "No broken destinations detected from the tested homepage": 4,
    "No visibly dead links or disabled controls detected": 5,
    "A Content Security Policy is present": 6,
    "Strict Transport Security is enabled": 7,
    "No visibly insecure resources detected": 8,
    "No visibly insecure form destination detected": 9,
    "No expired or zeroed timer detected": 10,
    "No promotion requiring a date review detected": 11,
    "Visible dates do not appear obviously outdated": 12,
  };
  const sortedFailures = failed.sort((a, b) => (priorityOrder[a.title] ?? 20) - (priorityOrder[b.title] ?? 20));
  const priorityPool = [];
  sortedFailures.forEach((item) => {
    if (priorityPool.length < 5 && !priorityPool.some((selected) => selected.category === item.category)) priorityPool.push(item);
  });
  sortedFailures.forEach((item) => {
    if (priorityPool.length < 5 && !priorityPool.includes(item)) priorityPool.push(item);
  });
  const priorities = priorityPool
    .map((item) => ({ ...item, originalTitle: item.title, title: item.displayTitle, recommendation: recommendations[item.title] || `Review the ${item.displayTitle.toLowerCase()} finding, correct it if confirmed, and retest the exact page.` }));
  const strengths = categories.flatMap((category) => category.checks.filter((item) => item.pass).map((item) => ({ ...item, category: category.label, title: item.label }))).slice(0, 5);
  const scores = categories.map((item) => item.score);
  const lowestScore = Math.min(...scores);
  const weakAreas = categories.filter((item) => item.score < 70).map((item) => item.label);
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
    score: null,
    scoreLabel: "No overall health score is assigned",
    verdict: weakAreas.length
      ? `Professional review recommended. Meaningful gaps were found in ${weakAreas.join(", ")}.`
      : "The measured homepage checks are generally strong, but traffic, rankings, authority, local visibility, paid media, and conversions remain unverified.",
    assessment: { lowestScore, weakAreas, reviewRecommended: weakAreas.length > 0 || failed.length >= 3 },
    categories,
    unverifiedDimensions,
    strengths,
    priorities: priorities.length ? priorities : [{ category: "Growth", title: "Competitive visibility", recommendation: "Continue with the complete SIS series to benchmark rankings, competitors, local presence, reputation, and conversion opportunities." }],
    metrics: { statusCode: page.status_code ?? null, pageSizeKb, loadTimeMs: loadTimeMs || null, brokenLinks, wordCount },
    scopeNote: "This free snapshot reviews one public page and its visible controls at the recorded time. It is not a full-site crawl, accessibility audit, compliance opinion, or security penetration test. Rankings, traffic, backlinks, competitors, local visibility, paid media, and conversions remain unverified until the appropriate data sources are analyzed.",
  };
}

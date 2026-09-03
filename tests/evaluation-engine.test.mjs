import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBasicEvaluation,
  validateEvaluation,
} from "../src/lib/dataforseo.js";

function inspection(overrides = {}, pageOverrides = {}) {
  const url = "https://example.com/";
  const visibleSignals = {
    sourceIntegrity: true,
    challengeDetected: false,
    directStatusCode: 200,
    directTitle: "Example Company",
    directWordCount: 500,
    forms: 1,
    tel_links: 1,
    mailto_links: 1,
    ctas: 2,
    dead_controls: [],
    deadControlCount: 0,
    alternateDomains: [],
    businessDomainLinksHealthy: true,
    h1Count: 1,
    images_without_alt: 0,
    has_viewport: true,
    privacy_links: 1,
    terms_links: 1,
    isTexasRealEstate: false,
    mixed_content: [],
    insecure_forms: [],
    expired_timer: [],
    promo_text: [],
    oldest_visible_year: 2026,
    has_current_year: true,
    canonical: url,
    titleLength: 42,
    descriptionLength: 120,
    schemaBlocks: 1,
    httpRedirectsToHttps: true,
    hostConsolidated: true,
    hasDoctype: true,
    robotsAvailable: true,
    sitemapAvailable: true,
    policyLinksWork: true,
    policies: [{ url: `${url}privacy`, status: 200 }],
    crawlPages: [
      { url, status: 200, ok: true, challenge: false },
      { url: `${url}contact`, status: 200, ok: true, challenge: false },
    ],
    security_headers: {
      contentSecurityPolicy: true,
      frameProtection: true,
      strictTransportSecurity: true,
      contentTypeProtection: true,
      referrerPolicy: true,
    },
    ...overrides,
  };
  return {
    task: {
      result: [
        {
          items: [
            {
              status_code: 200,
              broken_links: 0,
              page_timing: { duration_time: 1200 },
              meta: {
                title: "Example Company",
                description:
                  "A sufficiently descriptive example business homepage description for evaluation.",
                content: { plain_text_word_count: 500 },
              },
              checks: { is_https: true, has_micromarkup_errors: false },
              ...pageOverrides,
            },
          ],
        },
      ],
    },
    visibleSignals,
  };
}

test("unknown measurements never produce perfect technical health", () => {
  const data = inspection({}, { page_timing: {} });
  const result = buildBasicEvaluation("https://example.com/", data, {
    businessName: "Example",
  });
  const technical = result.categories.find((item) => item.key === "technical");
  assert.notEqual(technical.score, 100);
  assert.ok(technical.checks.some((item) => item.status === "Not Verified"));
});

test("challenge or conflicting source identity triggers low confidence", () => {
  const data = inspection(
    { challengeDetected: true, sourceIntegrity: false },
    {
      meta: {
        title: "Robot Challenge Screen",
        description: "",
        content: { plain_text_word_count: 50 },
      },
    },
  );
  const result = buildBasicEvaluation("https://example.com/", data, {
    businessName: "Example",
  });
  assert.equal(result.confidence.label, "Low");
  assert.ok(result.score <= 35);
  assert.match(result.scoreLabel, /High Risk|Critical Failure/);
});

test("dead alternate business domain prevents a favorable result", () => {
  const data = inspection({
    businessDomainLinksHealthy: false,
    alternateDomains: [
      { url: "https://examplellc.com/", label: "Book", live: false },
    ],
  });
  const result = buildBasicEvaluation("https://example.com/", data, {
    businessName: "Example",
  });
  assert.ok(result.score <= 39);
  assert.notEqual(result.scoreLabel, "Customer Ready");
});

test("customer concerns do not alter the objective score", () => {
  const data = inspection();
  const baseline = buildBasicEvaluation("https://example.com/", data, {
    businessName: "Example",
  });
  const tailored = buildBasicEvaluation("https://example.com/", data, {
    businessName: "Example",
    concerns: ["leads", "security"],
  });
  assert.equal(tailored.score, baseline.score);
  assert.deepEqual(tailored.concerns, ["leads", "security"]);
  assert.doesNotThrow(() => validateEvaluation(tailored));
});

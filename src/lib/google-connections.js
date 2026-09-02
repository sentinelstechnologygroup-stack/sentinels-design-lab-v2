import "server-only";

import crypto from "node:crypto";

export const GOOGLE_CONNECTIONS = {
  "search-console": {
    label: "Google Search Console",
    shortLabel: "Search Console",
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
  },
  analytics: {
    label: "Google Analytics 4",
    shortLabel: "Analytics",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  },
  "business-profile": {
    label: "Google Business Profile",
    shortLabel: "Business Profile",
    scope: "https://www.googleapis.com/auth/business.manage",
  },
  ads: {
    label: "Google Ads",
    shortLabel: "Google Ads",
    scope: "https://www.googleapis.com/auth/adwords",
  },
  "tag-manager": {
    label: "Google Tag Manager",
    shortLabel: "Tag Manager",
    scope: "https://www.googleapis.com/auth/tagmanager.readonly",
  },
};

export const CONNECTION_MAX_AGE_SECONDS = 60 * 60;

export function isGoogleConfigured() {
  return Boolean(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
      process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
      process.env.SIS_CONNECTION_SECRET,
  );
}

export function getConnection(service) {
  return GOOGLE_CONNECTIONS[service] || null;
}

export function tokenCookieName(service) {
  return `sis_google_${service.replaceAll("-", "_")}`;
}

export function selectionCookieName(service) {
  return `sis_google_selection_${service.replaceAll("-", "_")}`;
}

function encryptionKey() {
  const secret = process.env.SIS_CONNECTION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SIS_CONNECTION_SECRET must contain at least 32 characters.");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptConnection(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptConnection(value) {
  try {
    const payload = Buffer.from(value, "base64url");
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const encrypted = payload.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), iv);
    decipher.setAuthTag(tag);
    return JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8"));
  } catch {
    return null;
  }
}

export function connectionCookieOptions(maxAge = CONNECTION_MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

async function googleJson(url, accessToken, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error?.message || "Google could not return the requested accounts.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

export async function listGoogleResources(service, accessToken) {
  if (service === "search-console") {
    const payload = await googleJson("https://www.googleapis.com/webmasters/v3/sites", accessToken);
    return (payload.siteEntry || []).map((site) => ({
      id: site.siteUrl,
      label: site.siteUrl,
      detail: site.permissionLevel,
    }));
  }
  if (service === "analytics") {
    const payload = await googleJson("https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200", accessToken);
    return (payload.accountSummaries || []).flatMap((account) =>
      (account.propertySummaries || []).map((property) => ({
        id: property.property,
        label: property.displayName,
        detail: account.displayName,
      })),
    );
  }
  if (service === "business-profile") {
    const payload = await googleJson("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", accessToken);
    return (payload.accounts || []).map((account) => ({
      id: account.name,
      label: account.accountName || account.name,
      detail: account.type,
    }));
  }
  if (service === "tag-manager") {
    const payload = await googleJson("https://tagmanager.googleapis.com/tagmanager/v2/accounts", accessToken);
    return (payload.account || []).map((account) => ({
      id: account.path,
      label: account.name,
      detail: account.accountId,
    }));
  }
  if (service === "ads") {
    if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
      const error = new Error("Google Ads requires an approved developer token before customer accounts can be listed.");
      error.status = 503;
      throw error;
    }
    const payload = await googleJson("https://googleads.googleapis.com/v21/customers:listAccessibleCustomers", accessToken, {
      headers: { "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN },
    });
    return (payload.resourceNames || []).map((name) => ({
      id: name,
      label: `Google Ads ${name.replace("customers/", "")}`,
      detail: "Accessible customer account",
    }));
  }
  return [];
}

export async function getSearchConsolePreview(accessToken, siteUrl) {
  const endDate = new Date();
  endDate.setUTCDate(endDate.getUTCDate() - 1);
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - 27);
  const date = (value) => value.toISOString().slice(0, 10);
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const [summary, queries] = await Promise.all([
    googleJson(endpoint, accessToken, {
      method: "POST",
      body: JSON.stringify({ startDate: date(startDate), endDate: date(endDate) }),
    }),
    googleJson(endpoint, accessToken, {
      method: "POST",
      body: JSON.stringify({ startDate: date(startDate), endDate: date(endDate), dimensions: ["query"], rowLimit: 5 }),
    }),
  ]);
  const total = (summary.rows || []).reduce(
    (result, row) => ({ clicks: result.clicks + (row.clicks || 0), impressions: result.impressions + (row.impressions || 0) }),
    { clicks: 0, impressions: 0 },
  );
  return {
    period: `${date(startDate)} to ${date(endDate)}`,
    clicks: total.clicks,
    impressions: total.impressions,
    ctr: total.impressions ? total.clicks / total.impressions : 0,
    topQueries: (queries.rows || []).map((row) => ({ query: row.keys?.[0] || "", clicks: row.clicks || 0, impressions: row.impressions || 0, position: row.position || 0 })),
  };
}

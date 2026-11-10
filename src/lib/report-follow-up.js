import crypto from "node:crypto";

const getSecret = () => process.env.REPORT_FOLLOW_UP_SECRET || process.env.SIS_CONNECTION_SECRET;

export function createSchedulingToken({ reportId, email, expiresInSeconds = 1209600 }) {
  const secret = getSecret();
  if (!secret) throw new Error("REPORT_FOLLOW_UP_SECRET is not configured");
  const payload = Buffer.from(JSON.stringify({ reportId, email, exp: Date.now() + expiresInSeconds * 1000 })).toString("base64url");
  return `${payload}.${crypto.createHmac("sha256", secret).update(payload).digest("base64url")}`;
}

export function readSchedulingToken(token) {
  const secret = getSecret();
  if (!secret || !token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  return value.exp > Date.now() ? value : null;
}

export function schedulingUrl(input) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://sentinelsdesignlab.com";
  return `${base}/schedule/report?token=${encodeURIComponent(createSchedulingToken(input))}`;
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { createHash } from "node:crypto";
import {
  buildBasicEvaluation,
  EVALUATION_ENGINE_VERSION,
  inspectPage,
  validateEvaluation,
} from "@/lib/dataforseo";
import { generateEvaluationPdf } from "@/lib/evaluation-pdf";
import { sendEvaluationEmails } from "@/lib/evaluation-email";
import { adminAuth } from "@/lib/firebase-admin";
import { storeReportPdf } from "@/lib/report-storage";
import { getSessionUser } from "@/lib/session";
import {
  createReport,
  getEvaluationSnapshot,
  saveEvaluationSnapshot,
  updateReport,
  upsertWebsiteForDomain,
  upsertProfile,
} from "@/db/firestore";
import {
  decryptConnection,
  getSearchConsolePreview,
  selectionCookieName,
  tokenCookieName,
} from "@/lib/google-connections";

export const runtime = "nodejs";
export const maxDuration = 60;
const attempts = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const concernKeys = [
  "leads",
  "search",
  "functionality",
  "mobile",
  "speed",
  "content",
  "trust",
  "security",
  "local",
  "advertising",
];
const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  businessName: z.string().trim().min(2).max(150),
  website: z.string().trim().max(500),
  primaryService: z.string().trim().min(2).max(160),
  location: z.string().trim().max(160).optional().default(""),
  concerns: z.array(z.enum(concernKeys)).max(3).optional().default([]),
  company: z.string().max(0).optional().default(""),
});
const SNAPSHOT_TTL_MS = 24 * 60 * 60 * 1000;

function normalizeWebsite(value) {
  const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  const host = url.hostname.toLowerCase();
  const privateIpv4 =
    /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
  if (
    !["http:", "https:"].includes(url.protocol) ||
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "::1" ||
    privateIpv4.test(host)
  )
    throw new Error("Please enter a public website.");
  return url.toString();
}

export async function POST(request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser)
      return NextResponse.json(
        { error: "Create an account or sign in before requesting a report." },
        { status: 401 },
      );
    const clientId = (request.headers.get("x-forwarded-for") || "unknown")
      .split(",")[0]
      .trim();
    const now = Date.now();
    const recent = (attempts.get(clientId) || []).filter(
      (time) => now - time < WINDOW_MS,
    );
    if (recent.length >= MAX_ATTEMPTS)
      return NextResponse.json(
        {
          error:
            "You have reached the free evaluation limit. Please try again later.",
        },
        { status: 429 },
      );
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: "Please check the required fields and try again." },
        { status: 400 },
      );
    const url = normalizeWebsite(parsed.data.website);
    attempts.set(clientId, [...recent, now]);
    const normalizedDomain = new URL(url).hostname
      .toLowerCase()
      .replace(/^www\./, "");
    const domainKey = createHash("sha256")
      .update(normalizedDomain)
      .digest("hex");
    const previousSnapshot = await getEvaluationSnapshot(domainKey);
    const snapshotAge = previousSnapshot?.updatedAt
      ? now - new Date(previousSnapshot.updatedAt).getTime()
      : Infinity;
    const canReuse =
      previousSnapshot?.engineVersion === EVALUATION_ENGINE_VERSION &&
      previousSnapshot?.inspection &&
      snapshotAge < SNAPSHOT_TTL_MS;
    const inspection = canReuse
      ? previousSnapshot.inspection
      : await inspectPage(url);
    if (!canReuse)
      await saveEvaluationSnapshot(domainKey, {
        normalizedDomain,
        engineVersion: EVALUATION_ENGINE_VERSION,
        inspection: JSON.parse(JSON.stringify(inspection)),
      });
    else
      await saveEvaluationSnapshot(domainKey, {
        normalizedDomain,
        engineVersion: EVALUATION_ENGINE_VERSION,
      });
    const evaluation = validateEvaluation(
      buildBasicEvaluation(url, inspection, parsed.data),
    );
    evaluation.consistency = {
      normalizedDomain,
      engineVersion: EVALUATION_ENGINE_VERSION,
      snapshotReused: canReuse,
      snapshotWindowHours: 24,
    };
    const searchToken = decryptConnection(
      request.cookies.get(tokenCookieName("search-console"))?.value || "",
    );
    const searchSelection = decryptConnection(
      request.cookies.get(selectionCookieName("search-console"))?.value || "",
    );
    if (
      searchToken?.accessToken &&
      searchToken.expiresAt > Date.now() &&
      searchSelection?.id
    ) {
      try {
        const preview = await getSearchConsolePreview(
          searchToken.accessToken,
          searchSelection.id,
        );
        evaluation.connectedInsights = [
          {
            source: "Google Search Console",
            label: "Limited 28-day search context",
            ...preview,
          },
        ];
        evaluation.scopeNote +=
          " A connected Google Search Console property supplied a limited 28-day context preview. This added context is not an advanced SEO report.";
      } catch (error) {
        console.error("[Free evaluation connected insight]", error);
      }
    }
    const pdf = generateEvaluationPdf(evaluation);
    const email = parsed.data.email.toLowerCase();
    if (sessionUser.email?.toLowerCase() !== email)
      return NextResponse.json(
        { error: "Use the email address connected to your signed-in account." },
        { status: 403 },
      );
    const user = await adminAuth().getUser(sessionUser.uid);
    await upsertProfile(user.uid, {
      email,
      name: parsed.data.name,
      phone: parsed.data.phone,
    });
    const websiteId = await upsertWebsiteForDomain(user.uid, normalizedDomain, {
      businessName: parsed.data.businessName,
      url,
      normalizedDomain,
      primaryService: parsed.data.primaryService,
      location: parsed.data.location,
    });
    const reportId = await createReport(user.uid, {
      websiteId,
      normalizedDomain,
      engineVersion: EVALUATION_ENGINE_VERSION,
      reportType: "free-readiness",
      title: `${parsed.data.businessName} Website Readiness Snapshot`,
      status: "generating",
      findings: evaluation,
    });
    let storagePath;
    try {
      storagePath = await storeReportPdf({ uid: user.uid, reportId, pdf });
    } catch (error) {
      await updateReport(reportId, {
        status: "failed",
        error: "The PDF could not be stored.",
        failedAt: new Date(),
      });
      console.error("[Sentinels Intelligence Suite report storage]", error);
      return NextResponse.json(
        {
          error:
            "Your website was inspected, but the report file could not be saved. Please try again shortly.",
        },
        { status: 503 },
      );
    }
    await updateReport(reportId, {
      storagePath,
      blobUrl: null,
      status: "complete",
    });
    const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://reports.sentinelsdesignlab.com"}/dashboard`;
    let delivery = { sent: false, reason: "not_configured" };
    try {
      delivery = await sendEvaluationEmails({
        evaluation,
        lead: { ...parsed.data, email },
        pdf,
        portalUrl,
      });
    } catch (error) {
      console.error("[Sentinels Intelligence Suite email delivery]", error);
      delivery = { sent: false, reason: "delivery_failed" };
    }
    await updateReport(reportId, {
      emailDelivery: delivery,
      emailDeliveryCheckedAt: new Date(),
    });
    return NextResponse.json({
      ok: true,
      evaluation,
      delivery,
      report: {
        id: reportId,
        filename: `Sentinels-Design-Lab-Website-Readiness-${evaluation.businessName.replace(/[^a-z0-9]+/gi, "-")}.pdf`,
        url: `/api/reports/${reportId}/download`,
      },
      nextStep: { label: "Sign in to view reports", href: "/sign-in" },
    });
  } catch (error) {
    console.error("[Sentinels Intelligence Suite evaluation]", error);
    return NextResponse.json(
      {
        error:
          "We could not inspect that website right now. Confirm the address and try again.",
      },
      { status: 502 },
    );
  }
}

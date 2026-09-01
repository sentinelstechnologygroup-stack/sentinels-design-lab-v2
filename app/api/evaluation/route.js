import { NextResponse } from "next/server";
import { z } from "zod";
import { buildBasicEvaluation, inspectPage } from "@/lib/dataforseo";

export const runtime = "nodejs";
export const maxDuration = 60;

const attempts = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 3;

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  businessName: z.string().trim().min(2).max(150),
  website: z.string().trim().max(500),
  primaryService: z.string().trim().min(2).max(160),
  location: z.string().trim().max(160).optional().default(""),
  company: z.string().max(0).optional().default(""),
});

function normalizeWebsite(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const url = new URL(withProtocol);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Invalid website protocol.");
  const host = url.hostname.toLowerCase();
  const privateIpv4 = /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "::1" ||
    privateIpv4.test(host)
  ) throw new Error("Please enter a public website.");
  return url.toString();
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for") || "unknown";
    const clientId = forwarded.split(",")[0].trim();
    const now = Date.now();
    const recent = (attempts.get(clientId) || []).filter((time) => now - time < WINDOW_MS);
    if (recent.length >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: "You have reached the free evaluation limit. Please try again later." }, { status: 429 });
    }

    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
    }

    const url = normalizeWebsite(parsed.data.website);
    attempts.set(clientId, [...recent, now]);
    const inspection = await inspectPage(url);
    const evaluation = buildBasicEvaluation(url, inspection);

    return NextResponse.json({
      ok: true,
      evaluation,
      nextStep: {
        label: "Explore the complete SIS report series",
        href: "/systems/sis",
      },
    });
  } catch (error) {
    console.error("[SIS evaluation]", error);
    const configurationError = error instanceof Error && error.message.includes("credentials are not configured");
    return NextResponse.json(
      { error: configurationError ? "The evaluation service is being connected. Please try again shortly." : "We could not inspect that website right now. Confirm the address and try again." },
      { status: configurationError ? 503 : 502 },
    );
  }
}

import { NextResponse } from "next/server";
import { createOrder, upsertWebsiteForDomain } from "@/db/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { generateOrderReports } from "@/lib/advanced-report-generator";

const LEVELS = { seo: ["seo-intelligence"], ppc: ["ppc-intelligence"], comprehensive: ["website-conversion"], complete: ["seo-intelligence", "ppc-intelligence", "website-conversion"] };
export async function POST(request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const user = await adminAuth().getUser(session.uid);
  if (user.email?.toLowerCase() !== "patrick@sentinelsdesignlab.com") return NextResponse.json({ error: "Super-admin access required." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const selectedReports = LEVELS[body.level];
  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";
  if (!selectedReports || !businessName || !website) return NextResponse.json({ error: "Choose a report level, business name, and public website." }, { status: 400 });
  let parsed;
  try { parsed = new URL(website.startsWith("http") ? website : `https://${website}`); } catch { return NextResponse.json({ error: "Enter a valid public website URL." }, { status: 400 }); }
  const normalizedDomain = parsed.hostname.toLowerCase().replace(/^www\./, "");
  const websiteId = await upsertWebsiteForDomain(session.uid, normalizedDomain, { businessName, url: parsed.toString(), normalizedDomain });
  const order = { id: `admin-${Date.now()}`, uid: session.uid, websiteId, selectedReports, offerCode: `admin-${body.level}`, status: "paid", generationStatus: "generating" };
  await createOrder(session.uid, { ...order, adminRun: true, amountCents: 0, currency: "usd" });
  try { return NextResponse.json({ ok: true, reportIds: await generateOrderReports(order) }); }
  catch (error) { return NextResponse.json({ error: error.message || "The report could not be generated." }, { status: 500 }); }
}

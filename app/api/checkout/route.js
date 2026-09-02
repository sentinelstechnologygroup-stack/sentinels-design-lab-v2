import { NextResponse } from "next/server";
import { createOrder, upsertProfile } from "@/db/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { getReportOffer } from "@/lib/report-offers";
import { getStripe } from "@/lib/stripe";
import { REPORT_CATALOG_BY_CODE, validateReportSelection } from "@/lib/report-catalog";

export async function POST(request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return NextResponse.json({ error: "Sign in before purchasing a report." }, { status: 401 });
  const userId = sessionUser.uid;
  const { offerCode, selectedReports } = await request.json().catch(() => ({}));
  const offer = getReportOffer(offerCode);
  if (!offer) return NextResponse.json({ error: "Unknown report offer." }, { status: 400 });
  const selection = validateReportSelection(offer, selectedReports);
  if (!selection) return NextResponse.json({ error: `Select exactly ${offer.reportCredits} report${offer.reportCredits === 1 ? "" : "s"} before checkout.` }, { status: 400 });
  const user = await adminAuth().getUser(userId);
  const email = user.email;
  if (!email) return NextResponse.json({ error: "A verified account email is required." }, { status: 400 });

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: offer.amountCents,
        product_data: {
          name: offer.name,
          description: selection.map((code) => REPORT_CATALOG_BY_CODE[code].name).join(", "),
          metadata: { offerCode: offer.code },
        },
      },
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://reports.sentinelsdesignlab.com"}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://reports.sentinelsdesignlab.com"}/dashboard?checkout=cancelled`,
    client_reference_id: userId,
    metadata: { firebaseUid: userId, offerCode: offer.code, selectedReports: selection.join(",") },
  });

  await upsertProfile(userId, { email, name: user.displayName || "" });
  await createOrder(userId, { stripeSessionId: session.id, offerCode: offer.code, selectedReports: selection, amountCents: offer.amountCents, currency: "usd", status: "pending" });
  return NextResponse.json({ url: session.url });
}

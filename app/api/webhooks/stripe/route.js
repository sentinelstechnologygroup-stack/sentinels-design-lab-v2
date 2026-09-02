import { NextResponse } from "next/server";
import { updateOrderBySession } from "@/db/firestore";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  let event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await updateOrderBySession(session.id, {
      status: session.payment_status === "paid" ? "paid" : "processing",
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      paidAt: session.payment_status === "paid" ? new Date() : null,
    });
  }
  if (event.type === "checkout.session.expired") {
    await updateOrderBySession(event.data.object.id, { status: "expired" });
  }
  return NextResponse.json({ received: true });
}

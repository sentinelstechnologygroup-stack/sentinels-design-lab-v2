import { after, NextResponse } from "next/server";
import { claimOrderGeneration, updateOrderBySession } from "@/db/firestore";
import { getStripe } from "@/lib/stripe";
import { generateOrderReports } from "@/lib/advanced-report-generator";

export const runtime = "nodejs";
export const maxDuration = 300;

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
    const order = await updateOrderBySession(session.id, {
      status: session.payment_status === "paid" ? "paid" : "processing",
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      paidAt: session.payment_status === "paid" ? new Date() : null,
    });
    if (!order) return NextResponse.json({ error: "Order record is not ready; retry this event." }, { status: 503 });
    if (order && session.payment_status === "paid" && order.generationStatus !== "complete") {
      const claimed = await claimOrderGeneration(order.id);
      if (claimed) after(async () => { try { await generateOrderReports(claimed); } catch (error) { console.error("[SIS advanced report generation]", error); } });
    }
  }
  if (event.type === "checkout.session.expired") {
    await updateOrderBySession(event.data.object.id, { status: "expired" });
  }
  return NextResponse.json({ received: true });
}

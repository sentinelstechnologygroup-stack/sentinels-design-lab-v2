import "server-only";
import Stripe from "stripe";

let client;

export function getStripe() {
  if (!client) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not configured.");
    client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return client;
}

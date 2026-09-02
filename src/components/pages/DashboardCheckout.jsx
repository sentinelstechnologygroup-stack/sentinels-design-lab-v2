"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function DashboardCheckout({ offerCode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerCode }) });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout could not be started.");
      window.location.assign(payload.url);
    } catch (checkoutError) {
      setError(checkoutError.message);
      setLoading(false);
    }
  }

  return <div><button onClick={checkout} disabled={loading} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-950 disabled:opacity-50">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <>Select offer <ArrowRight className="h-4 w-4" /></>}</button>{error && <p className="mt-2 text-xs text-red-300">{error}</p>}</div>;
}

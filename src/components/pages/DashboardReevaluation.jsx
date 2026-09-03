"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { REPORT_OFFERS } from "@/lib/report-offers";

export default function DashboardReevaluation() {
  const [orders, setOrders] = useState([]); const [busy, setBusy] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => { fetch("/api/orders", { cache: "no-store" }).then((response) => response.json()).then((data) => setOrders(data.orders || [])).catch(() => null); }, []);
  const eligible = orders.filter((order) => order.status === "paid" && !order.reevaluationUsedAt);
  if (!eligible.length) return null;
  async function rerun(id) {
    setBusy(id); setMessage("");
    const response = await fetch(`/api/orders/${id}/reevaluate`, { method: "POST" }); const payload = await response.json();
    if (response.ok) { setOrders((current) => current.map((order) => order.id === id ? { ...order, reevaluationUsedAt: new Date().toISOString() } : order)); setMessage("Your reevaluated PDFs are ready in the report library. Refresh the dashboard to view them."); }
    else setMessage(`${payload.error || "The reevaluation could not be completed."}${payload.missing?.length ? ` Missing: ${payload.missing.join(", ")}.` : ""}`);
    setBusy("");
  }
  return <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.05] p-5"><h3 className="font-heading text-lg font-bold">Complimentary paid-report reevaluation</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">Connect every required account above, select its property, then regenerate every PDF included in the paid order once within 60 days.</p><div className="mt-4 flex flex-wrap gap-3">{eligible.map((order) => <button key={order.id} onClick={() => rerun(order.id)} disabled={Boolean(busy)} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50">{busy === order.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}Reevaluate {REPORT_OFFERS[order.offerCode]?.name || "advanced report"}</button>)}</div>{message && <p className="mt-4 text-sm text-violet-200">{message}</p>}</div>;
}

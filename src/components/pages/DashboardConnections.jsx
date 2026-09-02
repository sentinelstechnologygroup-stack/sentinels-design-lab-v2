"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, LoaderCircle, Unplug } from "lucide-react";

const SOURCES = [
  ["search-console", "Search Console", "Rankings, queries, clicks and indexing"],
  ["analytics", "Google Analytics 4", "Traffic, engagement and conversions"],
  ["business-profile", "Business Profile", "Local visibility, reviews and actions"],
  ["ads", "Google Ads", "Spend, search terms and paid conversions"],
  ["tag-manager", "Tag Manager", "Tracking and conversion-tag verification"],
];

export default function DashboardConnections() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState("");

  async function refresh() {
    const response = await fetch("/api/connections/google/status", { cache: "no-store" });
    setStatus(await response.json());
  }

  useEffect(() => { refresh().catch(() => setStatus({ connections: {} })); }, []);

  async function disconnect(service) {
    setBusy(service);
    await fetch("/api/connections/google/disconnect", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service }) });
    await refresh();
    setBusy("");
  }

  return <section id="connections" className="mt-16 scroll-mt-28">
    <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <span className="eyebrow mb-4">Data Control Board</span>
        <h2 className="font-heading text-3xl font-bold">Improve report accuracy with verified business data</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Advanced reports combine public research with data only the business owner can authorize. Connecting the relevant account is necessary for the most complete and accurate analysis. If a required source is not connected, the report will identify the missing evidence and its conclusions may be limited.</p>
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm leading-6 text-emerald-100/80">Connections use the provider's official sign-in, request only the access needed for reporting, and can be removed here at any time. Sentinels never receives the provider password.</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-card p-5 sm:p-6">
        {!status ? <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Checking connections...</div> : <div className="space-y-2">{SOURCES.map(([key, label, purpose]) => {
          const connected = Boolean(status.connections?.[key]);
          return <div key={key} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">{connected ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> : <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-white/35" />}<div><div className="text-sm font-semibold text-foreground">{label}</div><div className="mt-1 text-xs text-muted-foreground">{purpose}</div></div></div>
            {connected ? <button onClick={() => disconnect(key)} disabled={busy === key} className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 hover:text-white"><Unplug className="h-3.5 w-3.5" />{busy === key ? "Removing..." : "Remove access"}</button> : <Link href="/advanced-reports" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">Connect <ArrowRight className="h-3.5 w-3.5" /></Link>}
          </div>;
        })}</div>}
        <Link href="/advanced-reports" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Manage accounts and choose properties <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  </section>;
}

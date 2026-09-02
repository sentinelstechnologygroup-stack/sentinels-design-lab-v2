"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, LoaderCircle, Unplug } from "lucide-react";
import { REPORTING_POLICY } from "@/lib/reporting-policy";

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
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{REPORTING_POLICY.limitedDataNotice}</p>
        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.05] p-4 text-sm leading-6 text-muted-foreground">{REPORTING_POLICY.enhancedFreeNotice}</div>
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm leading-6 text-amber-100/80"><strong>Missing a connection?</strong> {REPORTING_POLICY.rerunNotice}</div>
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm leading-6 text-emerald-100/80">Connections use the provider's official sign-in, request only the access needed for reporting, and can be removed here at any time. Sentinels never receives the provider password.</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-card p-5 sm:p-6">
        {!status ? <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Checking connections...</div> : <div className="space-y-2">{SOURCES.map(([key, label, purpose]) => {
          const connected = Boolean(status.connections?.[key]);
          return <div key={key} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">{connected ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> : <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-white/35" />}<div><div className="text-sm font-semibold text-foreground">{label}</div><div className="mt-1 text-xs text-muted-foreground">{purpose}</div></div></div>
            {connected ? <button onClick={() => disconnect(key)} disabled={busy === key} className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 hover:text-white"><Unplug className="h-3.5 w-3.5" />{busy === key ? "Removing..." : "Remove access"}</button> : <a href={`/api/connections/google/start?service=${key}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">Connect {label} <ArrowRight className="h-3.5 w-3.5" /></a>}
          </div>;
        })}</div>}
        <p className="mt-5 text-xs leading-5 text-muted-foreground">After Google authorization, you will return here to choose the exact business account or property used for your report.</p>
      </div>
    </div>
  </section>;
}

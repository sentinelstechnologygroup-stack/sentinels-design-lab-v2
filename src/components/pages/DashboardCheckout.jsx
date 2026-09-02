"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, LoaderCircle, X } from "lucide-react";
import { REPORT_CATALOG } from "@/lib/report-catalog";

export default function DashboardCheckout({ offer, websites = [] }) {
  const [availableWebsites, setAvailableWebsites] = useState(websites);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [websiteId, setWebsiteId] = useState(websites[0]?.id || "");
  const fixedSelection = offer.includedReports || [];

  useEffect(() => {
    if (availableWebsites.length) return;
    fetch("/api/websites", { cache: "no-store" }).then((response) => response.json()).then((payload) => {
      const items = payload.websites || [];
      setAvailableWebsites(items);
      setWebsiteId((current) => current || items[0]?.id || "");
    }).catch(() => null);
  }, [availableWebsites.length]);

  async function checkout() {
    const selectedReports = fixedSelection;
    if (!websiteId) { setError("Run a free snapshot or add a website before purchasing an advanced report."); return; }
    if (selectedReports.length !== offer.reportCredits) { setError(`Choose exactly ${offer.reportCredits} report${offer.reportCredits === 1 ? "" : "s"}.`); return; }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerCode: offer.code, selectedReports, websiteId }) });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout could not be started.");
      window.location.assign(payload.url);
    } catch (checkoutError) { setError(checkoutError.message); setLoading(false); }
  }

  return <>
    <button onClick={() => { setOpen(true); setError(""); }} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-950">Review report &amp; access <ArrowRight className="h-4 w-4" /></button>
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`offer-${offer.code}`}>
      <div className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#08101d] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Included analysis</div><h2 id={`offer-${offer.code}`} className="mt-2 font-heading text-2xl font-bold">{offer.name}</h2><p className="mt-2 text-sm text-muted-foreground">Your report uses public market data plus the customer-owned accounts listed below.</p></div><button onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close report selection"><X className="h-5 w-5" /></button></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">{REPORT_CATALOG.filter((report) => fixedSelection.includes(report.code)).map((report) => <div key={report.code} className="flex gap-3 rounded-xl border border-primary/50 bg-primary/[0.08] p-4 text-left"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary bg-primary text-slate-950"><Check className="h-3.5 w-3.5" /></span><span><strong className="text-sm text-foreground">{report.name}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{report.description}</span><span className="mt-2 block text-xs font-medium text-amber-200">Required connections: {report.requiredConnections.join(", ").replaceAll("search-console", "Google Search Console").replaceAll("business-profile", "Google Business Profile").replaceAll("analytics", "Google Analytics 4").replaceAll("ads", "Google Ads").replaceAll("tag-manager", "Google Tag Manager")}</span></span></div>)}</div>
        <label className="mt-5 block text-sm font-semibold text-foreground">Website to evaluate<select value={websiteId} onChange={(event) => setWebsiteId(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#07101d] px-3 text-sm text-foreground"><option value="">Choose a saved website</option>{availableWebsites.map((website) => <option key={website.id} value={website.id}>{website.businessName} - {website.url}</option>)}</select></label>
        <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100/80"><strong className="text-amber-100">Why a section may show 0.</strong> A zero is not treated as poor performance when required customer data is unavailable. It is labeled <em>Pending access</em>, names the missing account, and links to the secure connection screen. Paid advanced reports include one complimentary reevaluation when the required data is connected within 60 days.</div>
        <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-white/10 bg-[#08101d] pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm text-muted-foreground">{fixedSelection.length} advanced analysis{fixedSelection.length === 1 ? "" : "es"} · {(offer.amountCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div><button onClick={checkout} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-slate-950 disabled:opacity-50">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <>Continue to secure checkout <ArrowRight className="h-4 w-4" /></>}</button></div>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      </div>
    </div>}
  </>;
}

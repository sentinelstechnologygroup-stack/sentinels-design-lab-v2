"use client";

import { useState } from "react";
import { ArrowRight, Check, LoaderCircle, X } from "lucide-react";
import { REPORT_CATALOG } from "@/lib/report-catalog";

export default function DashboardCheckout({ offer }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chooseAll = offer.reportCredits >= REPORT_CATALOG.length;

  function toggle(code) {
    setError("");
    setSelected((current) => current.includes(code) ? current.filter((item) => item !== code) : current.length < offer.reportCredits ? [...current, code] : current);
  }

  async function checkout() {
    const selectedReports = chooseAll ? REPORT_CATALOG.map((report) => report.code) : selected;
    if (selectedReports.length !== offer.reportCredits) { setError(`Choose exactly ${offer.reportCredits} report${offer.reportCredits === 1 ? "" : "s"}.`); return; }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerCode: offer.code, selectedReports }) });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout could not be started.");
      window.location.assign(payload.url);
    } catch (checkoutError) { setError(checkoutError.message); setLoading(false); }
  }

  return <>
    <button onClick={() => { setOpen(true); setError(""); }} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-950">{chooseAll ? "Review included reports" : `Choose ${offer.reportCredits} report${offer.reportCredits === 1 ? "" : "s"}`} <ArrowRight className="h-4 w-4" /></button>
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`offer-${offer.code}`}>
      <div className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#08101d] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Choose before checkout</div><h2 id={`offer-${offer.code}`} className="mt-2 font-heading text-2xl font-bold">{offer.name}</h2><p className="mt-2 text-sm text-muted-foreground">{chooseAll ? "All ten reports below are included." : `Select exactly ${offer.reportCredits} of the ten available reports.`}</p></div><button onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close report selection"><X className="h-5 w-5" /></button></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">{REPORT_CATALOG.map((report) => { const checked = chooseAll || selected.includes(report.code); const disabled = !chooseAll && !checked && selected.length >= offer.reportCredits; return <button type="button" key={report.code} onClick={() => !chooseAll && toggle(report.code)} disabled={disabled || chooseAll} className={`flex gap-3 rounded-xl border p-4 text-left transition ${checked ? "border-primary/50 bg-primary/[0.08]" : "border-white/10 bg-white/[0.025] hover:border-white/25"} disabled:cursor-default disabled:opacity-55`}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked ? "border-primary bg-primary text-slate-950" : "border-white/25"}`}>{checked && <Check className="h-3.5 w-3.5" />}</span><span><strong className="text-sm text-foreground">{report.name}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{report.description}</span></span></button>; })}</div>
        <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-white/10 bg-[#08101d] pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm text-muted-foreground">{chooseAll ? "10 reports included" : `${selected.length} of ${offer.reportCredits} selected`} · ${(offer.amountCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div><button onClick={checkout} disabled={loading || (!chooseAll && selected.length !== offer.reportCredits)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-slate-950 disabled:opacity-50">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <>Continue to secure checkout <ArrowRight className="h-4 w-4" /></>}</button></div>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      </div>
    </div>}
  </>;
}

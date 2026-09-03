"use client";

import { useEffect, useMemo, useState } from "react";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";
import { REPORT_OFFERS } from "@/lib/report-offers";
import DashboardCheckout from "@/components/pages/DashboardCheckout";
import DashboardReevaluation from "@/components/pages/DashboardReevaluation";
import {
  BarChart3, Bell, CheckCircle2, ChevronDown, Download, FileText, Globe2,
  LayoutDashboard, LifeBuoy, Link2, LoaderCircle, LogOut, Menu, Search,
  Settings, ShieldCheck, ShoppingBag, Sparkles, Unplug, X,
} from "lucide-react";

const NAV = [
  ["overview", "Overview", LayoutDashboard], ["reports", "My Reports", FileText],
  ["order", "Order Reports", Sparkles], ["accounts", "Linked Accounts", Link2],
  ["orders", "Orders", ShoppingBag], ["settings", "Settings", Settings],
];
const SOURCES = [
  ["search-console", "Google Search Console", "Queries, clicks, impressions, position, and indexing"],
  ["analytics", "Google Analytics 4", "Traffic, engagement, events, and conversions"],
  ["business-profile", "Google Business Profile", "Local visibility, reviews, and customer actions"],
  ["ads", "Google Ads", "Campaigns, search terms, spend, and paid conversions"],
  ["tag-manager", "Google Tag Manager", "Analytics and conversion-tag verification"],
  ["meta-ads", "Meta Ads", "Campaign, audience, spend, and conversion evidence"],
];
const titleCase = (value = "") => value.replaceAll("_", " ").replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
const date = (value) => value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Date unavailable";

function Brand() {
  return <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-sm font-black text-cyan-300">SDL</span><span className="text-sm font-semibold leading-tight">Sentinels<br/><span className="font-normal text-white/45">Design Lab</span></span></div>;
}

export default function CustomerDashboard({ initialData }) {
  const [view, setView] = useState("overview");
  const [mobile, setMobile] = useState(false);
  const [support, setSupport] = useState(false);
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState(initialData.customer);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleReports = normalizedQuery ? initialData.reports.filter((report) => `${report.title} ${report.reportType} ${report.status}`.toLowerCase().includes(normalizedQuery)) : initialData.reports;
  const visibleOrders = normalizedQuery ? initialData.orders.filter((order) => `${REPORT_OFFERS[order.offerCode]?.name || order.offerCode} ${order.status} ${order.generationStatus}`.toLowerCase().includes(normalizedQuery)) : initialData.orders;
  const completeReports = initialData.reports.filter((report) => report.status === "complete");
  const latest = completeReports[0];
  const score = latest?.findings?.score ?? null;

  async function logout() {
    await Promise.allSettled([signOut(firebaseClientAuth()), fetch("/api/session", { method: "DELETE" })]);
    window.location.assign("/sign-in");
  }

  const choose = (next) => { setView(next); setMobile(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <div className="min-h-screen bg-[radial-gradient(circle_at_75%_-10%,rgba(37,99,235,.15),transparent_34%),linear-gradient(180deg,#070b15,#040812)]">
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#060b15] p-4 transition lg:translate-x-0 ${mobile ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-2 py-2"><Brand/><button className="lg:hidden" onClick={() => setMobile(false)} aria-label="Close navigation"><X className="h-5 w-5"/></button></div>
      <nav className="mt-8 space-y-1">{NAV.map(([key, label, Icon]) => <button key={key} onClick={() => choose(key)} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${view === key ? "border border-blue-400/25 bg-blue-500/15 text-white" : "text-white/55 hover:bg-white/[.05] hover:text-white"}`}><Icon className="h-5 w-5"/>{label}</button>)}</nav>
      <div className="absolute inset-x-4 bottom-4">
        <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-center gap-2 text-sm font-semibold"><LifeBuoy className="h-4 w-4 text-cyan-300"/>Need help?</div><p className="mt-2 text-xs leading-5 text-white/50">Questions about your dashboard or reports? We are ready to help.</p><button onClick={() => setSupport(true)} className="mt-3 w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold">Contact support</button></div>
        <button onClick={logout} className="mt-3 flex w-full items-center gap-3 rounded-xl border-t border-white/10 px-3.5 py-3 text-sm font-medium text-white/55 hover:text-white"><LogOut className="h-5 w-5"/>Sign out</button>
      </div>
    </aside>
    {mobile && <button className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setMobile(false)} aria-label="Close navigation overlay"/>}

    <div className="lg:pl-64">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b15]/90 backdrop-blur-xl"><div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"><button className="lg:hidden" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu className="h-5 w-5"/></button><div className="hidden w-full max-w-md items-center md:flex"><Search className="pointer-events-none ml-3 h-4 w-4 text-white/35"/><input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => choose("reports")} className="-ml-7 h-10 w-full rounded-xl border border-white/10 bg-white/[.035] pl-10 pr-3 text-sm" placeholder="Search reports and orders"/></div><div className="ml-auto flex items-center gap-2"><button onClick={() => choose("orders")} className="relative rounded-xl p-2.5 text-white/65 hover:bg-white/[.05]" aria-label="View order notifications"><Bell className="h-5 w-5"/>{initialData.orders.some((o) => o.generationStatus === "generating") && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-400"/>}</button><button onClick={() => choose("settings")} className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/[.05]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold">{(customer.name || customer.email || "A").split(/\s|@/).slice(0,2).map((v) => v[0]).join("").toUpperCase()}</span><span className="hidden text-sm font-medium sm:block">{customer.name || "Account"}</span><ChevronDown className="hidden h-4 w-4 text-white/35 sm:block"/></button></div></div></header>
      <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
        {initialData.notice && <div className="mb-5 rounded-xl border border-blue-400/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{initialData.notice === "success" ? "Payment received. Your order will update after Stripe confirms it." : initialData.notice === "cancelled" ? "Checkout was cancelled. No report was ordered." : "Your evaluation has been saved to this account."}</div>}
        {view === "overview" && <Overview customer={customer} reports={initialData.reports} orders={initialData.orders} websites={initialData.websites} score={score} latest={latest} choose={choose}/>} 
        {view === "reports" && <Reports reports={visibleReports}/>} 
        {view === "order" && <OrderReports websites={initialData.websites}/>} 
        {view === "accounts" && <LinkedAccounts/>} 
        {view === "orders" && <Orders orders={visibleOrders}/>} 
        {view === "settings" && <AccountSettings customer={customer} setCustomer={setCustomer}/>} 
      </main>
    </div>
    {support && <SupportModal customer={customer} close={() => setSupport(false)}/>} 
  </div>;
}

function Heading({ eyebrow, title, copy }) { return <header><p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>{copy && <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">{copy}</p>}</header>; }
function Card({ children, className = "" }) { return <section className={`rounded-2xl border border-white/10 bg-[#0b1220]/95 shadow-[0_18px_60px_rgba(0,0,0,.2)] ${className}`}>{children}</section>; }

function Overview({ customer, reports, orders, websites, score, latest, choose }) {
  const paid = orders.filter((o) => o.status === "paid").length;
  return <div className="space-y-5"><Card className="relative overflow-hidden border-blue-400/20 bg-[linear-gradient(125deg,#102249,#0b1428_52%,#211638)] p-7"><p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-300">Customer intelligence workspace</p><h1 className="mt-2 text-3xl font-bold">Welcome back{customer.name ? `, ${customer.name.split(" ")[0]}` : ""}.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Your reports, purchases, websites, and authorized data connections are managed here.</p><button onClick={() => choose(latest ? "reports" : "order")} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold">{latest ? "Open latest report" : "Choose a report"}</button><ShieldCheck className="absolute -bottom-12 right-0 h-56 w-56 text-blue-400/[.06]"/></Card>
    <div className="grid gap-5 lg:grid-cols-3"><Card className="p-6 lg:col-span-2"><h2 className="font-semibold">Latest evaluation</h2>{latest ? <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center"><div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-[12px] border-blue-500/25 text-center"><div><strong className="text-4xl">{score ?? "—"}</strong><span className="block text-xs text-white/40">{score == null ? "No score" : "out of 100"}</span></div></div><div><h3 className="text-xl font-semibold">{latest.title}</h3><p className="mt-2 text-sm leading-6 text-white/50">{latest.findings?.verdict || latest.findings?.summary || "Your report is ready for review."}</p><a href={`/api/reports/${latest.id}/download`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400">Download private PDF <Download className="h-4 w-4"/></a></div></div> : <p className="mt-6 text-sm text-white/45">No completed reports yet.</p>}</Card><div className="grid gap-5"><Card className="p-5"><p className="text-sm text-white/45">Saved reports</p><p className="mt-2 text-3xl font-bold">{reports.length}</p></Card><Card className="p-5"><p className="text-sm text-white/45">Paid orders</p><p className="mt-2 text-3xl font-bold">{paid}</p></Card><Card className="p-5"><p className="text-sm text-white/45">Websites</p><p className="mt-2 text-3xl font-bold">{websites.length}</p></Card></div></div>
    <Card className="p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Recent reports</h2><button onClick={() => choose("reports")} className="text-sm text-blue-400">View all</button></div><div className="mt-3 divide-y divide-white/10">{reports.slice(0,4).map((r) => <ReportRow key={r.id} report={r}/>)}</div></Card>
  </div>;
}

function ReportRow({ report }) { return <div className="grid gap-3 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:items-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"><FileText className="h-5 w-5"/></span><div><p className="font-medium">{report.title}</p><p className="mt-1 text-xs text-white/40">{titleCase(report.reportType)} · {date(report.generatedAt)}</p></div><span className={`w-fit rounded-full px-3 py-1 text-xs ${report.status === "complete" ? "bg-emerald-400/10 text-emerald-300" : "bg-violet-400/10 text-violet-300"}`}>{titleCase(report.status)}</span>{report.status === "complete" && (report.storagePath || report.blobUrl) ? <a href={`/api/reports/${report.id}/download`} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400">PDF <Download className="h-4 w-4"/></a> : <span/>}</div>; }
function Reports({ reports }) { return <div className="space-y-5"><Heading eyebrow="Report library" title="My Reports" copy="Every completed evaluation and advanced analysis connected to this account."/><Card className="divide-y divide-white/10 px-5">{reports.length ? reports.map((report) => <ReportRow key={report.id} report={report}/>) : <p className="py-12 text-center text-sm text-white/45">No reports yet. Run a free evaluation or order an advanced report.</p>}</Card></div>; }

function OrderReports({ websites }) { return <div className="space-y-5"><Heading eyebrow="Advanced intelligence" title="Order an Advanced Report" copy="Choose a focused report or combine all three into one cross-channel growth plan. Purchases use the existing secure Stripe checkout."/><div className="grid gap-4 lg:grid-cols-2">{Object.values(REPORT_OFFERS).map((offer) => <Card key={offer.code} className={`flex flex-col p-6 ${offer.code === "complete" ? "border-blue-400/45 ring-1 ring-blue-500/15" : ""}`}><div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300"><BarChart3 className="h-5 w-5"/></span>{offer.code === "complete" && <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">Best value</span>}</div><h2 className="mt-5 text-xl font-semibold">{offer.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-white/50">{offer.summary}</p><div className="mt-5 border-t border-white/10 pt-5"><span className="text-3xl font-bold">${offer.amountCents / 100}</span><DashboardCheckout offer={offer} websites={websites}/></div></Card>)}</div></div>; }

function LinkedAccounts() {
  const [status, setStatus] = useState(null); const [busy, setBusy] = useState("");
  const refresh = () => fetch("/api/connections/google/status", { cache: "no-store" }).then((r) => r.json()).then(setStatus);
  useEffect(() => { refresh().catch(() => setStatus({ connections: {}, configured: false })); }, []);
  async function disconnect(service) { setBusy(service); await fetch("/api/connections/google/disconnect", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service }) }); await refresh(); setBusy(""); }
  return <div className="space-y-5"><Heading eyebrow="Data control board" title="Linked Accounts" copy="Connect the exact business properties used to verify report findings. Access is temporary, read-only where supported, and removable at any time."/><div className="space-y-3">{SOURCES.map(([key, label, purpose]) => { const connected = Boolean(status?.connections?.[key]); const available = key !== "meta-ads"; return <Card key={key} className="grid gap-4 p-5 md:grid-cols-[minmax(240px,1fr)_minmax(280px,1.4fr)_auto] md:items-center"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300"><Globe2 className="h-5 w-5"/></span><div><p className="font-semibold">{label}</p><p className="text-xs text-white/35">{connected ? "Connected" : available ? "Not connected" : "Integration planned"}</p></div></div><p className="text-sm text-white/45">{purpose}</p><div className="flex justify-end">{!status ? <LoaderCircle className="h-4 w-4 animate-spin"/> : connected ? <button onClick={() => disconnect(key)} disabled={busy === key} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/60"><Unplug className="h-4 w-4"/>{busy === key ? "Removing…" : "Disconnect"}</button> : available && status.configured ? <a href={`/api/connections/google/start?service=${key}`} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold">Connect</a> : <span className="rounded-lg bg-white/[.04] px-3 py-2 text-xs text-white/35">Setup pending</span>}</div></Card>; })}</div><DashboardReevaluation/></div>;
}

function Orders({ orders }) { return <div className="space-y-5"><Heading eyebrow="Purchases" title="Orders" copy="Stripe payment and report-generation status for every advanced report purchase."/><Card className="overflow-hidden"><div className="divide-y divide-white/10">{orders.length ? orders.map((order) => <div key={order.id} className="grid gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center"><div><p className="font-medium">{REPORT_OFFERS[order.offerCode]?.name || titleCase(order.offerCode)}</p><p className="mt-1 text-xs text-white/40">{date(order.createdAt)}</p></div><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">{titleCase(order.status)}</span><span className="text-sm text-white/45">{titleCase(order.generationStatus)}</span></div>) : <p className="p-12 text-center text-sm text-white/45">No purchases yet.</p>}</div></Card></div>; }

function AccountSettings({ customer, setCustomer }) {
  const [form, setForm] = useState(customer); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function save(e) { e.preventDefault(); setBusy(true); const r = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await r.json(); setMessage(r.ok ? "Profile and business information saved." : data.error); if (r.ok) setCustomer(form); setBusy(false); }
  async function reset() { setBusy(true); try { await sendPasswordResetEmail(firebaseClientAuth(), customer.email); setMessage("Password reset email sent."); } catch { setMessage("Password reset email could not be sent."); } setBusy(false); }
  return <div className="space-y-5"><Heading eyebrow="Account settings" title="Profile & Business" copy="Keep the account and business details used for reports and support requests current."/><Card className="p-6"><form onSubmit={save} className="grid gap-5 bg-transparent shadow-none md:grid-cols-2">{[["name","Full name","text"],["phone","Phone number","tel"],["businessName","Business name","text"],["website","Website address","url"],["serviceArea","Service area / location","text"]].map(([key,label,type]) => <label key={key} className="text-sm font-medium">{label}<input type={type} required={key === "name"} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[.04] px-4"/></label>)}<label className="text-sm font-medium">Account email<input disabled value={customer.email} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[.025] px-4 text-white/40"/><span className="mt-1 block text-xs text-emerald-300">{customer.emailVerified ? "Verified by Firebase" : "Email verification pending"}</span></label><div className="flex items-center gap-3 md:col-span-2"><button disabled={busy} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold">{busy ? "Saving…" : "Save changes"}</button><button type="button" onClick={reset} disabled={busy} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold">Reset password</button>{message && <span className="text-sm text-blue-300">{message}</span>}</div></form></Card></div>;
}

function SupportModal({ customer, close }) {
  const initial = useMemo(() => ({ name: customer.name, businessName: customer.businessName, email: customer.email, phone: customer.phone, preferredContact: "email", topic: "Dashboard help", message: "" }), [customer]);
  const [form, setForm] = useState(initial); const [busy, setBusy] = useState(false); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  async function submit(e) { e.preventDefault(); setBusy(true); setError(""); const r = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await r.json(); if (r.ok) setSent(true); else setError(data.error || "Request could not be sent."); setBusy(false); }
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0b1220] p-6 shadow-2xl">{sent ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto h-11 w-11 text-emerald-300"/><h2 className="mt-4 text-xl font-semibold">Your request has been sent</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">Thank you. A Sentinels Design Lab team member will typically contact you within one business day. A confirmation was sent to {form.email}.</p><button onClick={close} className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold">Done</button></div> : <><div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">Contact customer support</h2><p className="mt-1 text-sm text-white/45">Confirm or update these details for this request.</p></div><button onClick={close}><X className="h-5 w-5"/></button></div><form onSubmit={submit} className="mt-6 grid gap-4 bg-transparent shadow-none sm:grid-cols-2">{[["name","Name","text"],["businessName","Business","text"],["email","Email to confirm","email"],["phone","Phone number","tel"]].map(([key,label,type]) => <label key={key} className="text-sm font-medium">{label}<input type={type} required={key === "name" || key === "email"} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[.04] px-4"/></label>)}<fieldset className="sm:col-span-2"><legend className="text-sm font-medium">Preferred contact method</legend><div className="mt-2 flex gap-2">{["email","phone"].map((m) => <label key={m} className={`cursor-pointer rounded-xl border px-4 py-2 text-sm capitalize ${form.preferredContact === m ? "border-blue-400/40 bg-blue-500/10 text-blue-300" : "border-white/10 text-white/50"}`}><input className="sr-only" type="radio" checked={form.preferredContact === m} onChange={() => setForm({ ...form, preferredContact: m })}/>{m}</label>)}</div></fieldset><label className="text-sm font-medium sm:col-span-2">Topic<select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#111a2c] px-4">{["Dashboard help","Report question","Linked account","Order or billing","Profile or sign-in","Other"].map((t) => <option key={t}>{t}</option>)}</select></label><label className="text-sm font-medium sm:col-span-2">Message<textarea required minLength={10} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-4"/></label>{error && <p className="text-sm text-red-300 sm:col-span-2">{error}</p>}<div className="flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={close} className="rounded-xl border border-white/10 px-4 py-2 text-sm">Cancel</button><button disabled={busy} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold">{busy ? "Sending…" : "Send request"}</button></div></form></>}</div></div>;
}

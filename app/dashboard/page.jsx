import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Download, FileText, Link2, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { listOwned } from "@/db/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { REPORT_OFFERS } from "@/lib/report-offers";
import DashboardCheckout from "@/components/pages/DashboardCheckout";
import DashboardConnections from "@/components/pages/DashboardConnections";
import DashboardLogout from "@/components/pages/DashboardLogout";
import { REPORTING_POLICY } from "@/lib/reporting-policy";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Reports | Sentinels Design Lab" };

export default async function DashboardPage({ searchParams }) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/sign-in");
  const userId = sessionUser.uid;
  const user = await adminAuth().getUser(userId);
  const params = await searchParams;
  const [savedReports, savedWebsites, savedOrders] = await Promise.all([
    listOwned("reports", userId), listOwned("websites", userId), listOwned("orders", userId),
  ]);

  return <main className="min-h-screen pb-24 pt-28"><section className="mx-auto max-w-6xl px-6">
    <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end"><div><span className="eyebrow mb-4">Secure Customer Portal</span><h1 className="font-heading text-4xl font-bold">Welcome{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}</h1><p className="mt-3 text-muted-foreground">Your websites, completed reports, purchases, and temporary data connections stay connected to this account.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="#connections" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold"><Link2 className="h-4 w-4" />Report data connections</Link><Link href="/evaluation" className="btn-primary inline-flex items-center justify-center gap-2"><Plus className="h-4 w-4" />New free snapshot</Link><DashboardLogout /></div></div>
    {params?.created === "1" && <div className="mt-8 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5 text-emerald-50"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-300" /><div><h2 className="font-semibold">Your free report is ready and saved to your account.</h2><p className="mt-1 text-sm text-emerald-100/70">Review it whenever you like, then choose an advanced report or connect data sources when you are ready.</p></div></div></div>}
    {params?.created === "1" && params?.delivery === "failed" && <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm text-amber-100"><strong>Your report is safely stored here, but the email copy could not be delivered.</strong><span className="mt-1 block text-amber-100/70">Use the private PDF link below. Sentinels has recorded the delivery issue for follow-up.</span></div>}
    {params?.checkout === "success" && <div className="mt-8 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 text-sm text-emerald-100"><ShieldCheck className="mr-2 inline h-5 w-5" />Payment received. Your order will appear after Stripe’s signed confirmation is processed.</div>}
    {params?.checkout === "cancelled" && <div className="mt-8 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm text-amber-100">Checkout was cancelled. No report was ordered.</div>}

    <section className="mt-12"><span className="eyebrow mb-4">Saved Reports</span><h2 className="font-heading text-3xl font-bold">Your report library</h2><p className="mt-2 text-sm text-muted-foreground">Reports stay private and available from this account.</p>{savedReports.length ? <div className="mt-5 grid gap-4 md:grid-cols-2">{savedReports.map((report) => <article key={report.id} className={`rounded-2xl border bg-card p-6 ${params?.report === report.id ? "border-primary/50 ring-1 ring-primary/20" : "border-white/10"}`}><div className="flex items-start justify-between gap-4"><FileText className="h-6 w-6 text-primary" /><span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-muted-foreground">{report.status}</span></div><h3 className="mt-4 font-semibold">{report.title}</h3><p className="mt-2 text-xs text-muted-foreground">{report.generatedAt ? new Date(report.generatedAt).toLocaleDateString("en-US") : "Date unavailable"}</p>{report.findings?.verdict && <p className="mt-4 text-sm leading-6 text-muted-foreground">{report.findings.verdict}</p>}{report.status === "complete" && (report.storagePath || report.blobUrl) && <a href={`/api/reports/${report.id}/download`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Open private PDF <Download className="h-4 w-4" /></a>}{report.status === "complete" && !report.storagePath && !report.blobUrl && <p className="mt-4 text-sm text-amber-200">The report record exists, but its PDF file needs recovery.</p>}</article>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-white/15 p-8 text-sm text-muted-foreground">No reports yet. Start with the free website readiness snapshot.</div>}</section>

    <section className="mt-16"><span className="eyebrow mb-4">Advanced Reports</span><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="font-heading text-3xl font-bold">Three focused reports. One complete bundle.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Choose SEO Intelligence, PPC Intelligence, a Website &amp; Conversion Deep Dive, or combine all three in the Complete Growth Intelligence Bundle.</p></div><ShoppingBag className="h-8 w-8 text-primary" /></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{Object.values(REPORT_OFFERS).map((offer) => <article key={offer.code} className="rounded-2xl border border-white/10 bg-card p-6"><h3 className="font-semibold">{offer.name}</h3><div className="mt-3 font-heading text-3xl font-bold text-primary">${(offer.amountCents / 100).toFixed(0)}</div><p className="mt-2 text-xs leading-5 text-muted-foreground">{offer.summary}</p><DashboardCheckout offer={offer} /></article>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-xs leading-5 text-amber-100/80">{REPORTING_POLICY.pendingAccessNotice} {REPORTING_POLICY.rerunNotice}</div><div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4 text-xs leading-5 text-muted-foreground">{REPORTING_POLICY.enhancedFreeNotice}</div></div><div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-muted-foreground">{REPORTING_POLICY.changeNotice}</div><Link href="/systems/sis" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Compare report contents <ArrowRight className="h-4 w-4" /></Link></section>

    <DashboardConnections />

    {(savedWebsites.length > 0 || savedOrders.length > 0) && <section className="mt-14 grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-card p-6"><h2 className="font-heading text-xl font-bold">Saved websites</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{savedWebsites.map((website) => <li key={website.id}><strong className="text-foreground">{website.businessName}</strong><br />{website.url}</li>)}</ul></div><div className="rounded-2xl border border-white/10 bg-card p-6"><h2 className="font-heading text-xl font-bold">Orders</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{savedOrders.map((order) => <li key={order.id} className="flex justify-between gap-4"><span>{REPORT_OFFERS[order.offerCode]?.name || order.offerCode}</span><span className="text-foreground">{order.status}</span></li>)}</ul></div></section>}
  </section></main>;
}

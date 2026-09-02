import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, FileText, Plus, ShieldCheck } from "lucide-react";
import { listOwned } from "@/db/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";
import { REPORT_OFFERS } from "@/lib/report-offers";
import DashboardCheckout from "@/components/pages/DashboardCheckout";

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
    <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end"><div><span className="eyebrow mb-4">Secure Customer Portal</span><h1 className="font-heading text-4xl font-bold">Welcome{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}</h1><p className="mt-3 text-muted-foreground">Your websites, completed reports, and purchases stay connected to this verified account.</p></div><Link href="/evaluation" className="btn-primary inline-flex items-center justify-center gap-2"><Plus className="h-4 w-4" />New free snapshot</Link></div>
    {params?.checkout === "success" && <div className="mt-8 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 text-sm text-emerald-100"><ShieldCheck className="mr-2 inline h-5 w-5" />Payment received. Your order will appear after Stripe’s signed confirmation is processed.</div>}
    {params?.checkout === "cancelled" && <div className="mt-8 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm text-amber-100">Checkout was cancelled. No report was ordered.</div>}

    <section className="mt-12"><h2 className="font-heading text-2xl font-bold">My reports</h2>{savedReports.length ? <div className="mt-5 grid gap-4 md:grid-cols-2">{savedReports.map((report) => <article key={report.id} className="rounded-2xl border border-white/10 bg-card p-6"><div className="flex items-start justify-between gap-4"><FileText className="h-6 w-6 text-primary" /><span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-muted-foreground">{report.status}</span></div><h3 className="mt-4 font-semibold">{report.title}</h3><p className="mt-2 text-xs text-muted-foreground">{new Date(report.generatedAt).toLocaleDateString("en-US")}</p>{report.status === "complete" && <a href={`/api/reports/${report.id}/download`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Download private PDF <Download className="h-4 w-4" /></a>}</article>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-white/15 p-8 text-sm text-muted-foreground">No reports yet. Start with the free website readiness snapshot.</div>}</section>

    <section className="mt-14"><h2 className="font-heading text-2xl font-bold">Report offers</h2><p className="mt-2 text-sm text-muted-foreground">Choose individual reports or save with a bundle. Checkout is securely handled by Stripe.</p><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Object.values(REPORT_OFFERS).map((offer) => <article key={offer.code} className="rounded-2xl border border-white/10 bg-card p-6"><h3 className="font-semibold">{offer.name}</h3><div className="mt-3 font-heading text-3xl font-bold text-primary">${(offer.amountCents / 100).toFixed(0)}</div><p className="mt-2 text-xs leading-5 text-muted-foreground">Hosting credit: {offer.hostingCredit}</p><DashboardCheckout offerCode={offer.code} /></article>)}</div></section>

    {(savedWebsites.length > 0 || savedOrders.length > 0) && <section className="mt-14 grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-card p-6"><h2 className="font-heading text-xl font-bold">Saved websites</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{savedWebsites.map((website) => <li key={website.id}><strong className="text-foreground">{website.businessName}</strong><br />{website.url}</li>)}</ul></div><div className="rounded-2xl border border-white/10 bg-card p-6"><h2 className="font-heading text-xl font-bold">Orders</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{savedOrders.map((order) => <li key={order.id} className="flex justify-between gap-4"><span>{REPORT_OFFERS[order.offerCode]?.name || order.offerCode}</span><span className="text-foreground">{order.status}</span></li>)}</ul></div></section>}
  </section></main>;
}

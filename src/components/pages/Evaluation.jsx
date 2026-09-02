"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileText, Globe2, LoaderCircle, Mail, ShieldCheck } from "lucide-react";

const initialForm = { name: "", email: "", phone: "", businessName: "", website: "", primaryService: "", location: "", company: "" };

export default function Evaluation() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [report, setReport] = useState(null);
  const [delivery, setDelivery] = useState(null);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function generateReport() {
    const response = await fetch("/api/evaluation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "The evaluation could not be completed.");
    setResult(payload.evaluation);
    setReport({ url: payload.report.url, filename: payload.report.filename });
    setDelivery(payload.delivery);
  }

  async function submit(event) {
    event.preventDefault();
    if (form.company) return;
    setLoading(true);
    setError("");

    try {
      await generateReport();
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        {!result && <div className="mb-12 max-w-3xl"><span className="eyebrow mb-5">Sentinel Intelligence System</span><h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">Get your free website readiness snapshot</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">See separate homepage-readiness scores alongside the critical SEO, traffic, local, paid-media, and conversion areas that still need verification. No misleading overall health score.</p></div>}

        {result ? (
          <Completion result={result} report={report} delivery={delivery} email={form.email} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <form onSubmit={submit} className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
              <input name="company" value={form.company} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" value={form.name} onChange={update} required />
                <Field label="Business name" name="businessName" value={form.businessName} onChange={update} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={update} required />
                <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update} />
                <div className="sm:col-span-2"><Field label="Website address" name="website" placeholder="https://yourbusiness.com" value={form.website} onChange={update} required /></div>
                <Field label="Primary service" name="primaryService" placeholder="What do customers hire you for?" value={form.primaryService} onChange={update} required />
                <Field label="City / service area" name="location" value={form.location} onChange={update} />
              </div>
              {error && <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 disabled:opacity-60">{loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Preparing your report</> : <>Get My Free Report <ArrowRight className="h-4 w-4" /></>}</button>
              <p className="mt-4 text-center text-sm text-muted-foreground">Already have reports? <Link href="/sign-in" className="font-semibold text-primary">Sign in by secure email link</Link></p>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" /> No password is created or stored. We email a secure, expiring link to your private report portal.</p>
            </form>
            <EvaluationPreview />
          </div>
        )}
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return <label className="block text-sm font-medium text-foreground">{label}{props.required && <span className="text-primary"> *</span>}<input {...props} className="mt-2 w-full rounded-lg border border-border/60 bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/60" /></label>;
}

function EvaluationPreview() {
  return <aside className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-6 sm:p-8"><Globe2 className="h-10 w-10 text-primary" /><h2 className="mt-6 font-heading text-2xl font-bold">A truthful snapshot backed by visible evidence</h2><ul className="mt-6 space-y-4 text-sm text-muted-foreground">{["Seven independent homepage-readiness scores", "Broken links, dead controls, and contact-path checks", "Visible security, risk, and outdated-content warnings", "Exact page, evidence, test time, and verification steps", "Clear list of what was not measured", "Branded PDF and formatted email"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{item}</li>)}</ul><div className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Important:</strong> This free snapshot tests one public page. It is not a full-site crawl, compliance opinion, or security penetration test. Anything not directly verified is labeled accordingly.</div></aside>;
}

function Completion({ result, report, delivery, email }) {
  const testedAt = new Date(result.generatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  return <div className="mx-auto max-w-5xl"><div className="rounded-[28px] border border-primary/20 bg-card p-7 shadow-2xl sm:p-12"><div><span className="eyebrow mb-5">Readiness Snapshot Complete</span><h1 className="font-heading text-3xl font-bold sm:text-4xl">Seven measured areas. Six critical unknowns.</h1><p className="mt-4 max-w-3xl text-muted-foreground">We reviewed the public homepage and visible controls for <strong className="text-foreground">{result.businessName}</strong>. Every priority below includes something the owner can inspect directly. Tested {testedAt}.</p></div>
      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{result.categories.map((category) => <div key={category.key} className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><div className="text-2xl font-bold text-foreground">{category.score}</div><div className="mt-1 text-xs leading-5 text-muted-foreground">{category.label}</div></div>)}</div>
      <div className="mt-9"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><span className="eyebrow">Evidence you can verify</span><h2 className="mt-3 font-heading text-2xl font-bold">Priority findings</h2></div><p className="text-xs text-muted-foreground">Passed · Warning · Failed · Not verified</p></div><div className="mt-5 space-y-4">{result.priorities?.map((item, index) => <article key={`${item.category}-${item.title}`} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="flex flex-wrap items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-slate-950">{index + 1}</span><strong className="text-foreground">{item.title}</strong><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.status === "Warning" ? "bg-amber-300/10 text-amber-200" : "bg-red-400/10 text-red-200"}`}>{item.status || "Failed"}</span></div><dl className="mt-4 grid gap-4 text-sm md:grid-cols-2"><div><dt className="font-semibold text-foreground">What we observed</dt><dd className="mt-1 break-words leading-6 text-muted-foreground">{item.evidence || item.recommendation}</dd></div><div><dt className="font-semibold text-foreground">Verify it yourself</dt><dd className="mt-1 break-words leading-6 text-muted-foreground">{item.reproduce || `Review ${item.pageUrl || result.url} and confirm the finding.`}</dd></div></dl><div className="mt-4 border-t border-white/8 pt-3 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Page:</span> {item.pageUrl || result.url}</div></article>)}</div></div>
      <div className="mt-7 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5"><h2 className="font-heading text-lg font-bold text-amber-100">Not established by this free snapshot</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{result.unverifiedDimensions?.map((item) => <div key={item.key} className="rounded-xl border border-amber-200/10 bg-black/10 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-foreground">{item.label}</strong><span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-200">{item.status}</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{item.reason}</p></div>)}</div></div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-5"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-primary" /><strong>Branded PDF report</strong></div><p className="mt-2 text-sm text-muted-foreground">Download the complete scorecard, strengths, and priority action plan.</p>{report && <a href={report.url} download={report.filename} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Download report <Download className="h-4 w-4" /></a>}</div><div className="rounded-xl border border-white/10 bg-white/[0.025] p-5"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><strong>{delivery?.sent ? "Report sent by email" : "Email delivery is being connected"}</strong></div><p className="mt-2 text-sm text-muted-foreground">{delivery?.sent ? <>A formatted copy and PDF attachment were sent to <span className="text-foreground">{email}</span>.</> : "Your PDF is ready to download now. Branded email delivery will activate when the sending domain is connected."}</p></div></div>
      <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row"><Link href="/advanced-reports" className="btn-primary inline-flex items-center justify-center gap-2">View advanced reports <ArrowRight className="h-4 w-4" /></Link><Link href="/contact?message=I%20would%20like%20help%20reviewing%20my%20SIS%20evaluation" className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold">Review my results with SDL</Link></div></div></div>;
}

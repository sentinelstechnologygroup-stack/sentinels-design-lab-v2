"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, LoaderCircle, ShieldCheck } from "lucide-react";

const initialForm = { name: "", email: "", phone: "", businessName: "", website: "", primaryService: "", location: "", company: "" };

export default function Evaluation() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (form.company) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "The evaluation could not be completed.");
      setResult(payload.evaluation);

      fetch("https://formspree.io/f/mnjgoknr", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Free SIS Website Evaluation",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "Not provided",
          business: form.businessName.trim(),
          website: form.website.trim(),
          primaryService: form.primaryService.trim(),
          location: form.location.trim() || "Not provided",
          score: payload.evaluation.score,
          source: "SDL Free SIS Evaluation",
        }),
      }).catch(() => {});
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <span className="eyebrow mb-5">Sentinel Intelligence System</span>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">Get your free basic website evaluation</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">Enter your business details and SIS will inspect your public website for technical, search, content, and conversion fundamentals.</p>
        </div>

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

            <button type="submit" disabled={loading} className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Inspecting your website</> : <>Run My Free Evaluation <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" /> By submitting, you agree that SDL may evaluate the public website and contact you about the results. No obligation.</p>
          </form>

          <aside className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-6 sm:p-8">
            {result ? <EvaluationResult result={result} /> : <EvaluationPreview />}
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return <label className="block text-sm font-medium text-foreground">{label}{props.required && <span className="text-primary"> *</span>}<input {...props} className="mt-2 w-full rounded-lg border border-border/60 bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/60" /></label>;
}

function EvaluationPreview() {
  return <div><Globe2 className="h-10 w-10 text-primary" /><h2 className="mt-6 font-heading text-2xl font-bold">Your basic SIS evaluation includes</h2><ul className="mt-6 space-y-4 text-sm text-muted-foreground">{["Website health score", "Technical and search fundamentals", "Immediate improvement priorities", "Clear next-step recommendations"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{item}</li>)}</ul><div className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-muted-foreground">The complete SIS series adds Landing Pages, Google Profile, Competitive Analysis, Content, Conversion, Paid Advertising, Social Media, Reputation, Technical Experience, and Website Effectiveness reports.</div></div>;
}

function EvaluationResult({ result }) {
  return <div><div className="flex items-end gap-3"><span className="font-heading text-6xl font-bold text-primary">{result.score}</span><span className="pb-2 text-muted-foreground">/ 100</span></div><h2 className="mt-3 font-heading text-2xl font-bold">{result.verdict}</h2><div className="mt-7"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Top priorities</h3><ul className="mt-3 space-y-3">{result.priorities.map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></div>{result.highlights.length > 0 && <div className="mt-7"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">What is working</h3><ul className="mt-3 space-y-3">{result.highlights.map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></div>}<Link href="/systems/sis" className="btn-primary mt-8 inline-flex items-center gap-2">Explore all SIS reports <ArrowRight className="h-4 w-4" /></Link></div>;
}

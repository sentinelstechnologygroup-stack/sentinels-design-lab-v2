"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  CircleAlert,
  LineChart,
  LoaderCircle,
  MousePointerClick,
  Search,
  ShieldCheck,
  Tags,
  Unplug,
} from "lucide-react";

const googleConnections = [
  { key: "search-console", name: "Google Search Console", icon: Search, value: "Actual search queries, clicks, impressions, positions, pages, and indexing evidence.", reports: "WER · TER · SCR · LPR · CAR" },
  { key: "analytics", name: "Google Analytics 4", icon: LineChart, value: "Actual traffic, engagement, lead events, purchases, and conversion paths.", reports: "WER · LPR · CRO · PAR" },
  { key: "business-profile", name: "Google Business Profile", icon: Building2, value: "Local profile information, locations, reviews, and customer activity available to the owner.", reports: "GBR · RRR · CAR" },
  { key: "ads", name: "Google Ads", icon: BarChart3, value: "Campaign, keyword, search-term, spending, click, and conversion performance.", reports: "PAR · LPR · CRO" },
  { key: "tag-manager", name: "Google Tag Manager", icon: Tags, value: "Read-only verification of analytics, advertising, and conversion tracking configuration.", reports: "TER · CRO · PAR" },
];

const futureConnections = [
  { name: "Microsoft Clarity", icon: MousePointerClick, value: "Heatmaps, recordings, dead clicks, rage clicks, and behavioral conversion evidence." },
  { name: "Meta & Microsoft Ads", icon: Activity, value: "Optional advertising performance and cross-channel comparisons." },
];

export default function AdvancedReports() {
  const [status, setStatus] = useState({ configured: false, connections: {} });
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState("");
  const [resources, setResources] = useState({});
  const [resourceErrors, setResourceErrors] = useState({});
  const [resourceLoading, setResourceLoading] = useState({});
  const [chosen, setChosen] = useState({});
  const [saving, setSaving] = useState("");
  const [preview, setPreview] = useState(null);

  async function loadStatus() {
    const response = await fetch("/api/connections/google/status", { cache: "no-store" });
    const payload = await response.json();
    setStatus(payload);
    setLoading(false);
  }

  useEffect(() => { loadStatus().catch(() => setLoading(false)); }, []);

  useEffect(() => {
    Object.entries(status.connections || {}).forEach(([service, connected]) => {
      if (connected && !resources[service] && !resourceLoading[service] && !resourceErrors[service]) loadResources(service);
    });
  }, [status.connections]);

  async function loadResources(service) {
    setResourceLoading((current) => ({ ...current, [service]: true }));
    const response = await fetch(`/api/connections/google/resources?service=${encodeURIComponent(service)}`, { cache: "no-store" });
    const payload = await response.json();
    if (response.ok) {
      setResources((current) => ({ ...current, [service]: payload.resources || [] }));
      setChosen((current) => ({ ...current, [service]: status.selections?.[service]?.id || payload.resources?.[0]?.id || "" }));
    } else setResourceErrors((current) => ({ ...current, [service]: payload.error || "Accounts could not be loaded." }));
    setResourceLoading((current) => ({ ...current, [service]: false }));
  }

  async function saveSelection(service) {
    setSaving(service);
    setPreview(null);
    const response = await fetch("/api/connections/google/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, resourceId: chosen[service] }),
    });
    const payload = await response.json();
    if (response.ok) {
      await loadStatus();
      if (service === "search-console") {
        const previewResponse = await fetch("/api/connections/google/preview?service=search-console", { cache: "no-store" });
        const previewPayload = await previewResponse.json();
        setPreview(previewResponse.ok ? previewPayload.preview : { error: previewPayload.error });
      }
    } else setResourceErrors((current) => ({ ...current, [service]: payload.error || "The selection could not be saved." }));
    setSaving("");
  }

  async function disconnect(service) {
    setDisconnecting(service);
    await fetch("/api/connections/google/disconnect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service }),
    });
    await loadStatus();
    setResources((current) => ({ ...current, [service]: null }));
    setResourceErrors((current) => ({ ...current, [service]: null }));
    if (service === "search-console") setPreview(null);
    setDisconnecting("");
  }

  return (
    <main className="min-h-screen pb-24 pt-28">
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_.72fr]">
          <div>
            <span className="eyebrow mb-5">Advanced SIS Reports</span>
            <h1 className="max-w-4xl font-heading text-4xl font-bold text-foreground sm:text-5xl">Connect real business data without sharing a password</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Authorize the accounts needed for a verified SEO, advertising, local visibility, or conversion report. Sign-in happens on the provider’s official website, access is read-only wherever available, and one-time connections expire automatically.</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-foreground"><ShieldCheck className="h-5 w-5 text-primary" />One-Time Report Access</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">The default connection lasts no longer than one hour. Sentinels does not receive or store the customer’s provider password.</p>
          </div>
        </div>

        <ConnectionNotice configured={status.configured} loading={loading} />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {googleConnections.map((connection) => {
            const connected = Boolean(status.connections?.[connection.key]);
            const Icon = connection.icon;
            return (
              <article key={connection.key} className={`rounded-2xl border p-6 ${connected ? "border-emerald-400/35 bg-emerald-400/[0.06]" : "border-white/10 bg-card"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${connected ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.06] text-muted-foreground"}`}>{connected ? <><Check className="h-3.5 w-3.5" /> Connected temporarily</> : "Not connected"}</span>
                </div>
                <h2 className="mt-5 font-heading text-xl font-semibold text-foreground">{connection.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{connection.value}</p>
                <div className="mt-4 text-xs text-white/45">Supports: {connection.reports}</div>
                <div className="mt-6">
                  {connected ? (
                    <div className="space-y-4">
                      <ResourceSelector connection={connection} resources={resources[connection.key]} error={resourceErrors[connection.key]} loading={resourceLoading[connection.key]} chosen={chosen[connection.key] || ""} selected={status.selections?.[connection.key]} saving={saving === connection.key} onChange={(value) => setChosen((current) => ({ ...current, [connection.key]: value }))} onSave={() => saveSelection(connection.key)} onRetry={() => { setResourceErrors((current) => ({ ...current, [connection.key]: null })); loadResources(connection.key); }} />
                      {connection.key === "search-console" && preview && <SearchPreview preview={preview} />}
                      <button onClick={() => disconnect(connection.key)} disabled={disconnecting === connection.key} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white/55 hover:text-foreground disabled:opacity-50">{disconnecting === connection.key ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Unplug className="h-4 w-4" />} Disconnect now</button>
                    </div>
                  ) : (
                    <a href={`/api/connections/google/start?service=${connection.key}`} className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold ${status.configured ? "bg-primary text-slate-950" : "border border-white/15 text-white/55"}`} aria-disabled={!status.configured} onClick={(event) => { if (!status.configured) event.preventDefault(); }}>Connect securely <ArrowRight className="h-4 w-4" /></a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 rounded-[28px] border border-white/10 bg-[#08101d] p-7 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><span className="eyebrow mb-4">Simple By Design</span><h2 className="font-heading text-3xl font-bold">What happens after connecting?</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The customer selects the correct property or account, Sentinels collects only the approved report data, and the temporary authorization is removed after collection.</p></div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {["Sign in on Google’s official page", "Choose the business property", "Approve clearly listed access", "Sentinels collects report data", "Authorization expires or disconnects", "Customer receives the finished report"].map((step, index) => <li key={step} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm text-muted-foreground"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-7"><span className="eyebrow mb-4">Additional Sources</span><h2 className="font-heading text-3xl font-bold">Optional advanced connections</h2></div>
          <div className="grid gap-5 md:grid-cols-2">{futureConnections.map(({ name, icon: Icon, value }) => <div key={name} className="rounded-2xl border border-white/10 bg-card p-6"><div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]"><Icon className="h-5 w-5 text-primary" /></div><div><h3 className="font-semibold text-foreground">{name}</h3><span className="text-xs text-white/40">Coming with the advanced report pipeline</span></div></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{value}</p></div>)}</div>
        </section>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row"><Link href="/systems/sis" className="btn-primary inline-flex items-center justify-center gap-2">Explore SIS reports <ArrowRight className="h-4 w-4" /></Link><Link href="/contact?message=I%20would%20like%20help%20selecting%20an%20advanced%20SIS%20report" className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold">Help me choose a report</Link></div>
      </section>
    </main>
  );
}

function ResourceSelector({ connection, resources, error, loading, chosen, selected, saving, onChange, onSave, onRetry }) {
  if (loading) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Loading available properties…</div>;
  if (error) return <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm text-amber-100"><div>{error}</div><button onClick={onRetry} className="mt-3 font-semibold text-primary">Try again</button></div>;
  if (!resources?.length) return <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm text-muted-foreground">No accessible {connection.shortLabel || connection.name} properties were returned by Google.</div>;
  return <div className="rounded-xl border border-white/10 bg-black/10 p-4">
    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55" htmlFor={`resource-${connection.key}`}>Choose the account or property</label>
    <select id={`resource-${connection.key}`} value={chosen} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#07101d] px-3 text-sm text-foreground">
      {resources.map((resource) => <option key={resource.id} value={resource.id}>{resource.label}{resource.detail ? ` — ${resource.detail}` : ""}</option>)}
    </select>
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button onClick={onSave} disabled={!chosen || saving} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-950 disabled:opacity-50">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />}{selected?.id === chosen ? "Refresh report preview" : "Use this property"}</button>
      {selected && <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300"><Check className="h-3.5 w-3.5" />Selected: {selected.label}</span>}
    </div>
  </div>;
}

function SearchPreview({ preview }) {
  if (preview.error) return <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm text-amber-100">{preview.error}</div>;
  return <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Verified 28-day preview</div>
    <div className="mt-3 grid grid-cols-3 gap-3 text-center">
      <Metric label="Clicks" value={Number(preview.clicks || 0).toLocaleString()} />
      <Metric label="Impressions" value={Number(preview.impressions || 0).toLocaleString()} />
      <Metric label="CTR" value={`${((preview.ctr || 0) * 100).toFixed(1)}%`} />
    </div>
    <div className="mt-3 text-[11px] text-white/40">Google Search Console · {preview.period}</div>
  </div>;
}

function Metric({ label, value }) {
  return <div className="rounded-lg bg-black/15 p-3"><div className="font-heading text-lg font-bold text-foreground">{value}</div><div className="mt-1 text-[11px] text-muted-foreground">{label}</div></div>;
}

function ConnectionNotice({ configured, loading }) {
  if (loading) return <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Checking secure connection availability…</div>;
  if (configured) return <div className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 text-sm text-emerald-100"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><div><strong>Secure Google connections are available.</strong><div className="mt-1 text-emerald-100/70">Choose only the systems needed for the selected report. Each connection is handled separately.</div></div></div>;
  return <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm text-amber-100"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" /><div><strong>The customer connection screen is ready, but provider setup is not active yet.</strong><div className="mt-1 text-amber-100/70">Google must approve the Sentinels authorization application and its credentials must be added before customers can connect.</div></div></div>;
}

"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import {
  bestFit,
  capabilityCards,
  homeHeroTags,
  opportunityPoints,
  primaryCta,
  processSteps,
  secondaryCta,
  whatWeDo,
  whySentinels,
} from "@/lib/siteData";

const heroTiles = [
  {
    src: "/images/home/tile-branding.png",
    alt: "Website redesign work",
    label: "Website Redesigns",
    className: "row-span-2",
  },
  {
    src: "/images/home/tile-web-design.png",
    alt: "Custom website builds",
    label: "Custom Websites",
    className: "",
  },
  {
    src: "/images/home/tile-mobile.png",
    alt: "Portals and dashboards",
    label: "Portals & Dashboards",
    className: "",
  },
  {
    src: "/images/home/tile-seo.png",
    alt: "SEO foundation and lead flow",
    label: "SEO Foundation",
    className: "",
  },
  {
    src: "/images/home/tile-video.png",
    alt: "Automation and integrations",
    label: "Automations",
    className: "",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden text-white">
      <section className="relative bg-transparent pb-8 pt-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-10 lg:pb-16">
              <span className="eyebrow mb-6 px-4 py-1.5 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                Website redesigns first. Full-stack capability behind them.
              </span>

              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Websites Built to <span className="text-primary">Win More Business</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We design and build modern websites and custom digital systems for businesses that need stronger trust, clearer messaging, better lead flow, and scalable infrastructure.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {homeHeroTags.map((tag) => (
                  <span key={tag} className="pill px-3 py-1.5 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-10 flex flex-wrap gap-4">
                <Link href={primaryCta.path} className="btn-primary px-8 py-3.5 text-sm">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link href={secondaryCta.path} className="btn-secondary px-8 py-3.5 text-sm">
                  {secondaryCta.label}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Modern websites
                </div>
                <div className="inline-flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  Portals, dashboards, and automations
                </div>
                <div className="inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  Controlled builds and managed infrastructure
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-[2rem] bg-sky-400/8 blur-2xl" />
              <div className="relative grid h-[560px] grid-cols-2 grid-rows-3 gap-3">
                {heroTiles.map((tile) => (
                  <div
                    key={tile.label}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent shadow-[0_16px_50px_rgba(0,0,0,0.28)] ${tile.className}`}
                  >
                    <img
                      src={tile.src}
                      alt={tile.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {tile.label}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute -left-5 top-1/2 z-10 -translate-y-1/2 panel-safe px-4 py-3">
                  <div className="text-2xl font-heading font-bold text-primary">Launch Wedge</div>
                  <div className="text-xs text-slate-300">Website evaluations and redesigns</div>
                </div>

                <div className="absolute -right-4 bottom-16 z-10 panel-safe px-4 py-3">
                  <div className="inline-flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-white">Full-stack capability beyond the public site</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Capabilities</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Website-first launch positioning with deeper digital capability
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              SDL helps businesses modernize their online presence and build practical digital systems that improve trust, lead flow, operations, and scalability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((service) => (
              <Link
                key={service.title}
                href="/services"
                className="group block h-full panel-safe p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Core capability</div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  See service details
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Do</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Modern websites backed by practical systems thinking</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whatWeDo.map((item) => (
                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Best Fit</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Best for businesses ready to modernize beyond a basic brochure site</h2>
            <div className="mt-6 space-y-3">
              {bestFit.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Sentinels</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">A cleaner website launch now, stronger digital infrastructure later</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whySentinels.map((item) => (
              <div key={item.title} className="panel-safe p-7">
                <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Process</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Evaluate. Scope. Build. Launch & refine.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="panel-safe p-7">
                <div className="text-sm font-semibold tracking-[0.18em] text-primary">{step.step}</div>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe-heavy px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Opportunity</div>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Website redesign is the launch wedge. Better digital systems are the broader capability.
                </h2>
                <p className="mt-4 max-w-3xl text-muted-foreground">
                  The fastest path to revenue is usually a cleaner website evaluation and rebuild. But the brand should still make clear that SDL can build portals, dashboards, automations, integrations, and full-stack solutions when the business needs more.
                </p>
              </div>
              <div className="grid gap-3">
                {opportunityPoints.map((point) => (
                  <div key={point} className="surface-subtle px-4 py-4 text-sm text-white/80">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

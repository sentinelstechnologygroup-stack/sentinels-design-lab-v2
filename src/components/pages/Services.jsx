"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  BarChart3,
  LayoutDashboard,
  Cpu,
  Palette,
  Wrench,
  Store,
  Building2,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import {
  capabilityCards,
  processSteps,
  servicesPage,
  opportunityPoints,
} from "@/lib/siteData";

const capabilityIconMap = {
  "Website Redesigns": Globe,
  "Custom Website Builds": Palette,
  "SEO Foundation": Search,
  "Lead Path Cleanup": BarChart3,
  "Portals & Dashboards": LayoutDashboard,
  "Automation & Integrations": Cpu,
};

const whoItIsFor = [
  {
    icon: Wrench,
    label: "Contractors & Trades",
    desc: "Roofing, plumbing, HVAC, electrical, landscaping — businesses that win work on trust and local reputation.",
  },
  {
    icon: Store,
    label: "Local Service Businesses",
    desc: "Any service operator who needs a stronger first impression and a cleaner path from visitor to call or form.",
  },
  {
    icon: Building2,
    label: "Growing Small Businesses",
    desc: "Teams that have outgrown a DIY site or WordPress and need something built for where they are actually going.",
  },
  {
    icon: Cpu,
    label: "Operations-Forward Teams",
    desc: "Businesses that need more than pages — portals, dashboards, and workflow systems that reduce manual overhead.",
  },
];

export default function Services() {
  return (
    <div className="relative overflow-hidden text-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-transparent pb-8 pt-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className=""
            >
              <span className="eyebrow mb-6">Services</span>

              <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Websites and Digital Systems{" "}
                <span className="text-primary">Built for Real Business</span>
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                SDL designs and builds modern websites, web applications, portals,
                dashboards, and digital systems for service businesses that need
                more than a template — and more than decorative design.
              </p>

              <div className="mb-4 flex flex-wrap gap-4">
                <Link
                  href="https://reports.sentinelsdesignlab.com/evaluation"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
                >
                  Get Website Evaluation
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-sky-400/[0.06] px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-sky-400/[0.10]"
                >
                  View Our Work
                </Link>
              </div>

              <p className="text-xs text-muted-foreground/70">
                No commitment. Free evaluation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#050816] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/hero/services-hero.webp"
                    alt="Custom website and digital system design by Sentinels Design Lab"
                    fill
                    priority
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/45 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">
              What We Do
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Core Service Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every service is built around one goal: a stronger, cleaner
              digital presence that earns trust and moves visitors toward action.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((card, i) => {
              const Icon = capabilityIconMap[card.title] || Globe;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">
              Who It's For
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Built for Businesses That Need Real Results
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              SDL works best with businesses that need a stronger online
              presence, clearer positioning, and a website that actively
              supports lead flow.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoItIsFor.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-sm font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c1322] px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:px-12">
            <div className="mb-10 text-center">
              <span className="eyebrow mb-4">
                What You Get
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                What a Better Website Actually Does
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Every SDL engagement is built around outcomes that move the
                business forward — not deliverables that just look good in a
                preview.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {opportunityPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="inline-flex items-start gap-3 rounded-xl readability-inner px-4 py-3.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 border-t border-white/8" style={{ background: '#07101f' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">
              How It Works
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              A Structured Build Process From Day One
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We start with an evaluation, not a quote. Every project is scoped
              after we understand what the business actually needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <span className="mb-4 inline-flex rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                  {item.step}
                </span>
                <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0c1322] px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:px-12">
            <div className="mb-8 text-center">
              <span className="eyebrow mb-4">
                Honest Positioning
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                What SDL Does Not Do
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                We believe in clear positioning. If it is not a good fit, we
                will tell you that directly.
              </p>
            </div>

            <div className="space-y-3">
              {servicesPage.notDo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex w-full items-start gap-3 rounded-xl readability-inner px-4 py-3 text-sm text-muted-foreground"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/70" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL SYSTEMS & AUTOMATION */}
      <section className="relative py-20 border-t border-white/8" style={{ background: "#07101f" }}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow mb-4">Beyond the Website</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Digital Systems &amp; Automation
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                When a website alone is not enough, SDL builds the operational
                layer behind it — portals, dashboards, integrations, and
                automation pipelines that connect your site to how your business
                actually runs.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Website → CRM intake routing",
                  "Form-to-workflow automation",
                  "Client portals and internal dashboards",
                  "Reporting and visibility pipelines",
                  "Field operations and admin system layers",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/systems/sis"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
                >
                  Learn About SIS
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "LIVE SYSTEM", title: "Dadson Trucking Admin Portal", desc: "Centralized load, driver, and document management for a logistics operation." },
                { label: "LIVE SYSTEM", title: "Dadson Driver Hub", desc: "Mobile-first field workflow connecting drivers to the operational data layer." },
                { label: "ACTIVE BUILD", title: "PainterBid / Painter Pro", desc: "Quote, job, and client management system for painting contractors." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#08101d] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${item.label === "LIVE SYSTEM" ? "text-emerald-400" : "text-sky-400"}`}>
                    {item.label}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
                View all system work <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="relative">
        <CTASection
          eyebrow="Ready to Start"
          title="If your website isn't working hard enough for your business, it's time to fix that."
          description="Request a free website evaluation. We'll review what you have, identify the biggest gaps, and recommend the clearest next step — no commitment required."
          primaryLabel="Get Website Evaluation"
          primaryHref="https://reports.sentinelsdesignlab.com/evaluation"
          secondaryLabel="View Pricing"
          secondaryHref="/pricing"
        />
      </div>
    </div>
  );
}

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
  Megaphone,
  Wrench,
  Store,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";

const websitePlans = [
  { name: "Landing Page", price: "$150", suffix: "/month", detail: "Focused, conversion-first single-page presence." },
  { name: "Business Website", price: "$300", suffix: "/month", detail: "Complete small-business website for credibility and lead generation.", featured: true },
  { name: "Growth Website", price: "$500", suffix: "/month", detail: "Expanded content, service coverage, conversion paths, and search-ready structure." },
  { name: "Custom Software, CRM, Portals & AI", price: "Let’s Talk", suffix: "", detail: "Custom systems scoped around the business." },
];

const capabilityCards = [
  {
    icon: Globe,
    title: "Managed Website Plans",
    description: "Professionally designed websites with hosting, maintenance, security, backups, monitoring, and support included.",
  },
  {
    icon: Search,
    title: "SEO-Ready Launch Setup",
    description: "Clean site structure, metadata, sitemap, indexing setup, and practical on-page fundamentals are part of how every SDL website is built.",
  },
  {
    icon: BarChart3,
    title: "Expanded SEO",
    description: "Ongoing keyword strategy, local SEO, content optimization, technical reviews, competitive tracking, and reporting beyond the launch setup.",
  },
  {
    icon: Megaphone,
    title: "PPC & Social Campaigns",
    description: "Paid campaign strategy, setup, management, conversion tracking, optimization, and reporting starting at $500/month plus ad spend.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Software, CRM & Portals",
    description: "Client portals, internal dashboards, CRM workflows, AI-enabled tools, and custom applications when a website alone is not enough.",
  },
  {
    icon: Cpu,
    title: "Automation & Integrations",
    description: "Connect forms, CRM workflows, data, notifications, and operational systems into cleaner, maintainable workflows.",
  },
];

const growthServices = [
  {
    icon: Search,
    title: "Expanded SEO",
    price: "Let’s Talk",
    description: "For businesses that want ongoing organic search growth beyond the SEO-ready launch foundation included with the website.",
    features: [
      "Keyword and search-intent strategy",
      "Local SEO and Google Business Profile support where applicable",
      "Ongoing on-page and content optimization",
      "Technical SEO reviews and recommendations",
      "Competitive visibility tracking and reporting",
    ],
  },
  {
    icon: Megaphone,
    title: "PPC & Social Campaign Management",
    price: "Starting at $500/month + ad spend",
    description: "For businesses ready to add paid acquisition across Google Ads, Meta, and other appropriate channels.",
    features: [
      "Campaign strategy and setup",
      "Audience and keyword targeting",
      "Conversion tracking",
      "Ongoing campaign optimization",
      "Performance reporting",
    ],
  },
];

const whoItIsFor = [
  {
    icon: Wrench,
    label: "Contractors & Trades",
    desc: "Roofing, plumbing, HVAC, electrical, landscaping, and other service operators that win work on trust and local reputation.",
  },
  {
    icon: Store,
    label: "Local Service Businesses",
    desc: "Businesses that need a stronger first impression and a cleaner path from visitor to call, form, or appointment.",
  },
  {
    icon: Building2,
    label: "Growing Small Businesses",
    desc: "Teams that have outgrown DIY tools and need a more professional, managed digital foundation.",
  },
  {
    icon: Cpu,
    label: "Operations-Forward Teams",
    desc: "Businesses that need portals, dashboards, CRM workflows, automations, or other systems behind the website.",
  },
];

const processSteps = [
  { step: "01", title: "Evaluate", description: "Review the current website, goals, positioning, and biggest friction points." },
  { step: "02", title: "Recommend", description: "Choose the right website plan, growth service, or custom-system path based on the actual need." },
  { step: "03", title: "Build", description: "Design and develop the website or system with a clean, controlled implementation." },
  { step: "04", title: "Launch & Manage", description: "Deploy, monitor, maintain, and support the technical foundation after launch." },
];

const buildPrinciples = [
  "Modern, controlled infrastructure instead of fragile plugin stacks.",
  "Custom responsive design shaped around the business rather than a recycled template.",
  "Source-controlled deployment and a maintainable production foundation.",
  "SEO-ready structure at launch without pretending that launch setup is an ongoing SEO campaign.",
  "Real functionality when portals, dashboards, CRM, automation, or AI are needed — not decorative mock features.",
];

export default function Services() {
  return (
    <div className="relative overflow-hidden text-white">
      <section className="relative overflow-hidden bg-transparent pb-10 pt-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow mb-6">Services</span>
              <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Websites First. <span className="text-primary">Growth and Systems When You Need Them.</span>
              </h1>
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Start with a professionally managed website. Add expanded SEO, paid campaigns, CRM, portals, automation, or AI as the business grows.
              </p>

              <div className="mb-7 rounded-2xl border border-primary/20 bg-sky-400/[0.06] px-5 py-4">
                <div className="font-heading text-lg font-semibold text-foreground">Managed websites from $150/month.</div>
                <div className="mt-1 text-sm text-muted-foreground">Hosting, maintenance, security, backups, monitoring & support included.</div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
                >
                  View Website Plans
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-sky-400/[0.06] px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-sky-400/[0.10]"
                >
                  View Our Work
                </Link>
              </div>
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
                    alt="Website, SEO, advertising, and digital system services by Sentinels Design Lab"
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

      <section className="relative bg-transparent pb-14 pt-4">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {websitePlans.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border p-5 ${item.featured ? "border-primary/40 bg-sky-400/[0.08]" : "border-white/10 bg-[#0c1322]"}`}
              >
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                <div className="mt-2 font-heading text-2xl font-bold text-primary">
                  {item.price}{item.suffix ? <span className="ml-1 text-sm font-medium text-muted-foreground">{item.suffix}</span> : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Prefer to purchase your website outright? Traditional project pricing is available.
          </p>
        </div>
      </section>

      <section className="border-t border-white/8 py-20" style={{ background: "#070d18" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">Core Services</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">A Clearer Service Stack</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The website is the foundation. Ongoing search growth, paid acquisition, and custom systems are added only when they make sense.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">Optional Growth Services</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Build the Site. Then Grow the Audience.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Launch SEO is part of the website build. Ongoing SEO and paid campaign management are separate services for businesses that want active growth.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {growthServices.map((service) => (
              <div key={service.title} className="rounded-[1.75rem] border border-white/10 bg-[#0c1322] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">{service.title}</h3>
                <div className="mt-2 text-lg font-semibold text-primary">{service.price}</div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground/75">Advertising spend is separate from campaign-management fees.</p>
        </div>
      </section>

      <section className="border-t border-white/8 py-20" style={{ background: "#07101f" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">Who It’s For</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Built for Businesses That Need a Better Digital Foundation</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoItIsFor.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-sm font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="eyebrow mb-4">How It Works</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">A Structured Path From Evaluation to Ongoing Support</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {processSteps.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                    <span className="inline-flex rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">{item.step}</span>
                    <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[#0c1322] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-sky-400/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                How We Build
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Modern, Controlled Infrastructure</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The goal is not to sell a technology preference. It is to give the business a cleaner, more maintainable digital foundation.
              </p>
              <div className="mt-6 space-y-4">
                {buildPrinciples.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20" style={{ background: "#07101f" }}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow mb-4">Beyond the Website</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Custom Software, CRM, Portals & AI</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                When a website is not enough, SDL can build the operational layer behind it — portals, dashboards, CRM workflows, integrations, automation, and AI-enabled tools.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Website → CRM intake routing",
                  "Form-to-workflow automation",
                  "Client portals and internal dashboards",
                  "Reporting and visibility pipelines",
                  "Custom business applications and AI-enabled workflows",
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
                  Explore Custom Systems
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
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${item.label === "LIVE SYSTEM" ? "text-emerald-400" : "text-sky-400"}`}>{item.label}</span>
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

      <div className="relative">
        <CTASection
          eyebrow="Ready to Start"
          title="Start with the website. Add growth and systems when the business needs them."
          description="Choose a managed website plan from $150/month, add Expanded SEO or PPC/Social when you are ready to grow traffic, or talk with us about custom software, CRM, portals, automation, and AI."
          primaryLabel="View Pricing"
          primaryHref="/pricing"
          secondaryLabel="Start a Conversation"
          secondaryHref="/contact?type=website-project"
        />
      </div>
    </div>
  );
}

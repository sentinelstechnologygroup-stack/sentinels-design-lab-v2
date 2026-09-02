// src/pages/Home.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Search,
  BarChart3,
  Palette,
  Server,
  CheckCircle2,
  ShieldCheck,
  Zap,
  MessageSquareText,
  Briefcase,
  Star,
  Sparkles,
  LayoutDashboard,
  PhoneCall,
  LineChart,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";

const heroTags = [
  "Strategy First",
  "Conversion-Focused",
  "No Template Builds",
  "Business-First Execution",
];

const trustStrip = [
  "Strategy-First Builds",
  "Conversion-Focused Design",
  "Built for Real Businesses",
  "Fast & Reliable Delivery",
];

const services = [
  {
    icon: Globe,
    title: "Website Redesigns & Builds",
    desc: "Modernize outdated websites or build new ones designed around clarity, trust, and a better path to leads.",
    path: "/services",
  },
  {
    icon: Search,
    title: "SEO Foundation",
    desc: "Set up site structure, metadata, and page hierarchy so the right businesses can find you when they are ready to act.",
    path: "/services",
  },
  {
    icon: BarChart3,
    title: "Lead Path Cleanup",
    desc: "Tighten navigation, offers, forms, and CTA flow so more of your traffic turns into real conversations.",
    path: "/services",
  },
  {
    icon: Palette,
    title: "Brand Presentation",
    desc: "Upgrade how your company looks online so your presentation matches the quality of your work.",
    path: "/services",
  },
  {
    icon: LayoutDashboard,
    title: "Portals & Digital Systems",
    desc: "When a website is not enough — build client portals, internal dashboards, and practical web tools.",
    path: "/services",
  },
  {
    icon: Server,
    title: "Ongoing Support",
    desc: "Keep your site fast, secure, and current with reliable hosting, maintenance, and ongoing build support.",
    path: "/services",
  },
];

const bestFit = [
  "Contractors & Trades",
  "Local Service Businesses",
  "Growing Brands",
  "Businesses Outgrowing DIY Sites",
];

const whyUs = [
  {
    icon: LineChart,
    title: "Built for Conversion",
    desc: "Every section, layout, and CTA is designed to move visitors closer to action.",
  },
  {
    icon: MessageSquareText,
    title: "Clear Messaging",
    desc: "We make sure people understand what you do, why it matters, and why they should trust you.",
  },
  {
    icon: Sparkles,
    title: "No Templates",
    desc: "Your site is shaped around your business, not forced into a recycled layout.",
  },
  {
    icon: Briefcase,
    title: "Business-First Approach",
    desc: "We focus on leads, trust, positioning, and growth — not design for design’s sake.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Strategy",
    desc: "We identify what your business needs to say, show, and prioritize to win more trust.",
  },
  {
    step: "02",
    title: "Build",
    desc: "We design and structure the site around clarity, credibility, and conversion.",
  },
  {
    step: "03",
    title: "Launch & Refine",
    desc: "We launch cleanly and position the site to support future growth, traffic, and lead flow.",
  },
];

const testimonials = [
  {
    name: "Armando Sierra III",
    role: "CEO, Best Solution Distribution",
    text: "Sentinels Design Lab helped us present the business more professionally and created a site that feels built to grow with us.",
  },
  {
    name: "M. Morono",
    role: "Founder/CEO, Morono Group",
    text: "Strong communication, strong execution, and a much more polished digital presence than what we had before.",
  },
  {
    name: "Dhiraj Sane",
    role: "Founder, My Buddy's Mobile Detail",
    text: "They helped turn the brand into something that looks more established, more premium, and more ready to sell.",
  },
];

const heroTiles = [
  {
    src: "/images/home/tile-branding.webp",
    alt: "Branding and logo design",
    label: "Branding & Identity",
    className: "",
  },
  {
    src: "/images/home/tile-web-design.webp",
    alt: "Website design showcase",
    label: "Web Design",
    className: "",
  },
  {
    src: "/images/home/tile-mobile.webp",
    alt: "Mobile-first responsive website design",
    label: "Mobile-First Design",
    className: "",
  },
  {
    src: "/images/home/tile-seo.webp",
    alt: "SEO and optimization work",
    label: "SEO & Visibility",
    className: "",
  },
  {
    src: "/images/home/tile-video.webp",
    alt: "Video & Animation Performance Visuals",
    label: "Video & Animation",
    className: "col-span-2",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden text-white">
      {/* HERO */}
      <section className="relative bg-transparent pb-8 pt-24 md:pt-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className=""
            >
              <span className="eyebrow mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Strategic Website Design for Real Businesses
              </span>

              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Websites Built to{" "}
                <span className="text-primary">Win More Business</span>
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                We design and build high-conversion websites for service
                businesses that need more leads, stronger trust, and better
                results from their online presence.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-secondary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex flex-wrap gap-4">
                <Link
                  href="https://reports.sentinelsdesignlab.com/evaluation"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:bg-primary hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
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

              <p className="mb-8 text-xs text-muted-foreground/70">
                No commitment. Free evaluation.
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Built to earn trust fast
                </div>
                <div className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Structured for conversion
                </div>
                <div className="inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  Designed to generate action
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-sky-400/8 blur-2xl" />

              <div className="relative grid h-[560px] grid-cols-2 grid-rows-3 gap-3">
                {heroTiles.map((tile, index) => (
                  <div
                    key={`${tile.label}-${index}`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050816] shadow-[0_16px_50px_rgba(0,0,0,0.28)] ${tile.className}`}
                  >
                    <img
                      src={tile.src}
                      alt={tile.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                        {tile.label}
                      </span>
                    </div>
                  </div>
                ))}

<div className="absolute -right-4 bottom-16 z-10 rounded-xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="inline-flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white">
                      Available for New Projects
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative bg-transparent py-10">
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {trustStrip.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/8 bg-[#0c1322] px-4 py-4 text-sm font-medium text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 border-t border-white/8" style={{ background: '#070d18' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">
              What We Do
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What We Actually Help You Achieve
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every service is designed to improve how your business is seen,
              trusted, and contacted online.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={service.path}
                  className="group block h-full rounded-2xl border border-white/10 bg-[#0b1220] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8 transition-all group-hover:bg-sky-400/15">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <Link
              href="/systems/sis"
              className="group flex items-center justify-between rounded-2xl border border-primary/20 bg-sky-400/[0.05] px-7 py-5 transition-all hover:border-primary/40 hover:bg-sky-400/[0.08]"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-1">
                  Sentinel Intelligence System
                </div>
                <p className="font-heading text-lg font-semibold text-foreground">
                  Connected systems that run your business →{" "}
                  <span className="text-primary">SIS</span>
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="py-20 border-t border-white/8" style={{ background: '#07101f' }}>
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="eyebrow mb-4">
            Best Fit
          </span>
          <h2 className="mb-5 mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Built for Businesses That Need Real Results
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">
            We are best aligned with businesses that need a stronger online
            presence, clearer positioning, and a website that helps close more
            opportunities.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {bestFit.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-[#0b1220] px-4 py-5 text-sm font-medium text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SDL + PROCESS */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="eyebrow mb-4">
                Why Sentinels
              </span>
              <h2 className="mb-8 mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                A More Strategic Website Build From Day One
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1322] p-7 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-sky-400/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Our Process
                </div>

                <div className="space-y-5">
                  {processSteps.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="inline-flex shrink-0 rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-foreground">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="readability-card rounded-2xl p-7">
                <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">
                  What a stronger website should do
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Make your business look established",
                    "Explain your offer clearly",
                    "Reduce hesitation and confusion",
                    "Make it easier to call or contact you",
                    "Support referrals, SEO, and ads",
                    "Help convert traffic into leads",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-start gap-2 rounded-lg readability-inner px-3 py-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI BRIDGE */}
      <section className="py-20 border-t border-white/8" style={{ background: '#050b16' }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="eyebrow mb-4">
            Investment Perspective
          </span>
          <h2 className="mb-5 mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            A Website Should Do More Than Exist
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Your website should help you win more jobs, build trust faster,
            and support your marketing efforts — not quietly limit what your
            business could be doing online.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:bg-primary hover:shadow-[0_10px_30px_rgba(56,189,248,0.22)]"
          >
            View Pricing & Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">
              Testimonials
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Trusted by Businesses Ready to Level Up
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="readability-card rounded-2xl p-7"
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  “{t.text}”
                </p>

                <div>
                  <div className="font-heading text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INSIGHTS */}
      <section className="py-20 border-t border-white/8" style={{ background: '#07101f' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="eyebrow mb-4">SDL Insights</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Featured Insights
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Practical guidance for business owners evaluating website
              modernization, trust, SEO, and long-term digital infrastructure.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/blog/why-outdated-websites-cost-local-businesses-leads"
              className="group block rounded-2xl border border-white/10 bg-[#08101d] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition-all hover:border-primary/30 hover:-translate-y-0.5"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Local Business Growth
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                Why Outdated Websites Cost Local Businesses Leads
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Your website is the first employee every potential customer
                meets. If it's slow, stale, or hard to use on a phone, they're
                already walking out the door before you ever knew they arrived.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="/blog/rebuild-wordpress-sites"
              className="group block rounded-2xl border border-white/10 bg-[#08101d] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition-all hover:border-primary/30 hover:-translate-y-0.5"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Web Development
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                Why We Rebuild WordPress Sites Instead of Maintaining Plugin Stacks
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                What starts as a clean WordPress install becomes a dependency
                maze of conflicting updates, abandoned integrations, and
                security gaps that no amount of patching can fully close.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white"
            >
              View all articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="relative">
        <CTASection
          eyebrow="Start Strong"
          title="If your website no longer reflects the quality of your business, it’s time to fix that."
          description="We help businesses build a stronger online presence that looks better, communicates better, and works harder."
          primaryLabel="Get Website Evaluation"
          primaryHref="https://reports.sentinelsdesignlab.com/evaluation"
          secondaryLabel="View Our Work"
          secondaryHref="/work"
        />
      </div>
    </div>
  );
}

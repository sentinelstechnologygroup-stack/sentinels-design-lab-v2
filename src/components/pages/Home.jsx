"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Search,
  BarChart3,
  Server,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Megaphone,
  Star,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";

const pricingLadder = [
  { name: "Landing Page", price: "$150", suffix: "/month" },
  { name: "Business Website", price: "$300", suffix: "/month", featured: true },
  { name: "Growth Website", price: "$500", suffix: "/month" },
  { name: "Custom Software, CRM, Portals & AI", price: "Let’s Talk", suffix: "" },
];

const services = [
  {
    icon: Globe,
    title: "Managed Website Plans",
    desc: "Professional websites from $150/month, with hosting, maintenance, security, backups, monitoring, and support included.",
    path: "/pricing",
  },
  {
    icon: Search,
    title: "SEO-Ready at Launch",
    desc: "Every website is built with clean structure, metadata, sitemap, indexing setup, and practical on-page SEO fundamentals from day one.",
    path: "/services",
  },
  {
    icon: BarChart3,
    title: "Expanded SEO",
    desc: "Ongoing keyword strategy, local SEO, content optimization, technical reviews, competitive tracking, and reporting for businesses ready to grow search visibility.",
    path: "/pricing",
  },
  {
    icon: Megaphone,
    title: "PPC & Social Campaigns",
    desc: "Campaign strategy, setup, management, conversion tracking, and optimization starting at $500/month plus ad spend.",
    path: "/pricing",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Software & Systems",
    desc: "CRM, portals, dashboards, automations, AI-enabled tools, and custom applications built around how your business actually operates.",
    path: "/systems/sis",
  },
  {
    icon: Server,
    title: "Managed Support",
    desc: "Your website does not get handed off and forgotten. SDL manages the technical foundation so you can focus on the business.",
    path: "/services",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Evaluate",
    desc: "We review your current site, goals, messaging, and biggest friction points.",
  },
  {
    step: "02",
    title: "Build",
    desc: "We design and develop the right website or system around the business need.",
  },
  {
    step: "03",
    title: "Launch & Manage",
    desc: "We launch cleanly and continue managing the technical foundation after launch.",
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
    alt: "Digital marketing and creative work",
    label: "Growth & Creative",
    className: "col-span-2",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden text-white">
      <section className="relative bg-transparent pb-10 pt-24 md:pt-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Managed Websites & Digital Systems
              </span>

              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Websites Built to <span className="text-primary">Win More Business</span>
              </h1>

              <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                We make your business look better, make it easier for customers to find and contact you, and take care of the website after launch.
              </p>

              <div className="mb-7 rounded-2xl border border-primary/20 bg-sky-400/[0.06] px-5 py-4">
                <div className="font-heading text-lg font-semibold text-foreground">
                  Websites from $150/month.
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Hosting, maintenance, security, backups, monitoring & support included.
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-4">
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

              <p className="text-xs text-muted-foreground/70">
                Prefer to purchase outright? Traditional project pricing is also available.
              </p>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-transparent pb-12 pt-4">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pricingLadder.map((item, i) => (
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
                  {item.price}
                  {item.suffix ? <span className="ml-1 text-sm font-medium text-muted-foreground">{item.suffix}</span> : null}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
              See plan details and growth add-ons <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20" style={{ background: "#070d18" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">What We Do</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Websites First. Growth Services When You Need Them.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start with a professionally managed website, then add ongoing SEO, paid campaigns, or custom systems as the business grows.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={service.path}
                  className="group block h-full rounded-2xl border border-white/10 bg-[#0b1220] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
            <div>
              <span className="eyebrow mb-4">Simple by Design</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                A Better Website Without the Technical Burden
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                SDL handles the build and the technical care behind it. You get a professional website without having to coordinate separate hosting, maintenance, security, or deployment vendors.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "We make your business look better.",
                  "We make it easier for customers to find and contact you.",
                  "We take care of the website afterward.",
                  "Need software, a CRM, portal, automation or AI? We can build that too.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[#0c1322] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-sky-400/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                How It Works
              </div>
              <div className="space-y-6">
                {processSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="inline-flex shrink-0 rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20" style={{ background: "#07101f" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">Testimonials</span>
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
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">“{t.text}”</p>
                <div className="font-heading text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-transparent py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="eyebrow mb-4">SDL Insights</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Featured Insights</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/blog/why-outdated-websites-cost-local-businesses-leads"
              className="group block rounded-2xl border border-white/10 bg-[#08101d] p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Local Business Growth</div>
              <h3 className="font-heading text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                Why Outdated Websites Cost Local Businesses Leads
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Why an outdated site can quietly erode trust, visibility, and lead flow before a prospect ever contacts you.
              </p>
            </Link>

            <Link
              href="/blog/rebuild-wordpress-sites"
              className="group block rounded-2xl border border-white/10 bg-[#08101d] p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Web Development</div>
              <h3 className="font-heading text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                When It Makes More Sense to Rebuild Than Keep Patching
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A practical look at when modernization creates a cleaner long-term foundation than continuing to patch an aging stack.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative">
        <CTASection
          eyebrow="Ready to Start"
          title="A professional website should be easier to buy — and easier to own."
          description="Start with a managed website plan from $150/month, or talk with us about a larger website, growth campaign, or custom digital system."
          primaryLabel="View Website Plans"
          primaryHref="/pricing"
          secondaryLabel="Start a Conversation"
          secondaryHref="/contact?type=website-project"
        />
      </div>
    </div>
  );
}

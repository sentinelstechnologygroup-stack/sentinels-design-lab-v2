"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Workflow,
  BarChart3,
  Globe,
  Users,
  Layers,
  ShieldCheck,
  Zap,
  LineChart,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";

const solves = [
  {
    icon: Database,
    title: "Manual Data Entry Between Systems",
    desc: "Customer records re-entered by hand into three different tools because nothing talks to anything else.",
  },
  {
    icon: Workflow,
    title: "Automations That Quietly Break",
    desc: "Third-party connectors that stop working on updates and nobody knows until a lead disappears.",
  },
  {
    icon: BarChart3,
    title: "Reporting Pulled From Multiple Dashboards",
    desc: "Monthly numbers assembled from four platforms into a spreadsheet instead of one source of truth.",
  },
  {
    icon: Globe,
    title: "Website Disconnected From Operations",
    desc: "Leads come in through the site but immediately fall into a manual process with no system behind it.",
  },
  {
    icon: Users,
    title: "No Single View of a Customer",
    desc: "Customer history split across a CRM, a job board, an inbox, and a notes file nobody fully maintains.",
  },
  {
    icon: Layers,
    title: "Operational Drag From Tool Sprawl",
    desc: "A growing stack of subscriptions that each solve one thing but collectively create more friction than they remove.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Map Current Workflows",
    desc: "Audit how data actually moves through the business — where it enters, where it lives, and where it stops or gets re-entered manually.",
  },
  {
    step: "02",
    title: "Identify Connection Points",
    desc: "Find the gaps between systems where work is falling through, duplicating, or requiring manual intervention to bridge.",
  },
  {
    step: "03",
    title: "Build the Integration Layer",
    desc: "Connect or build the middleware, automations, and data pipelines that close the gaps without requiring teams to change their core tools.",
  },
  {
    step: "04",
    title: "Connect Website to Operations",
    desc: "The website becomes the intake layer. SIS handles what happens after — routing, follow-up, visibility, and reporting — automatically.",
  },
];

const whoFor = [
  {
    icon: ShieldCheck,
    title: "Service Businesses With Operational Complexity",
    desc: "Field service operators, contractors, and trades businesses whose work has more moving parts than a simple website can support.",
  },
  {
    icon: Zap,
    title: "Teams Managing More Than a Website",
    desc: "Growing businesses where the website is performing but the operational layer — CRM, dispatch, scheduling, reporting — is still disconnected.",
  },
  {
    icon: LineChart,
    title: "Operators Who Need Visibility, Not Just a Dashboard",
    desc: "Business owners who want to see where leads come from, which jobs are profitable, and what's actually driving growth — in one place.",
  },
];

export default function SIS() {
  return (
    <div className="relative overflow-hidden text-white">
      <PageHero
        eyebrow="Sentinel Intelligence System"
        title="The system layer that connects your website to your operations"
        description="SIS is SDL's operational framework for connecting websites, forms, CRMs, dashboards, and workflows into one controlled system. Data moves cleanly. Teams get visibility. Manual bridging work disappears."
        primaryCtaLabel="Request a Systems Evaluation"
        primaryCtaHref="/contact"
        secondaryCtaLabel="View Our Work"
        secondaryCtaHref="/work"
        imageSrc="/images/services/custom-apps-hero.webp"
        imageAlt="Sentinel Intelligence System connecting business operations and digital workflows"
      />

      {/* WHAT SIS SOLVES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">The Problem</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What SIS Solves
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Most businesses don't have a software problem. They have a
              connection problem. The tools exist — they just don't work
              together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solves.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-white/8" style={{ background: "#07101f" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">The Approach</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              SIS starts from workflow mapping — not tool selection. The
              architecture follows the business, not the other way around.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#08101d] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
              >
                <span className="inline-flex rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                  {item.step}
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4">Best Fit</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Who It's For
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whoFor.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-white/8">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WEBSITE INTEGRATION */}
      <section className="py-20 border-t border-white/8" style={{ background: "#070d18" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow mb-4">Website + Systems</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                How It Integrates With Websites
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                SIS works alongside any SDL-built website — and can augment an
                existing site without requiring a full rebuild. The website
                becomes the intake layer. SIS handles what happens after:
                routing, follow-up, visibility, and reporting.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Website form submissions route directly into your CRM or job system",
                  "Lead data is structured and tagged before it reaches your team",
                  "Follow-up sequences trigger automatically based on form type or service selected",
                  "Reporting pulls from a single operational layer — not four disconnected dashboards",
                  "Admin and field-facing views stay in sync without manual reconciliation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/advanced-reports"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-slate-950 transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
                >
                  View Advanced Reports
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-sky-400/[0.06] px-7 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-sky-400/[0.10]"
                >
                  Request a Systems Evaluation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-sky-400/[0.06] px-7 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-sky-400/[0.10]"
                >
                  See Our Work
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-white/10 bg-[#08101d] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.34)]"
            >
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                What changes
              </div>
              {[
                { before: "Lead comes in through website", after: "Lead routes automatically to CRM with tags and source data" },
                { before: "Team re-enters job data into scheduling", after: "Job syncs from CRM to scheduling system on status change" },
                { before: "Monthly report assembled from 4 platforms", after: "Reporting dashboard pulls from one operational data layer" },
                { before: "Follow-up depends on someone remembering", after: "Follow-up sequence triggers on form submission or job close" },
              ].map((row, i) => (
                <div key={i} className={`py-4 ${i > 0 ? "border-t border-white/8" : ""}`}>
                  <div className="text-xs text-white/40 mb-1">Before</div>
                  <div className="text-sm text-white/65">{row.before}</div>
                  <div className="text-xs text-primary mt-2 mb-1">After SIS</div>
                  <div className="text-sm text-white">{row.after}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to connect your website to your operations?"
        description="Request a Website + Systems Evaluation and we'll map the clearest path forward."
        ctaLabel="Request a Website + Systems Evaluation"
      />
    </div>
  );
}

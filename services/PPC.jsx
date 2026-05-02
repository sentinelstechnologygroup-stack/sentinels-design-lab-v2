// src/pages/services/PPC.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MousePointer,
  Target,
  BarChart3,
  DollarSign,
  Search,
  Smartphone,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import CTASection from "../../components/shared/CTASection";

const included = [
  "Full account audit and campaign architecture",
  "Keyword research and negative keyword strategy",
  "Ad copy creation and A/B testing",
  "Landing page analysis and CRO recommendations",
  "Bid strategy and budget allocation",
  "Google Ads and Meta Ads management",
  "Weekly performance monitoring",
  "Monthly reporting with clear attribution",
  "Conversion tracking setup (calls, forms, purchases)",
  "Ongoing optimization and scaling",
];

const outcomes = [
  "Lower cost-per-lead through precise targeting and bidding",
  "Higher click-through rates via tested ad copy",
  "Improved conversion rates with landing page alignment",
  "Full attribution visibility across channels",
  "Scalable campaigns as your budget and revenue grow",
];

const services = [
  {
    icon: Search,
    title: "Google Search Ads",
    desc: "Capture high-intent searches at the exact moment prospects are looking for what you offer.",
  },
  {
    icon: Smartphone,
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience-targeted campaigns built for awareness, lead generation, and retargeting.",
  },
  {
    icon: Target,
    title: "Retargeting Campaigns",
    desc: "Re-engage visitors who didn&apos;t convert the first time with strategic follow-up ads.",
  },
  {
    icon: BarChart3,
    title: "Performance Reporting",
    desc: "Clear monthly reports showing spend, leads, cost-per-acquisition, and return on ad spend.",
  },
  {
    icon: DollarSign,
    title: "Budget Management",
    desc: "Dynamic allocation of spend toward top-performing campaigns and audiences.",
  },
  {
    icon: MousePointer,
    title: "Landing Page Review",
    desc: "Identify friction points that reduce conversions and recommend targeted improvements.",
  },
];

const heroContactHref =
  "/contact?service=PPC%20Management&message=Interested%20in%3A%20PPC%20Management";

export default function PPC() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pb-12 lg:pb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                PPC / Paid Ads
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Paid Advertising That{" "}
                <span className="text-primary">Generates Real Returns</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                We manage Google and Meta ad campaigns with a focus on measurable
                outcomes — cost-per-lead, cost-per-acquisition, and return on ad
                spend. No vanity metrics.
              </p>

              <Link
                href={heroContactHref}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Start a PPC Campaign
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img
                src="https://media..com/images/public/69c84c79cf14625ad4e75595/dc26e93bc_generated_image.png"
                alt="PPC Advertising"
                className="relative w-full max-h-[420px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              What&apos;s Included
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              End-to-end campaign management across the platforms your customers
              use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card/60 border border-border/50 rounded-xl p-6 hover:border-primary/20 transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included + Outcomes */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                Full Service Scope
              </h2>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-secondary-foreground"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                Expected Outcomes
              </h2>
              <ul className="space-y-4">
                {outcomes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-secondary-foreground bg-card/60 border border-border/40 rounded-lg p-4"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">
                  Best For
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>— Service businesses looking for consistent lead flow</li>
                  <li>— Ecommerce brands ready to scale with paid traffic</li>
                  <li>
                    — Companies with an existing site needing more conversions
                  </li>
                  <li>
                    — Businesses that have tried ads but not seen results
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              PPC Management Packages
            </h2>
            <p className="text-muted-foreground mt-3">
              All packages include setup, management, and monthly reporting. Ad
              spend billed separately.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Starter PPC",
                originalPrice: "800.00",
                price: "399.99",
                features: [
                  "1 Platform (Google or Meta)",
                  "Campaign Setup & Structure",
                  "Keyword Research",
                  "Ad Copy Creation (2 variants)",
                  "Conversion Tracking Setup",
                  "Monthly Performance Report",
                  "3-Month Commitment",
                ],
              },
              {
                name: "Growth PPC",
                originalPrice: "1,600.00",
                price: "799.99",
                featured: true,
                features: [
                  "2 Platforms (Google + Meta)",
                  "Full Campaign Architecture",
                  "A/B Ad Copy Testing",
                  "Landing Page Audit",
                  "Retargeting Setup",
                  "Bi-Weekly Reporting",
                  "Dedicated Account Manager",
                  "6-Month Commitment",
                ],
              },
              {
                name: "Authority PPC",
                originalPrice: "3,200.00",
                price: "1,599.99",
                features: [
                  "All Platforms Managed",
                  "Advanced Audience Targeting",
                  "Dynamic Ad Creative",
                  "Full Funnel Build-Out",
                  "CRO Recommendations",
                  "Weekly Strategy Call",
                  "Real-Time Dashboard",
                  "12-Month Commitment",
                ],
              },
              {
                name: "Enterprise PPC",
                originalPrice: "6,400.00",
                price: "3,199.99",
                features: [
                  "Unlimited Campaigns & Platforms",
                  "Dedicated PPC Team",
                  "Programmatic Advertising",
                  "Custom Attribution Modeling",
                  "Influencer & Sponsored Placements",
                  "Daily Optimization",
                  "Priority Support 24/7",
                  "Custom SLA",
                ],
              },
            ].map((pkg, i) => {
              const href = `/contact?service=${encodeURIComponent(
                pkg.name
              )}&message=${encodeURIComponent(`Interested in: ${pkg.name}`)}`;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative rounded-xl border p-6 flex flex-col transition-all hover:shadow-xl hover:shadow-primary/5 ${
                    pkg.featured
                      ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border/50 bg-card/60 hover:border-primary/20"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  )}

                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {pkg.name}
                  </h3>

                  <div className="mt-3 mb-5">
                    <span className="text-sm text-muted-foreground line-through mr-1">
                      ${pkg.originalPrice}
                    </span>
                    <span className="text-2xl font-heading font-bold text-foreground">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">/mo</span>
                  </div>

                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs text-secondary-foreground"
                      >
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className={`flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      pkg.featured
                        ? "bg-primary hover:bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                        : "border border-border hover:border-primary/40 text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Run Ads That Actually Convert?"
        description="We&apos;ll audit your current setup or build from scratch — either way, every campaign is built around your revenue goals."
        ctaHref={heroContactHref}
      />
    </div>
  );
}
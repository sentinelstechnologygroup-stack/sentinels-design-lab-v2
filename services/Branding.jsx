// src/pages/services/Branding.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Image,
  FileText,
  Layers,
  Package,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import CTASection from "../../components/shared/CTASection";

const included = [
  "Brand discovery and positioning workshop",
  "Logo design (primary, secondary, and icon variants)",
  "Color palette with usage guidelines",
  "Typography system (heading, body, accent)",
  "Brand voice and messaging framework",
  "Business card and letterhead design",
  "Social media profile assets",
  "Brand guidelines document (PDF)",
  "All source files and export formats",
  "Revision rounds throughout the process",
];

const outcomes = [
  "A consistent visual identity that builds recognition across all touchpoints",
  "Clear brand positioning that communicates your value at a glance",
  "Design assets that can be handed to any designer or developer",
  "A brand that scales — from business cards to billboard ads",
  "Reduced design costs long-term through reusable, documented systems",
];

const services = [
  {
    icon: Palette,
    title: "Logo Design",
    desc: "primary mark, secondary lockup, and icon variant — built to work at every scale.",
  },
  {
    icon: Type,
    title: "Typography System",
    desc: "Heading and body font pairings that establish hierarchy and tone.",
  },
  {
    icon: Image,
    title: "Color Palette",
    desc: "primary, secondary, and neutral colors with usage rules and accessible contrast ratios.",
  },
  {
    icon: FileText,
    title: "Brand Guidelines",
    desc: "A documented system your team and vendors can follow consistently.",
  },
  {
    icon: Layers,
    title: "Stationery Design",
    desc: "Business cards, letterhead, and envelope — branded for first impressions.",
  },
  {
    icon: Package,
    title: "Social Media Kit",
    desc: "Profile images, cover photos, and post templates ready to use.",
  },
];

const heroContactHref =
  "/contact?service=Branding&message=Interested%20in%3A%20Branding";

export default function Branding() {
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
                Branding &amp; Identity
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                A Visual Identity That{" "}
                <span className="text-primary">Does the Work Before You Do</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                We build brand identity systems that communicate clearly, look
                intentional, and hold up across every medium — from a business
                card to a website to a billboard.
              </p>

              <Link
                href={heroContactHref}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Start Your Brand Project
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
                src="https://media..com/images/public/69c84c79cf14625ad4e75595/18cff837f_generated_image.png"
                alt="Branding & Identity"
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
              What We Deliver
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Every brand engagement includes a complete identity system — not
              just a logo.
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
                Full Project Scope
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
                What You Walk Away With
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
                  <li>— New businesses that need a professional foundation</li>
                  <li>
                    — Established brands that have outgrown their original
                    identity
                  </li>
                  <li>
                    — Companies preparing for a website rebuild or rebrand
                  </li>
                  <li>
                    — Anyone who feels their brand doesn&apos;t reflect their
                    quality
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
              Branding Packages
            </h2>
            <p className="text-muted-foreground mt-3">
              All packages include 100% ownership rights and all source files.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Startup Branding",
                originalPrice: "1,000.00",
                price: "499.99",
                features: [
                  "Logo Design (primary + Icon)",
                  "Brand Color Palette",
                  "Font Selection & Pairing",
                  "Business Card Design",
                  "Letterhead Design",
                  "All File Formats",
                  "100% Ownership Rights",
                  "100% Satisfaction Guarantee",
                ],
              },
              {
                name: "Growth Branding",
                originalPrice: "2,000.00",
                price: "999.99",
                features: [
                  "Complete Logo Suite",
                  "Full Stationery Design",
                  "Brand Style Guide (PDF)",
                  "Social Media Kit",
                  "Email Signature",
                  "2 Revision Rounds",
                  "All File Formats",
                  "100% Ownership Rights",
                ],
              },
              {
                name: "Corporate Branding",
                originalPrice: "3,000.00",
                price: "1,499.99",
                featured: true,
                features: [
                  "Brand Discovery Workshop",
                  "Full Logo Suite",
                  "Complete Brand Guidelines",
                  "Social Media Kit",
                  "Brochure Design",
                  "Presentation Template",
                  "Unlimited Revisions",
                  "Dedicated Brand Manager",
                  "100% Ownership Rights",
                ],
              },
              {
                name: "Enterprise Branding",
                originalPrice: "6,000.00",
                price: "2,999.99",
                features: [
                  "Full Brand Strategy & Positioning",
                  "Complete Visual Identity System",
                  "Website Design Mockup",
                  "Video Intro Animation",
                  "Packaging Design (1 SKU)",
                  "Full Collateral Suite",
                  "Dedicated Brand Manager",
                  "100% Ownership Rights",
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
                    <span className="text-xs text-muted-foreground ml-1">
                      only
                    </span>
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
                    Order Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build a Brand That Holds Up?"
        description="We&apos;ll walk through your positioning, audience, and goals before we touch a single design tool."
        ctaHref={heroContactHref}
      />
    </div>
  );
}
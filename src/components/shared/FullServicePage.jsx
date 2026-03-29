"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Star, Quote, Phone, ChevronRight } from "lucide-react";
import CTASection from "./CTASection";

/* ─── HERO ─────────────────────────────────────────────────────────────── */
function Hero({ badge, headline, highlight, subheadline, description, startingPrice, image }) {
  return (
    <section className="relative pt-28 pb-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-12 lg:pb-16"
          >
            {badge && (
              <p className="text-muted-foreground text-sm mb-3 uppercase tracking-wider">{badge}</p>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
              {headline}{" "}
              {highlight && <span className="text-primary">{highlight}</span>}
            </h1>
            {subheadline && (
              <p className="text-muted-foreground text-base mb-2">{subheadline}</p>
            )}
            <p className="text-secondary-foreground leading-relaxed mb-8 max-w-xl text-[0.97rem]">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 border border-border hover:border-primary/50 text-foreground px-7 py-3.5 rounded-lg font-semibold transition-all hover:bg-secondary/50 text-sm"
              >
                View Pricing <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {startingPrice && (
              <p className="mt-4 text-xs text-muted-foreground">
                Services starting from <span className="text-primary font-semibold">{startingPrice}</span>
              </p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
            <img
              src={image}
              alt={headline}
              className="relative w-full max-h-[420px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ─────────────────────────────────────────────────────────── */
function StatsBar({ stats }) {
  return (
    <section className="py-8 border-y border-border/30 bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-xl sm:text-2xl font-heading font-bold text-primary">{s.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT SECTION ─────────────────────────────────────────────────────── */
function AboutSection({ title, highlight, body, bullets, differentiators }) {
  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-5">
              {title} <span className="text-primary">{highlight}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-[0.95rem]">{body}</p>
            <ul className="space-y-2.5">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-[6px] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+18555544057"
                className="inline-flex items-center gap-2 border border-border hover:border-primary/40 text-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-secondary/50"
              >
                <Phone className="w-4 h-4" /> Let's Chat
              </a>
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8">
            <h3 className="font-heading font-semibold text-foreground mb-6 text-lg">What Sets Us Apart</h3>
            <div className="space-y-5">
              {differentiators.map((d, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-xs font-heading font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">{d.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES GRID ──────────────────────────────────────────────────────── */
function ServicesGrid({ subtitle, title, services }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
          {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO TABS ─────────────────────────────────────────────────────── */
function PortfolioTabs({ subtitle, title, tabs }) {
  const [active, setActive] = useState(0);

  const placeholderColors = [
    "from-primary/20 to-primary/5",
    "from-accent/20 to-accent/5",
    "from-primary/15 to-accent/10",
    "from-accent/15 to-primary/10",
  ];

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
          {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active === i
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-center text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
              {tabs[active].description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${placeholderColors[j]} border border-border/30 flex items-center justify-center`}
                >
                  <div className="text-center px-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      {React.createElement(tabs[active].icon, { className: "w-4 h-4 text-primary" })}
                    </div>
                    <p className="text-xs text-muted-foreground">{tabs[active].label} {j + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── PROCESS STEPS ──────────────────────────────────────────────────────── */
function ProcessSteps({ subtitle, title, steps }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
          {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 transition-all"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 z-10">
                  <ChevronRight className="w-5 h-5 text-primary/40" />
                </div>
              )}
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="font-heading font-bold text-primary text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING SECTION ────────────────────────────────────────────────────── */
function PricingSection({ subtitle, title, packages }) {
  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
          {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
          <p className="text-muted-foreground mt-3">All packages include 100% ownership rights and dedicated support.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-lg font-bold text-foreground">{pkg.name}</h3>
              <div className="mt-3 mb-5">
                {pkg.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through mr-1">${pkg.originalPrice}</span>
                )}
                <span className="text-2xl font-heading font-bold text-foreground">${pkg.price}</span>
                <span className="text-xs text-muted-foreground ml-1">only</span>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-secondary-foreground">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/start-project"
                className={`flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  pkg.featured
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                    : "border border-border hover:border-primary/40 text-foreground hover:bg-secondary/50"
                }`}
              >
                Order Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────── */
function Testimonials({ subtitle, title, reviews }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
          {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/60 border border-border/50 rounded-xl p-7 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-7 h-7 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic flex-1 mb-5">"{r.text}"</p>
              <div>
                <div className="font-heading font-semibold text-foreground text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST BADGES ───────────────────────────────────────────────────────── */
function TrustBadges({ badges }) {
  return (
    <section className="py-14 border-y border-border/30 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8">
          Recognized on Leading Channels
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="px-5 py-2.5 bg-card border border-border/40 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────────────────── */
export default function FullServicePage({
  // Hero
  badge, headline, highlight, subheadline, description, startingPrice, image,
  // Stats
  stats,
  // About
  aboutTitle, aboutHighlight, aboutBody, aboutBullets, differentiators,
  // Services grid
  servicesSubtitle, servicesTitle, services,
  // Portfolio tabs
  portfolioSubtitle, portfolioTitle, portfolioTabs,
  // Process
  processSubtitle, processTitle, processSteps,
  // Pricing
  pricingSubtitle, pricingTitle, pricingPackages,
  // Testimonials
  testimonialsSubtitle, testimonialsTitle, testimonials,
  // Trust
  trustBadges,
  // CTA
  ctaTitle, ctaDescription,
}) {
  return (
    <div>
      <Hero
        badge={badge}
        headline={headline}
        highlight={highlight}
        subheadline={subheadline}
        description={description}
        startingPrice={startingPrice}
        image={image}
      />
      <StatsBar stats={stats} />
      <AboutSection
        title={aboutTitle}
        highlight={aboutHighlight}
        body={aboutBody}
        bullets={aboutBullets}
        differentiators={differentiators}
      />
      <ServicesGrid subtitle={servicesSubtitle} title={servicesTitle} services={services} />
      {portfolioTabs && portfolioTabs.length > 0 && (
        <PortfolioTabs subtitle={portfolioSubtitle} title={portfolioTitle} tabs={portfolioTabs} />
      )}
      <ProcessSteps subtitle={processSubtitle} title={processTitle} steps={processSteps} />
      {pricingPackages && pricingPackages.length > 0 && (
        <PricingSection subtitle={pricingSubtitle} title={pricingTitle} packages={pricingPackages} />
      )}
      <Testimonials subtitle={testimonialsSubtitle} title={testimonialsTitle} reviews={testimonials} />
      <TrustBadges badges={trustBadges} />
      <CTASection title={ctaTitle} description={ctaDescription} />
    </div>
  );
}
// src/pages/services/Hosting.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Server,
  Shield,
  RefreshCw,
  Headphones,
  Check,
  X,
  ArrowRight,
  Zap,
  Lock,
  Globe,
  Clock,
} from "lucide-react";
import ServiceHero from "../../components/shared/ServiceHero";
import CTASection from "../../components/shared/CTASection";

const heroImage =
  "https://media..com/images/public/69c84c79cf14625ad4e75595/6f2fa4f8d_generated_864d12c3.png";

const stats = [
  { value: "700+", label: "Websites Hosted" },
  { value: "100+", label: "Maintenance Plans" },
  { value: "99%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Monitoring" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Data Security" },
];

const features = [
  "WordPress Hosting",
  "10 GB Storage",
  "200 GB Bandwidth",
  "Free SSL Certificate",
  "Website Backups",
  "WordPress Updates",
  "Plugin Updates",
  "Security Updates",
  "Priority Support",
  "1 Hour of Support Labor",
  "Unlimited Support Labor",
];

const plans = [
  {
    name: "Basic",
    price: "$39.95",
    period: "/mo",
    checks: [true, true, true, true, true, false, false, false, false, false, false],
  },
  {
    name: "Standard",
    price: "$79.95",
    period: "/mo",
    checks: [true, true, true, true, true, true, true, true, false, false, false],
  },
  {
    name: "Professional",
    price: "$149",
    period: "/mo",
    featured: true,
    checks: [true, true, true, true, true, true, true, true, true, true, false],
  },
  {
    name: "Enterprise",
    price: "$349",
    period: "/mo",
    checks: [true, true, true, true, true, true, true, true, true, true, true],
  },
];

const addons = [
  { name: "Ecommerce Hosting", price: "+$20/month" },
  { name: "Additional 10GB Storage", price: "+$10/month" },
  { name: "Additional 200GB Bandwidth", price: "+$10/month" },
];

const keyFeatures = [
  {
    icon: Server,
    title: "Commercial Grade Servers",
    desc: "99% uptime SLA with DDOS protection and enterprise-level infrastructure.",
  },
  {
    icon: Shield,
    title: "Security & Daily Backups",
    desc: "SSL certificates, malware scanning, firewall protection, and daily backups.",
  },
  {
    icon: RefreshCw,
    title: "Proactive Maintenance",
    desc: "WordPress, plugin, and security updates applied before they become problems.",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    desc: "Dedicated assistance with emergency downtime response and fast SLAs.",
  },
  {
    icon: Zap,
    title: "Blazing Fast Speed",
    desc: "CDN-enabled hosting with image compression and caching for sub-2s load times.",
  },
  {
    icon: Lock,
    title: "Full Data Security",
    desc: "SOC 2-compliant infrastructure with end-to-end encryption and access controls.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    desc: "Content served from the nearest edge node for visitors worldwide.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    desc: "Automated uptime monitoring with instant alerts and rapid response protocols.",
  },
];

const testimonials = [
  {
    name: "Rachel Osei",
    role: "Founder, Bloom Education",
    text: "Our site has had zero downtime in 18 months since moving to SDL hosting. Their proactive maintenance team caught and fixed a plugin vulnerability before we even knew about it.",
  },
  {
    name: "Michael Graves",
    role: "CTO, FinTrack Pro",
    text: "We host four properties with SDL. 99.97% uptime across all of them, fast support response, and the reporting dashboard is excellent. Highly recommend their Professional plan.",
  },
  {
    name: "Anika Sharma",
    role: "Operations Director, HealthFirst Clinics",
    text: "The managed hosting includes everything we need — backups, SSL, security updates — all handled automatically. It's genuinely hands-off and completely reliable.",
  },
];

const faqs = [
  {
    q: "What is Website Hosting?",
    a: "Website hosting is like renting a parking space on the web so people can access your site. We offer commercial-grade hosting on dedicated servers with speed, performance, and reliability at competitive prices.",
  },
  {
    q: "What is Website Maintenance?",
    a: "We keep your WordPress software, plugins, and security patches up to date. Regular maintenance ensures your website operates securely and efficiently as new versions are released.",
  },
  {
    q: "What is Website Support?",
    a: "Whenever you need changes or updates to your website — from content edits to new features — our support team handles it quickly and professionally.",
  },
  {
    q: "Do you offer uptime guarantees?",
    a: "Yes. All our hosting plans include a 99% uptime guarantee. Our Enterprise plan includes a 99.9% SLA with priority emergency response.",
  },
  {
    q: "Can I migrate my existing site?",
    a: "Absolutely. We handle the full migration for free on all plans — including DNS transfer, database migration, and a 48-hour parallel run to ensure zero downtime.",
  },
];

export default function Hosting() {
  return (
    <div>
      <ServiceHero
        badge="Hosting & Maintenance"
        title="Reliable WordPress Hosting,"
        highlight="Maintenance & Support"
        description="Your website needs an experienced team behind it. We provide commercial-grade hosting with proactive maintenance to keep your site secure, optimized, and running at peak performance 24/7."
        image={heroImage}
        stats={stats}
      />

      {/* Key Features Grid */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              What&apos;s Included
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Everything You Need for{" "}
              <span className="text-primary">Peace of Mind</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Every plan includes the essentials — free SSL, daily backups,
              security updates, and proactive monitoring. No surprises, no
              hidden fees.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Hosting Plans
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Packages to Fit <span className="text-primary">Your Needs</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              All plans include free SSL, daily backups, and 24/7 monitoring.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full">
              <thead className="bg-card/80">
                <tr>
                  <th className="text-left py-5 px-6 text-sm font-heading font-semibold text-muted-foreground">
                    Package Includes
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`text-center py-5 px-4 ${
                        plan.featured ? "bg-primary/8" : ""
                      }`}
                    >
                      {plan.featured && (
                        <span className="inline-block px-3 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full mb-2">
                          Most Popular
                        </span>
                      )}
                      <div className="font-heading font-bold text-foreground">
                        {plan.name}
                      </div>
                      <div className="mt-1">
                        <span className="text-2xl font-heading font-bold text-primary">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {features.map((feature, fi) => (
                  <tr key={fi} className="border-t border-border/30">
                    <td className="py-3.5 px-6 text-sm text-secondary-foreground">
                      {feature}
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={plan.name}
                        className={`text-center py-3.5 px-4 ${
                          plan.featured ? "bg-primary/5" : ""
                        }`}
                      >
                        {plan.checks[fi] ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="border-t border-border/30 bg-card/40">
                  <td className="py-5 px-6"></td>
                  {plans.map((plan) => {
                    const href = `/contact?service=${encodeURIComponent(
                      `${plan.name} Hosting`
                    )}&message=${encodeURIComponent(
                      `Interested in: ${plan.name} Hosting`
                    )}`;

                    return (
                      <td
                        key={plan.name}
                        className={`text-center py-5 px-4 ${
                          plan.featured ? "bg-primary/5" : ""
                        }`}
                      >
                        <Link
                          href={href}
                          className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            plan.featured
                              ? "bg-primary hover:bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                              : "border border-border hover:border-primary/40 text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          Sign Up
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid sm:grid-cols-2 gap-5">
            {plans.map((plan, pi) => {
              const href = `/contact?service=${encodeURIComponent(
                `${plan.name} Hosting`
              )}&message=${encodeURIComponent(
                `Interested in: ${plan.name} Hosting`
              )}`;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pi * 0.1 }}
                  className={`rounded-xl border p-6 relative ${
                    plan.featured
                      ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border/50 bg-card/60"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>

                  <div className="mt-2 mb-5">
                    <span className="text-2xl font-heading font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {features.map((feature, fi) =>
                      plan.checks[fi] ? (
                        <li
                          key={fi}
                          className="flex items-center gap-2 text-sm text-secondary-foreground"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ) : null
                    )}
                  </ul>

                  <Link
                    href={href}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                      plan.featured
                        ? "bg-primary hover:bg-primary text-primary-foreground"
                        : "border border-border hover:border-primary/40 text-foreground"
                    }`}
                  >
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Add-ons */}
          <div className="mt-12 text-center">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Available Add-Ons
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {addons.map((addon, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg text-sm"
                >
                  <span className="text-secondary-foreground">{addon.name}</span>
                  <span className="text-primary font-semibold">{addon.price}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Client Reviews
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              They Believed in Us — <span className="text-primary">You Will Too!</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-7"
              >
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-5">
                  "{t.text}"
                </p>
                <div>
                  <div className="font-heading font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-border/30 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Recognized on Leading Channels
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {[
              "Google 4.9★",
              "Clutch 5.0★",
              "UpCity 4.8★",
              "99% Uptime Guarantee",
              "24/7 Monitoring",
              "Free Migration",
            ].map((b, i) => (
              <div
                key={i}
                className="px-5 py-2.5 bg-card border border-border/40 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Reliable Hosting & Maintenance?"
        description="Get peace of mind with our managed hosting plans. Free migration included — we handle everything."
        ctaHref="/contact?service=Hosting&message=Interested%20in%3A%20Hosting"
      />
    </div>
  );
}
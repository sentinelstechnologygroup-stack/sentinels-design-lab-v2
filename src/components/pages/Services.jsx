"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, Smartphone, Search, MousePointer, Palette,
  ShoppingCart, Cpu, BarChart3, Server, ArrowRight
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Custom-built websites engineered for performance, clarity, and conversion — from single-page sites to multi-section platforms.",
    path: "/services",
    tag: "Core Service",
  },
  {
    icon: Search,
    title: "SEO Services",
    desc: "Sustainable search visibility built on technical precision, content strategy, and authoritative link acquisition.",
    path: "/services",
    tag: "Core Service",
  },
  {
    icon: MousePointer,
    title: "PPC / Paid Ads",
    desc: "Google and Meta ad campaigns built around real conversion data — not vanity metrics. Every dollar is tracked.",
    path: "/services",
    tag: "Core Service",
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    desc: "Visual identity systems that communicate positioning clearly — logo, type, color, and brand guidelines built to last.",
    path: "/services",
    tag: "Core Service",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    desc: "Online stores built on Shopify or WooCommerce, optimized for product discovery, mobile checkout, and repeat revenue.",
    path: "/services",
    tag: "Specialized",
  },
  {
    icon: Smartphone,
    title: "Custom App Development",
    desc: "Web and mobile applications built from scratch — scalable architecture, clean APIs, and intuitive interfaces.",
    path: "/services",
    tag: "Specialized",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    desc: "Full-funnel marketing execution across paid, organic, email, and social — tied to revenue outcomes, not reach.",
    path: "/services",
    tag: "Specialized",
  },
  {
    icon: Server,
    title: "Hosting & Maintenance",
    desc: "Managed hosting with proactive monitoring, security updates, performance tuning, and ongoing technical support.",
    path: "/services",
    tag: "Ongoing",
  },
];

export default function Services() {
  const core = services.filter(s => s.tag === "Core Service");
  const specialized = services.filter(s => s.tag !== "Core Service");

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Services
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Everything Your Business Needs to <span className="text-primary">Grow Online</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                We operate as a full-service digital partner — handling design, development, marketing, and infrastructure so you can focus on running your business.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/49a9801d0_generated_image.png" alt="Our Services" className="relative w-full max-h-[420px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Core Services</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {core.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={s.path} className="group flex gap-5 bg-card/60 border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Packages teaser */}
      <section className="py-16 bg-card/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Not sure where to start?</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Browse Our Packaged Tiers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-7 text-sm leading-relaxed">
            We offer structured packages — Lite, Starter, Growth, and Authority — so you can choose the level of engagement that fits your stage and budget.
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20">
            View Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Specialized + Ongoing */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Specialized & Ongoing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {specialized.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={s.path} className="group block bg-card/60 border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 h-full">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s.tag}</span>
                  <h3 className="font-heading text-sm font-semibold text-foreground mt-1 mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Get Started?" description="Tell us about your project and we'll put together a plan that fits your goals." />
    </div>
  );
}
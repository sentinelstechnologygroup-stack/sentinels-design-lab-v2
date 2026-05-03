// src/pages/About.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  ArrowRight,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";
import CTASection from "@/components/shared/CTASection";

const values = [
  {
    icon: Target,
    title: "Performance First",
    desc: "Everything we build is designed to drive measurable results — traffic, leads, and revenue. If it doesn’t perform, it doesn’t matter.",
  },
  {
    icon: Zap,
    title: "Execution Speed",
    desc: "We move fast without sacrificing quality. Speed creates momentum, and momentum drives results.",
  },
  {
    icon: ShieldCheck,
    title: "Built on Integrity",
    desc: "No inflated claims, no guesswork, no shortcuts. We operate with transparency and deliver what we stand behind.",
  },
  {
    icon: Lightbulb,
    title: "Systems Thinking",
    desc: "We don’t just build pages — we build connected systems that support growth, scalability, and long-term performance.",
  },
  {
    icon: Users,
    title: "Real Partnership",
    desc: "We work alongside our clients, not above them. Your business goals shape everything we build.",
  },
  {
    icon: Award,
    title: "High Standards",
    desc: "Clean execution, strong design, and real performance are non-negotiable. If it’s not right, it doesn’t ship.",
  },
];

const milestones = [
  {
    year: "2016",
    title: "Independent Start",
    event:
      "Began with independent design, database support, and operational problem-solving rooted in practical business needs.",
  },
  {
    year: "2018",
    title: "Systems & Development",
    event:
      "Expanded into custom platform and full-stack development, supporting reporting systems, workflow automation, and internal process improvement.",
  },
  {
    year: "2019",
    title: "Automation Focus",
    event:
      "Delivered system improvement and automation work to streamline reporting pipelines, reduce friction, and improve operational visibility.",
  },
  {
    year: "2020",
    title: "Digital Growth Services",
    event:
      "Added SEO and digital marketing services to connect technical execution with visibility, lead generation, and growth strategy.",
  },
  {
    year: "2021",
    title: "Broader Client Support",
    event:
      "Began supporting a wider mix of businesses and projects, combining design, systems thinking, and performance-focused execution.",
  },
  {
    year: "2025",
    title: "AI Workflow Integration",
    event:
      "Integrated AI-assisted workflows and automation thinking to improve build speed, analysis, and delivery systems.",
  },
  {
    year: "2026",
    title: "Sentinels Design Lab",
    event:
      "Relaunched under a unified brand focused on performance-driven websites, digital systems, automation, and scalable application development.",
  },
];

export default function About() {
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
              <span className="eyebrow mb-6">
                About Us
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-6">
                Built to Deliver{" "}
                <span className="text-primary">Real Results</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
                Sentinels Design Lab is a performance-focused digital partner
                based in Texas. We build websites, systems, and digital
                infrastructure designed to generate leads, improve conversion,
                and support real business growth.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 text-sm"
                >
                  See Our Work <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-border hover:border-primary/40 text-foreground px-7 py-3 rounded-lg font-semibold transition-all hover:bg-secondary/50 text-sm"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />

              <img
                src="/images/about/hero.png"
                alt="Sentinels Design Lab"
                className="relative w-full max-h-[480px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="readability-banner rounded-[1.75rem] px-8 py-12 sm:px-12">
            <span className="eyebrow mb-5 inline-flex">
              Our Mission
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
              Build Systems That{" "}
              <span className="text-primary">Drive Growth</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Our mission is to turn digital presence into a revenue-generating
              asset. We don’t build for aesthetics alone — we build systems that
              drive traffic, convert users, and support long-term business growth.
              Every decision is made with performance in mind, because results are
              the only metric that matters.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow mb-4">
              Core Values
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              How We Operate
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#0b1220] border border-white/10 rounded-xl p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {v.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="readability-banner rounded-[1.75rem] px-8 py-10 text-center mb-16 sm:px-12">
            <span className="eyebrow mb-4 inline-flex">
              Our Journey
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Built Through Execution
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
              The growth of Sentinels Design Lab has been built step by step —
              through real client work, systems thinking, technical execution,
              automation, and performance-focused delivery.
            </p>
          </div>

          {/* Desktop / Tablet */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 -translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={`${m.year}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    className="relative"
                  >
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                      {/* Left Card */}
                      <div className={`${isLeft ? "block" : "invisible"}`}>
                        <div className="ml-auto max-w-md rounded-2xl readability-card rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                          <div className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                            {m.year}
                          </div>
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-3 leading-tight">
                            {m.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {m.event}
                          </p>
                        </div>
                      </div>

                      {/* Center Node */}
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-primary/20 bg-background/90 shadow-[0_0_0_8px_rgba(2,6,23,0.55)]">
                          <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                          <Clock className="relative w-5 h-5 text-primary" />
                        </div>
                      </div>

                      {/* Right Card */}
                      <div className={`${!isLeft ? "block" : "invisible"}`}>
                        <div className="max-w-md rounded-2xl readability-card rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                          <div className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                            {m.year}
                          </div>
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-3 leading-tight">
                            {m.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {m.event}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative max-w-2xl mx-auto">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={`${m.year}-${i}`}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-3 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-[0_0_0_6px_rgba(2,6,23,0.45)]">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                    <div className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                      {m.year}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {m.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Philosophy */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="readability-banner rounded-[1.75rem] px-8 py-10 text-center max-w-3xl mx-auto mb-14 sm:px-12">
            <span className="eyebrow mb-4 inline-flex">
              Founder’s Philosophy
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
              Built From Real Operational Experience
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Sentinels Design Lab was not built from theory alone. It was
              shaped by real work in operations, database management, systems
              improvement, reporting, automation, and digital execution. That
              background still defines how projects are approached today: solve
              the real problem, simplify the system, and build something that
              performs under real-world conditions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b1220] border border-white/10 rounded-xl p-7"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Systems Over Surface
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Good design matters, but design alone is not enough. The
                strongest work comes from building connected systems — websites,
                workflows, automations, and application layers that support how
                a business actually operates and grows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-[#0b1220] border border-white/10 rounded-xl p-7"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Built for Real Operators
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The foundation comes from working in environments where
                reporting, process discipline, automation, and continuous
                improvement matter. That creates a bias toward clarity,
                measurable performance, and solutions that reduce friction
                instead of adding noise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="bg-[#0b1220] border border-white/10 rounded-xl p-7"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Service With Purpose
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                That same mindset also extends into mission-driven work,
                including nonprofit development through Sentinels Foundation and
                the exploration of AI-assisted systems, automation tools, and
                scalable solutions that can support both operational efficiency
                and broader impact.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0c1322] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              What that means in practice
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The philosophy behind the work is simple: build with intention,
                remove unnecessary complexity, and create assets that do
                something useful. That may be a high-conversion website, a
                cleaner reporting structure, a more efficient internal workflow,
                a custom digital tool, or an automation layer that saves time
                and improves consistency.
              </p>

              <p>
                The long-term direction is not just to produce one-off projects,
                but to develop stronger digital systems — including
                applications, automations, AI-assisted workflows, and
                mission-aligned platforms — that help organizations operate more
                effectively and scale with more control.
              </p>

              <p>
                Whether the client is a business looking for growth or a
                nonprofit building for impact, the standard remains the same:
                solve the right problem, build it cleanly, and make sure it
                creates real value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build Something That Performs?"
        description="Let’s create a system that drives real results for your business."
      />
    </div>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Target, Lightbulb, Award, ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import CTASection from "../components/shared/CTASection";

const team = [
  { name: "Marcus Reid", role: "CEO & Founder", desc: "Visionary leader with 15+ years in digital strategy and brand innovation.", initials: "MR" },
  { name: "Alicia Torres", role: "Head of Design", desc: "Award-winning designer specializing in UI/UX and brand identity systems.", initials: "AT" },
  { name: "Devon Clarke", role: "Lead Developer", desc: "Full-stack engineer with deep expertise in scalable web and mobile platforms.", initials: "DC" },
  { name: "Priya Nair", role: "SEO & Marketing Lead", desc: "Data-driven marketer who has driven 300%+ growth for Fortune 500 clients.", initials: "PN" },
  { name: "James Okoro", role: "App Development Lead", desc: "Mobile-first architect with 100+ iOS and Android apps shipped globally.", initials: "JO" },
  { name: "Sofia Mendes", role: "Client Success Manager", desc: "Ensuring every client achieves their goals from kickoff through launch and beyond.", initials: "SM" },
];

const values = [
  { icon: Target, title: "Results-Driven", desc: "Every decision we make is rooted in measurable outcomes. We track, analyze, and optimize until the numbers speak for themselves." },
  { icon: Lightbulb, title: "Creative Thinking", desc: "We challenge conventional thinking and bring fresh perspectives to every project, blending creativity with technical precision." },
  { icon: ShieldCheck, title: "Integrity First", desc: "We operate with full transparency — honest timelines, clear communication, and zero surprises. Your trust is our most valued asset." },
  { icon: Zap, title: "Speed & Quality", desc: "Fast delivery without compromising craftsmanship. We believe great work doesn't have to take forever." },
  { icon: Users, title: "Client Partnership", desc: "We don't just work for you — we work with you. Your vision is the foundation everything we build is anchored to." },
  { icon: Award, title: "Excellence Standard", desc: "We hold ourselves to the highest bar. If it's not exceptional, it's not leaving our studio." },
];

const milestones = [
  { year: "2014", event: "Founded in New York with a team of 3 designers and a bold vision." },
  { year: "2016", event: "Expanded into mobile app development, delivering 20+ apps in the first year." },
  { year: "2018", event: "Launched SEO & Digital Marketing division — first client hit #1 on Google in 60 days." },
  { year: "2020", event: "Grew to 50+ professionals, serving clients across 12 countries." },
  { year: "2022", event: "Introduced AI Systems & Custom Platform development services." },
  { year: "2024", event: "Surpassed 250 projects delivered and recognized as a top agency in the U.S." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                About Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-6">
                The Agency Behind <span className="text-primary">Digital Leaders</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
                Sentinels Design Lab is a full-service digital agency based in New York. We combine creative design, engineering excellence, and data-driven strategy to build brands that dominate their markets online.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/projects" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 text-sm">
                  See Our Work <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-border hover:border-primary/40 text-foreground px-7 py-3 rounded-lg font-semibold transition-all hover:bg-secondary/50 text-sm">
                  Get In Touch
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "250+", label: "Projects Delivered" },
                  { value: "10+", label: "Years of Excellence" },
                  { value: "150+", label: "Professionals" },
                  { value: "99%", label: "Client Retention" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card/60 border border-border/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/5299538ac_generated_image.png" alt="About Sentinels Design Lab" className="relative w-full max-h-[480px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Mission</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
              We Build Digital Experiences That <span className="text-primary">Move People to Act</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our mission is simple: help ambitious brands stand out in a crowded digital world. We do this through relentless creativity, meticulous craftsmanship, and strategies built on real data — not guesswork. Every project we take on is treated as if it were our own business on the line.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Core Values</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Journey</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">A Decade of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center shrink-0 z-10">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border/50 rounded-xl p-5 flex-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{m.year}</span>
                    <p className="text-sm text-secondary-foreground mt-1">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Team</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">The People Behind the Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-5">
                  <span className="font-heading font-bold text-primary text-lg">{member.initials}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-primary font-medium mt-0.5 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Work With Us?" description="Let's build something remarkable together — your vision, our expertise." />
    </div>
  );
}
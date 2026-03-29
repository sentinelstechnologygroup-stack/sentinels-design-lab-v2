"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Globe, Smartphone, Search, BarChart3,
  Palette, Server, ShieldCheck, Users, Zap, Award, Clock, Star, CheckCircle2
} from "lucide-react";
import CTASection from "../components/shared/CTASection";

const services = [
  { icon: Globe, title: "Website Design & Development", desc: "Immersive, high-performance websites that captivate and convert.", path: "/services/website-design" },
  { icon: Smartphone, title: "Custom Apps Development", desc: "Intuitive mobile applications that engage users and drive results.", path: "/services/custom-apps" },
  { icon: Search, title: "SEO Services", desc: "Data-driven strategies that boost rankings and organic traffic.", path: "/services/seo" },
  { icon: BarChart3, title: "Digital Marketing", desc: "Multi-channel campaigns that maximize visibility and conversions.", path: "/services/digital-marketing" },
  { icon: Palette, title: "Marketing Collateral", desc: "Brand-consistent materials from business cards to brochures.", path: "/services/marketing-collateral" },
  { icon: Server, title: "Hosting & Maintenance", desc: "Reliable hosting with proactive maintenance and 99% uptime.", path: "/services/hosting" },
];

const stats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "150+", label: "Team Members" },
  { value: "10+", label: "Years Experience" },
  { value: "99%", label: "Client Retention" },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "CEO, BrightPath", text: "Sentinels Design Lab exceeded every expectation. Our website traffic tripled within three months of launch." },
  { name: "James Rodriguez", role: "Founder, NovaTech", text: "Their attention to detail and strategic thinking set them apart. We saw measurable results from day one." },
  { name: "Emily Chen", role: "Marketing Director, Velo", text: "A truly professional team that delivers on their promises. Our rebrand was flawless." },
];

// intentionally blank — images inlined below

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/8" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/6 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">

            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pb-12 lg:pb-20"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Premium Design & Development Agency
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Where Vision Meets{" "}
                <span className="text-primary">Digital Precision</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Sentinels Design Lab is a results-driven agency helping businesses grow with purpose. We bring together creative design, smart strategy, and real digital impact to transform your brand.
              </p>

              {/* Trust Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Web Design", "Logo & Branding", "Mobile Apps", "SEO", "Video & Animation", "Copywriting"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-card/60 border border-border/50 rounded-full text-xs text-secondary-foreground">
                    <CheckCircle2 className="w-3 h-3 text-primary" /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/start-project" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 text-sm">
                  Start a Project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/packages" className="inline-flex items-center gap-2 border border-border hover:border-primary/40 text-foreground px-8 py-3.5 rounded-lg font-semibold transition-all hover:bg-secondary/50 text-sm">
                  View Packages
                </Link>
              </div>

              {/* Ratings row */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { platform: "Google", rating: "4.9" },
                  { platform: "Clutch", rating: "5.0" },
                  { platform: "UpCity", rating: "4.8" },
                ].map((r) => (
                  <div key={r.platform} className="flex items-center gap-1.5 text-xs">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                    </div>
                    <span className="font-semibold text-foreground">{r.rating}</span>
                    <span className="text-muted-foreground">{r.platform}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              {/* Glow */}
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />

              {/* Grid collage */}
              <div className="relative grid grid-cols-2 grid-rows-3 gap-3 h-[540px]">
                {/* Large left tile */}
                <div className="row-span-2 rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-black/30 relative group">
                  <img
                    src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/18cff837f_generated_image.png"
                    alt="Branding & Logo Design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">Branding & Logo</span>
                  </div>
                </div>

                {/* Top right tile */}
                <div className="rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-black/30 relative group">
                  <img
                    src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/f7ea866a4_generated_image.png"
                    alt="Web Design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">Web Design</span>
                  </div>
                </div>

                {/* Middle right tile */}
                <div className="rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-black/30 relative group">
                  <img
                    src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/47a12a557_generated_image.png"
                    alt="Mobile Apps"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">Mobile Apps</span>
                  </div>
                </div>

                {/* Bottom left tile */}
                <div className="rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-black/30 relative group">
                  <img
                    src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/dc26e93bc_generated_image.png"
                    alt="SEO & Marketing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">SEO & Marketing</span>
                  </div>
                </div>

                {/* Bottom right tile */}
                <div className="rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-black/30 relative group">
                  <img
                    src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/b201335f7_generated_image.png"
                    alt="Digital Agency"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">Video & Animation</span>
                  </div>
                </div>

                {/* Floating stat badge */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-card border border-border/60 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm z-10">
                  <div className="text-2xl font-heading font-bold text-primary">250+</div>
                  <div className="text-xs text-muted-foreground">Projects Delivered</div>
                </div>

                {/* Floating badge bottom */}
                <div className="absolute -right-4 bottom-16 bg-card border border-border/60 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">Available for Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border/30 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">What We Do</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From visuals to voice, we help brands stand out and stay consistent — online and off.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={service.path} className="group block bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Sentinels</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-8">
                The Agency That Sets <span className="text-accent">New Standards</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "100% satisfaction with every project delivered." },
                  { icon: Users, title: "Dedicated Team", desc: "Expert designers and developers assigned to your project." },
                  { icon: Zap, title: "Fast Turnaround", desc: "Quick delivery without compromising on quality." },
                  { icon: Award, title: "Award-Winning", desc: "Recognized for excellence in design and innovation." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Team image + process card stacked */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="relative rounded-2xl overflow-hidden h-52 border border-border/30 shadow-xl shadow-black/20">
                <img
                  src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/5299538ac_generated_image.png"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-semibold">Our Studio — New York</span>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-heading font-semibold text-foreground">Our Process</span>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Discovery", desc: "We learn your brand, goals, and audience." },
                    { step: "02", title: "Strategy", desc: "We craft a tailored plan for maximum impact." },
                    { step: "03", title: "Design & Build", desc: "Our team brings the vision to life." },
                    { step: "04", title: "Launch & Grow", desc: "We deploy, optimize, and support your growth." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-xs font-heading font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md shrink-0">{item.step}</span>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Trusted by Brands That Lead
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
                className="bg-card/60 border border-border/50 rounded-xl p-7"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-heading font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
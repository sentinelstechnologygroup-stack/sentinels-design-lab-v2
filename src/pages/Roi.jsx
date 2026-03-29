// src/pages/Roi.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import ROICalculator from "@/components/roi/ROICalculator";

export default function RoiPage() {
  return (
    <div className="bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%)]" />

        <div className="section-shell relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            
            {/* LEFT */}
            <div className="max-w-4xl">
              <div className="eyebrow">ROI CALCULATOR</div>

              <h1 className="headline-xl">
                Calculate Your <span className="text-blue-400">Marketing ROI</span>
              </h1>

              <p className="body-lg mt-6 max-w-3xl">
                Estimate the revenue impact of investing in digital marketing —
                before you spend a dollar. Adjust the inputs to match your business.
              </p>

              <div className="mt-8 flex gap-4">
                <Link href="/start-project" className="btn-primary">
                  Start a Project
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Talk Through Your Numbers
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-500/20 blur-2xl opacity-40 rounded-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src="/images/roi/hero.png"
                  alt="ROI Dashboard"
                  width={900}
                  height={650}
                  className="w-full h-full object-cover opacity-95"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE STRIP ================= */}
      <section className="section-shell pb-16">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="glass-card p-6">
            <DollarSign className="h-6 w-6" />
            <h3 className="mt-4 font-semibold">Core Idea</h3>
            <p className="mt-2 text-sm text-white/70">
              ROI is driven by conversion, not just traffic.
            </p>
          </div>

          <div className="glass-card p-6">
            <TrendingUp className="h-6 w-6" />
            <h3 className="mt-4 font-semibold">Better Conversion</h3>
            <p className="mt-2 text-sm text-white/70">
              Strong structure increases lead generation.
            </p>
          </div>

          <div className="glass-card p-6">
            <BarChart3 className="h-6 w-6" />
            <h3 className="mt-4 font-semibold">Lead Quality</h3>
            <p className="mt-2 text-sm text-white/70">
              Better positioning attracts better clients.
            </p>
          </div>

          <div className="glass-card p-6">
            <Calculator className="h-6 w-6" />
            <h3 className="mt-4 font-semibold">Payback Speed</h3>
            <p className="mt-2 text-sm text-white/70">
              Often covered in 1–3 months.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CALCULATOR ================= */}
      <section className="section-shell pb-20">
        <div className="mb-10 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/50">
            Interactive ROI
          </div>
          <h2 className="headline-lg mt-4">
            Run the numbers for your business
          </h2>
          <p className="mt-4 text-white/70">
            Adjust the inputs below to estimate real revenue impact.
          </p>
        </div>

        <ROICalculator />
      </section>

      {/* ================= CTA ================= */}
      <section className="section-shell pb-24">
        <div className="glass-card p-10">
          <h2 className="headline-lg">
            Want to pressure-test the ROI for your business?
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl">
            We can map your real numbers and show you exactly what your site,
            SEO, or marketing should be producing.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/start-project" className="btn-primary">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link href="/contact" className="btn-secondary">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
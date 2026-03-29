// src/components/roi/ROICalculator.jsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
} from "lucide-react";

const SERVICES = [
  { value: "seo", label: "SEO / Organic Growth" },
  { value: "ppc", label: "PPC / Paid Ads" },
  { value: "web", label: "Website Redesign" },
  { value: "ecommerce", label: "Ecommerce Optimization" },
  { value: "social", label: "Social Media / Content" },
];

const MULTIPLIERS = {
  seo: {
    trafficGrowth: 0.35,
    conversionLift: 0.08,
    timelineMonths: 6,
    label:
      "SEO typically delivers 30–40% traffic growth and steady compounding returns over 6–18 months.",
  },
  ppc: {
    trafficGrowth: 0.5,
    conversionLift: 0.12,
    timelineMonths: 2,
    label:
      "PPC delivers fast results — campaigns can generate leads within weeks, with ROI visible in 60–90 days.",
  },
  web: {
    trafficGrowth: 0.2,
    conversionLift: 0.4,
    timelineMonths: 3,
    label:
      "A redesigned website typically improves conversion rate 30–50% and reduces bounce rate significantly.",
  },
  ecommerce: {
    trafficGrowth: 0.15,
    conversionLift: 0.55,
    timelineMonths: 3,
    label:
      "Ecommerce CRO improvements compound — a 1% conversion rate lift on $500K revenue = $50K additional revenue.",
  },
  social: {
    trafficGrowth: 0.25,
    conversionLift: 0.1,
    timelineMonths: 4,
    label:
      "Social and content marketing build brand equity and compound traffic over time through organic amplification.",
  },
};

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-bold text-primary">{format(value)}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border/60 accent-primary"
      />

      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, sub, accent = false }) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-primary/40 bg-primary/5"
          : "border-border/50 bg-card/60"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${
            accent ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>

      <div
        className={`text-2xl font-bold ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </div>

      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export default function ROICalculator() {
  const [service, setService] = useState("seo");
  const [monthlyVisitors, setMonthlyVisitors] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(500);
  const [investmentMonthly, setInvestmentMonthly] = useState(1500);

  const results = useMemo(() => {
    const m = MULTIPLIERS[service];
    const currentMonthlyRevenue =
      monthlyVisitors * (conversionRate / 100) * avgOrderValue;
    const newVisitors = monthlyVisitors * (1 + m.trafficGrowth);
    const newConvRate = conversionRate * (1 + m.conversionLift);
    const newMonthlyRevenue = newVisitors * (newConvRate / 100) * avgOrderValue;
    const revenueGainMonthly = newMonthlyRevenue - currentMonthlyRevenue;
    const annualGain = revenueGainMonthly * 12;
    const annualInvestment = investmentMonthly * 12;
    const netROI = annualGain - annualInvestment;
    const roiPct =
      annualInvestment > 0 ? (netROI / annualInvestment) * 100 : 0;
    const paybackMonths =
      revenueGainMonthly > 0
        ? Math.ceil(investmentMonthly / revenueGainMonthly)
        : null;

    return {
      currentMonthlyRevenue,
      newMonthlyRevenue,
      revenueGainMonthly,
      annualGain,
      annualInvestment,
      netROI,
      roiPct,
      paybackMonths,
      timelineMonths: m.timelineMonths,
      insight: m.label,
    };
  }, [
    service,
    monthlyVisitors,
    conversionRate,
    avgOrderValue,
    investmentMonthly,
  ]);

  const selectedService =
    SERVICES.find((s) => s.value === service)?.label || "ROI Estimate";

  const fmtFull = (n) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-8"
      >
        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Service Type
          </h2>

          <div className="grid grid-cols-1 gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setService(s.value)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  service === s.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/40 bg-background/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    service === s.value ? "bg-primary" : "bg-border"
                  }`}
                />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-7 rounded-xl border border-border/50 bg-card/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your Current Numbers
          </h2>

          <Slider
            label="Monthly Website Visitors"
            value={monthlyVisitors}
            min={500}
            max={100000}
            step={500}
            format={(v) => v.toLocaleString()}
            onChange={setMonthlyVisitors}
          />

          <Slider
            label="Current Conversion Rate"
            value={conversionRate}
            min={0.5}
            max={10}
            step={0.5}
            format={(v) => `${v}%`}
            onChange={setConversionRate}
          />

          <Slider
            label="Average Order / Lead Value"
            value={avgOrderValue}
            min={50}
            max={10000}
            step={50}
            format={(v) => `$${v.toLocaleString()}`}
            onChange={setAvgOrderValue}
          />

          <Slider
            label="Monthly Marketing Investment"
            value={investmentMonthly}
            min={300}
            max={20000}
            step={100}
            format={(v) => `$${v.toLocaleString()}/mo`}
            onChange={setInvestmentMonthly}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {results.insight}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            icon={DollarSign}
            label="Current Monthly Revenue"
            value={fmtFull(results.currentMonthlyRevenue)}
            sub="from existing traffic"
          />
          <ResultCard
            icon={TrendingUp}
            label="Projected Monthly Revenue"
            value={fmtFull(results.newMonthlyRevenue)}
            sub={`after ~${results.timelineMonths} months`}
            accent
          />
          <ResultCard
            icon={BarChart3}
            label="Additional Monthly Revenue"
            value={`+${fmtFull(results.revenueGainMonthly)}`}
            sub="estimated monthly gain"
          />
          <ResultCard
            icon={DollarSign}
            label="Annual Revenue Gain"
            value={`+${fmtFull(results.annualGain)}`}
            sub="over 12 months"
            accent
          />
        </div>

        <div className="space-y-4 rounded-xl border border-border/50 bg-card p-6">
          <h3 className="font-semibold text-foreground">
            Return on Investment Summary
          </h3>

          {[
            {
              label: "Annual Investment",
              value: fmtFull(results.annualInvestment),
            },
            {
              label: "Estimated Annual Revenue Gain",
              value: `+${fmtFull(results.annualGain)}`,
            },
            {
              label: "Net Return (Year 1)",
              value:
                results.netROI >= 0
                  ? `+${fmtFull(results.netROI)}`
                  : fmtFull(results.netROI),
            },
            {
              label: "ROI %",
              value: `${Math.round(results.roiPct)}%`,
            },
            {
              label: "Est. Payback Period",
              value: results.paybackMonths
                ? `${results.paybackMonths} month${
                    results.paybackMonths !== 1 ? "s" : ""
                  }`
                : "N/A",
            },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between pb-3 text-sm ${
                i < 4 ? "border-b border-border/30" : ""
              }`}
            >
              <span className="text-muted-foreground">{row.label}</span>
              <span
                className={`font-bold ${
                  i >= 2 && results.netROI >= 0
                    ? "text-primary"
                    : i >= 2
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          * These are directional estimates based on common industry benchmarks.
          Actual performance varies by offer strength, competition, traffic quality,
          and execution.
        </p>

        <Link
          href={`/start-project?service=${encodeURIComponent(selectedService)}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
        >
          Get a Custom ROI Proposal
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
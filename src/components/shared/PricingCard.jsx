"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function PricingCard({
  name,
  price,
  periodLabel,
  categoryLabel,
  ctaLabel = "Get Started",
  description,
  features = [],
  featured,
}) {
  const contactHref = "https://reports.sentinelsdesignlab.com/evaluation";
  const showDollarPrice = typeof price === "string" && /^\d[\d,]*$/.test(price);

  return (
    <div
      className={`relative flex h-full flex-col overflow-visible rounded-[28px] border p-7 transition-all duration-300 md:p-8 ${
        featured
          ? "border-primary/50 bg-[#040c1a] pt-10 md:pt-11 shadow-[0_24px_70px_rgba(59,130,246,0.22)]"
          : "readability-card hover:border-primary/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.26)]"
      }`}
    >
      {featured ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-primary/30 bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
          Most Popular
        </div>
      ) : null}

      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
          {categoryLabel || (featured ? "Recommended plan" : "Website plan")}
        </div>
        <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{name}</h3>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
        <span className="font-heading text-3xl font-bold text-foreground sm:text-[2.15rem]">
          {showDollarPrice ? `$${price}` : price}
        </span>
        {periodLabel ? (
          <span className="pb-1 text-sm font-medium text-muted-foreground">{periodLabel}</span>
        ) : null}
      </div>

      {description ? (
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{description}</p>
      ) : null}

      <div className="mt-6 readability-inner rounded-[22px] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Included
        </div>
        <ul className="mt-4 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-6 text-secondary-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <Link
          href={contactHref}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
            featured
              ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
              : "border border-border bg-secondary/30 text-foreground hover:border-primary/40 hover:bg-secondary/55"
          }`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

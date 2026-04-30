"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function PricingCard({
  name,
  originalPrice,
  price,
  description,
  features = [],
  featured,
}) {
  const serviceParam = encodeURIComponent(name || "");
  const contactHref = `/contact?type=website-evaluation&service=${serviceParam}`;

  const showDollarPrice =
    typeof price === "string" &&
    price !== "" &&
    !price.toLowerCase().includes("quote") &&
    !price.toLowerCase().includes("custom");

  const showDollarOriginalPrice =
    typeof originalPrice === "string" &&
    originalPrice !== "" &&
    !originalPrice.toLowerCase().includes("quote") &&
    !originalPrice.toLowerCase().includes("custom");

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 md:p-8 ${
        featured
          ? "border-primary/40 bg-primary/[0.08] shadow-[0_24px_70px_rgba(59,130,246,0.18)]"
          : "panel-safe hover:border-primary/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.26)]"
      }`}
    >
      {featured ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground whitespace-nowrap">
          Most Popular
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
            {featured ? "Recommended package" : "Website package"}
          </div>
          <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{name}</h3>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        {showDollarOriginalPrice ? (
          <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
        ) : null}

        <span className="font-heading text-3xl font-bold text-foreground sm:text-[2.15rem]">
          {showDollarPrice ? `$${price}` : price}
        </span>

        {showDollarPrice ? (
          <span className="pb-1 text-sm text-muted-foreground">starting</span>
        ) : null}
      </div>

      {description ? (
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{description}</p>
      ) : null}

      <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Included
        </div>
        <ul className="mt-4 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-6 text-secondary-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-1">
        <Link
          href={contactHref}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
            featured
              ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
              : "border border-border bg-secondary/30 text-foreground hover:border-primary/40 hover:bg-secondary/55"
          }`}
        >
          Request This Build
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

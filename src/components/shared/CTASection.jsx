"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  ctaLabel,
  ctaHref,
}) {
  const resolvedPrimaryLabel = primaryLabel || ctaLabel || "Get Website Evaluation";
  const resolvedPrimaryHref = primaryHref || ctaHref || "/contact?type=website-evaluation";

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        )}

        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {title ||
            "If your website or digital systems no longer reflect the quality of your business, it's time to fix that."}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {description ||
            "Request a website evaluation and we'll review the current state, identify the biggest friction points, and recommend the clearest next step."}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={resolvedPrimaryHref} className="btn-primary px-8 py-3.5">
            {resolvedPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary/50"
            >
              {secondaryLabel}
            </Link>
          ) : (
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary/50"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-primary/4 to-accent/8" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="readability-banner rounded-[1.75rem] px-8 py-12 text-center sm:px-12">
          {eyebrow && (
            <span className="eyebrow mb-5 inline-flex">
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
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-white/[0.07]"
              >
                {secondaryLabel}
              </Link>
            ) : (
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-white/[0.07]"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

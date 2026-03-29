"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS } from "../../lib/constants";

export default function CTASection({ title, description, ctaLabel, ctaHref }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {title || "Ready to Start Your Project?"}
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          {description || "Tell us what you're building and we'll put together a plan that fits your goals and budget."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={ctaHref || "/start-project"}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            {ctaLabel || "Start a Project"} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-2 border border-border hover:border-primary/40 text-foreground px-8 py-3.5 rounded-lg font-semibold transition-all hover:bg-secondary/50"
          >
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
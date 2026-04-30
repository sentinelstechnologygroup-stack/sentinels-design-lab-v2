     1|"use client";
     2|
     3|import React from "react";
     4|import Link from "next/link";
     5|import { ArrowRight, Phone } from "lucide-react";
     6|import { BUSINESS } from "@/lib/constants";
     7|
     8|export default function CTASection({ title, description, ctaLabel, ctaHref }) {
     9|  return (
    10|    <section className="relative overflow-hidden py-20">
    11|      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
    12|      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
    13|
    14|      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
    15|        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
    16|          {title || "If your website or digital systems no longer reflect the quality of your business, it’s time to fix that."}
    17|        </h2>
    18|
    19|        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
    20|          {description ||
    21|            "Request a website evaluation and we’ll review the current state, identify the biggest friction points, and recommend the clearest next step."}
    22|        </p>
    23|
    24|        <div className="mt-8 flex flex-wrap justify-center gap-4">
    25|          <Link
    26|            href={ctaHref || "/contact?type=website-evaluation"}
    27|            className="btn-primary px-8 py-3.5"
    28|          >
    29|            {ctaLabel || "Get Website Evaluation"}
    30|            <ArrowRight className="h-4 w-4" />
    31|          </Link>
    32|
    33|          <a
    34|            href={BUSINESS.phoneHref}
    35|            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary/50"
    36|          >
    37|            <Phone className="h-4 w-4" />
    38|            {BUSINESS.phone}
    39|          </a>
    40|        </div>
    41|      </div>
    42|    </section>
    43|  );
    44|}
    45|
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  variant = "standard",
  children,
}) {
  const imageFirst = imagePosition === "left";
  const hasImage = Boolean(imageSrc);

  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={[
          "grid items-center gap-10 lg:gap-14",
          hasImage ? "lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]" : "max-w-4xl",
        ].join(" ")}>
          <div className={imageFirst ? "lg:order-2" : ""}>
            {eyebrow ? <div className="eyebrow mb-6">{eyebrow}</div> : null}
            <h1 className={[
              "font-heading font-bold leading-tight text-foreground",
              variant === "compact" ? "text-4xl sm:text-5xl lg:text-[3.2rem]" : "text-4xl sm:text-5xl lg:text-[3.5rem]",
            ].join(" ")}>
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {description}
              </p>
            ) : null}

            {(primaryCtaLabel || secondaryCtaLabel) ? (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryCtaLabel && primaryCtaHref ? (
                  <Link href={primaryCtaHref} className="btn-primary px-8 py-3.5 text-sm">
                    {primaryCtaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
                {secondaryCtaLabel && secondaryCtaHref ? (
                  <Link href={secondaryCtaHref} className="btn-secondary px-8 py-3.5 text-sm">
                    {secondaryCtaLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}

            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {hasImage ? (
            <div className={[
              "relative",
              imageFirst ? "lg:order-1" : "",
            ].join(" ")}>
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
                <div className="relative aspect-[4/3] md:aspect-[16/11]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/72 via-transparent to-transparent" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

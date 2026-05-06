"use client";

import Image from "next/image";
import Link from "next/link";

const fallbackImage = "/images/blog/fallback-editorial.svg";

export default function BlogCard({
  title,
  slug,
  excerpt,
  category,
  date,
  readTime,
  thumbnailImage,
  thumbnailUrl,
  thumbnailImageAlt,
  alt,
  heroOverlay,
  priority = false,
}) {
  const imageSrc = thumbnailImage || thumbnailUrl || fallbackImage;
  const imageAlt = thumbnailImageAlt || alt || `${title} thumbnail`;

  return (
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[#08101d] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-5">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10 bg-[#050816] ${heroOverlay ? "" : "p-2"}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={heroOverlay ? "object-cover object-right" : "object-contain object-center"}
          priority={priority}
        />
        {heroOverlay && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.78)_32%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0)_72%)]"
            />
            <div className="absolute inset-0 z-10 flex max-w-[52%] flex-col justify-center pl-[6%] pr-0">
              <p className="font-heading text-[clamp(1.35rem,3.2vw,3rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
                {(heroOverlay.titleLines || []).map((line, i) => (
                  <span key={i} className={`block ${line === heroOverlay.accentLine ? "text-[#C9961A]" : ""}`}>
                    {line}
                  </span>
                ))}
              </p>
              <div aria-hidden="true" className="my-2 h-[2px] w-16 rounded-sm bg-[#C9961A]" />
              {(heroOverlay.subtitleLines || (heroOverlay.subtitle ? [heroOverlay.subtitle] : [])).length > 0 && (
                <p className="font-display text-[clamp(0.65rem,1.2vw,1rem)] font-semibold leading-[1.15] tracking-[0.02em] text-white">
                  {(heroOverlay.subtitleLines || [heroOverlay.subtitle]).filter(Boolean).map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {category}
      </div>

      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>

      <div className="mt-3 text-sm text-white/45">
        {date} • {readTime}
      </div>

      <p className="mt-4 text-sm leading-7 text-white/70">{excerpt}</p>

      <Link
        href={`/blog/${slug}`}
        className="mt-6 inline-flex items-center text-sm font-medium text-primary transition hover:text-white"
      >
        Read article →
      </Link>
    </article>
  );
}

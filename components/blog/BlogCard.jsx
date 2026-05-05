"use client";

import Image from "next/image";
import Link from "next/link";

const fallbackImage = "/images/blog/fallback-editorial.webp";

export default function BlogCard({
  title,
  slug,
  excerpt,
  category,
  date,
  readTime,
  thumbnailImage,
  thumbnailImageAlt,
  priority = false, // 👈 NEW
}) {
  const imageSrc = thumbnailImage || fallbackImage;
  const imageAlt = thumbnailImageAlt || `${title} thumbnail`;

  return (
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[#08101d] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-5">
      
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10 bg-[#09111f]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" // 👈 FIXED
          className="object-cover"
          priority={priority} // 👈 FIXED
        />
      </div>

      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {category}
      </div>

      <h2 className="mt-3 text-2xl font-semibold text-white">
        {title}
      </h2>

      <div className="mt-3 text-sm text-white/45">
        {date} • {readTime}
      </div>

      <p className="mt-4 text-sm leading-7 text-white/70">
        {excerpt}
      </p>

      <Link
        href={`/blog/${slug}`}
        className="mt-6 inline-flex items-center text-sm font-medium text-primary transition hover:text-white"
      >
        Read article →
      </Link>
    </article>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/shared/CTASection";
import { blogCategories, blogPosts } from "@/lib/siteData";

export default function BlogPage() {
  const fallbackThumbnail = "/images/blog/blog-fallback-thumbnail.svg";

  return (
    <div>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <div className="eyebrow">Blog</div>
          <h1 className="headline-xl">Website redesign, modernization, and digital-system insights.</h1>
          <p className="body-lg mt-6 max-w-3xl">
            SDL uses a local-file blog—no CMS, no database, no WordPress. These articles support the website evaluation wedge while making broader full-stack capability clear.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span key={category} className="pill px-3 py-1.5 text-xs">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => {
            const thumbnailSrc = post.thumbnailImage || post.heroImage || fallbackThumbnail;
            const thumbnailAlt = post.thumbnailImageAlt || post.heroImageAlt || `${post.title} thumbnail`;

            return (
              <article key={post.slug} className="panel-safe overflow-hidden p-4 md:p-5">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-[20px] border border-white/10 bg-[#09111f]">
                  <Image
                    src={thumbnailSrc}
                    alt={thumbnailAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-primary">{post.category}</div>
                <h2 className="mt-4 text-2xl font-semibold text-white">{post.title}</h2>
                <div className="mt-3 text-sm text-white/45">{post.date} • {post.readTime}</div>
                <p className="mt-4 text-sm leading-7 text-white/70">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-blue-400 transition hover:text-blue-300"
                >
                  Read article →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}

// src/pages/Blog.jsx
"use client";

import React from "react";
import Link from "next/link";

const posts = [
  {
    slug: "why-websites-fail-to-convert",
    title: "Why Most Business Websites Fail to Convert",
    excerpt:
      "A clean-looking site is not enough. Conversion comes from clear positioning, trust signals, and a friction-free path to action.",
    category: "Conversion",
  },
  {
    slug: "seo-vs-ppc-for-local-business",
    title: "SEO vs PPC for Local Businesses",
    excerpt:
      "Both channels can work, but they solve different problems. The best decision depends on timeline, budget, and lead goals.",
    category: "Marketing",
  },
  {
    slug: "what-makes-a-website-worth-the-investment",
    title: "What Makes a Website Worth the Investment",
    excerpt:
      "The right website should not be judged only by design. It should be evaluated by trust, conversion, and revenue potential.",
    category: "ROI",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <div className="eyebrow">BLOG</div>
          <h1 className="headline-xl">Insights on websites, marketing, and growth.</h1>
          <p className="body-lg mt-6 max-w-3xl">
            Practical articles focused on digital positioning, conversion, SEO, paid traffic,
            and how to turn a website into a real business asset.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                {post.category}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

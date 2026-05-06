// src/pages/Blog.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage({ posts = [] }) {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pb-4 lg:pb-10"
            >
              <div className="eyebrow mb-6">SDL Insights</div>
              <h1 className="headline-xl">
                Websites, systems, and digital strategy for service businesses.
              </h1>
              <p className="body-lg mt-6 max-w-xl">
                Practical articles on website performance, conversion, local SEO,
                digital infrastructure, and how to build a web presence that
                actively supports business growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#050816] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src="/images/hero/blog-hero.webp"
                    alt="Articles on website strategy, local business growth, and digital systems"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/45 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              thumbnailImage={post.thumbnailUrl}
              thumbnailImageAlt={post.alt}
              heroOverlay={post.heroOverlay || null}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </>
  );
}

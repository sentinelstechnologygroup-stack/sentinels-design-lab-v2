// src/pages/Blog.jsx
"use client";

import React from "react";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage({ posts = [] }) {
  return (
    <>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <div className="eyebrow mb-6">SDL Insights</div>
          <h1 className="headline-xl">
            Websites, systems, and digital strategy for service businesses.
          </h1>
          <p className="body-lg mt-6 max-w-3xl">
            Practical articles on website performance, conversion, local SEO,
            digital infrastructure, and how to build a web presence that
            actively supports business growth.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
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
              series={post.series}
            />
          ))}
        </div>
      </section>
    </>
  );
}

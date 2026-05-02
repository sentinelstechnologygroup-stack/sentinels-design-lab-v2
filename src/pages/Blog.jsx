"use client";

import CTASection from "@/components/shared/CTASection";
import BlogCard from "@/components/blog/BlogCard";
import { blogCategories, blogPosts } from "@/lib/blogPosts";

export default function BlogPage() {
  return (
    <div>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <div className="eyebrow">Blog</div>
          <h1 className="headline-xl">Website redesign, modernization, and digital-system insights.</h1>
          <p className="body-lg mt-6 max-w-3xl">
            These eight launch articles are the approved SDL editorial set. They support website evaluations, clarify modernization logic, and show where broader system work becomes necessary.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/50">
          {blogCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}

"use client";

import CTASection from "@/components/shared/CTASection";
import BlogCard from "@/components/blog/BlogCard";
import PageHero from "@/components/sections/PageHero";
import { blogCategories, blogPosts } from "@/lib/blogPosts";

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Website redesign, modernization, and digital-system insights."
        description="These eight launch articles are the approved SDL editorial set. They support website evaluations, clarify modernization logic, and show where broader system work becomes necessary."
        primaryCtaLabel="Get Website Evaluation"
        primaryCtaHref="/contact?type=website-evaluation"
        secondaryCtaLabel="View Work"
        secondaryCtaHref="/work"
        imageSrc="/images/home/tile-web-design.png"
        imageAlt="Approved SDL blog hero visual"
      />

      <section className="pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/50">
            {blogCategories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}

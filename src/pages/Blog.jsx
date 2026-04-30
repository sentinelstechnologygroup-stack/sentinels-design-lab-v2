     1|"use client";
     2|
     3|import Link from "next/link";
     4|import CTASection from "@/components/shared/CTASection";
     5|import { blogCategories, blogPosts } from "@/lib/siteData";
     6|
     7|export default function BlogPage() {
     8|  return (
     9|    <div>
    10|      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
    11|        <div className="max-w-4xl">
    12|          <div className="eyebrow">Blog</div>
    13|          <h1 className="headline-xl">Website redesign, modernization, and digital-system insights.</h1>
    14|          <p className="body-lg mt-6 max-w-3xl">
    15|            SDL uses a local-file blog—no CMS, no database, no WordPress. These articles support the website evaluation wedge while making broader full-stack capability clear.
    16|          </p>
    17|        </div>
    18|
    19|        <div className="mt-8 flex flex-wrap gap-2">
    20|          {blogCategories.map((category) => (
    21|            <span key={category} className="pill px-3 py-1.5 text-xs">
    22|              {category}
    23|            </span>
    24|          ))}
    25|        </div>
    26|      </section>
    27|
    28|      <section className="section-shell pb-24">
    29|        <div className="grid gap-6 md:grid-cols-2">
    30|          {blogPosts.map((post) => (
    31|            <article key={post.slug} className="panel-safe p-6 md:p-8">
    32|              <div className="text-xs uppercase tracking-[0.18em] text-primary">{post.category}</div>
    33|              <h2 className="mt-4 text-2xl font-semibold text-white">{post.title}</h2>
    34|              <div className="mt-3 text-sm text-white/45">{post.date} • {post.readTime}</div>
    35|              <p className="mt-4 text-sm leading-7 text-white/70">{post.excerpt}</p>
    36|              <Link
    37|                href={`/blog/${post.slug}`}
    38|                className="mt-6 inline-flex items-center text-sm font-medium text-blue-400 transition hover:text-blue-300"
    39|              >
    40|                Read article →
    41|              </Link>
    42|            </article>
    43|          ))}
    44|        </div>
    45|      </section>
    46|
    47|      <CTASection ctaLabel="Get Website Evaluation" />
    48|    </div>
    49|  );
    50|}
    51|
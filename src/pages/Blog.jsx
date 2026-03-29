"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import CTASection from "../components/shared/CTASection";
import { blogCategories, blogPosts } from "../lib/blogData";

function PostCard({ post }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-card/60 border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full"
      >
        <div className={`bg-gradient-to-br ${post.color} h-32 flex items-center justify-center border-b border-border/30`}>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 text-center">{post.category}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>
          <h3 className="font-heading text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{post.date}</span>
            <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
              Read More <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? blogPosts : blogPosts.filter(p => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Blog & Insights
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Marketing Insights That <span className="text-primary">Actually Move the Needle</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Practical guides on SEO, paid ads, web design, branding, and digital marketing — written by the team that does this every day.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img
                src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/b201335f7_generated_image.png"
                alt="Blog & Insights"
                className="relative w-full max-h-[380px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mb-8">
            Showing <span className="text-primary font-semibold">{filtered.length}</span> of {blogPosts.length} articles
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTASection title="Ready to Grow Your Business?" description="Let's put these insights into action for your brand." />
    </div>
  );
}
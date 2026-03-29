"use client";
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { blogPosts } from "../lib/blogData";
import CTASection from "../components/shared/CTASection";

function ContentBlock({ block }) {
  if (block.type === "heading") {
    return <h2 className="font-heading text-xl font-bold text-foreground mt-10 mb-3">{block.text}</h2>;
  }
  if (block.type === "intro") {
    return <p className="text-base text-secondary-foreground leading-relaxed mb-6 font-medium">{block.text}</p>;
  }
  if (block.type === "conclusion") {
    return (
      <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
      </div>
    );
  }
  return <p className="text-sm text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const others = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-40`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">{post.title}</h1>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </motion.div>

          {/* Author bar */}
          <div className="mt-12 flex items-center gap-4 bg-card/60 border border-border/50 rounded-xl p-5">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <span className="text-primary font-heading font-bold text-sm">SDL</span>
            </div>
            <div>
              <div className="font-heading font-semibold text-foreground text-sm">{post.author}</div>
              <div className="text-xs text-muted-foreground">Full-Service Digital Agency</div>
            </div>
            <Link
              to="/start-project"
              className="ml-auto inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shrink-0"
            >
              Work With Us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* More Articles */}
      {others.length > 0 && (
        <section className="py-16 bg-card/30 border-t border-border/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-8">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group bg-card/60 border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all"
                >
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">{p.category}</span>
                  <h3 className="font-heading font-semibold text-foreground text-sm mt-3 mb-1 group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="Ready to Put This Into Practice?" description="Let's apply these strategies to your business — starting today." />
    </div>
  );
}
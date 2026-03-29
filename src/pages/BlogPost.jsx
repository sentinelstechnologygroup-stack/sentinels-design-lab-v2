// src/pages/BlogPost.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function BlogPostPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <div className="eyebrow">ARTICLE</div>
          <h1 className="headline-lg">Article coming soon.</h1>
          <p className="body-md mt-6 max-w-2xl">
            This article route is set up and ready. Final post content can be added once the blog
            structure and publishing workflow are finalized.
          </p>

          <div className="mt-8">
            <Link href="/blog" className="btn-secondary">
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
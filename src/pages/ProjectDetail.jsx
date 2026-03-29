// src/pages/ProjectDetail.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function ProjectDetailPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <div className="eyebrow">PROJECT</div>
          <h1 className="headline-lg">Project detail page coming soon.</h1>
          <p className="body-md mt-6 max-w-2xl">
            This route is reserved for future case study or project detail expansion. It is now
            Next-safe and will no longer break the build.
          </p>

          <div className="mt-8">
            <Link href="/projects" className="btn-secondary">
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
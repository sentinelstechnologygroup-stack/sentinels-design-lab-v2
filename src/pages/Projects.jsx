"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Users, Clock, ChevronRight } from "lucide-react";
import CTASection from "../components/shared/CTASection";
import { categories, projects } from "../lib/projectsData";

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block bg-card/60 border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
      >
        <div className={`bg-gradient-to-br ${project.color} h-40 flex items-center justify-center border-b border-border/30`}>
          <div className="text-center px-6">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{project.industry}</span>
            <h3 className="font-heading text-xl font-bold text-foreground mt-2">{project.title}</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{project.category}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />{project.duration}
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.summary}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {project.results.slice(0, 2).map((r, i) => (
              <div key={i} className="bg-secondary/30 rounded-lg p-2.5 text-center">
                <div className={`text-lg font-heading font-bold ${project.accentColor}`}>{r.metric}</div>
                <div className="text-xs text-muted-foreground">{r.label}</div>
              </div>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
            View Case Study <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Our Work
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Projects & <span className="text-primary">Case Studies</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Real results for real businesses. Explore how we've helped our clients grow, convert, and dominate their markets.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/3ab84397d_generated_image.png?w=1200&q=80" alt="Projects & Case Studies" className="relative w-full max-h-[380px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-center text-xs text-muted-foreground mb-6">
            Showing <span className="text-primary font-semibold">{filtered.length}</span> of {projects.length} projects
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTASection title="Want Results Like These?" description="Let's discuss your project and build your next success story." />
    </div>
  );
}
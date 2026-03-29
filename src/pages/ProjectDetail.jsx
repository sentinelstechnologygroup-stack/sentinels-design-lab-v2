"use client";
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, Users, Clock, ChevronRight } from "lucide-react";
import { projects } from "../lib/projectsData";
import CTASection from "../components/shared/CTASection";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const others = projects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{project.industry}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{project.category}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {project.duration}
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="py-10 border-y border-border/30 bg-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className={`text-3xl font-heading font-bold ${project.accentColor}`}>{r.metric}</div>
                <div className="text-sm text-muted-foreground mt-1">{r.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-4 bg-card/60 border border-border/50 rounded-xl p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Client</div>
              <div className="font-heading font-semibold text-foreground">{project.client}</div>
              <div className="text-sm text-muted-foreground">{project.industry}</div>
            </div>
          </motion.div>

          {/* Challenge */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-destructive">!</span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">The Challenge</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-[0.97rem]">{project.challenge}</p>
          </motion.div>

          {/* Solution */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">Our Solution</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-[0.97rem]">{project.solution}</p>
          </motion.div>

          {/* CTA inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Want results like this?</h3>
            <p className="text-muted-foreground text-sm mb-6">Tell us about your project and we'll build your next success story.</p>
            <Link
              to={`/start-project?service=${encodeURIComponent(project.category)}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Start a Similar Project <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* More Projects */}
      {others.length > 0 && (
        <section className="py-16 bg-card/30 border-t border-border/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-8">More Case Studies</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="group bg-card/60 border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all"
                >
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">{p.category}</span>
                  <h3 className="font-heading font-semibold text-foreground text-sm mt-3 mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.summary}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    View Case Study <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="Ready to Start Your Project?" description="Let's discuss your goals and put together a plan." />
    </div>
  );
}
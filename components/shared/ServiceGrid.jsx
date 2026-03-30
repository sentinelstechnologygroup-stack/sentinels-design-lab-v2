"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ServiceGrid({ title, subtitle, services }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-14">
            {subtitle && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{subtitle}</span>}
            {title && <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">{title}</h2>}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-card/60 border border-border/50 rounded-xl p-7 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
            >
              {service.icon && (
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              )}
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
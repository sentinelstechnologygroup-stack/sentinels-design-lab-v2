"use client";
import React from "react";
import { motion } from "framer-motion";
import PricingCard from "../components/shared/PricingCard";
import CTASection from "../components/shared/CTASection";

const combos = [
  {
    name: "Basic Combo",
    originalPrice: "1,000.00",
    price: "499.99",
    features: [
      "5 Custom Logo Design Concepts",
      "Business Card, Letterhead, Envelope",
      "5 Page Website",
      "Mobile Responsive",
      "8 Stock Images & 5 Banners",
      "jQuery Sliders",
      "Social Media Page Designs",
      "All Final File Formats",
      "Dedicated Account Manager",
      "100% Ownership Rights",
    ],
  },
  {
    name: "Startup Combo",
    originalPrice: "2,000.00",
    price: "999.99",
    features: [
      "Unlimited Logo Design Concepts",
      "Social Media Design",
      "Mobile Responsive",
      "3 Dedicated Designers",
      "Stationery Design Suite",
      "Unlimited Pages Website",
      "Content Management System",
      "Social Media Page Designs",
      "All Final File Formats",
      "100% Ownership Rights",
    ],
  },
  {
    name: "Professional Combo",
    originalPrice: "2,600.00",
    price: "1,299.99",
    featured: true,
    features: [
      "Unlimited Logo Concepts",
      "8 Dedicated Designers",
      "Trifold Brochure Design",
      "Dynamic Liquid Website",
      "Mobile Responsive",
      "Custom & Lead Capture Forms",
      "Social Media Integration",
      "15 Stock Images & 8 Banners",
      "Search Engine Submission",
      "100% Ownership Rights",
    ],
  },
  {
    name: "Corporate Combo",
    originalPrice: "4,000.00",
    price: "1,999.99",
    features: [
      "Unlimited Logo Concepts",
      "Product Catalog Design",
      "Unlimited Pages Website",
      "Full Shopping Cart Integration",
      "Payment Module Integration",
      "Sales & Inventory Management",
      "20 Stock Images & 6 Banners",
      "Social Media Page Designs",
      "Dedicated Account Manager",
      "100% Ownership Rights",
    ],
  },
  {
    name: "Elite Combo",
    originalPrice: "6,000.00",
    price: "2,999.99",
    features: [
      "Unlimited Logo Concepts",
      "8 Dedicated Designers",
      "Complete Custom Development",
      "Client/User Dashboard Area",
      "CMS & Online Payment",
      "Custom Dynamic Forms",
      "Module-wise Architecture",
      "Mobile Responsive Web",
      "Extensive Admin Panel",
      "100% Custom Designs — No Templates",
    ],
  },
];

export default function ComboPackages() {
  return (
    <div>
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-6">
                Best Value Bundles
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Combo <span className="text-accent">Packages</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Get the best value with our curated combo packages — logo, website, branding, and more bundled together at unbeatable prices.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-accent/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/c8d3f98af_generated_image.png?w=1200&q=80" alt="Combo Packages" className="relative w-full max-h-[380px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((combo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <PricingCard {...combo} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Want a Custom Combo?" description="We can create a tailored package combining exactly the services you need." />
    </div>
  );
}
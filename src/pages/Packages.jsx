"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PricingCard from "../components/shared/PricingCard";
import CTASection from "../components/shared/CTASection";

const categories = [
  { key: "website", label: "Website Development" },
  { key: "logo", label: "Logo Design" },
  { key: "ecommerce", label: "Ecommerce Solutions" },
  { key: "seo", label: "SEO" },
  { key: "branding", label: "Branding" },
  { key: "digital", label: "Digital Marketing" },
];

const packages = {
  website: [
    { name: "Startup Website", originalPrice: "1500.00", price: "1000.00", features: ["3 Page Website", "5 Stock Photos", "3 Banner Designs", "jQuery Slider Banner", "Google Friendly Sitemap", "W3C Certified HTML", "Social Media Page Designs", "100% Satisfaction Guarantee"] },
    { name: "Pro Website", originalPrice: "1,200.00", price: "599.99", featured: true, features: ["10 Unique Pages", "CMS / Admin Panel", "8 Stock Images", "5 Banner Designs", "jQuery Slider Banner", "Google Friendly Sitemap", "W3C Certified HTML", "Social Media Page Designs", "Complete Deployment", "100% Satisfaction Guarantee"] },
    { name: "Elite Website", originalPrice: "2,000.00", price: "999.99", features: ["Up to 15 Unique Pages", "Mobile Responsive", "Custom Forms & Lead Capture", "Social Media Integration", "Search Engine Submission", "Newsletter Subscription", "3 Unique Banner Designs", "Complete Deployment", "100% Ownership Rights"] },
    { name: "Silver Website", originalPrice: "3,200.00", price: "1,599.99", features: ["15–20 Pages Website", "Custom WordPress", "Unlimited Revisions", "CMS & Admin Panel", "Online Payment Integration", "Multi-Lingual Support", "Mobile Responsive", "Dedicated Account Manager", "100% Ownership Rights"] },
  ],
  logo: [
    { name: "Basic Logo", originalPrice: "50.00", price: "24.99", features: ["2 Custom Logo Concepts", "3 Revision Rounds", "24 Hours Turnaround", "100% Satisfaction Guarantee", "100% Unique Design", "Money Back Guarantee"] },
    { name: "Beginners Logo", originalPrice: "100.00", price: "49.99", features: ["4 Custom Logo Concepts", "5 Revision Rounds", "Free Stationery Design", "All File Formats", "24 Hours Turnaround", "100% Satisfaction Guarantee"] },
    { name: "Platinum Logo", originalPrice: "350.00", price: "174.99", featured: true, features: ["Unlimited Logo Concepts", "8 Dedicated Designers", "Unlimited Revisions", "2 Custom Stationery Designs", "Brochure Design", "Email Signature", "All File Formats", "100% Ownership Rights"] },
    { name: "3D Logo", originalPrice: "1,000.00", price: "499.99", features: ["3 Unique 3D Logo Concepts", "Light Effects and VFX", "Fully Rendered", "Multiple 3D Angles", "Award Winning Designers", "Unlimited Revisions", "100% Ownership Rights"] },
  ],
  ecommerce: [
    { name: "Starter Ecommerce", originalPrice: "2,000.00", price: "999.99", features: ["Easy Product Search", "Product Reviews", "Shopping Cart Integration", "Payment Module", "Sales & Inventory Management", "Mobile Responsive", "Social Media Integration", "100% Satisfaction Guarantee"] },
    { name: "Professional Ecommerce", originalPrice: "4,000.00", price: "1,999.99", featured: true, features: ["Unlimited Products & Categories", "Custom Design & Development", "Payment Gateway Integration", "Inventory Management", "Customer Reviews", "Mobile Responsive", "SEO Optimized", "Dedicated Account Manager", "100% Ownership Rights"] },
    { name: "Enterprise Ecommerce", originalPrice: "8,000.00", price: "3,999.99", features: ["Custom Marketplace Features", "Multi-Vendor Support", "Advanced Analytics", "Automated Inventory", "Custom CRM Integration", "Mobile-First Design", "Priority Support", "100% Ownership Rights"] },
  ],
  seo: [
    { name: "Starter SEO", originalPrice: "600.00", price: "299.99", features: ["On-Page SEO Audit", "Keyword Research (up to 20)", "Meta Tags Optimization", "Google Analytics Setup", "Monthly Reporting", "3 Month Commitment"] },
    { name: "Growth SEO", originalPrice: "1,200.00", price: "599.99", featured: true, features: ["Complete SEO Audit", "Keyword Research (up to 50)", "On-Page & Off-Page SEO", "Content Strategy", "Link Building", "Local SEO Setup", "Monthly Reporting", "6 Month Commitment"] },
    { name: "Enterprise SEO", originalPrice: "2,400.00", price: "1,199.99", features: ["Advanced Technical SEO", "Unlimited Keywords", "Content Creation", "Competitor Analysis", "Custom Analytics Dashboard", "Priority Support", "Dedicated SEO Manager", "12 Month Commitment"] },
  ],
  branding: [
    { name: "Startup Branding", originalPrice: "1,000.00", price: "499.99", features: ["Logo Design", "Business Card", "Letterhead & Envelope", "Brand Color Palette", "Font Selection", "Digital Files Included", "100% Satisfaction Guarantee"] },
    { name: "Corporate Branding", originalPrice: "3,000.00", price: "1,499.99", featured: true, features: ["Complete Logo Suite", "Full Stationery Design", "Brand Style Guide", "Social Media Kit", "Brochure Design", "Presentation Template", "Email Signature", "100% Ownership Rights"] },
    { name: "Enterprise Branding", originalPrice: "6,000.00", price: "2,999.99", features: ["Complete Brand Identity", "Brand Strategy & Positioning", "Full Collateral Design", "Website Design Mockup", "Video Intro Animation", "Social Media Suite", "Dedicated Brand Manager", "100% Ownership Rights"] },
  ],
  digital: [
    { name: "Starter Marketing", originalPrice: "800.00", price: "399.99", features: ["Social Media Setup (3 Platforms)", "Content Calendar", "10 Social Media Posts", "Monthly Analytics Report", "Email Newsletter Setup", "3 Month Commitment"] },
    { name: "Growth Marketing", originalPrice: "1,600.00", price: "799.99", featured: true, features: ["Social Media Management (5 Platforms)", "Content Strategy", "20 Social Media Posts", "PPC Campaign Setup", "Email Marketing Campaign", "Monthly Strategy Calls", "Detailed Analytics", "6 Month Commitment"] },
    { name: "Enterprise Marketing", originalPrice: "3,200.00", price: "1,599.99", features: ["Full-Channel Strategy", "Unlimited Social Platforms", "Content Creation & Distribution", "Advanced PPC Management", "A/B Testing", "Custom Analytics Dashboard", "Dedicated Marketing Manager", "12 Month Commitment"] },
  ],
};

export default function Packages() {
  const [active, setActive] = useState("website");

  return (
    <div>
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Competitive Pricing
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                Packages for <span className="text-primary">Every Budget</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Your business, your budget. Customized development services with pricing that works for you — all packages include 100% ownership rights.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/a8b52d87b_generated_image.png?w=1200&q=80" alt="Packages" className="relative w-full max-h-[380px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active === cat.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {(packages[active] || []).map((pkg, i) => (
                <PricingCard key={i} {...pkg} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection title="Need a Custom Quote?" description="Every business is unique. Let's build a package tailored to your specific needs." />
    </div>
  );
}
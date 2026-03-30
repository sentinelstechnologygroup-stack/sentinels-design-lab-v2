// src/pages/packages.jsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PricingCard from "../components/shared/PricingCard";
import CTASection from "../components/shared/CTASection";

const categories = [
  { key: "website", label: "Website Development" },
  { key: "combo", label: "Combo Packages" },
  { key: "logo", label: "Logo Design" },
  { key: "ecommerce", label: "Ecommerce Solutions" },
  { key: "seo", label: "SEO" },
  { key: "branding", label: "Branding" },
  { key: "digital", label: "Digital Marketing" },
  { key: "care", label: "Monthly Care Plans" },
];

const packages = {
  website: [
    {
      name: "Lite Website",
      price: "1,000.00",
      features: [
        "Up to 3 Pages",
        "Mobile Responsive Layout",
        "3 Banner / Section Graphics",
        "Up to 5 Stock Images",
        "Basic Contact Form",
        "Core CTA Placement",
        "Google-Friendly Site Structure",
        "Launch-Ready for Small Service Businesses",
      ],
    },
    {
      name: "Startup Website",
      price: "2,500.00",
      features: [
        "Up to 5 Pages",
        "Mobile Responsive Website",
        "5 Banner / Section Graphics",
        "Up to 8 Stock Images",
        "Lead Capture Contact Form",
        "Basic On-Page SEO Setup",
        "Google-Friendly Sitemap",
        "Best for New Businesses Ready to Launch Stronger",
      ],
    },
    {
      name: "Growth Website",
      price: "3,500.00",
      featured: true,
      features: [
        "Up to 10 Pages",
        "Custom Mobile-Responsive Build",
        "6 Banner / Section Graphics",
        "Up to 12 Stock Images",
        "Advanced Contact / Lead Form",
        "Conversion-Focused Page Structure",
        "Foundational SEO Page Setup",
        "Stronger Service Architecture for Scaling Businesses",
      ],
    },
    {
      name: "Authority Website",
      price: "5,000.00",
      features: [
        "Up to 15 Pages",
        "Custom Strategy-Driven Website",
        "8 Banner / Section Graphics",
        "Up to 18 Stock Images",
        "Multiple Forms / Conversion Touchpoints",
        "Stronger Internal Page Structure",
        "Enhanced SEO-Ready Architecture",
        "Best for Businesses Pushing Harder for Market Credibility",
      ],
    },
  ],

  combo: [
    {
      name: "Brand Launch Combo",
      price: "1,750.00",
      features: [
        "Lite or Startup Website Foundation",
        "Basic Logo / Brand Direction Support",
        "Business Card / Brand Asset Starter Set",
        "Coordinated Visual Direction",
        "Launch-Ready Web + Brand Combo",
        "Best for New Businesses Needing a Cleaner Start",
      ],
    },
    {
      name: "Growth Combo",
      price: "2,950.00",
      featured: true,
      features: [
        "Growth Website Package",
        "Logo Refinement or Brand Cleanup",
        "Core Social Media Branding Assets",
        "Messaging + CTA Alignment",
        "More Cohesive Launch Presence",
        "Best for Businesses Leveling Up from a Weak Existing Presence",
      ],
    },
    {
      name: "Authority Combo",
      price: "4,250.00",
      features: [
        "Authority Website Package",
        "Higher-Touch Brand Presentation Alignment",
        "Expanded Asset / Visual Consistency Support",
        "Better Trust + Positioning Setup",
        "Built for Premium-Looking Service Brands",
        "Best for Businesses Competing at a Higher Level",
      ],
    },
    {
      name: "Custom Combo",
      price: "Quote Required",
      features: [
        "Tailored Mix of Website, Branding, SEO, and Marketing",
        "Built Around Actual Business Needs",
        "Flexible Deliverables Based on Scope",
        "Ideal for Projects That Do Not Fit a Standard Package",
        "Partner-Supported Execution Available",
        "Strategy Call Required Before Quoting",
      ],
    },
  ],

  logo: [
    {
      name: "Lite Logo",
      price: "250.00",
      features: [
        "2 Custom Logo Concepts",
        "2 Revision Rounds",
        "Primary Logo File Set",
        "Web-Ready Export Files",
        "Best for Budget-Conscious New Businesses",
      ],
    },
    {
      name: "Startup Logo",
      price: "450.00",
      features: [
        "4 Custom Logo Concepts",
        "Multiple Revision Rounds",
        "Primary + Alternate Logo Variation",
        "Social Profile Ready Versions",
        "Standard Export File Set",
      ],
    },
    {
      name: "Brand Logo Suite",
      price: "750.00",
      featured: true,
      features: [
        "Multiple Logo Concepts",
        "Refined Brand Direction",
        "Primary, Secondary, and Icon Variations",
        "Color + Reversed Versions",
        "Full Logo Export Package",
        "Better Fit for Serious Business Use",
      ],
    },
    {
      name: "Authority Identity",
      price: "1,150.00",
      features: [
        "Higher-Touch Identity Development",
        "Expanded Concept Exploration",
        "Multiple Logo Lockups",
        "Basic Visual Direction Support",
        "Built for Businesses Wanting a Stronger First Impression",
      ],
    },
  ],

  ecommerce: [
    {
      name: "Lite Ecommerce",
      price: "1,750.00",
      features: [
        "Small Store Setup",
        "Up to 10 Products",
        "Mobile Responsive Layout",
        "Basic Product Pages",
        "Checkout / Payment Integration",
        "Best for Lean Product Launches",
      ],
    },
    {
      name: "Startup Ecommerce",
      price: "2,750.00",
      features: [
        "Up to 25 Products",
        "Category + Product Structure",
        "Mobile Responsive Storefront",
        "Checkout / Payment Setup",
        "Basic Conversion Flow",
        "Good Fit for Small Growing Catalogs",
      ],
    },
    {
      name: "Growth Ecommerce",
      price: "4,000.00",
      featured: true,
      features: [
        "Expanded Store Structure",
        "Up to 50 Products",
        "Custom Product / Category Layout Direction",
        "Improved Conversion-Focused Store Pages",
        "Core Policy / Contact / Support Pages",
        "Best for More Serious Sales Operations",
      ],
    },
    {
      name: "Custom Ecommerce",
      price: "Quote Required",
      features: [
        "Custom Store Architecture",
        "Broader Product / Feature Requirements",
        "Specialized Functionality Based on Scope",
        "Best for More Complex Product Businesses",
        "Partner-Supported Execution Available",
        "Strategy Call Required Before Quoting",
      ],
    },
  ],

  seo: [
    {
      name: "SEO Lite",
      price: "250.00",
      features: [
        "High-Level SEO Opportunity Snapshot",
        "Quick Review of Current Site Structure",
        "Priority Fix / Opportunity Notes",
        "Good Entry Point Before Deeper SEO Work",
      ],
    },
    {
      name: "SEO Foundation",
      price: "600.00",
      features: [
        "Core On-Page SEO Cleanup",
        "Page Titles / Meta / Structure Pass",
        "Basic Keyword Targeting Alignment",
        "Foundational Improvements for Search Readiness",
        "Best for Existing Sites Needing a Better Base",
      ],
    },
    {
      name: "SEO Growth",
      price: "1,100.00",
      featured: true,
      features: [
        "Broader On-Page SEO Support",
        "Service / Market Page Expansion Direction",
        "Internal Linking Improvements",
        "Stronger Keyword Targeting Structure",
        "Best for Businesses Trying to Expand Reach",
      ],
    },
    {
      name: "SEO Authority",
      price: "1,900.00",
      features: [
        "Higher-Touch SEO Direction",
        "Broader Structure / Content Opportunity Support",
        "More Competitive Market Positioning",
        "Built for Businesses Investing in Stronger Search Presence",
        "Best for Long-Term Visibility Growth",
      ],
    },
  ],

  branding: [
    {
      name: "Lite Branding",
      price: "500.00",
      features: [
        "Basic Brand Direction Support",
        "Color Palette Guidance",
        "Font Pairing Direction",
        "Simple Visual Consistency Setup",
        "Best for Early-Stage Businesses",
      ],
    },
    {
      name: "Startup Branding",
      price: "950.00",
      features: [
        "Brand Direction + Basic Assets",
        "Color / Type / Visual Style Alignment",
        "Social Profile Visual Consistency",
        "Useful for Businesses That Need Cleaner Presentation",
      ],
    },
    {
      name: "Brand System",
      price: "1,500.00",
      featured: true,
      features: [
        "More Complete Brand Presentation Support",
        "Core Visual Consistency Across Touchpoints",
        "Stronger Alignment Between Site and Brand",
        "Useful for Businesses Growing Beyond DIY Presentation",
      ],
    },
    {
      name: "Authority Branding",
      price: "2,350.00",
      features: [
        "Higher-Touch Brand Presentation Work",
        "Broader Brand Consistency Direction",
        "Built for Premium-Looking Positioning",
        "Better Fit for Businesses Competing at a Higher Level",
      ],
    },
  ],

  digital: [
    {
      name: "PPC Management",
      price: "750.00 / mo",
      features: [
        "Google Ads Campaign Management",
        "Campaign Structure + Optimization",
        "Offer + CTA Alignment",
        "Monthly Performance Review",
        "Ad Spend Billed Separately",
      ],
    },
    {
      name: "Social Campaign Management",
      price: "750.00 / mo",
      features: [
        "Meta / Social Campaign Management",
        "Audience + Campaign Direction",
        "Creative / Offer Coordination",
        "Monthly Performance Review",
        "Ad Spend Billed Separately",
      ],
    },
    {
      name: "PPC + Social Management",
      price: "1,250.00 / mo",
      featured: true,
      features: [
        "Google + Social Campaign Management",
        "Cross-Channel Strategy Alignment",
        "Offer + CTA Optimization",
        "Monthly Performance Reporting",
        "Ad Spend Billed Separately",
      ],
    },
    {
      name: "Authority Marketing",
      price: "Custom / mo",
      features: [
        "PPC, Social, LinkedIn, and Multi-Channel Direction",
        "Broader Campaign Strategy Support",
        "Growth-Focused Execution Planning",
        "Partner-Supported Delivery Available",
        "Ad Spend Billed Separately",
      ],
    },
  ],

  care: [
    {
      name: "Website Care",
      price: "95.00 / mo",
      features: [
        "Basic Site Care and Maintenance",
        "Content / Text Edits as Needed",
        "General Site Health Support",
        "Best for Owners Wanting Ongoing Upkeep",
      ],
    },
    {
      name: "Website Growth",
      price: "275.00 / mo",
      featured: true,
      features: [
        "Ongoing Website Support",
        "Growth-Minded Update Support",
        "Priority Edits + Light Optimization",
        "Best for Active Business Websites",
      ],
    },
    {
      name: "Website Authority",
      price: "495.00 / mo",
      features: [
        "Higher-Touch Website Support",
        "Ongoing Refinement + Direction",
        "Built for Businesses Treating the Site as a Growth Asset",
        "Best for More Serious Operators",
      ],
    },
    {
      name: "Custom Support",
      price: "Quote Required",
      features: [
        "Custom Monthly Support Scope",
        "Flexible Support Based on Site Complexity",
        "Can Combine Website, SEO, or Campaign Needs",
        "Best for Non-Standard Ongoing Requirements",
      ],
    },
  ],
};

const categoryCopy = {
  website: {
    eyebrow: "Website Development",
    title: "Website Packages with Clear Deliverables and Real Scope",
    description:
      "Concrete website tiers with page counts, banner counts, image counts, forms, and scope level clearly laid out for easier buying.",
    heroImage: "/images/packages/hero-1.png",
    heroAlt: "Sentinels Design Lab website development packages",
  },
  combo: {
    eyebrow: "Best Value Bundles",
    title: "Combo Packages for Clients Who Need More Than Just a Website",
    description:
      "These combine website work with brand or growth support for businesses that need a more complete launch or upgrade path.",
    heroImage: "/images/home/hero.png",
    heroAlt: "Sentinels Design Lab combo packages",
  },
  logo: {
    eyebrow: "Logo Design",
    title: "Logo Packages for New Brands, Refreshes, and Stronger Identities",
    description:
      "A clean tier structure for lighter logo work, stronger logo suites, and higher-touch brand identity support.",
    heroImage: "/images/home/hero-3.jpg",
    heroAlt: "Sentinels Design Lab logo design services",
  },
  ecommerce: {
    eyebrow: "Ecommerce Solutions",
    title: "Store Packages for Lean Launches Through Custom Ecommerce Scope",
    description:
      "A flexible ecommerce offer structure for lightweight stores, growth stores, and more custom product businesses.",
    heroImage: "/images/home/hero-4.jpg",
    heroAlt: "Sentinels Design Lab ecommerce solutions",
  },
  seo: {
    eyebrow: "SEO",
    title: "SEO Packages from Snapshot Reviews to Higher-Touch Growth Support",
    description:
      "SEO stays visible as a real category, with a clearer progression from lite reviews to stronger growth support.",
    heroImage: "/images/home/hero-main.jpg",
    heroAlt: "Sentinels Design Lab SEO packages",
  },
  branding: {
    eyebrow: "Branding",
    title: "Branding Packages for Cleaner Presentation and Stronger Positioning",
    description:
      "For businesses that need more cohesion, clarity, and visual consistency than a website alone can provide.",
    heroImage: "/images/home/hero-2.jpg",
    heroAlt: "Sentinels Design Lab branding packages",
  },
  digital: {
    eyebrow: "Digital Marketing",
    title: "Digital Marketing Support for PPC, Social, LinkedIn, and More",
    description:
      "Monthly campaign management and strategy support for paid channels, with ad spend paid directly to the platforms.",
    heroImage: "/images/home/hero-3.jpg",
    heroAlt: "Sentinels Design Lab digital marketing services",
  },
  care: {
    eyebrow: "Monthly Care Plans",
    title: "Ongoing Support Plans for Maintenance, Growth, and Higher-Touch Needs",
    description:
      "Monthly website support options for businesses that want care, momentum, and continued refinement after launch.",
    heroImage: "/images/home/hero-main.jpg",
    heroAlt: "Sentinels Design Lab monthly care plans",
  },
};

export default function Packages() {
  const [active, setActive] = useState("website");
  const activeCopy = categoryCopy[active];

  return (
    <div>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pb-4 lg:pb-8"
            >
              <span className="eyebrow mb-6">
                {activeCopy.eyebrow}
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                {activeCopy.title}
              </h1>

              <p className="text-muted-foreground text-lg max-w-xl mb-8">
                {activeCopy.description}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <div className="surface-chip">
                  Clear tiers
                </div>
                <div className="surface-chip">
                  Real deliverables
                </div>
                <div className="surface-chip">
                  Flexible scope
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative overflow-hidden surface-card-strong">
                <img
                  src={activeCopy.heroImage}
                  alt={activeCopy.heroAlt}
                  className="h-[280px] sm:h-[340px] lg:h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/75 via-[#020817]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active === cat.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "pill text-muted-foreground hover:text-foreground hover:border-primary/30"
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

          {active === "digital" && (
            <div className="mt-8 max-w-3xl mx-auto text-center text-sm text-white/60 leading-6">
              Advertising budgets are paid directly to platforms such as Google, Meta, LinkedIn, and others.
              Sentinels Design Lab pricing in this section reflects monthly strategy, setup, management, and optimization only.
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Need a Custom Quote?"
        description="If your project needs a tighter-fit scope, we can build a custom package around your business goals, service mix, and execution needs."
      />
    </div>
  );
}
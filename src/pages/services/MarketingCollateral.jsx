"use client";
import React from "react";
import { CreditCard, BookOpen, Image, Package, BookMarked, FileImage } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function MarketingCollateral() {
  return (
    <FullServicePage
      badge="Marketing Collateral — Print & Digital Design That Converts"
      headline="Branded Collateral That"
      highlight="Drives Engagement & Conversions"
      subheadline="Professional Print & Digital Design for Every Touchpoint"
      description="From brochures to digital assets, our marketing collateral ensures consistency, creativity, and brand excellence at every customer touchpoint. Every piece we design works strategically to reinforce your brand identity and guide prospects through your sales funnel."
      startingPrice="$99.99"
      image="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/96578bf09_generated_80a30810.png"
      stats={[
        { value: "250+", label: "Brands Supported" },
        { value: "150+", label: "Designers" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "5,000+", label: "Pieces Delivered" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Collateral That Speaks Volumes"
      aboutHighlight="Before You Do"
      aboutBody="We transform standard materials into powerful conversion tools. Every piece — from business cards to brochures — works cohesively to reinforce your brand identity, combining strategic messaging with striking visuals to guide prospects through your sales funnel. Our designers are experts in both print production and digital adaptation."
      aboutBullets={[
        "Brand-consistent design across every single deliverable",
        "Strategic white space and visual hierarchy that commands attention",
        "Print-ready files with correct bleeds, color profiles, and resolution",
        "Digital-optimized formats for email, web, and social media",
      ]}
      differentiators={[
        { title: "Brand Cohesion", desc: "Every piece follows your brand guidelines for a consistent, professional look." },
        { title: "Print-Ready Mastery", desc: "CMYK-correct files with bleeds, trim marks, and press-ready specifications." },
        { title: "Strategic Messaging", desc: "Copy-informed layouts that communicate your value proposition at a glance." },
        { title: "Fast Turnaround", desc: "Most projects delivered within 5-7 business days with unlimited revisions." },
      ]}
      servicesSubtitle="Collateral Services"
      servicesTitle="Materials That Strengthen Your Brand at Every Touchpoint"
      services={[
        { icon: CreditCard, title: "Stationery Design", description: "Business cards, letterheads, and envelopes that embody your brand's personality — functional elegance across all professional communications." },
        { icon: BookOpen, title: "Brochure Design", description: "Transform complex information into compelling narratives with strategic white space and visual storytelling — from tri-folds to full catalogs." },
        { icon: Image, title: "Poster Design", description: "Bold typography, striking imagery, and compelling calls-to-action that capture attention from any distance — for trade shows, retail, and public spaces." },
        { icon: Package, title: "Product Packaging Design", description: "Packaging that communicates your brand's values at first glance, designed to stand out on crowded shelves with seamless brand ecosystem integration." },
        { icon: BookMarked, title: "Book & Magazine Design", description: "Visually engaging typographic grids, balanced image pacing, and seamless navigation systems that enhance readability and authority." },
        { icon: FileImage, title: "Flyer & Leaflet Design", description: "Visually striking layouts with clear messaging for events, product launches, and local campaigns — adaptable templates that support reusability." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Designs That Speak for Your Brand"
      portfolioTabs={[
        { label: "Stationery", icon: CreditCard, description: "Business cards, letterheads, and professional stationery that make a lasting first impression in every interaction." },
        { label: "Brochures", icon: BookOpen, description: "Tri-fold, bi-fold, and custom format brochures that turn complex offerings into clear, compelling stories." },
        { label: "Posters", icon: Image, description: "Eye-catching poster designs for trade shows, retail environments, events, and public advertising." },
        { label: "Packaging", icon: Package, description: "Product packaging that stands out on the shelf and communicates your brand's premium positioning." },
        { label: "Flyers & Leaflets", icon: FileImage, description: "High-impact flyers and leaflets for events, promotions, and local marketing campaigns." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Create Your Marketing Materials"
      processSteps={[
        { title: "Brand Discovery", desc: "We review your brand guidelines, audience, and campaign objectives in detail." },
        { title: "Concept Design", desc: "Multiple design concepts presented for your feedback and direction." },
        { title: "Revise & Refine", desc: "Unlimited revisions until every piece is exactly right — no compromise." },
        { title: "Final Delivery", desc: "Print-ready and digital files delivered in all required formats." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Collateral Packages for Every Need"
      pricingPackages={[
        {
          name: "Starter Kit",
          originalPrice: "300.00",
          price: "149.99",
          features: ["Business Card Design", "Letterhead Design", "Envelope Design", "3 Revision Rounds", "Print-Ready Files", "All Digital Formats", "100% Ownership Rights"],
        },
        {
          name: "Brand Kit",
          originalPrice: "800.00",
          price: "399.99",
          featured: true,
          features: ["Logo + Full Stationery Suite", "Tri-Fold Brochure Design", "Flyer Design (2 Formats)", "Social Media Templates (5)", "Email Signature Design", "Brand Style Guide (Basic)", "Unlimited Revisions", "100% Ownership Rights"],
        },
        {
          name: "Marketing Kit",
          originalPrice: "2,000.00",
          price: "999.99",
          features: ["Full Stationery Suite", "Brochure + Product Catalog", "Poster Design (3 Formats)", "Packaging Design (1 SKU)", "Social Media Kit (10 Templates)", "Presentation Template", "Unlimited Revisions", "100% Ownership Rights"],
        },
        {
          name: "Enterprise Kit",
          originalPrice: "4,000.00",
          price: "1,999.99",
          features: ["Complete Brand Identity System", "All Collateral Types Included", "Packaging Design (5 SKUs)", "Custom Illustration", "Vehicle / Signage Design", "Annual Updates Included", "Dedicated Designer", "100% Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Emily Chen", role: "Marketing Director, Velo Brands", text: "Our rebrand was flawless. From the logo to the full brand guide and collateral suite, every detail was considered and executed with precision. Our sales team loves the new materials." },
        { name: "James Rodriguez", role: "Founder, NovaTech Solutions", text: "SDL redesigned our entire product catalog and trade show materials. The quality is exceptional — multiple partners have complimented our new look at every show." },
        { name: "Sarah Mitchell", role: "CEO, BrightPath Consulting", text: "Professional, fast, and incredibly talented. Our new stationery and brochures communicate our premium positioning perfectly. Worth every penny." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "5,000+ Pieces Delivered", "Print-Ready Guaranteed", "Unlimited Revisions", "50% Off — Limited Time"]}
      ctaTitle="Need Branded Materials That Convert?"
      ctaDescription="Let's create collateral that makes your brand unforgettable at every customer touchpoint."
    />
  );
}
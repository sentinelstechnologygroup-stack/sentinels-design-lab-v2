"use client";
import React from "react";
import { Star, PenTool, Type, Image, Box, Square, Circle } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function LogoDesign() {
  return (
    <FullServicePage
      badge="Logo Design Services — Crafting Your Brand Identity"
      headline="Custom Logo Designs"
      highlight="For Just $25"
      subheadline="Logo Design Services — Speaking Volumes Before You Read"
      description="First impressions matter. Let us design your logo with creativity and strategy, ensuring a powerful visual identity that captivates. We don't just create logos — we craft visual identities that become synonymous with excellence, blending market research, psychology, and artistic precision."
      startingPrice="$24.99"
      image="https://media..com/images/public/69c84c79cf14625ad4e75595/31edbfc49_generated_image.png"
      stats={[
        { value: "250+", label: "Logos Designed" },
        { value: "150+", label: "Designers" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "250+", label: "Professionals" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Logo Design Services — Speaking Volumes"
      aboutHighlight="Before You Read"
      aboutBody="Being the best logo design company, we don't just create logos — we craft visual identities that become synonymous with excellence. Our logo design process blends market research, psychological pointers, and artistic precision to craft marks that are instantly recognizable and impossible to ignore. From startups to Fortune 500s, we've designed icons that dominate markets."
      aboutBullets={[
        "Strategic foundation — we dive deep into your brand DNA before sketching",
        "Timeless and bold designs that evolve without rebranding from scratch",
        "Versatile mastery — pixel-perfect scaling from business cards to billboards",
        "Industry-specific insight — we speak your audience's visual language",
      ]}
      differentiators={[
        { title: "Unlimited Concepts", desc: "Multiple design directions until we find the perfect mark for your brand." },
        { title: "All File Formats", desc: "AI, PSD, EPS, PNG, SVG, PDF — every format you'll ever need, delivered." },
        { title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied. No limits, no extra charges." },
        { title: "100% Ownership Rights", desc: "Every logo we create belongs entirely to you from day one." },
      ]}
      servicesSubtitle="Logo Design Services"
      servicesTitle="Where Vision Meets Identity — Your Reliable Custom Logo Design Partner"
      services={[
        { icon: Star, title: "Iconic Logo", description: "A bold, lasting mark that commands recognition — distilling your identity through deep market research and multiple iterations for simplicity and staying power." },
        { icon: Type, title: "Typography Logo", description: "Transform your name into a powerful, distinctive identity using hand-crafted letterforms and thoughtful font pairings — perfect for tech, fashion, and premium services." },
        { icon: Image, title: "Illustrative Logo", description: "For brands that thrive on storytelling — mascot logos, crests, and detailed emblems that reflect your heritage or mission with hand-drawn artistry and digital finesse." },
        { icon: Box, title: "3D Logo Design", description: "Unmatched depth and dimension using light, texture, and perspective — ideal for gaming, tech, or luxury industries that want to leap off the screen." },
        { icon: Square, title: "2D Logo Design", description: "Clear, bold visuals applying flat design principles, negative space, and smart color choices that stand the test of time across every platform." },
        { icon: Circle, title: "Symbolic Logo", description: "Abstract, meaningful icons that transcend language — created through negative space mastery and cultural audits to tell your story without saying a word." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Crafted with Excellence — Premium Logo Solutions for Your Business"
      portfolioTabs={[
        { label: "Iconic Logos", icon: Star, description: "Simplified graphics and symbols that express your business — the perfect balance between text and artwork, faster to understand and more memorable." },
        { label: "3D Logos", icon: Box, description: "Eye-catching 3D depth that sheds new creative light on your brand — suitable for online channels, presentations, and premium brand positioning." },
        { label: "2D Logos", icon: Square, description: "Smooth, clean 2D designs that are on the rise for good reason — providing space to showcase your brand identity with sharp, timeless style." },
        { label: "Typographic", icon: Type, description: "The first impression of your brand is determined by your logo — a unique and eye-catching font gives your brand a powerful new look and appeal." },
        { label: "Symbolic", icon: Circle, description: "Creatively illustrated symbols that add a touch of modernity and minimalism, representing your business in an abstract way through powerful imagery." },
        { label: "Illustrative", icon: Image, description: "Illustrative logos that represent your branding concept uniquely and compellingly — illustrations that stand alone and complement your text." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Design Your Perfect Logo"
      processSteps={[
        { title: "Brand Discovery", desc: "We research your industry, competitors, and target audience before a single sketch is made." },
        { title: "Concept Creation", desc: "Multiple unique logo concepts delivered — each rooted in strategy and brand psychology." },
        { title: "Refine & Perfect", desc: "Unlimited revisions on your chosen direction until every detail is exactly right." },
        { title: "Final Delivery", desc: "All file formats delivered: AI, PSD, EPS, PNG, SVG, PDF — print and web ready." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Logo Design Packages for Every Budget"
      pricingPackages={[
        {
          name: "Basic Logo",
          originalPrice: "50.00",
          price: "24.99",
          features: ["2 Custom Logo Concepts", "By 1 Designer", "3 Revision Rounds", "48 Hours Turnaround", "All File Formats (AI, PNG, PDF)", "100% Ownership Rights", "100% Satisfaction Guarantee", "Money Back Guarantee"],
        },
        {
          name: "Startup Logo",
          originalPrice: "100.00",
          price: "49.99",
          features: ["4 Custom Logo Concepts", "By 2 Designers", "5 Revision Rounds", "Free Stationery Design", "All File Formats", "48 Hours Turnaround", "100% Ownership Rights", "100% Satisfaction Guarantee"],
        },
        {
          name: "Platinum Logo",
          originalPrice: "350.00",
          price: "174.99",
          featured: true,
          features: ["Unlimited Logo Concepts", "By 8 Designers", "Unlimited Revisions", "2 Stationery Designs", "Brochure Design", "Email Signature", "Social Media Kit", "All File Formats", "100% Ownership Rights"],
        },
        {
          name: "3D Logo",
          originalPrice: "1,000.00",
          price: "499.99",
          features: ["3 Unique 3D Logo Concepts", "Light Effects & VFX", "Fully Rendered", "Multiple 3D Angles", "Award-Winning Designers", "Unlimited Revisions", "Animation-Ready Files", "100% Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Sherri B.", role: "Founder, WorkTruth", text: "Great experience working with the design team. They quickly understood the vision and provided me with several design options. Turnaround was quick and seamless — I couldn't be happier." },
        { name: "Emily Chen", role: "Marketing Director, Velo Brands", text: "Our rebrand logo is absolutely stunning. The team explored directions I never would have thought of, and the final mark perfectly captures who we are. Exceptional work." },
        { name: "James Rodriguez", role: "Founder, NovaTech Solutions", text: "I've worked with three other logo agencies before SDL. None came close to the level of strategy and artistry these designers bring. The logo has become our most recognizable asset." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "Unlimited Revisions", "48hr Turnaround", "50% Off — Limited Time"]}
      ctaTitle="Ready for a Logo That Commands Attention?"
      ctaDescription="Let's create a visual identity that captivates, converts, and stands the test of time — starting at just $24.99."
    />
  );
}
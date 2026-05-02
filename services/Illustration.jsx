"use client";
import React from "react";
import { Layers, BookOpen, BarChart2, Box, Package, Microscope } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function Illustration() {
  return (
    <FullServicePage
      badge="Illustration Design — Visualizing Imagination with a Realistic Touch"
      headline="Creative Illustration Design Services"
      highlight="Telling Your Visual Story"
      subheadline="Illustration Designs That Visualize Imagination with Realistic Touch"
      description="Enhance your brand image with captivating 3D illustration design, blending artistry with innovation to craft unforgettable experiences. From stylized 2D graphics to immersive 3D finishes, our illustration services blend artistic mastery with strategic thinking — ensuring every stroke aligns with your brand narrative."
      startingPrice="$255.00"
      image="https://media..com/images/public/69c84c79cf14625ad4e75595/207170807_generated_image.png"
      stats={[
        { value: "250+", label: "Brands Served" },
        { value: "150+", label: "Illustrators" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "250+", label: "Professionals" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Take Your Brand's Visual Identity to the Next Level with"
      aboutHighlight="Professional Illustration Design"
      aboutBody="Our illustration design services blend artistic mastery with strategic thinking, ensuring every stroke aligns with your brand narrative. Whether for packaging, digital media, or advertising, our illustration work doesn't just decorate — it communicates, persuades, and leaves lasting impressions. As illustrator design specialists, we craft visuals that make your story unforgettable."
      aboutBullets={[
        "Customized creations tailored to your exact brand vision and goals",
        "Versatile styling — mastering all art forms from modern to classic 3D",
        "Precision process with pixel-perfect accuracy for maximum visual impact",
        "Artistic excellence from experts who breathe life into concepts effortlessly",
      ]}
      differentiators={[
        { title: "All Illustration Styles", desc: "From 2D vector to photorealistic 3D — we master every technique and medium." },
        { title: "Brand-Aligned Artistry", desc: "Every illustration is strategically designed to reinforce your brand identity." },
        { title: "Pixel-Perfect Precision", desc: "Optimized for digital, print, motion, and product use at any scale." },
        { title: "Fast Turnaround", desc: "Most projects delivered within 48–72 hours with unlimited revisions included." },
      ]}
      servicesSubtitle="Illustration Services"
      servicesTitle="Breathtaking 3D Illustration Design That Transforms Ideas into Visual Masterpieces"
      services={[
        { icon: Layers, title: "3D Character Design", description: "Expressive brand characters with distinct facial expressions, posture studies, and color psychology — mascots, game avatars, or animated spokespersons built to connect emotionally." },
        { icon: BookOpen, title: "Book & Editorial Illustrations", description: "Cover art to chapter openers and visual vignettes — artwork that enhances the reader's journey across novels, memoirs, and magazine features in any style." },
        { icon: BarChart2, title: "Infographic & Icon Design", description: "Complex information made accessible with custom infographic layouts, data visualization, and branded iconography — clear, smart, and visually impactful." },
        { icon: Box, title: "3D Illustration & Concept Art", description: "Using Blender, Maya, and ZBrush — we create detailed textures, dynamic lighting, and cinematic depth for games, products, and architectural visualization." },
        { icon: Package, title: "3D Product Visualization", description: "High-impact 3D renderings bringing prototypes to life with accurate textures, lighting, and finishes — for e-commerce, investor decks, and advertising." },
        { icon: Microscope, title: "Medical & Scientific Illustrations", description: "Anatomy, cellular structures, and biomedical devices using ZBrush and Cinema 4D — collaborating with researchers to ensure accuracy, clarity, and compliance." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Exquisite Illustration Examples"
      portfolioTabs={[
        { label: "Characters", icon: Layers, description: "Brand mascots, game characters, and animated spokespersons that build emotional connections and long-term brand recognition." },
        { label: "Editorial", icon: BookOpen, description: "Book covers, chapter illustrations, and editorial artwork that enhance the reader's journey and give your publication a distinct visual voice." },
        { label: "Infographics", icon: BarChart2, description: "Data-driven visual storytelling — custom infographics and icon sets that make complex information engaging and instantly understandable." },
        { label: "3D & Concept Art", icon: Box, description: "Immersive 3D illustrations and concept art for games, architecture, and brand campaigns — cinematic depth with technical precision." },
        { label: "Product Visualization", icon: Package, description: "Photorealistic 3D product renders that showcase every detail — perfect for e-commerce, advertising, and pre-launch marketing campaigns." },
        { label: "Medical & Scientific", icon: Microscope, description: "High-precision scientific and medical illustrations that translate complex information into visuals that educate and inspire trust." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Bring Your Illustration to Life"
      processSteps={[
        { title: "Creative Brief", desc: "We gather your brand guidelines, reference materials, and visual direction in detail." },
        { title: "Concept Sketches", desc: "Initial sketches and rough concepts are presented for feedback and direction approval." },
        { title: "Detailed Illustration", desc: "Full illustration developed with color, texture, lighting, and finishing — your feedback at every stage." },
        { title: "Final Delivery", desc: "All formats delivered: PNG, SVG, AI, PSD, and 3D source files as needed." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Illustration Packages for Every Project"
      pricingPackages={[
        {
          name: "Basic Illustrative",
          originalPrice: "510.00",
          price: "255.00",
          features: ["3 Custom Illustration Concepts", "By 2 Designers", "Unlimited Revisions", "48 Hours Turnaround", "All Final File Formats", "100% Ownership Rights", "100% Satisfaction Guarantee", "Money Back Guarantee"],
        },
        {
          name: "Startup Illustrative",
          originalPrice: "710.00",
          price: "355.99",
          features: ["4 Custom Illustration Concepts", "By 3 Designers", "Unlimited Revisions", "48 Hours Turnaround", "All Final File Formats", "2D & 3D Styles Available", "100% Ownership Rights", "100% Satisfaction Guarantee"],
        },
        {
          name: "Gold Illustrative",
          originalPrice: "1,110.00",
          price: "555.00",
          featured: true,
          features: ["Unlimited Illustration Concepts", "By 4 Designers", "Unlimited Revisions", "48 Hours Turnaround", "All Final File Formats", "3D Illustration Included", "Character Design Available", "100% Ownership Rights"],
        },
        {
          name: "Enterprise Illustrative",
          originalPrice: "2,200.00",
          price: "1,099.99",
          features: ["Full Illustration Suite", "Dedicated Senior Illustrator", "3D Characters & Environments", "Product Visualization", "Medical/Scientific Available", "Animation-Ready Assets", "Source Files Included", "100% Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Rachel Osei", role: "Founder, Bloom Education", text: "The illustrated characters SDL created for our educational platform are absolutely stunning. Kids love them and they've become iconic parts of our brand identity across all materials." },
        { name: "Michael Graves", role: "CTO, FinTrack Pro", text: "We needed complex financial data visualized in a way that was both accurate and beautiful. SDL delivered infographics that our clients actually read and engage with. Remarkable work." },
        { name: "Emily Chen", role: "Marketing Director, Velo Brands", text: "Our 3D product visualizations looked better than the actual photos. SDL's illustration team helped us launch our new line with visuals that drove incredible pre-order engagement." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "All File Formats Included", "Unlimited Revisions", "50% Off — Limited Time"]}
      ctaTitle="Ready to Bring Your Vision to Life?"
      ctaDescription="Let our illustrators transform your ideas into breathtaking visuals that captivate and convert."
    />
  );
}
"use client";
import React from "react";
import { FileText, BookOpen, Megaphone, Globe, ShoppingBag, Star } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function Copywriting() {
  return (
    <FullServicePage
      badge="Creative Copywriting — SEO Copywriting Services That Captivate"
      headline="Strategic Copywriting Agency"
      highlight="That Converts Visitors into Buyers"
      subheadline="SEO Copywriting Services That Captivate and Engage Your Audience"
      description="Powerful storytelling meets strategic messaging. Our copywriting services craft compelling, persuasive, and brand-aligned content that effortlessly engages audiences and drives conversions. We treat copywriting as your silent salesforce — crafted for both search engine algorithms and human emotions."
      startingPrice="$99.99"
      image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80"
      stats={[
        { value: "250+", label: "Brands Served" },
        { value: "150+", label: "Writers & Strategists" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "250+", label: "Professionals" },
        { value: "100%", label: "Original Content" },
      ]}
      aboutTitle="Transform Your Brand with Expert"
      aboutHighlight="SEO Copywriting Services"
      aboutBody="At Sentinels Design Lab, we treat copywriting as your silent salesforce. As a leading copywriting agency, our words do double duty — crafted for both search engine algorithms and human emotions. From product descriptions to landing pages, we blend persuasive psychology with keyword strategy to create content that drives more conversions than industry averages."
      aboutBullets={[
        "Conversion-focused — turning readers into customers at every touchpoint",
        "SEO optimized — rank higher with strategic keyword integration throughout",
        "Brand voice mastery — adapting precisely to your unique tone and style",
        "Versatile expertise — from blogs to ads, we cover every content need",
      ]}
      differentiators={[
        { title: "Persuasion Psychology", desc: "Every piece applies proven conversion psychology and buyer behavior principles." },
        { title: "SEO-First Approach", desc: "Keyword research, intent mapping, and on-page optimization built into every brief." },
        { title: "Voice-of-Customer Research", desc: "We write the way your customers think and speak for instant resonance." },
        { title: "Measurable Results", desc: "Content measured by engagement, rankings, and conversions — not just word count." },
      ]}
      servicesSubtitle="Copywriting Services"
      servicesTitle="High-Converting SEO Copywriting Services That Rank Well and Drive Action"
      services={[
        { icon: FileText, title: "Article Writing", description: "Expert articles that educate and establish brand authority — in-depth, long-form content with expert insights and data-driven analysis optimized for SEO and organic reach." },
        { icon: BookOpen, title: "Blog Writing", description: "SEO-optimized blog posts that drive organic traffic and convert readers into leads — keyword clustering, internal linking, and strategic storytelling in every post." },
        { icon: Megaphone, title: "Press Release", description: "Expertly crafted press releases using the inverted pyramid method — newsworthy content that captures media interest and drives both backlinks and brand visibility." },
        { icon: Globe, title: "Website Content", description: "Conversion-focused website copy using voice-of-customer research — from homepage to service pages, content that ranks and guides visitors toward your goals." },
        { icon: ShoppingBag, title: "Product Descriptions", description: "eCommerce copy that turns specs into irresistible calls to action — sensory language and social proof that reduce buyer hesitation and drive conversions." },
        { icon: Star, title: "Amazon A+ Content", description: "Enhanced product listings with compelling descriptions, comparison charts, and visuals that align with Amazon's guidelines and maximize conversions on every listing." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Copywriting Headlines That Stop Scrollers in Their Tracks"
      portfolioTabs={[
        { label: "Article Writing", icon: FileText, description: "Unlock the power of words to ignite your brand's success — compelling narratives that captivate readers and turn them into loyal customers." },
        { label: "Blog Writing", icon: BookOpen, description: "Harness the art of storytelling to breathe life into your blog — content that engages, informs, and inspires while driving organic traffic." },
        { label: "Press Releases", icon: Megaphone, description: "Unleash the power of concise yet impactful language to make headlines and generate buzz for your brand announcements." },
        { label: "Website Content", icon: Globe, description: "Transform your website into a captivating digital destination — content that informs visitors and compels them to take action and convert." },
        { label: "Product Descriptions", icon: ShoppingBag, description: "Ignite desire with persuasive product descriptions — captivating narratives that showcase your unique features and benefits to potential buyers." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Craft Your Copy"
      processSteps={[
        { title: "Brief & Research", desc: "We deep-dive into your brand, audience, competitors, and keyword landscape before writing." },
        { title: "Strategy & Outline", desc: "Content architecture planned with SEO intent mapping and conversion flow design." },
        { title: "Write & Optimize", desc: "First draft crafted with persuasive psychology, keyword integration, and brand voice." },
        { title: "Revise & Deliver", desc: "Unlimited revisions until every word earns its place — final delivery in your preferred format." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Copywriting Packages for Every Content Need"
      pricingPackages={[
        {
          name: "Starter Copy",
          originalPrice: "200.00",
          price: "99.99",
          features: ["5 Blog Posts (500 words each)", "Basic SEO Optimization", "1 Revision Round", "Brand Voice Questionnaire", "Delivered in 5 Business Days", "100% Original Content", "Plagiarism Report Included"],
        },
        {
          name: "Growth Copy",
          originalPrice: "500.00",
          price: "249.99",
          features: ["10 Blog Posts (800 words each)", "Full SEO Keyword Research", "Website Page Copy (up to 5 pages)", "3 Revision Rounds", "Content Calendar", "Delivered in 10 Business Days", "100% Original Content"],
        },
        {
          name: "Authority Copy",
          originalPrice: "1,200.00",
          price: "599.99",
          featured: true,
          features: ["20 Blog Posts (1,000+ words each)", "Full SEO Strategy", "Complete Website Copy", "Product Descriptions (up to 20)", "Press Release Writing", "Email Sequence (5 emails)", "Unlimited Revisions", "Dedicated Copywriter"],
        },
        {
          name: "Enterprise Copy",
          originalPrice: "2,400.00",
          price: "1,199.99",
          features: ["Unlimited Blog Posts", "Full Content Marketing Strategy", "Amazon A+ Content", "Monthly Content Calendar", "Social Media Copy", "Ad Copywriting (Google & Social)", "Weekly Strategy Calls", "Dedicated Content Team"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Rachel Osei", role: "Founder, Bloom Education", text: "Our blog traffic grew 180% in 4 months after SDL took over content creation. Every article is strategically crafted and genuinely engaging. The best investment we've made in content." },
        { name: "Carlos Vega", role: "CEO, Meridian Realty Group", text: "SDL rewrote our entire website and the difference is night and day. Inquiries from the site doubled within 6 weeks of launch. The copy truly speaks to our ideal clients." },
        { name: "Tina Bloom", role: "Brand Manager, Elevate Wellness", text: "Our product descriptions used to convert at 1.1%. After SDL rewrote them all, we hit 3.4%. That's the power of real copywriting — not just words, but strategy and psychology." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "100% Original Content", "SEO-Optimized", "50% Off — Limited Time"]}
      ctaTitle="Ready for Copy That Actually Converts?"
      ctaDescription="Let our copywriting experts craft content that ranks, resonates, and turns readers into customers."
    />
  );
}
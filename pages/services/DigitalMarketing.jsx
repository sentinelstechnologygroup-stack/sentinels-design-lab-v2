"use client";
import React from "react";
import { Search, Share2, MousePointer, FileText, Mail, Palette } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function DigitalMarketing() {
  return (
    <FullServicePage
      badge="Digital Marketing — Strategic Growth Consultants"
      headline="Data-Driven Digital Marketing Agency"
      highlight="That Delivers Measurable Results"
      subheadline="Digital Marketing Consultants Offering Strategic Growth"
      description="Drive engagement, increase visibility, and maximize conversions with the best digital marketing agency — crafting hyper-targeted strategies that deliver 3-5x higher ROI than industry standards. We fuse advanced technology with human insight to dominate both paid and organic channels."
      startingPrice="$399.99/mo"
      image="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/f8ea4a4de_generated_be693b13.png"
      stats={[
        { value: "250+", label: "Campaigns Managed" },
        { value: "150+", label: "Specialists" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "3-5x", label: "Average ROI" },
        { value: "100%", label: "Transparent Reporting" },
      ]}
      aboutTitle="Results-Driven Digital Marketing Services for"
      aboutHighlight="Business Growth"
      aboutBody="At Sentinels Design Lab, our digital marketing consultant team crafts hyper-targeted campaigns that convert. As a premier digital marketing agency, we fuse advanced technology with human insight to dominate both paid and organic channels — delivering 3-5x higher ROI than industry standards. We don't just generate traffic; we attract high-value customers who drive sustainable growth."
      aboutBullets={[
        "Analytics-first approach combining data with creative execution",
        "Precision campaigns reaching high-intent audiences across channels",
        "Certified specialist teams driving impactful, measurable results",
        "Tested frameworks from the best digital marketing agency in your vertical",
      ]}
      differentiators={[
        { title: "Customized Strategies", desc: "Personalized campaigns that align with your specific business goals." },
        { title: "Community Building", desc: "Experts in managing and growing engaged brand communities." },
        { title: "Follower Growth", desc: "Organic growth strategies using targeted, platform-native techniques." },
        { title: "Engage & Thrive", desc: "Interactive campaigns that turn followers into loyal customers." },
      ]}
      servicesSubtitle="Marketing Services"
      servicesTitle="Your Growth-Driven Digital Marketing Company — Where Data Meets Creative Strategy"
      services={[
        { icon: Search, title: "SEO Services", description: "Sustainable organic growth with customized plans for on-page, technical, and content optimization. We leverage 200+ ranking factors for maximum visibility." },
        { icon: Share2, title: "Social Media Marketing", description: "Platform-specific content, community engagement, and influencer partnerships that transform your social channels into powerful revenue drivers." },
        { icon: MousePointer, title: "PPC Management", description: "AI-powered bid strategies and conversion-optimized landing pages that maximize ad spend ROI across Google Ads, LinkedIn, and more." },
        { icon: FileText, title: "Content Marketing", description: "High-quality content blending SEO, thought leadership, and conversion psychology. From blogs to whitepapers, we create content that converts." },
        { icon: Mail, title: "Email Marketing", description: "Behavior-based segmentation, purchase history analysis, and predictive analytics for hyper-targeted campaigns that boost open rates and revenue." },
        { icon: Palette, title: "Branding", description: "Define your unique voice with logo design, color schemes, brand messaging, and tone — building an identity that resonates and inspires trust." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="We Are Data-Powered Digital Marketing Machines"
      portfolioTabs={[
        { label: "SEO", icon: Search, description: "Boost your website's visibility on search engines and drive organic traffic with our expert optimization techniques." },
        { label: "Social Media", icon: Share2, description: "Harness the power of social media platforms to engage your audience, build brand awareness, and drive conversions." },
        { label: "PPC Advertising", icon: MousePointer, description: "Get immediate visibility and targeted traffic with strategic PPC campaigns that deliver measurable results." },
        { label: "Content Marketing", icon: FileText, description: "Create compelling and valuable content that attracts and establishes your brand as an industry thought leader." },
        { label: "Email Marketing", icon: Mail, description: "Leverage the power of email to nurture leads, build customer loyalty, and drive repeat business." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Drive Your Digital Growth"
      processSteps={[
        { title: "Audit & Analysis", desc: "Deep dive into your current digital footprint — analytics, competitors, and channel performance." },
        { title: "Strategy & Planning", desc: "Custom multi-channel roadmap tailored to your goals, budget, and audience." },
        { title: "Campaign Execution", desc: "Agile launch of paid, organic, content, and social campaigns with continuous A/B testing." },
        { title: "Optimize & Report", desc: "Real-time performance tracking with monthly strategy sessions and full transparency." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Digital Marketing Packages That Scale With You"
      pricingPackages={[
        {
          name: "Starter",
          originalPrice: "800.00",
          price: "399.99",
          features: ["Social Media Setup (3 Platforms)", "Content Calendar", "10 Social Media Posts/Month", "Monthly Analytics Report", "Email Newsletter Setup", "3-Month Commitment"],
        },
        {
          name: "Growth",
          originalPrice: "1,600.00",
          price: "799.99",
          featured: true,
          features: ["Social Media Management (5 Platforms)", "Content Strategy & Creation", "20 Social Media Posts/Month", "PPC Campaign Setup & Management", "Email Marketing Campaign", "Monthly Strategy Calls", "Detailed Analytics Dashboard", "6-Month Commitment"],
        },
        {
          name: "Authority",
          originalPrice: "3,200.00",
          price: "1,599.99",
          features: ["Full Multi-Channel Strategy", "Unlimited Social Platforms", "Content Creation & Distribution", "Advanced PPC Management", "A/B Testing Framework", "Custom Analytics Dashboard", "Dedicated Marketing Manager", "12-Month Commitment"],
        },
        {
          name: "Enterprise",
          originalPrice: "6,400.00",
          price: "3,199.99",
          features: ["Full Agency Team Assigned", "All Channels Managed", "PR & Influencer Outreach", "Advanced CRO & Funnels", "Weekly Strategy Sessions", "Real-Time ROI Dashboard", "Priority Support 24/7", "Custom SLA"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Carlos Vega", role: "CEO, Meridian Realty Group", text: "Our PPC campaigns were losing money before SDL took over. Within 60 days they restructured everything — now we're getting 4x ROAS consistently. Crystal clear reporting." },
        { name: "Tina Bloom", role: "Brand Manager, Elevate Wellness", text: "SDL grew our Instagram from 2,000 to 28,000 followers in 6 months while maintaining engagement rates well above industry average. Their content strategy is world-class." },
        { name: "Sarah Mitchell", role: "CEO, BrightPath Consulting", text: "Our complete digital marketing overhaul resulted in tripled website traffic and a 40% increase in qualified leads within three months. Phenomenal team." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "3-5x Average ROI", "Transparent Reporting", "50% Off — Limited Time"]}
      ctaTitle="Ready to Scale Your Business?"
      ctaDescription="Let our marketing experts craft a strategy that turns browsers into buyers and clicks into customers."
    />
  );
}
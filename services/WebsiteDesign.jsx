"use client";
import React from "react";
import { Monitor, Layout, ShoppingCart, Building2, FileText, Rocket } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function WebsiteDesign() {
  return (
    <FullServicePage
      badge="Website Design & Development — Services Starting From $250"
      headline="Custom Web Development Services"
      highlight="Starting From $250"
      subheadline="Website Designs That Build Immersive Digital Experiences"
      description="Your website is more than pixels and code — it's your brand's digital heartbeat. As a leading web design agency, we craft immersive, high-performance platforms that captivate and convert. Enhance your website design with innovation, strategy, and seamless user experiences that set you apart."
      startingPrice="$249.99"
      image="https://media..com/images/public/69c84c79cf14625ad4e75595/5f9d23832_generated_9faca50c.png"
      stats={[
        { value: "250+", label: "Websites Built" },
        { value: "150+", label: "Developers" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "250+", label: "Professionals" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Exceptional Web Design for Brands That Want to"
      aboutHighlight="Conquer the Market"
      aboutBody="The Designers Agency designs websites that don't just function — they remain memorable. Recognized among the best website builders, we blend advanced tech with artistic precision, creating fast, scalable, and conversion-driven digital experiences. No templates or shortcuts — just custom-coded mastery that makes your competitors look outdated."
      aboutBullets={[
        "Strategic excellence in every design crafted with precision",
        "Modern innovation leveraging the latest technologies",
        "Personalized solutions so your brand shines without compromise",
        "Unwavering support from concept to launch and beyond",
      ]}
      differentiators={[
        { title: "Custom-Coded Mastery", desc: "No templates or shortcuts — just hand-crafted, pixel-perfect code." },
        { title: "SEO-Optimized Foundation", desc: "Every site is built with search engines in mind from day one." },
        { title: "Conversion-Focused Design", desc: "Design decisions driven by data and real user behavior." },
        { title: "Scalable Architecture", desc: "Built to grow with your business effortlessly over time." },
      ]}
      servicesSubtitle="Our Services"
      servicesTitle="Reliable Web Development Services That Transform Clicks Into Lasting Impressions"
      services={[
        { icon: Monitor, title: "Responsive Website", description: "Websites that perform flawlessly on every screen using flexible grids, fluid layouts, and touch-friendly design — keeping users engaged across all platforms." },
        { icon: Layout, title: "WordPress Website", description: "Fully custom WordPress themes with unique features, optimized performance, image compression, security setup, and SEO basics. Easy to update and scale." },
        { icon: ShoppingCart, title: "eCommerce Web", description: "Online stores that turn browsers into buyers with smart product recommendations, secure payments, fast checkouts, and mobile-optimized experiences." },
        { icon: Building2, title: "Corporate Web", description: "Professional, high-impact websites for corporations that want to lead and inspire trust with investor dashboards, leadership profiles, and secure content." },
        { icon: FileText, title: "Flat Website", description: "Clean, simple, and fast websites that remove unnecessary clutter. Perfect for portfolios, one-pagers, and microsites that need to look sharp and perform." },
        { icon: Rocket, title: "Landing Pages", description: "High-performance conversion pages focused on your campaign. Optimized with A/B testing and heatmaps for lead generation, signups, and sales." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Website Designs That Market Themselves – Beyond Aesthetics"
      portfolioTabs={[
        { label: "Responsive Website", icon: Monitor, description: "Engage your audience with captivating websites that adapt seamlessly to different screen sizes for an immersive browsing experience." },
        { label: "WordPress Websites", icon: Layout, description: "Simplify website development with fully custom designs using WordPress, ensuring a hassle-free creative process." },
        { label: "eCommerce Website", icon: ShoppingCart, description: "Boost online sales with comprehensive solutions like merchant integration, CMS, product reports, and coupons." },
        { label: "Corporate Website", icon: Building2, description: "Enhance brand credibility and strengthen your business image with informative websites showcasing products and services." },
        { label: "Flat Website", icon: FileText, description: "Streamlined and visually appealing minimalist designs that focus on content, providing a seamless user experience." },
        { label: "Landing Pages", icon: Rocket, description: "Create impactful first impressions and effectively market your products and services with engaging landing pages." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Build Your Website"
      processSteps={[
        { title: "Discovery & Strategy", desc: "We learn your brand, goals, audience, and competitive landscape inside out." },
        { title: "Design & Wireframes", desc: "We create detailed wireframes and high-fidelity mockups for your approval." },
        { title: "Development & Testing", desc: "We code your site from scratch and test across all devices and browsers." },
        { title: "Launch & Support", desc: "We deploy, optimize for speed & SEO, then stand by with ongoing support." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Website Packages for Every Budget"
      pricingPackages={[
        {
          name: "Startup Website",
          originalPrice: "500.00",
          price: "249.99",
          features: ["3 Page Website", "5 Stock Photos", "3 Banner Designs", "jQuery Slider Banner", "Google Friendly Sitemap", "W3C Certified HTML", "Social Media Page Designs", "100% Satisfaction Guarantee"],
        },
        {
          name: "Pro Website",
          originalPrice: "1,200.00",
          price: "599.99",
          featured: true,
          features: ["10 Unique Pages", "CMS / Admin Panel", "8 Stock Images", "5 Banner Designs", "jQuery Slider Banner", "Google Friendly Sitemap", "Social Media Page Designs", "Complete Deployment", "100% Satisfaction Guarantee"],
        },
        {
          name: "Elite Website",
          originalPrice: "2,000.00",
          price: "999.99",
          features: ["Up to 15 Unique Pages", "Mobile Responsive", "Custom Forms & Lead Capture", "Social Media Integration", "Search Engine Submission", "Newsletter Subscription", "3 Unique Banner Designs", "Complete Deployment", "100% Ownership Rights"],
        },
        {
          name: "Silver Website",
          originalPrice: "3,200.00",
          price: "1,599.99",
          features: ["15–20 Pages Website", "Custom WordPress", "Unlimited Revisions", "CMS & Admin Panel", "Online Payment Integration", "Multi-Lingual Support", "Mobile Responsive", "Dedicated Account Manager", "100% Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Sarah Mitchell", role: "CEO, BrightPath Consulting", text: "Sentinels Design Lab exceeded every expectation. Our website traffic tripled within three months of launch and lead conversions doubled. Truly exceptional work." },
        { name: "James Rodriguez", role: "Founder, NovaTech Solutions", text: "Their attention to detail and strategic thinking set them apart. The site loads in under 1.5 seconds and looks stunning on every device. We saw measurable results from day one." },
        { name: "Emily Chen", role: "Marketing Director, Velo Brands", text: "A truly professional team that delivers on their promises. Our rebrand and website relaunch were flawless. We've never had so many compliments from clients." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "100% Ownership Rights", "50% Off — Limited Time", "24/7 Support"]}
      ctaTitle="Ready to Build Your Dream Website?"
      ctaDescription="Let's create a website that works as hard as your business does. Get started with 50% off today."
    />
  );
}
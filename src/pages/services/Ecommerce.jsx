"use client";
import React from "react";
import { ShoppingCart, Store, CreditCard, TrendingUp, Package, Smartphone } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function Ecommerce() {
  return (
    <FullServicePage
      badge="Ecommerce Website Design — Specialized E-Commerce That Converts"
      headline="Ecommerce Website Designs"
      highlight="Converting Visitors into Buyers"
      subheadline="Specialized E-Commerce Web Design That Converts"
      description="Ready to build a website to sell products effortlessly? Our modern ecommerce solutions create visually stunning, high-performing online stores that maximize sales and ROI, enhance user experience, and keep customers coming back for more."
      startingPrice="$999.99"
      image="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/65d788a6d_generated_42abb4a6.png"
      stats={[
        { value: "200+", label: "Stores Launched" },
        { value: "150+", label: "Developers" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "3-5x", label: "Average ROAS" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Innovative Ecommerce Web Design Services for"
      aboutHighlight="Digital Success"
      aboutBody="At Sentinels Design Lab, we don't just build stores — we design profit-driving machines. As certified Shopify and WooCommerce experts, we craft flawless shopping experiences with AI-powered recommendations and one-click checkouts. Our ecommerce developer team optimizes every pixel for conversions, whether you sell 10 products or 10,000. We transform your digital storefront into a 24/7 sales powerhouse."
      aboutBullets={[
        "Custom-built stores — no templates, no compromise on quality",
        "Conversion rate optimization built into every design decision",
        "Seamless payment gateway integrations with 99.99% uptime",
        "Mobile-first design that captures the 70%+ of shoppers on mobile",
      ]}
      differentiators={[
        { title: "Shopify & WooCommerce Certified", desc: "Experts in both platforms, delivering stores that perform from day one." },
        { title: "Conversion-First Design", desc: "Every element is tested and optimized to maximize your add-to-cart rate." },
        { title: "Smart Product Discovery", desc: "AI-powered recommendations that increase average order value by 35%." },
        { title: "Global Payment Ready", desc: "Stripe, PayPal, Klarna, and 30+ gateways integrated seamlessly." },
      ]}
      servicesSubtitle="Ecommerce Services"
      servicesTitle="Your Complete Online Store Solution"
      services={[
        { icon: ShoppingCart, title: "eCommerce Web Development", description: "Full-stack development combining secure architecture with conversion-optimized UX — custom-designed for B2B portals, subscriptions, or marketplaces loading under 1.5 seconds." },
        { icon: Store, title: "Shopify & WooCommerce", description: "Certified experts building custom themes, app integrations, and checkout optimization that reduces abandonment rates by up to 60%." },
        { icon: CreditCard, title: "Payment Gateway Integration", description: "Global payment solutions (Stripe, PayPal, Klarna) with one-click purchases, installment options, and currency auto-detection — all PCI-compliant." },
        { icon: TrendingUp, title: "Ecommerce SEO & Marketing", description: "Schema markup, siloed navigation, keyword-optimized product descriptions, plus Google Shopping ads and retargeting for 3-5x ROAS within 90 days." },
        { icon: Package, title: "Product & Inventory Management", description: "Smart systems with barcode scanning, low-stock alerts, automated variant management, and real-time sync across POS, Amazon, and warehouses." },
        { icon: Smartphone, title: "Mobile-Optimized Design", description: "Thumb-friendly navigation, AMP pages, and checkout flows under 3 taps. Tested on 50+ devices with Apple Pay and AR product previews." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Ecommerce Stores That Drive Real Revenue"
      portfolioTabs={[
        { label: "Fashion & Apparel", icon: ShoppingCart, description: "Stunning visual merchandising with size guides, lookbooks, and one-click checkouts that convert browsers into loyal brand fans." },
        { label: "Health & Beauty", icon: Package, description: "Subscription-ready stores with upsell flows, bundle builders, and loyalty programs that maximize lifetime customer value." },
        { label: "Electronics & Tech", icon: Store, description: "Spec-heavy product pages with comparison tools, video embeds, and technical filters that help buyers choose with confidence." },
        { label: "Food & Beverage", icon: CreditCard, description: "Appetizing product photography, delivery integrations, and subscription box functionality for repeat purchase revenue." },
        { label: "B2B & Wholesale", icon: TrendingUp, description: "Custom pricing tiers, bulk order tools, and account management portals for seamless B2B purchasing workflows." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Build Your Online Store"
      processSteps={[
        { title: "Discovery & Planning", desc: "We map out your product catalog, customer journey, and competitive landscape." },
        { title: "UX Design & Mockups", desc: "High-fidelity designs for every page — homepage, PDP, cart, and checkout." },
        { title: "Development & Integration", desc: "We build and connect your payment, inventory, email, and shipping systems." },
        { title: "Launch & Optimize", desc: "A/B testing, Google Shopping setup, and ongoing CRO to maximize revenue." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Ecommerce Packages to Fit Your Business"
      pricingPackages={[
        {
          name: "Starter Store",
          originalPrice: "2,000.00",
          price: "999.99",
          features: ["Up to 50 Products", "Shopify or WooCommerce Setup", "Custom Theme Design", "Payment Gateway Integration", "Basic SEO Setup", "Mobile Responsive", "30-Day Support"],
        },
        {
          name: "Professional Store",
          originalPrice: "4,000.00",
          price: "1,999.99",
          featured: true,
          features: ["Unlimited Products", "Custom Design & Development", "Advanced Payment Integrations", "Inventory Management System", "Abandoned Cart Recovery", "SEO Optimized", "90-Day Support", "Dedicated Account Manager"],
        },
        {
          name: "Advanced Store",
          originalPrice: "8,000.00",
          price: "3,999.99",
          features: ["Multi-Currency & Language", "AI Product Recommendations", "Custom Loyalty Program", "Advanced Analytics & Reporting", "CRM Integration", "Multi-Warehouse Support", "6-Month Support", "100% Ownership Rights"],
        },
        {
          name: "Enterprise Store",
          originalPrice: "16,000.00",
          price: "7,999.99",
          features: ["Custom Marketplace Features", "Multi-Vendor Support", "B2B Portal & Wholesale Pricing", "ERP Integration", "Custom Mobile App", "Priority Support 24/7", "12-Month Support", "Full Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Daniel Okafor", role: "Ecommerce Manager, LuxGoods Co.", text: "Our conversion rate jumped from 1.2% to 3.8% after SDL rebuilt our ecommerce platform. The checkout flow is seamless. Revenue is up 65% year-over-year." },
        { name: "James Rodriguez", role: "Founder, NovaTech Solutions", text: "SDL built our entire B2B portal from scratch — custom pricing, bulk ordering, and account management. It's processed over $2M in orders without a single issue." },
        { name: "Emily Chen", role: "Marketing Director, Velo Brands", text: "Our mobile revenue tripled after the relaunch. The product pages are gorgeous and the checkout is the smoothest I've ever experienced. World-class team." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "Shopify Certified", "WooCommerce Expert", "3-5x Average ROAS", "50% Off — Limited Time"]}
      ctaTitle="Ready to Build Your Online Store?"
      ctaDescription="Let's build an ecommerce platform that turns your products into profits — starting at $999.99."
    />
  );
}
"use client";
import React from "react";
import { Apple, Smartphone, Code2, Glasses, Wrench, Globe } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function CustomApps() {
  return (
    <FullServicePage
      badge="Custom Apps Development — Services Starting From $499"
      headline="Impactful Apps Development"
      highlight="for Seamless Digital Experiences"
      subheadline="Custom Mobile Apps That Innovate, Enhance, Dominate"
      description="Leverage our custom apps development expertise to create intuitive, high-performing mobile applications that engage users and drive results. From iOS to AR/VR, we build apps that boost engagement by 3x industry averages."
      startingPrice="$499.99"
      image="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/47a12a557_generated_image.png"
      stats={[
        { value: "250+", label: "Apps Developed" },
        { value: "150+", label: "Engineers" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "250+", label: "Professionals" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Award-Winning App Development Company Building"
      aboutHighlight="Impactful Businesses"
      aboutBody="At Sentinels Design Lab, we engineer custom mobile app experiences that solve real user problems while driving measurable growth. Our apps blend intuitive UX with cutting-edge tech — AI, AR, and IoT — to boost engagement by 3x industry averages. From startups to enterprises, we deliver scalable solutions with 99.9% uptime."
      aboutBullets={[
        "Custom apps designed for your unique business requirements",
        "Intuitive designs that maximize user engagement and retention",
        "Scalable architecture supporting AI, AR, and emerging technologies",
        "Complete service from concept to App Store launch",
      ]}
      differentiators={[
        { title: "Native Performance", desc: "Optimized for each platform — Swift for iOS, Kotlin for Android." },
        { title: "Cross-Platform Efficiency", desc: "React Native delivers 90% code reuse, cutting time and cost." },
        { title: "Future-Proof Architecture", desc: "Built to scale with AI, IoT, and AR integrations." },
        { title: "End-to-End Delivery", desc: "From concept to App Store submission and ongoing support." },
      ]}
      servicesSubtitle="App Development Services"
      servicesTitle="Results-Driven Apps Development Services That Transform Ideas Into Scalable Solutions"
      services={[
        { icon: Apple, title: "iOS App Development", description: "Sleek, high-performance iOS apps with Swift and SwiftUI, fully integrated with the Apple ecosystem including HealthKit, ARKit, and Wallet." },
        { icon: Smartphone, title: "Android App Development", description: "Apps designed for global markets using Kotlin and Jetpack Compose, tested across 100+ device profiles for reliability, speed, and seamless UX." },
        { icon: Code2, title: "React Native Development", description: "Cross-platform mobile apps with up to 90% code reuse between iOS and Android, delivering cost savings and native-like performance." },
        { icon: Glasses, title: "AR/VR App Development", description: "Immersive 3D experiences using Unity and ARCore/ARKit for virtual try-ons, interactive manuals, and gamified training modules." },
        { icon: Wrench, title: "Custom App Development", description: "Tailored solutions from IoT-controlled industrial apps to AI-powered mental health tools — scalable, future-proof, with robust APIs." },
        { icon: Globe, title: "Progressive Web Apps (PWA)", description: "PWAs that bridge mobile apps and websites, performing flawlessly even with limited connectivity — fast, reliable, and cost-effective." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Pixel-Perfect Custom Mobile Apps That Drive Real Business Results"
      portfolioTabs={[
        { label: "iOS Apps", icon: Apple, description: "Leverage our expertise in iOS app development to create captivating experiences that engage and delight your users." },
        { label: "Android Apps", icon: Smartphone, description: "Unlock the potential of your business with custom-built Android apps designed to drive growth and maximize user engagement." },
        { label: "React Native", icon: Code2, description: "Experience the power of React Native as we build cross-platform apps that deliver native-like experiences on both platforms." },
        { label: "AR/VR Apps", icon: Glasses, description: "Embark on an immersive journey with our AR/VR app development services, delivering captivating experiences." },
        { label: "Custom Web Apps", icon: Globe, description: "Elevate your digital presence with customized web apps that offer enhanced functionality and seamless user experiences." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Build Your App"
      processSteps={[
        { title: "Discovery & Requirements", desc: "We uncover hidden user needs through in-depth workshops and competitive analysis." },
        { title: "UX Design & Prototyping", desc: "Wire-frames, clickable prototypes, and user testing before a line of code is written." },
        { title: "Development & QA", desc: "Agile sprints with continuous testing across 50+ device configurations." },
        { title: "Launch & Growth", desc: "App Store submission, ASO optimization, and ongoing feature development." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="App Development Packages"
      pricingPackages={[
        {
          name: "MVP App",
          originalPrice: "2,000.00",
          price: "999.99",
          features: ["Single Platform (iOS or Android)", "Up to 5 Core Screens", "Basic Backend Integration", "Push Notifications", "App Store Submission", "30-Day Support", "100% Ownership Rights"],
        },
        {
          name: "Professional App",
          originalPrice: "5,000.00",
          price: "2,499.99",
          featured: true,
          features: ["iOS + Android (React Native)", "Up to 15 Screens", "Custom Backend & API", "Push Notifications & Analytics", "In-App Purchases", "Social Login", "90-Day Support", "100% Ownership Rights"],
        },
        {
          name: "Advanced App",
          originalPrice: "10,000.00",
          price: "4,999.99",
          features: ["Cross-Platform or Native", "Unlimited Screens", "AI/ML Integration", "Real-Time Features", "Custom CMS & Admin Panel", "Third-Party Integrations", "6-Month Support", "100% Ownership Rights"],
        },
        {
          name: "Enterprise App",
          originalPrice: "20,000.00",
          price: "9,999.99",
          features: ["Full Custom Architecture", "IoT / AR / VR Support", "Multi-Tenant System", "Advanced Security & Compliance", "Dedicated Dev Team", "SLA Guarantee", "12-Month Support", "100% Ownership Rights"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Michael Graves", role: "CTO, FinTrack Pro", text: "Complex fintech app, tight compliance requirements, aggressive timeline — SDL nailed all three. The React Native app scores above 4.8 stars on both app stores. Bulletproof architecture." },
        { name: "Tina Bloom", role: "Brand Manager, Elevate Wellness", text: "Our app went from concept to launch in 11 weeks. The UX is flawless and our users love it. Downloads exceeded 10,000 in the first month alone." },
        { name: "Carlos Vega", role: "CEO, Meridian Group", text: "We've worked with two agencies before SDL. Nobody came close to their attention to detail, communication, and the quality of the final product. Genuinely world-class." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "4.8★ App Store Avg", "50% Off — Limited Time", "24/7 Support"]}
      ctaTitle="Have an App Idea?"
      ctaDescription="Let's turn your concept into a scalable, high-performance mobile application. Get 50% off today."
    />
  );
}
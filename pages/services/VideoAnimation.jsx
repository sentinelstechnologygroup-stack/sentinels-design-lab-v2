"use client";
import React from "react";
import { Film, Box, PenTool, Camera, Play, Zap } from "lucide-react";
import FullServicePage from "../../components/shared/FullServicePage";

export default function VideoAnimation() {
  return (
    <FullServicePage
      badge="Video Animation Services — Starting From $150"
      headline="Video Animation Services"
      highlight="Starting From $150"
      subheadline="Customized Video Animations That Captivate, Inspire & Convert"
      description="Transform ideas into stunning visuals with our animated video service, designed to captivate, inspire, and increase brand engagement. Our video animation team crafts motion graphics that simplify complex ideas, boost engagement by 300%, and drive action — from 2D explainers to 3D product demos."
      startingPrice="$149.99"
      image="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/4e504627e_generated_image.png"
      stats={[
        { value: "250+", label: "Videos Produced" },
        { value: "150+", label: "Animators" },
        { value: "10+", label: "Years Experience" },
        { value: "99%", label: "Client Retention" },
        { value: "300%+", label: "Avg Engagement Boost" },
        { value: "100%", label: "Ownership Rights" },
      ]}
      aboutTitle="Award-Winning Video Animation Company Turning Concepts into"
      aboutHighlight="Unforgettable Stories"
      aboutBody="At Sentinels Design Lab, our video animation team crafts motion graphics that do more than look pretty — they simplify complex ideas, boost engagement by 300%, and drive action. From 2D explainers to 3D product demos, we blend artistry with strategic storytelling custom-designed to your audience. Your message deserves more than views — it deserves retention and results."
      aboutBullets={[
        "Top-tier video animation with expert animators crafting personalized content",
        "High-quality production with advanced tools ensuring flawless visuals and motion",
        "Diverse styles — from 2D to 3D, explainer videos, and beyond",
        "Results-driven animations that drive engagement and boost conversions",
      ]}
      differentiators={[
        { title: "Full-Service Production", desc: "Script, storyboard, voiceover, animation, and sound effects — all in-house." },
        { title: "300% Engagement Boost", desc: "Our animations are proven to outperform static content on every platform." },
        { title: "HD 1080 Delivery", desc: "All videos delivered in HD 1080 resolution with multiple format exports." },
        { title: "Unlimited Revisions", desc: "We refine every frame until your video is exactly right — no limits." },
      ]}
      servicesSubtitle="Animation Services"
      servicesTitle="Premium Video Animation Services Bringing Your Brand Story to Life"
      services={[
        { icon: Film, title: "2D Animation Videos", description: "Simplified yet powerful 2D animations transforming complex messages into engaging visual stories — perfect for explainers, ads, and social content with clarity and emotional connection." },
        { icon: Box, title: "3D Animation Videos", description: "Add depth and realism with stunning 3D visuals — ideal for product demos, architectural walkthroughs, or immersive brand stories using Maya and Blender with cinematic effects." },
        { icon: PenTool, title: "Whiteboard Animation", description: "Hand-drawn visuals that guide viewers step-by-step through information — boosting knowledge retention by 65% for SaaS onboarding, financial explainers, and training materials." },
        { icon: Camera, title: "Stop Motion Animation", description: "Frame-by-frame magic using physical sets, props, or cutouts — tactile charm ideal for brands wanting organic, handmade aesthetic in a digital-heavy world." },
        { icon: Play, title: "Logo Animation", description: "Transform your static logo into a dynamic motion asset for intros, outros, presentations, and social media — making your brand instantly memorable on screen." },
        { icon: Zap, title: "Motion Graphics", description: "Data-driven animated graphics for presentations, social media, and advertisements — combining bold typography, icons, and transitions to communicate your message with impact." },
      ]}
      portfolioSubtitle="Our Work"
      portfolioTitle="Visually Appealing Video Animations That Make Your Message Unforgettable"
      portfolioTabs={[
        { label: "2D Animated", icon: Film, description: "Captivating 2D animations that make your brand memorable through character-driven narratives and sleek motion graphics." },
        { label: "3D Animated", icon: Box, description: "Step into the world of stunning 3D visuals and immersive experiences with expertly crafted animations that bring your brand to life." },
        { label: "Whiteboard", icon: PenTool, description: "Tell your brand story in a captivating and interactive way with engaging whiteboard animations that leave a lasting impression." },
        { label: "Stop Motion", icon: Camera, description: "Experience the magic of stop motion animation — unique and captivating videos that entertain and build emotional connection." },
        { label: "Logo Animation", icon: Play, description: "Dynamic logo animations that transform your static mark into a memorable motion asset for every screen and platform." },
      ]}
      processSubtitle="Our Process"
      processTitle="How We Produce Your Animation"
      processSteps={[
        { title: "Script & Concept", desc: "We write your script and develop the creative concept, voiceover direction, and storyboard." },
        { title: "Storyboard Approval", desc: "A detailed storyboard is presented for your review before any animation begins." },
        { title: "Animation & Sound", desc: "Full animation production with voiceover recording, sound effects, and music." },
        { title: "Final Delivery", desc: "HD 1080 video delivered in MP4, MOV, and GIF formats with unlimited revisions." },
      ]}
      pricingSubtitle="Pricing"
      pricingTitle="Video Animation Packages for Every Budget"
      pricingPackages={[
        {
          name: "Intro Video",
          originalPrice: "300.00",
          price: "149.99",
          features: ["15s Duration — HD 1080", "Professional Script", "Storyboard", "Sample Themes", "Custom Characters & Graphics", "Animation Effects", "Voice-Over & Sound Effects", "Unlimited Revisions"],
        },
        {
          name: "Startup Video",
          originalPrice: "400.00",
          price: "199.99",
          features: ["30s Duration — HD 1080", "Professional Script", "Storyboard", "Sample Themes", "Custom Characters & Graphics", "Animation Effects & Visualization", "Voice-Over & Sound Effects", "Unlimited Revisions"],
        },
        {
          name: "Classic Video",
          originalPrice: "800.00",
          price: "399.99",
          featured: true,
          features: ["60 Second Video — HD 1080", "Professional Script", "Sample Theme", "Storyboard", "Full Animation", "Voice-Over & Sound Effects", "5 Weeks Delivery", "Unlimited Revisions"],
        },
        {
          name: "Premium Video",
          originalPrice: "1,400.00",
          price: "699.99",
          features: ["90 Second Video — HD 1080", "Professional Script", "Sample Theme", "Storyboard", "Full Animation", "Voice-Over & Sound Effects", "6 Weeks Delivery", "Unlimited Revisions"],
        },
      ]}
      testimonialsSubtitle="Client Reviews"
      testimonialsTitle="They Believed in Us — You Will Too!"
      testimonials={[
        { name: "Daniel Okafor", role: "Ecommerce Manager, LuxGoods Co.", text: "Our product explainer video increased add-to-cart rates by 34%. SDL's animation team understood exactly what we needed and delivered something that genuinely moves people to act." },
        { name: "Carlos Vega", role: "CEO, Meridian Realty Group", text: "We used SDL's 3D animation for our property showcase. The quality rivals what we've seen from agencies charging 3x the price. The walkthrough videos have transformed our sales process." },
        { name: "Anika Sharma", role: "Operations Director, HealthFirst Clinics", text: "Our patient education videos are clear, engaging, and professionally produced. SDL handled everything from scripting to final delivery. The whiteboard animations are particularly excellent." },
      ]}
      trustBadges={["Google 4.9★", "Clutch 5.0★", "UpCity 4.8★", "HD 1080 Delivery", "300%+ Engagement Boost", "50% Off — Limited Time"]}
      ctaTitle="Ready to Animate Your Brand Story?"
      ctaDescription="Let's create a video that captivates your audience and drives real results — starting at just $149.99."
    />
  );
}
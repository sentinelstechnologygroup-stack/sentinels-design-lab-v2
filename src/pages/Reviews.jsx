"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ThumbsUp } from "lucide-react";
import CTASection from "../components/shared/CTASection";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "CEO",
    company: "BrightPath Consulting",
    service: "Website Design",
    rating: 5,
    text: "Sentinels Design Lab completely transformed our digital presence. Our website traffic tripled within three months of launch, and we've seen a 40% increase in qualified leads. The team was professional, communicative, and delivered beyond our expectations.",
    result: "+300% Website Traffic",
  },
  {
    name: "James Rodriguez",
    role: "Founder",
    company: "NovaTech Solutions",
    service: "Custom App Development",
    rating: 5,
    text: "They built our entire SaaS platform from scratch — clean architecture, intuitive UI, and on-time delivery. The app has been running flawlessly for over a year with zero major issues. Exceptional technical team.",
    result: "SaaS Platform Launched in 90 Days",
  },
  {
    name: "Emily Chen",
    role: "Marketing Director",
    company: "Velo Brands",
    service: "Branding & Collateral",
    rating: 5,
    text: "Our rebrand was flawless. From the logo to the full brand guide, every detail was considered and executed with precision. Our sales team loves the new collateral — it's elevated every conversation we have with prospects.",
    result: "Full Brand Overhaul Delivered",
  },
  {
    name: "Daniel Okafor",
    role: "Ecommerce Manager",
    company: "LuxGoods Co.",
    service: "Ecommerce Development",
    rating: 5,
    text: "Our conversion rate jumped from 1.2% to 3.8% after SDL rebuilt our ecommerce platform. The checkout flow is seamless and the mobile experience is best in class. Revenue is up 65% year-over-year.",
    result: "+65% Revenue YoY",
  },
  {
    name: "Anika Sharma",
    role: "Operations Director",
    company: "HealthFirst Clinics",
    service: "SEO Services",
    rating: 5,
    text: "We went from page 4 on Google to #1 for our primary keywords in under 5 months. The SDL SEO team is methodical, transparent with reporting, and genuinely invested in our growth. Highly recommend.",
    result: "#1 Google Ranking in 5 Months",
  },
  {
    name: "Carlos Vega",
    role: "CEO",
    company: "Meridian Realty Group",
    service: "Digital Marketing",
    rating: 5,
    text: "Our PPC campaigns were losing money before SDL took over. Within 60 days they restructured everything — now we're getting 4x ROAS consistently. The reporting is crystal clear and the team is always proactive.",
    result: "4x ROAS Achieved",
  },
  {
    name: "Tina Bloom",
    role: "Brand Manager",
    company: "Elevate Wellness",
    service: "Social Media Marketing",
    rating: 5,
    text: "SDL grew our Instagram from 2,000 to 28,000 followers in 6 months while maintaining engagement rates well above industry average. Their content strategy is creative and genuinely on-brand.",
    result: "14x Instagram Growth in 6 Months",
  },
  {
    name: "Michael Graves",
    role: "CTO",
    company: "FinTrack Pro",
    service: "Custom App Development",
    rating: 5,
    text: "Complex fintech app, tight compliance requirements, aggressive timeline — SDL nailed all three. Their backend architecture is bulletproof and the React Native app scores above 4.8 stars on both app stores.",
    result: "4.8★ App Store Rating",
  },
  {
    name: "Rachel Osei",
    role: "Founder",
    company: "Bloom Education",
    service: "Website Design & SEO",
    rating: 5,
    text: "From first call to launch was 5 weeks. The website is gorgeous, loads in under 1.5 seconds, and our organic traffic has grown 220% since launch. I've already referred three colleagues to SDL.",
    result: "+220% Organic Traffic",
  },
];

const platforms = [
  { name: "Google", rating: "4.9", reviews: "87 Reviews" },
  { name: "Clutch", rating: "5.0", reviews: "43 Reviews" },
  { name: "UpCity", rating: "4.8", reviews: "61 Reviews" },
];

const filterOptions = ["All", "Website Design", "Custom App Development", "SEO Services", "Digital Marketing", "Ecommerce Development", "Branding & Collateral"];

export default function Reviews() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? reviews : reviews.filter(r => r.service === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pb-12 lg:pb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                Client Reviews
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-4">
                What Our Clients <span className="text-primary">Say About Us</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mb-8">
                Don't take our word for it. Here's what real clients have to say about working with Sentinels Design Lab.
              </p>
              {/* Platform Ratings */}
              <div className="flex flex-wrap gap-3">
                {platforms.map((p, i) => (
                  <div key={i} className="bg-card/60 border border-border/50 rounded-xl px-5 py-3 flex items-center gap-3">
                    <div>
                      <div className="font-heading font-bold text-foreground text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.reviews}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-heading font-bold text-foreground">{p.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-2xl" />
              <img src="https://media.base44.com/images/public/69c84c79cf14625ad4e75595/d1c75daad_generated_image.png?w=1200&q=80" alt="Client Reviews" className="relative w-full max-h-[420px] object-cover rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === opt
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card/60 border border-border/50 rounded-xl p-7 flex flex-col hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">
                  "{review.text}"
                </p>

                {review.result && (
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 mb-5">
                    <ThumbsUp className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-primary">{review.result}</span>
                  </div>
                )}

                <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-semibold text-foreground text-sm">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}, {review.company}</div>
                  </div>
                  <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">{review.service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Be Our Next Success Story?" description="Join 250+ businesses that have transformed their digital presence with Sentinels Design Lab." />
    </div>
  );
}
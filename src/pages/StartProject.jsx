// src/pages/StartProject.jsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Check } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const STEPS = [
  {
    id: "service",
    title: "What do you need help with?",
    subtitle: "Select the service that best fits your goals.",
    type: "single",
    options: [
      { value: "Website Design & Development", label: "Website Design", emoji: "🌐" },
      { value: "Ecommerce Development", label: "Ecommerce Store", emoji: "🛒" },
      { value: "Custom App Development", label: "Custom App", emoji: "📱" },
      { value: "SEO Services", label: "SEO / Organic Growth", emoji: "🔍" },
      { value: "PPC / Paid Ads", label: "Paid Ads (PPC)", emoji: "🎯" },
      { value: "Branding & Identity", label: "Branding & Logo", emoji: "🎨" },
      { value: "Digital Marketing", label: "Digital Marketing", emoji: "📊" },
      { value: "Hosting & Maintenance", label: "Hosting & Maintenance", emoji: "🖥️" },
      { value: "Not sure yet", label: "Not sure yet", emoji: "🤔" },
    ],
  },
  {
    id: "goal",
    title: "What's your primary goal?",
    subtitle: "This helps us recommend the right approach.",
    type: "single",
    options: [
      { value: "Generate more leads", label: "Generate more leads", emoji: "💡" },
      { value: "Increase online sales", label: "Increase online sales", emoji: "💰" },
      { value: "Build brand awareness", label: "Build brand awareness", emoji: "📣" },
      { value: "Launch a new product", label: "Launch a new product / startup", emoji: "🚀" },
      { value: "Improve existing site", label: "Improve existing site/app", emoji: "🔧" },
      { value: "Rank higher on Google", label: "Rank higher on Google", emoji: "📈" },
    ],
  },
  {
    id: "budget",
    title: "What's your approximate budget?",
    subtitle: "We have packages at every level — no wrong answer.",
    type: "single",
    options: [
      { value: "Under $1,000", label: "Under $1,000", emoji: "💵" },
      { value: "$1,000 – $3,000", label: "$1,000 – $3,000", emoji: "💵" },
      { value: "$3,000 – $7,500", label: "$3,000 – $7,500", emoji: "💵" },
      { value: "$7,500 – $15,000", label: "$7,500 – $15,000", emoji: "💰" },
      { value: "$15,000+", label: "$15,000+", emoji: "🏆" },
      { value: "Prefer to discuss", label: "Prefer to discuss", emoji: "🤝" },
    ],
  },
  {
    id: "timeline",
    title: "When do you need to launch?",
    subtitle: "Knowing your urgency helps us plan resources.",
    type: "single",
    options: [
      { value: "As soon as possible", label: "ASAP — urgent!", emoji: "⚡" },
      { value: "Within 1 month", label: "Within 1 month", emoji: "📅" },
      { value: "1–3 months", label: "1–3 months", emoji: "📅" },
      { value: "3–6 months", label: "3–6 months", emoji: "📅" },
      { value: "No fixed deadline", label: "No fixed deadline", emoji: "🌅" },
    ],
  },
  {
    id: "contact",
    title: "Almost done — how do we reach you?",
    subtitle: "We'll reach out within one business day.",
    type: "form",
  },
];

function StartProjectInner() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    service: "",
    goal: "",
    budget: "",
    timeline: "",
  });
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const preService = searchParams.get("service") || "";
    if (preService) {
      setAnswers((prev) => ({
        ...prev,
        service: preService,
      }));
    }
  }, [searchParams]);

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = (step / (totalSteps - 1)) * 100;

  function selectOption(value) {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));

    if (step < totalSteps - 1) {
      setTimeout(() => {
        setDirection(1);
        setStep((s) => s + 1);
      }, 220);
    }
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function handleContactChange(e) {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!contact.name || !contact.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setSubmitted(true);
  }

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            We've got your brief!
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Someone from our team will review your submission and follow up within one business day
            to schedule an intro call.
          </p>

          <div className="text-left bg-card/60 border border-border/50 rounded-xl p-5 mb-6 space-y-2">
            {[
              { label: "Service", value: answers.service },
              { label: "Goal", value: answers.goal },
              { label: "Budget", value: answers.budget },
              { label: "Timeline", value: answers.timeline },
            ]
              .filter((i) => i.value)
              .map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className="text-foreground font-medium">{item.value}</span>
                </div>
              ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Questions? Email us at{" "}
            <a
              href="mailto:Info@SentinelsDesignLab.com"
              className="text-primary hover:underline"
            >
              Info@SentinelsDesignLab.com
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-10 pt-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>

          <div className="h-1.5 bg-border/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {currentStep.title}
              </h2>
              <p className="text-muted-foreground">{currentStep.subtitle}</p>
            </div>

            {currentStep.type === "single" && (
              <div className="grid sm:grid-cols-2 gap-3">
                {currentStep.options.map((opt) => {
                  const selected = answers[currentStep.id] === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectOption(opt.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all font-medium text-sm ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground shadow-lg shadow-primary/10"
                          : "border-border/50 bg-card/60 text-secondary-foreground hover:border-primary/30 hover:bg-card/80"
                      }`}
                    >
                      <span className="text-xl w-7 shrink-0">{opt.emoji}</span>
                      <span className="flex-1">{opt.label}</span>
                      {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {currentStep.type === "form" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contact.phone}
                      onChange={handleContactChange}
                      className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={contact.businessName}
                      onChange={handleContactChange}
                      className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Anything else we should know?
                  </label>
                  <textarea
                    name="notes"
                    value={contact.notes}
                    onChange={handleContactChange}
                    rows={4}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us about your business, specific requirements, or any context that would help us understand your project..."
                  />
                </div>

                <div className="bg-card/40 border border-border/30 rounded-xl p-4 flex flex-wrap gap-3">
                  {[
                    { label: answers.service },
                    { label: answers.goal },
                    { label: answers.budget },
                    { label: answers.timeline },
                  ]
                    .filter((i) => i.label)
                    .map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> {item.label}
                      </span>
                    ))}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-primary/20"
                >
                  Submit Project Brief <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  We review every submission personally. You'll hear back within one business day.
                </p>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}

function StartProjectFallback() {
  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-10 pt-8">
          <div className="h-1.5 bg-border/40 rounded-full overflow-hidden" />
        </div>
        <div className="glass-card p-8">
          <div className="text-sm text-muted-foreground">Loading project intake...</div>
        </div>
      </div>
    </div>
  );
}

export default function StartProject() {
  return (
    <Suspense fallback={<StartProjectFallback />}>
      <StartProjectInner />
    </Suspense>
  );
}
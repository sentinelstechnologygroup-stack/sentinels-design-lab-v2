"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function PricingCard({ name, originalPrice, price, features, featured }) {
  return (
    <div className={`relative rounded-xl border p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
      featured 
        ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10" 
        : "border-border/50 bg-card/60 hover:border-primary/20"
    }`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="font-heading text-xl font-bold text-foreground">{name}</h3>
      <div className="mt-4 mb-6">
        {originalPrice && (
          <span className="text-sm text-muted-foreground line-through mr-2">${originalPrice}</span>
        )}
        <span className="text-3xl font-heading font-bold text-foreground">${price}</span>
        <span className="text-sm text-muted-foreground ml-1">only</span>
      </div>
      <ul className="space-y-2.5 flex-1 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-secondary-foreground">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all ${
          featured
            ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
            : "border border-border hover:border-primary/40 text-foreground hover:bg-secondary/50"
        }`}
      >
        Order Now <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
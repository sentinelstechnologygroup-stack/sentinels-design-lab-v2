     1|// src/components/shared/PricingCard.jsx
     2|"use client";
     3|
     4|import React from "react";
     5|import Link from "next/link";
     6|import { Check, ArrowRight } from "lucide-react";
     7|
     8|export default function PricingCard({
     9|  name,
    10|  originalPrice,
    11|  price,
    12|  features = [],
    13|  featured,
    14|}) {
    15|  const serviceParam = encodeURIComponent(name || "");
    16|  const messageParam = encodeURIComponent(`Interested in: ${name || ""}`);
    17|  const contactHref = `/contact?service=${serviceParam}&message=${messageParam}`;
    18|
    19|  const showDollarPrice =
    20|    typeof price === "string" &&
    21|    price !== "" &&
    22|    !price.toLowerCase().includes("quote") &&
    23|    !price.toLowerCase().includes("custom");
    24|
    25|  const showDollarOriginalPrice =
    26|    typeof originalPrice === "string" &&
    27|    originalPrice !== "" &&
    28|    !originalPrice.toLowerCase().includes("quote") &&
    29|    !originalPrice.toLowerCase().includes("custom");
    30|
    31|  return (
    32|    <div
    33|      className={`relative rounded-xl border p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
    34|        featured
    35|          ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10"
    36|          : "panel-safe hover:border-primary/20"
    37|      }`}
    38|    >
    39|      {featured && (
    40|        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap">
    41|          Most Popular
    42|        </div>
    43|      )}
    44|
    45|      <h3 className="font-heading text-xl font-bold text-foreground">{name}</h3>
    46|
    47|      <div className="mt-4 mb-6">
    48|        {showDollarOriginalPrice && (
    49|          <span className="text-sm text-muted-foreground line-through mr-2">
    50|            ${originalPrice}
    51|          </span>
    52|        )}
    53|
    54|        <span className="text-3xl font-heading font-bold text-foreground">
    55|          {showDollarPrice ? `$${price}` : price}
    56|        </span>
    57|
    58|        {showDollarPrice && (
    59|          <span className="text-sm text-muted-foreground ml-1">only</span>
    60|        )}
    61|      </div>
    62|
    63|      <ul className="space-y-2.5 flex-1 mb-8">
    64|        {features.map((feature, i) => (
    65|          <li
    66|            key={i}
    67|            className="flex items-start gap-2.5 text-sm text-secondary-foreground"
    68|          >
    69|            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
    70|            <span>{feature}</span>
    71|          </li>
    72|        ))}
    73|      </ul>
    74|
    75|      <Link
    76|        href={contactHref}
    77|        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all ${
    78|          featured
    79|            ? "bg-primary hover:bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
    80|            : "border border-border hover:border-primary/40 text-foreground hover:bg-secondary/50"
    81|        }`}
    82|      >
    83|        Order Now
    84|        <ArrowRight className="w-4 h-4" />
    85|      </Link>
    86|    </div>
    87|  );
    88|}
     1|"use client";
     2|
     3|import React from "react";
     4|import Navbar from "@/components/layout/Navbar";
     5|import Footer from "@/components/layout/Footer";
     6|import NodeNetwork from "@/components/shared/NodeNetwork";
     7|
     8|export default function Layout({ children }) {
     9|  return (
    10|    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
    11|      {/* Global background system only */}
    12|      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    13|        <NodeNetwork />
    14|      </div>
    15|
    16|      {/* App content */}
    17|      <div className="relative z-10 flex min-h-screen flex-col">
    18|        <Navbar />
    19|        <main className="flex-1">{children}</main>
    20|        <Footer />
    21|      </div>
    22|    </div>
    23|  );
    24|}
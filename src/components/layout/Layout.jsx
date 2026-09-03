"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NodeNetwork from "@/components/shared/NodeNetwork";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return <div className="min-h-screen bg-[#050914] text-white">{children}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      {/* Global background system only */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <NodeNetwork />
      </div>

      {/* App content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

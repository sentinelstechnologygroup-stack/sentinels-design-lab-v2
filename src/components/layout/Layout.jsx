// src/components/layout/Layout.jsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className={isHome ? "" : "pt-24"}>{children}</main>
      <Footer />
    </div>
  );
}
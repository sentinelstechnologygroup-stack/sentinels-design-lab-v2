"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageNotFound() {
  const location = usePathname();
  const pageName = location.pathname;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-light text-muted-foreground/30 font-heading">404</h1>
        <div className="h-0.5 w-16 bg-border mx-auto" />
        <h2 className="text-2xl font-medium text-foreground font-heading">Page Not Found</h2>
        <p className="text-muted-foreground leading-relaxed">
          The page <span className="font-medium text-foreground">"{pageName}"</span> could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
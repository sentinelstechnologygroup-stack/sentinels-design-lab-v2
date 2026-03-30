// src/components/ui/GlobalBackground.jsx
"use client";

import React from "react";

export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base site background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#040b16_0%,#06101d_42%,#071427_100%)]" />

      {/* Ambient color bloom */}
      <div className="absolute -top-24 left-[6%] h-[420px] w-[420px] rounded-full bg-primary/[0.10] blur-[140px]" />
      <div className="absolute top-[12%] right-[8%] h-[360px] w-[360px] rounded-full bg-blue-500/[0.10] blur-[140px]" />
      <div className="absolute bottom-[12%] left-[28%] h-[340px] w-[340px] rounded-full bg-cyan-300/[0.06] blur-[140px]" />

      {/* Node / network layer */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 8% 14%, rgba(125,211,252,0.95) 0 2px, transparent 4px),
            radial-gradient(circle at 18% 24%, rgba(56,189,248,0.95) 0 2px, transparent 4px),
            radial-gradient(circle at 28% 18%, rgba(96,165,250,0.90) 0 2px, transparent 4px),
            radial-gradient(circle at 40% 26%, rgba(125,211,252,0.88) 0 2px, transparent 4px),
            radial-gradient(circle at 56% 16%, rgba(56,189,248,0.88) 0 2px, transparent 4px),
            radial-gradient(circle at 70% 24%, rgba(96,165,250,0.86) 0 2px, transparent 4px),
            radial-gradient(circle at 84% 18%, rgba(125,211,252,0.90) 0 2px, transparent 4px),

            radial-gradient(circle at 12% 44%, rgba(125,211,252,0.88) 0 2px, transparent 4px),
            radial-gradient(circle at 24% 54%, rgba(56,189,248,0.90) 0 2px, transparent 4px),
            radial-gradient(circle at 38% 46%, rgba(96,165,250,0.88) 0 2px, transparent 4px),
            radial-gradient(circle at 50% 56%, rgba(125,211,252,0.85) 0 2px, transparent 4px),
            radial-gradient(circle at 66% 48%, rgba(56,189,248,0.88) 0 2px, transparent 4px),
            radial-gradient(circle at 78% 58%, rgba(96,165,250,0.84) 0 2px, transparent 4px),
            radial-gradient(circle at 90% 46%, rgba(125,211,252,0.88) 0 2px, transparent 4px),

            radial-gradient(circle at 10% 76%, rgba(125,211,252,0.82) 0 2px, transparent 4px),
            radial-gradient(circle at 22% 86%, rgba(56,189,248,0.84) 0 2px, transparent 4px),
            radial-gradient(circle at 36% 78%, rgba(96,165,250,0.84) 0 2px, transparent 4px),
            radial-gradient(circle at 48% 88%, rgba(125,211,252,0.80) 0 2px, transparent 4px),
            radial-gradient(circle at 62% 80%, rgba(56,189,248,0.82) 0 2px, transparent 4px),
            radial-gradient(circle at 76% 90%, rgba(96,165,250,0.80) 0 2px, transparent 4px),
            radial-gradient(circle at 90% 82%, rgba(125,211,252,0.82) 0 2px, transparent 4px),

            linear-gradient(28deg, transparent 0%, transparent 48.7%, rgba(96,165,250,0.20) 49.4%, rgba(96,165,250,0.20) 50.6%, transparent 51.3%, transparent 100%),
            linear-gradient(62deg, transparent 0%, transparent 48.7%, rgba(56,189,248,0.16) 49.4%, rgba(56,189,248,0.16) 50.6%, transparent 51.3%, transparent 100%),
            linear-gradient(118deg, transparent 0%, transparent 48.8%, rgba(125,211,252,0.18) 49.5%, rgba(125,211,252,0.18) 50.5%, transparent 51.2%, transparent 100%),
            linear-gradient(152deg, transparent 0%, transparent 48.9%, rgba(59,130,246,0.16) 49.6%, rgba(59,130,246,0.16) 50.4%, transparent 51.1%, transparent 100%)
          `,
          backgroundSize:
            "auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, 220px 220px, 260px 260px, 320px 320px, 380px 380px",
          backgroundPosition:
            "0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, center, center, center, center",
        }}
      />

      {/* Soft glow over node intersections */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 24%, rgba(56,189,248,0.55) 0, transparent 18px),
            radial-gradient(circle at 40% 26%, rgba(125,211,252,0.48) 0, transparent 16px),
            radial-gradient(circle at 70% 24%, rgba(96,165,250,0.46) 0, transparent 16px),
            radial-gradient(circle at 24% 54%, rgba(56,189,248,0.50) 0, transparent 18px),
            radial-gradient(circle at 50% 56%, rgba(125,211,252,0.44) 0, transparent 18px),
            radial-gradient(circle at 78% 58%, rgba(96,165,250,0.42) 0, transparent 18px),
            radial-gradient(circle at 22% 86%, rgba(56,189,248,0.42) 0, transparent 18px),
            radial-gradient(circle at 48% 88%, rgba(125,211,252,0.40) 0, transparent 18px),
            radial-gradient(circle at 76% 90%, rgba(96,165,250,0.38) 0, transparent 18px)
          `,
        }}
      />

      {/* Final vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(2,6,15,0.34)_100%)]" />
    </div>
  );
}
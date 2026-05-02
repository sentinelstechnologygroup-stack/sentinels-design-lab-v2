"use client";

export default function SystemDiagram({
  nodes = [
    { label: "Website" },
    { label: "Lead Path" },
    { label: "CRM / Form" },
    { label: "Dashboard" },
    { label: "Automation" },
    { label: "Support" },
  ],
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-8">
      <div className="hidden md:block">
        <div className="relative grid grid-cols-6 gap-4">
          <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/10 via-primary/35 to-white/10" />
          {nodes.map((node) => (
            <div key={node.label} className="relative z-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-[#09111f] shadow-[0_0_24px_rgba(59,130,246,0.18)]">
                <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgba(59,130,246,0.65)]" />
              </div>
              <div className="mt-4 text-sm font-medium text-white">{node.label}</div>
              {node.description ? <div className="mt-2 text-xs leading-6 text-white/55">{node.description}</div> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="relative space-y-5 md:hidden">
        <div className="absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-white/10 via-primary/35 to-white/10" />
        {nodes.map((node) => (
          <div key={node.label} className="relative pl-14">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-[#09111f] shadow-[0_0_24px_rgba(59,130,246,0.18)]">
              <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgba(59,130,246,0.65)]" />
            </div>
            <div className="text-sm font-medium text-white">{node.label}</div>
            {node.description ? <div className="mt-2 text-xs leading-6 text-white/55">{node.description}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

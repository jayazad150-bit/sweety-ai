"use client";

import { ReactNode } from "react";

type DesktopProps = {
  children: ReactNode;
};

export default function Desktop({
  children,
}: DesktopProps) {
  return (
    <div
      className="
        relative
        h-screen
        w-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-cyan-950
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_45%)]
          pointer-events-none
        "
      />

      {/* Desktop Content */}
      <div className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
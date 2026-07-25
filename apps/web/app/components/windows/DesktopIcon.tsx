"use client";

import { ReactNode } from "react";

type DesktopIconProps = {
  title: string;
  icon: ReactNode;
  onOpen?: () => void;
};

export default function DesktopIcon({
  title,
  icon,
  onOpen,
}: DesktopIconProps) {
  return (
    <button
      onClick={onOpen}
      className="
        flex
        w-24
        flex-col
        items-center
        gap-2
        rounded-xl
        p-3
        text-white
        transition-all
        duration-200
        hover:bg-white/10
        active:scale-95
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-slate-800
          text-cyan-400
          shadow-lg
        "
      >
        {icon}
      </div>

      <span className="text-center text-sm font-medium">
        {title}
      </span>
    </button>
  );
}
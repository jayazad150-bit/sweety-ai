"use client";

import { ReactNode } from "react";

type DockItem = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

type DockProps = {
  items: DockItem[];
};

export default function Dock({
  items,
}: DockProps) {
  return (
    <div
      className="
        absolute
        bottom-16
        left-1/2
        z-50
        -translate-x-1/2
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/80
        px-4
        py-3
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            title={item.label}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              bg-slate-800
              text-white
              transition-all
              duration-200
              hover:-translate-y-2
              hover:scale-110
              hover:bg-cyan-500
              hover:text-black
              active:scale-95
            "
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
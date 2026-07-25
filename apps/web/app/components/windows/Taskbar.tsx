"use client";

import { Clock } from "lucide-react";

type TaskbarProps = {
  title?: string;
};

export default function Taskbar({
  title = "Sweety AI OS",
}: TaskbarProps) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer
      className="
        absolute
        bottom-0
        left-0
        right-0
        z-50
        flex
        h-14
        items-center
        justify-between
        border-t
        border-slate-700
        bg-slate-900/90
        px-5
        backdrop-blur-md
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-cyan-500
            font-bold
            text-black
          "
        >
          S
        </div>

        <span className="font-medium text-white">
          {title}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 text-slate-300">
        <Clock size={18} />

        <span>{time}</span>
      </div>
    </footer>
  );
}
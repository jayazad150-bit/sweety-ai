"use client";

import { ReactNode } from "react";
import WindowHeader from "./WindowHeader";
import WindowBody from "./WindowBody";
import type { WindowState } from "./types";

type Props = {
  window: WindowState;
  children: ReactNode;

  onClose?: () => void;

  onMinimize?: () => void;

  onMaximize?: () => void;
};

export default function Window({
  window,
  children,
  onClose,
  onMinimize,
  onMaximize,
}: Props) {
  if (window.minimized) return null;

  return (
    <div
      className={`
      absolute
      overflow-hidden
      rounded-2xl
      border
      border-slate-700
      bg-slate-900
      shadow-2xl
      transition-all
      duration-300
      ${
        window.focused
          ? "ring-2 ring-cyan-500"
          : ""
      }
      `}
      style={{
        left: window.position.x,
        top: window.position.y,

        width: window.maximized
          ? "100%"
          : window.size.width,

        height: window.maximized
          ? "100%"
          : window.size.height,

        zIndex: window.focused ? 100 : 1,
      }}
    >
      <WindowHeader
        title={window.title}
        closable={window.closable}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />

      <WindowBody>

        {children}

      </WindowBody>
    </div>
  );
}
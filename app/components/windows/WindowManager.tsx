"use client";

import { ReactNode, useState } from "react";
import Window from "./Window";
import type { WindowState } from "./types";

type WindowManagerProps = {
  windows: WindowState[];
  children: Record<string, ReactNode>;
};

export default function WindowManager({
  windows,
  children,
}: WindowManagerProps) {
  const [windowStates, setWindowStates] =
    useState(windows);

  function closeWindow(id: string) {
    setWindowStates((prev) =>
      prev.filter((w) => w.id !== id)
    );
  }

  function minimizeWindow(id: string) {
    setWindowStates((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              minimized: true,
            }
          : w
      )
    );
  }

  function maximizeWindow(id: string) {
    setWindowStates((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              maximized: !w.maximized,
            }
          : w
      )
    );
  }

  function focusWindow(id: string) {
    setWindowStates((prev) =>
      prev.map((w) => ({
        ...w,
        focused: w.id === id,
      }))
    );
  }

  return (
    <>
      {windowStates.map((window) => (
        <div
          key={window.id}
          onMouseDown={() =>
            focusWindow(window.id)
          }
        >
          <Window
            window={window}
            onClose={() =>
              closeWindow(window.id)
            }
            onMinimize={() =>
              minimizeWindow(window.id)
            }
            onMaximize={() =>
              maximizeWindow(window.id)
            }
          >
            {children[window.id]}
          </Window>
        </div>
      ))}
    </>
  );
}
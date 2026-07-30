"use client";

import { ReactNode } from "react";

type WindowBodyProps = {
  children: ReactNode;
};

export default function WindowBody({
  children,
}: WindowBodyProps) {
  return (
    <main
      className="
      h-[calc(100%-48px)]
      overflow-auto
      bg-slate-900
      p-5
      text-white
      "
    >
      {children}
    </main>
  );
}
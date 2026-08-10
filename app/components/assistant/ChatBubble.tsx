"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import type { Message } from "@/types/chat";

type Props = {
  message: Message;
};

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  return (
    <div
      className={`mb-6 flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-lg shadow-lg">
          🤖
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-xl ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        <MarkdownRenderer content={message.text} />

        {!isUser && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-3">
            <button
              type="button"
              onClick={copyMessage}
              className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-600"
            >
              {copied ? "Copied" : "Copy"}
            </button>

            <div className="text-[10px] text-slate-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        )}

        {isUser && (
          <div className="mt-3 text-right text-[10px] text-slate-300">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg shadow-lg">
          😊
        </div>
      )}
    </div>
  );
}

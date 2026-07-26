"use client";

import type { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="border-b border-white/10 p-4">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Conversations
        </div>

        {chats.length === 0 ? (
          <div className="mt-10 px-4 text-center text-sm text-slate-500">
            No conversations yet.
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectChat(chat.id)}
              className={`mb-2 w-full rounded-2xl border px-4 py-3 text-left transition ${
                activeChatId === chat.id
                  ? "border-blue-500/30 bg-blue-500/15 text-white shadow-lg shadow-blue-950/20"
                  : "border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06]"
              }`}
            >
              <div className="truncate font-medium">
                {chat.title}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {chat.messages.length} messages
              </div>
            </button>
          ))
        )}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/[0.03] px-3 py-2 text-center text-xs text-slate-500">
          Sweety Ultimate
          <span className="mx-1">•</span>
          v1.0
        </div>
      </div>
    </aside>
  );
}

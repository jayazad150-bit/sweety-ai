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
    <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white transition-all hover:scale-[1.02]"
        >
          ➕ New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3">
        {chats.length === 0 ? (
          <div className="mt-10 text-center text-sm text-slate-500">
            No conversations yet
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`mb-2 w-full rounded-xl px-4 py-3 text-left transition-all ${
                activeChatId === chat.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <div className="truncate font-medium">
                {chat.title}
              </div>

              <div className="mt-1 text-xs opacity-70">
                {chat.messages.length} messages
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 text-center text-xs text-slate-500">
        Sweety AI Pro v1.0 🚀
      </div>
    </aside>
  );
}
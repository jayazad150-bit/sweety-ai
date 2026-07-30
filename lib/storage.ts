import type { Chat } from "../types/chat";

const STORAGE_KEY = "sweety-ai-chats";

export function loadChats(): Chat[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveChats(chats: Chat[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

export function createChat(): Chat {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function updateChat(chats: Chat[], updatedChat: Chat): Chat[] {
  return chats.map((chat) =>
    chat.id === updatedChat.id
      ? {
          ...updatedChat,
          updatedAt: Date.now(),
        }
      : chat
  );
}

export function deleteChat(chats: Chat[], chatId: string): Chat[] {
  return chats.filter((chat) => chat.id !== chatId);
}

export function renameChat(
  chats: Chat[],
  chatId: string,
  title: string
): Chat[] {
  return chats.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          title,
          updatedAt: Date.now(),
        }
      : chat
  );
}

export function getChat(
  chats: Chat[],
  chatId: string
): Chat | undefined {
  return chats.find((chat) => chat.id === chatId);
}
"use client";

import { useEffect, useRef, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";

import type { Chat, Message } from "@/types/chat";

import {
  loadChats,
  saveChats,
  createChat,
} from "@/lib/storage";

import { exportChat } from "@/lib/exportChat";export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) || null;useEffect(() => {
    const savedChats = loadChats();

    if (savedChats.length > 0) {
      setChats(savedChats);
      setActiveChatId(savedChats[0].id);
    } else {
      const firstChat = createChat();

      setChats([firstChat]);
      setActiveChatId(firstChat.id);

      saveChats([firstChat]);
    }
  }, []);useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats, loading]);function handleNewChat() {
    const newChat = createChat();

    const updated = [newChat, ...chats];

    setChats(updated);
    saveChats(updated);

    setActiveChatId(newChat.id);
  }

function updateCurrentChat(messages: Message[]) {
    if (!activeChat) return;

    const updatedChat: Chat = {
      ...activeChat,
      messages,
      updatedAt: Date.now(),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id ? updatedChat : chat
    );

    setChats(updatedChats);
    saveChats(updatedChats);
  }

async function sendMessage() {
    if (!message.trim() && !imagePreview) return;
    if (!activeChat) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: message,
      timestamp: Date.now(),
    };

    const updatedMessages = [
      ...activeChat.messages,
      userMessage,
    ];

    updateCurrentChat(updatedMessages);

    const currentText = message;

    setMessage("");
    setImagePreview(null);
    setLoading(true);try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  message: currentText,
  history: updatedMessages.map((m) => ({
    role: m.role,
    text: m.text,
  })),
  image: imagePreview,
}),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text: data.reply || "No response from Sweety AI.",
        timestamp: Date.now(),
      };

      updateCurrentChat([
        ...updatedMessages,
        aiMessage,
      ]);} catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text: "⚠️ Sorry, something went wrong. Please try again.",
        timestamp: Date.now(),
      };

      updateCurrentChat([
        ...updatedMessages,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

return (
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />

      <div className="flex flex-1 flex-col"><Header
          onClearChat={() => {
            if (!activeChat) return;

            const cleared = chats.map((chat) =>
              chat.id === activeChat.id
                ? { ...chat, messages: [] }
                : chat
            );

            setChats(cleared);
            saveChats(cleared);
          }}
          onExportChat={() => {
            if (activeChat) {
              exportChat(activeChat.messages);
            }
          }}
        /><main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">

            {activeChat?.messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
              />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />

          </div>
        </main><ChatInput
          message={message}
          setMessage={setMessage}
          loading={loading}
          sendMessage={sendMessage}
          startListening={() => {}}
          imagePreview={imagePreview}
          onImageSelect={(file) => {
            const reader = new FileReader();

            reader.onload = () => {
              setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
          }}
        />
      </div>
    </div>
  );
}
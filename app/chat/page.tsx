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

import { exportChat } from "@/lib/exportChat";

import {
  startListening as startVoiceListening,
  speak,
} from "@/lib/voice";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    const saved = loadChats();

    if (saved.length > 0) {
      setChats(saved);
      setActiveChatId(saved[0].id);
    } else {
      const firstChat = createChat();

      setChats([firstChat]);
      setActiveChatId(firstChat.id);
    }
  }, []);

  useEffect(() => {
    saveChats(chats);
  }, [chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeChat?.messages, loading]);

  function updateCurrentChat(messages: Message[]) {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages,
              updatedAt: Date.now(),
              title:
                messages[0]?.text.slice(0, 30) ||
                "New Chat",
            }
          : chat
      )
    );
  }

  async function sendMessage(
    voiceText?: string
  ) {
    if (!activeChat) return;

    const currentText =
      voiceText ?? message;

    if (
      !currentText.trim() &&
      !imagePreview
    )
      return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: currentText,
      timestamp: Date.now(),
    };

    const updatedMessages = [
      ...activeChat.messages,
      userMessage,
    ];

    updateCurrentChat(updatedMessages);

    setMessage("");
    setImagePreview(null);
    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: currentText,
            history: updatedMessages.map(
              (m) => ({
                role: m.role,
                text: m.text,
              })
            ),
            image: imagePreview,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.reply ||
            "Failed to get AI response"
        );
      }

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text:
          data.reply ||
          "No response from Sweety AI.",
        timestamp: Date.now(),
      };

      updateCurrentChat([
        ...updatedMessages,
        aiMessage,
      ]);

      speak(aiMessage.text);
    } catch (error) {
      console.error(error);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text:
          "⚠️ Sorry, something went wrong. Please try again.",
        timestamp: Date.now(),
      };

      updateCurrentChat([
        ...updatedMessages,
        aiMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleVoiceInput() {
    startVoiceListening(
      (text) => {
        setMessage(text);

        setTimeout(() => {
          sendMessage(text);
        }, 100);
      },
      setListening
    );
  }
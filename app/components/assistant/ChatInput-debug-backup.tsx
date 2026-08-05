"use client";

import { useRef, useState } from "react";

type ChatInputProps = {
  message: string;
  setMessage: (value: string) => void;
  loading: boolean;
  sendMessage: () => Promise<void>;
  startListening: () => void;
  startVoiceMode: () => void;
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
};

export default function ChatInput({
  message,
  setMessage,
  loading,
  sendMessage,
  startListening,
  startVoiceMode,
  imagePreview,
  onImageSelect,
}: ChatInputProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFileName, setSelectedFileName] =
    useState<string | null>(null);

  async function handleSend() {
    if (loading) {
      return;
    }

    if (!message.trim()) {
      return;
    }

    await sendMessage();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key !== "Enter") {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    event.preventDefault();

    void handleSend();
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      onImageSelect(file);
    }

    event.target.value = "";
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
    }

    event.target.value = "";
  }

  function handleImageUpload() {
    if (loading) {
      return;
    }

    imageInputRef.current?.click();
  }

  function handleFileUpload() {
    if (loading) {
      return;
    }

    fileInputRef.current?.click();
  }

  function handleVoice() {
    if (loading) {
      return;
    }

    startVoiceMode();
  }

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">

      {imagePreview && (
        <div className="mb-4 flex items-start gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Selected image preview"
              className="max-h-40 max-w-xs rounded-xl border border-slate-700 object-contain"
            />

            <div
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow-lg"
              title="Image selected"
              aria-label="Image selected"
            >
              ✓
            </div>
          </div>
        </div>
      )}

      {selectedFileName && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200">
          <span className="truncate">
            📄 {selectedFileName}
          </span>

          <button
            type="button"
            onClick={() => setSelectedFileName(null)}
            className="ml-3 rounded px-2 py-1 text-slate-400 hover:bg-slate-700 hover:text-white"
            title="Remove file"
            aria-label="Remove file"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-3">

        <button
          type="button"
          onClick={handleImageUpload}
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          title="Upload Image"
          aria-label="Upload Image"
        >
          📷
        </button>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          hidden
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={handleFileUpload}
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          title="Upload File"
          aria-label="Upload File"
        >
          📎
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.doc,.docx,.csv,.json,.md"
          hidden
          onChange={handleFileChange}
        />

        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message Sweety AI..."
          rows={1}
          disabled={loading}
          className="max-h-40 min-h-[40px] flex-1 resize-none bg-transparent px-1 py-2 text-white outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleVoice}
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          title="Voice Input"
          aria-label="Voice Input"
        >
          🎤
        </button>

        <button
          type="button"
          onClick={() => {
            void handleSend();
          }}
          disabled={loading || !message.trim()}
          className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          title="Send Message"
          aria-label="Send Message"
        >
          {loading ? "..." : "➤"}
        </button>

      </div>
    </div>
  );
}

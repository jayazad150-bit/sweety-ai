"use client";

import { useRef, useState } from "react";

type ChatInputProps = {
  message: string;
  setMessage: (value: string) => void;
  loading: boolean;
  sendMessage: () => Promise<void>;
  startListening: () => void;
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
};

export default function ChatInput({
  message,
  setMessage,
  loading,
  sendMessage,
  startListening,
  imagePreview,
  onImageSelect,
}: ChatInputProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFileName, setSelectedFileName] =
    useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      onImageSelect(file);
    }

    e.target.value = "";
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
    }

    e.target.value = "";
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4 flex items-start gap-3">
          <div className="relative">

            <img
              src={imagePreview}
              alt="Selected image preview"
              className="max-h-40 max-w-xs rounded-xl border border-slate-700 object-contain"
            />

            <button
              type="button"
              onClick={() => {
                // Image removal will be connected to parent state next.
              }}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 font-bold text-white shadow-lg transition hover:bg-red-500"
              title="Remove image"
              aria-label="Remove image"
            >
              ×
            </button>

          </div>
        </div>
      )}

      {/* Selected File */}
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
          >
            ×
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-3">

        {/* Image Upload */}
        <button
          type="button"
          onClick={() =>
            imageInputRef.current?.click()
          }
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:opacity-50"
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

        {/* File Upload */}
        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:opacity-50"
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

        {/* Text Input */}
        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Message Sweety AI..."
          rows={1}
          disabled={loading}
          className="max-h-40 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-slate-400 disabled:opacity-50"
          onKeyDown={async (e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              await sendMessage();
            }
          }}
        />

        {/* Voice */}
        <button
          type="button"
          onClick={startListening}
          disabled={loading}
          className="rounded-lg p-2 text-xl transition hover:bg-slate-700 disabled:opacity-50"
          title="Voice Input"
          aria-label="Voice Input"
        >
          🎤
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={async () => {
            await sendMessage();
          }}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          title="Send Message"
          aria-label="Send Message"
        >
          {loading ? "..." : "➤"}
        </button>

      </div>
    </div>
  );
}

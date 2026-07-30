"use client";

import { useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">
      {imagePreview && (
        <div className="mb-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-40 rounded-xl border border-slate-700"
          />
        </div>
      )}

      <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg p-2 transition hover:bg-slate-700"
          title="Upload Image"
        >
          🖼️
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onImageSelect(file);
            }
          }}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message Sweety AI..."
          rows={1}
          className="max-h-40 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-slate-400"
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              await sendMessage();
            }
          }}
        />

        <button
          type="button"
          onClick={startListening}
          className="rounded-lg p-2 transition hover:bg-slate-700"
          title="Voice Input"
        >
          🎤
        </button>

        <button
          type="button"
          onClick={async () => {
            await sendMessage();
          }}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}
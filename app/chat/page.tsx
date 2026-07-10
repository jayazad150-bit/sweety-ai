"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Source = {
  title: string;
  uri: string;
};

type Message = {
  role: "user" | "ai";
  text: string;
  sources?: Source[];
};

type SelectedImage = {
  name: string;
  dataUrl: string;
};

type SpeechRecognitionEvent = {
  results: { [index: number]: { [index: number]: { transcript: string } } };
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

const STORAGE_KEY = "sweety-ai-messages";
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, loaded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  }

  function removeImage() {
    setSelectedImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Please choose an image smaller than 4 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage({ name: file.name, dataUrl: reader.result });
      }
    };

    reader.readAsDataURL(file);
  }

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input works best in Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onerror = () => {
      setListening(false);
      alert("Please allow microphone permission.");
    };

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.start();
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userText = input.trim();

    if ((!userText && !selectedImage) || loading) return;

    const messageText = selectedImage
      ? `Image attached. ${userText || "Please describe this image."}`
      : userText;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: messageText },
    ];

    const imageForRequest = selectedImage?.dataUrl || null;

    setMessages(updatedMessages);
    setInput("");
    removeImage();
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: updatedMessages.slice(-10),
          image: imageForRequest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.reply || "Sweety AI could not reply.");
      }

      const sources: Source[] = Array.isArray(data.sources)
        ? data.sources.filter(
            (source: unknown): source is Source =>
              typeof source === "object" &&
              source !== null &&
              typeof (source as Source).title === "string" &&
              typeof (source as Source).uri === "string"
          )
        : [];

      const reply = data.reply || "Sorry, I could not reply.";

      setMessages((current) => [
        ...current,
        { role: "ai", text: reply, sources },
      ]);

      speak(reply);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Something went wrong.";

      setMessages((current) => [
        ...current,
        { role: "ai", text: errorText },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    window.speechSynthesis.cancel();
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setInput("");
    removeImage();
  }

  function exportChat() {
    if (messages.length === 0) {
      alert("There are no messages to export.");
      return;
    }

    const text = messages
      .map((message) => {
        const sender = message.role === "user" ? "You" : "Sweety AI";
        return `${sender}: ${message.text}`;
      })
      .join("\n\n");

    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");

    link.href = url;
    link.download = "sweety-ai-chat.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">
        <h1 className="text-2xl font-bold">🤖 Sweety AI</h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportChat}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
          >
            Export chat
          </button>

          <button
            type="button"
            onClick={clearChat}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
          >
            Clear chat
          </button>
        </div>
      </header>

      <section className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="pt-16 text-center text-slate-400">
            <p className="text-2xl font-semibold text-white">
              Hello, I am Sweety AI!
            </p>
            <p className="mt-2">
              Ask me anything, upload an image, or use the microphone.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              <p>{message.text}</p>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 border-t border-slate-600 pt-2">
                  <p className="mb-1 text-xs font-semibold text-slate-300">
                    Sources
                  </p>

                  {message.sources.map((source) => (
                    <a
                      key={source.uri}
                      href={source.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-xs text-blue-300 hover:underline"
                    >
                      ↗ {source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <p className="rounded-2xl bg-slate-800 px-4 py-3 text-slate-300">
              Sweety AI is searching...
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      <div className="border-t border-slate-800 bg-slate-900 p-4">
        {selectedImage && (
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-800 p-3">
            <img
              src={selectedImage.dataUrl}
              alt="Selected upload"
              className="h-16 w-16 rounded-lg object-cover"
            />

            <p className="flex-1 truncate text-sm text-slate-300">
              {selectedImage.name}
            </p>

            <button
              type="button"
              onClick={removeImage}
              className="rounded-lg bg-slate-700 px-3 py-2 text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )}

        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything, including live information..."
            className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-slate-900 outline-none ring-blue-500 focus:ring-2"
          />

          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="rounded-xl bg-slate-700 px-4 py-3 text-xl hover:bg-slate-600"
          >
            📎
          </button>

          <button
            type="button"
            onClick={startListening}
            disabled={listening}
            className={`rounded-xl px-4 py-3 text-xl ${
              listening
                ? "animate-pulse bg-red-600"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {listening ? "🎙️" : "🎤"}
          </button>

          <button
            type="submit"
            disabled={loading || (!input.trim() && !selectedImage)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
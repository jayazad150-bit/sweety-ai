"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ChatInput from "../components/assistant/ChatInput";

type RecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
};

type RecognitionConstructor = new () => RecognitionInstance;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: RecognitionConstructor;
  webkitSpeechRecognition?: RecognitionConstructor;
};

type VoiceCommand =
  | { type: "stop-speaking" }
  | { type: "repeat" }
  | { type: "clear" }
  | { type: "stop-voice-mode" }
  | { type: "unknown"; text: string };

function detectVoiceCommand(text: string): VoiceCommand {
  const command = text.trim().toLowerCase();

  if (
    command === "stop speaking" ||
    command === "stop talking" ||
    command === "be quiet"
  ) {
    return { type: "stop-speaking" };
  }

  if (
    command === "repeat" ||
    command === "repeat that" ||
    command === "say that again"
  ) {
    return { type: "repeat" };
  }

  if (
    command === "clear conversation" ||
    command === "clear chat" ||
    command === "clear everything"
  ) {
    return { type: "clear" };
  }

  if (
    command === "stop voice mode" ||
    command === "stop listening" ||
    command === "exit voice mode"
  ) {
    return { type: "stop-voice-mode" };
  }

  return {
    type: "unknown",
    text,
  };
}

export default function AssistantPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const voiceModeRef = useRef(false);
  const listeningRef = useRef(false);
  const loadingRef = useRef(false);
  const restartTimerRef = useRef<number | null>(null);

  function handleVideoSelect(file: File) {
    if (!file.type.startsWith("video/")) {
      setStatus("Please select a valid video file.");
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setStatus("Video selected.");
  }

  function handleImageSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setStatus("Please select a valid image file.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setStatus("Image selected.");
  }

  useEffect(() => {
    return () => {
      voiceModeRef.current = false;

      
      if (restartTimerRef.current !== null) {
        window.clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
      recognitionRef.current?.stop();
      recognitionRef.current = null;

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
    setStatus("Ready");
  }

  function scheduleListeningRestart(delay = 500) {
    if (restartTimerRef.current !== null) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (!voiceModeRef.current) {
      return;
    }

    restartTimerRef.current = window.setTimeout(() => {
      restartTimerRef.current = null;

      if (
        voiceModeRef.current &&
        !listeningRef.current &&
        !loadingRef.current &&
        !recognitionRef.current
      ) {
        startListening();
      }
    }, delay);
  }

  function cancelListeningRestart() {
    if (restartTimerRef.current !== null) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }

  function speak(text: string) {
    if (!text.trim()) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      setStatus("Text-to-Speech is not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
      setStatus("Sweety is speaking...");
    };

    utterance.onend = () => {
      setSpeaking(false);

      if (voiceModeRef.current) {
        setStatus("Listening...");

        scheduleListeningRestart(500);
      } else {
        setStatus("Ready");
      }
    };

    utterance.onerror = () => {
      setSpeaking(false);

      if (voiceModeRef.current) {
        scheduleListeningRestart(500);
      } else {
        setStatus("Voice output failed.");
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function repeatReply() {
    if (!reply.trim()) {
      setStatus("There is no previous reply to repeat.");
      return;
    }

    speak(reply);
  }

  function clearConversation() {
    stopSpeaking();

    setMessage("");
    setReply("");
    setStatus("Conversation cleared.");
  }

  function stopVoiceMode() {
    voiceModeRef.current = false;

    cancelListeningRestart();

    setVoiceMode(false);

    recognitionRef.current?.stop();
    recognitionRef.current = null;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    listeningRef.current = false;

    setListening(false);
    setSpeaking(false);
    setStatus("Voice mode stopped.");
  }

  function handleVoiceCommand(text: string): boolean {
    const command = detectVoiceCommand(text);

    switch (command.type) {
      case "stop-speaking":
        stopSpeaking();
        return true;

      case "repeat":
        repeatReply();
        return true;

      case "clear":
        clearConversation();
        return true;

      case "stop-voice-mode":
        stopVoiceMode();
        return true;

      case "unknown":
        return false;
    }
  }

  function startVoiceMode() {
    voiceModeRef.current = true;

    setVoiceMode(true);
    setStatus("Starting voice mode...");

    startListening();
  }

  function startListening() {
    const speechWindow = window as SpeechRecognitionWindow;

    const Recognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setStatus(
        "Speech recognition is not supported by this browser."
      );
      return;
    }

    if (listeningRef.current) {
      return;
    }

    try {
      const recognition = new Recognition();

      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        listeningRef.current = true;
        setListening(true);
        setStatus("Listening...");
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[0]?.[0]?.transcript?.trim() || "";

        listeningRef.current = false;
        setListening(false);

        if (!transcript) {
          return;
        }

        setMessage(transcript);

        const commandHandled =
          handleVoiceCommand(transcript);

        if (commandHandled) {
          if (voiceModeRef.current) {
            scheduleListeningRestart(800);
          }

          return;
        }

        askSweety(transcript);
      };

      recognition.onerror = (event) => {
        const voiceError = event as Event & {
          error?: string;
          message?: string;
        };

        const errorCode = voiceError.error || "unknown";

        console.error("VOICE INPUT ERROR CODE:", errorCode);

        listeningRef.current = false;
        setListening(false);

        if (errorCode === "not-allowed") {
          setStatus(
            "Microphone permission denied. Please allow microphone access."
          );
          voiceModeRef.current = false;
          setVoiceMode(false);
          return;
        }

        if (errorCode === "audio-capture") {
          setStatus(
            "No microphone detected. Please check your microphone."
          );
          voiceModeRef.current = false;
          setVoiceMode(false);
          return;
        }

        if (errorCode === "network") {
          setStatus(
            "Voice recognition network error. Please check your connection."
          );
          return;
        }

        if (errorCode === "no-speech") {
          setStatus(
            "I didn't hear anything. Tap the microphone and try again."
          );
          return;
        }

        setStatus(`Voice input error: ${errorCode}`);
      };

      recognition.onend = () => {
        listeningRef.current = false;
        setListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error("VOICE START ERROR:", error);

      listeningRef.current = false;
      setListening(false);
      setStatus("Unable to start microphone.");
    }
  }

  async function askSweety(voiceMessage?: string) {
    const userMessage = (
      voiceMessage ?? message
    ).trim();

    if (!userMessage) {
      setStatus("Please enter a message.");
      return;
    }

    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;

    setLoading(true);
    setStatus("Sweety is thinking...");
    setMessage("");

    try {
      let image: {
        mimeType: string;
        data: string;
      } | null = null;

      if (imageFile) {
        const imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const result = reader.result;

            if (typeof result !== "string") {
              reject(new Error("Failed to read image."));
              return;
            }

            const base64Data = result.split(",")[1];

            if (!base64Data) {
              reject(new Error("Invalid image data."));
              return;
            }

            resolve(base64Data);
          };

          reader.onerror = () => {
            reject(new Error("Failed to read image file."));
          };

          reader.readAsDataURL(imageFile);
        });

        image = {
          mimeType: imageFile.type,
          data: imageData,
        };
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: [],
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.reply ||
            data?.error ||
            `AI request failed with status ${response.status}`
        );
      }

      const aiReply =
        data?.reply ||
        "I could not generate a response.";

      setReply(aiReply);
      setStatus("Ready");

      speak(aiReply);
    } catch (error) {
      console.error("AI ERROR:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setReply(errorMessage);
      setStatus("AI request failed.");

      if (voiceModeRef.current) {
        speak("Sorry, I encountered an error.");
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function clearAll() {
    stopVoiceMode();

    setMessage("");
    setReply("");
    setStatus("Ready");
  }

  const statusLabel = listening
    ? "Listening"
    : speaking
      ? "Speaking"
      : loading
        ? "Thinking"
        : "Online";

  const statusDot = listening
    ? "bg-cyan-400 animate-pulse"
    : speaking
      ? "bg-violet-400 animate-pulse"
      : loading
        ? "bg-amber-400 animate-pulse"
        : "bg-emerald-400";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="flex min-h-screen flex-col">

        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#050816]/85 px-4 backdrop-blur-2xl sm:px-6">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-lg font-bold shadow-lg shadow-blue-500/20">
              S
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-wide sm:text-lg">
                Sweety Ultimate
              </h1>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span
                  className={`h-2 w-2 rounded-full ${statusDot}`}
                />
                <span>{statusLabel}</span>
              </div>
            </div>

          </div>

          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Clear
          </button>

        </header>

        <section className="flex flex-1 flex-col">

          <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">

            {!reply && !loading ? (

              <div className="w-full max-w-4xl text-center">

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-indigo-600/15 text-4xl font-bold ring-1 ring-white/10">
                  S
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Hello, I&apos;m Sweety.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Your intelligent AI assistant for conversation,
                  voice interaction, problem solving and more.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <button
                    type="button"
                    onClick={() =>
                      setMessage("Help me plan my day.")
                    }
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                  >
                    <div className="text-2xl">P</div>
                    <div className="mt-3 font-semibold">
                      Plan my day
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Organise tasks and priorities
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMessage(
                        "Help me with a programming problem."
                      )
                    }
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06]"
                  >
                    <div className="text-2xl">C</div>
                    <div className="mt-3 font-semibold">
                      Write code
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Build, debug or explain code
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMessage(
                        "Tell me something interesting."
                      )
                    }
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]"
                  >
                    <div className="text-2xl">?</div>
                    <div className="mt-3 font-semibold">
                      Explore an idea
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Learn something new
                    </div>
                  </button>

                </div>

              </div>

            ) : (

              <div className="w-full max-w-4xl">

                {loading && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:100ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:200ms]" />
                    </div>

                    <span className="text-sm text-slate-400">
                      Sweety is thinking...
                    </span>
                  </div>
                )}

                {reply && (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 sm:p-7">

                    <div className="mb-6 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 font-bold">
                        S
                      </div>

                      <div>
                        <div className="font-semibold">
                          Sweety
                        </div>

                        <div className="text-xs text-slate-500">
                          AI Assistant
                        </div>
                      </div>

                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-7 text-slate-200 sm:text-base">
                      {reply}
                    </div>

                  </div>
                )}

              </div>

            )}

          </div>

          <div className="border-t border-white/10 bg-[#050816]/85 p-4 backdrop-blur-2xl sm:p-6">

            <div className="mx-auto max-w-4xl">

              <ChatInput
                message={message}
                setMessage={setMessage}
                loading={loading}
                sendMessage={async () => {
                  await askSweety();
                }}
                startListening={startListening}
                startVoiceMode={startVoiceMode}
                imagePreview={imagePreview}
                onImageSelect={handleImageSelect}
                onVideoSelect={handleVideoSelect}
              />

              <div className="mt-3 text-center text-xs text-slate-600">
                Enter to send
                <span className="mx-2">â€¢</span>
                Shift + Enter for a new line
                <span className="mx-2">â€¢</span>
                Voice commands supported
              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}























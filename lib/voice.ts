import type {
  SpeechRecognitionEvent,
  SpeechRecognitionInstance,
} from "@/types/voice";

let recognition: SpeechRecognitionInstance | null = null;
let isListening = false;

function getRecognition(): SpeechRecognitionInstance | null {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return null;

  if (!recognition) {
    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  return recognition;
}

export function startListening(
  onResult: (text: string) => void,
  onListeningChange?: (listening: boolean) => void
) {
  const speech = getRecognition();

  if (!speech) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  if (isListening) return;

  speech.onstart = () => {
    isListening = true;
    onListeningChange?.(true);
  };

  speech.onend = () => {
    isListening = false;
    onListeningChange?.(false);
  };

  speech.onerror = () => {
    isListening = false;
    onListeningChange?.(false);
  };

  speech.onresult = (event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript.trim();

    if (text) {
      onResult(text);
    }
  };

  speech.start();
}

export function stopListening() {
  recognition?.stop();
}

export function speak(text: string) {
  if (typeof window === "undefined") return;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined") return;

  window.speechSynthesis.cancel();
}

export function isSpeechSupported() {
  if (typeof window === "undefined") return false;

  return !!(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
  );
}
export type SpeechCallbacks = {
  onResult: (text: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
};

export function startSpeechRecognition({
  onResult,
  onStart,
  onEnd,
  onError,
}: SpeechCallbacks) {
  if (typeof window === "undefined") {
    onError?.("Speech recognition is not available.");
    return null;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError?.("Your browser doesn't support Speech Recognition.");
    return null;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    onStart?.();
  };

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  recognition.onerror = () => {
    onError?.("Speech recognition failed.");
  };

  recognition.onend = () => {
    onEnd?.();
  };

  recognition.start();

  return recognition;
}
export class SpeechRecognitionEngine {
  private recognition: SpeechRecognition | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const API =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (API) {
        this.recognition = new API();

        this.recognition.lang = "en-IN";
        this.recognition.interimResults = false;
        this.recognition.continuous = false;
      }
    }
  }

  listen(callback: (text: string) => void) {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      callback(event.results[0][0].transcript);
    };

    this.recognition.start();
  }

  stop() {
    this.recognition?.stop();
  }
}
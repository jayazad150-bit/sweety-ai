export class TTS {

  speak(text: string) {

    if (typeof window === "undefined") return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);

  }

  stop() {
    speechSynthesis.cancel();
  }

}
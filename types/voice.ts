export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence?: number;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionInstance extends EventTarget {

  lang: string;

  continuous: boolean;

  interimResults: boolean;

  maxAlternatives: number;


  start(): void;

  stop(): void;

  abort(): void;


  onstart: (() => void) | null;

  onend: (() => void) | null;

  onerror: ((event: Event) => void) | null;

  onresult:
    ((event: SpeechRecognitionEvent) => void) | null;

}


export interface SpeechRecognitionConstructor {

  new (): SpeechRecognitionInstance;

}


declare global {

  interface Window {

    SpeechRecognition?: SpeechRecognitionConstructor;

    webkitSpeechRecognition?: SpeechRecognitionConstructor;

  }

}

export {};

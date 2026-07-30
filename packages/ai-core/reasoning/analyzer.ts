import { detectIntent } from "./intent";
import { calculateConfidence } from "./confidence";

export function analyze(message: string) {
  return {
    intent: detectIntent(message),
    confidence: calculateConfidence(),
  };
}
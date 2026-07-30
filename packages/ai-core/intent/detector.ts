import { IntentResult } from "./types";

export function detectIntent(
  message: string
): IntentResult {

  const text = message.toLowerCase();

  if (text.match(/browser|website|google|search web/))
    return {
      intent: "browser",
      skillId: "browser",
      confidence: 0.95
    };

  if (text.match(/open|launch|close|shutdown/))
    return {
      intent: "automation",
      skillId: "automation",
      confidence: 0.98
    };

  if (text.match(/image|photo|picture/))
    return {
      intent: "image",
      skillId: "image",
      confidence: 0.95
    };

  if (text.match(/video|youtube|reel|short/))
    return {
      intent: "video",
      skillId: "video",
      confidence: 0.95
    };

  if (text.match(/remember|forget/))
    return {
      intent: "memory",
      skillId: "memory",
      confidence: 0.95
    };

  if (text.match(/plugin|extension|skill/))
    return {
      intent: "plugin",
      skillId: "plugin",
      confidence: 0.95
    };

  return {
    intent: "chat",
    confidence: 0.80
  };
}

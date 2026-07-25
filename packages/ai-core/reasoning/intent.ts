import type { IntentType } from "./types";

export function detectIntent(message: string): IntentType {
  const text = message.toLowerCase();

  if (text.includes("code")) return "code";
  if (text.includes("image")) return "vision";
  if (text.includes("browser")) return "automation";
  if (text.includes("weather")) return "plugin";

  return "chat";
}
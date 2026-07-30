export type Intent =
  | "chat"
  | "search"
  | "vision"
  | "automation"
  | "plugin";

export function detectIntent(text: string): Intent {
  const input = text.toLowerCase();

  if (input.includes("weather")) return "plugin";

  if (input.includes("search")) return "search";

  if (input.includes("camera")) return "vision";

  if (input.includes("open")) return "automation";

  return "chat";
}
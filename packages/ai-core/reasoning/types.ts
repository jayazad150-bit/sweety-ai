export type IntentType =
  | "chat"
  | "code"
  | "search"
  | "vision"
  | "automation"
  | "plugin"
  | "unknown";

export interface ReasoningResult {
  intent: IntentType;
  confidence: number;
}
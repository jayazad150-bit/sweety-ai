export type Intent =
  | "chat"
  | "automation"
  | "browser"
  | "vision"
  | "image"
  | "video"
  | "document"
  | "memory"
  | "plugin"
  | "voice"
  | "coding"
  | "search";

export interface IntentResult {

  intent: Intent;

  skillId?: string;

  confidence: number;

}

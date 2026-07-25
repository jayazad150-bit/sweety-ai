export type Role =
  | "system"
  | "user"
  | "assistant";

export interface AIMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface AIContext {
  sessionId: string;

  userId?: string;

  conversation: AIMessage[];

  memory: string[];

  variables: Record<string, unknown>;
}

export interface AIResponse {
  success: boolean;

  reply: string;

  confidence?: number;

  actions?: string[];

  metadata?: Record<string, unknown>;
}

export interface AIPlugin {
  readonly name: string;

  readonly description: string;

  execute(
    input: string
  ): Promise<string>;
}
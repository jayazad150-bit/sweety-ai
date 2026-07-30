export interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface AIContext {
  sessionId: string;
  userId?: string;
  messages: ConversationMessage[];
  variables: Record<string, unknown>;
  activePlan?: string;
  activeSkill?: string;
}

export class ContextManager {
  private context: AIContext;

  constructor() {
    this.context = {
      sessionId: crypto.randomUUID(),
      messages: [],
      variables: {},
    };
  }

  getContext(): AIContext {
    return structuredClone(this.context);
  }

  addMessage(
    role: ConversationMessage["role"],
    content: string
  ) {
    this.context.messages.push({
      role,
      content,
      timestamp: Date.now(),
    });

    if (this.context.messages.length > 100) {
      this.context.messages.shift();
    }
  }

  setVariable(key: string, value: unknown) {
    this.context.variables[key] = value;
  }

  getVariable<T = unknown>(key: string): T | undefined {
    return this.context.variables[key] as T | undefined;
  }

  setActivePlan(plan: string) {
    this.context.activePlan = plan;
  }

  setActiveSkill(skill: string) {
    this.context.activeSkill = skill;
  }

  clear() {
    this.context.messages = [];
    this.context.variables = {};
    this.context.activePlan = undefined;
    this.context.activeSkill = undefined;
  }
}
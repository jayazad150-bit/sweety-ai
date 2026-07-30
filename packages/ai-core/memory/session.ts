import type { AIMessage } from "../types";

export class SessionMemory {
  private sessionId = crypto.randomUUID();

  private messages: AIMessage[] = [];

  getSessionId() {
    return this.sessionId;
  }

  async add(
    message: AIMessage
  ): Promise<void> {
    this.messages.push(message);
  }

  async get(): Promise<AIMessage[]> {
    return [...this.messages];
  }

  async clear(): Promise<void> {
    this.messages = [];
  }

  reset() {
    this.sessionId = crypto.randomUUID();
    this.messages = [];
  }
}

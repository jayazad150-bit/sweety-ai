export class SessionMemory {
  private sessionId = crypto.randomUUID();

  getSessionId() {
    return this.sessionId;
  }

  reset() {
    this.sessionId = crypto.randomUUID();
  }
}
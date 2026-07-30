export class AIEngine {
  async ask(message: string) {
    return {
      reply: `Sweety received: ${message}`,
    };
  }
}
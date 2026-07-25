import { GeminiProvider } from "./gemini";

export class AIProviderManager {
  private readonly gemini: GeminiProvider;

  constructor() {
    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY missing"
      );
    }

    this.gemini =
      new GeminiProvider(apiKey);
  }

  async generate(
    prompt: string
  ) {
    return this.gemini.generate({
      message: prompt,
      history: [],
    });
  }
}

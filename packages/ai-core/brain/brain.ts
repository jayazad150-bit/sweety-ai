import { GeminiProvider } from "../providers/gemini";
import type { AIMessage } from "../types";
import type { ContentImage } from "../prompts/content";

export interface BrainResponse {
  reply: string;
  emotion?: string;
  confidence?: number;
}

export class Brain {
  private provider: GeminiProvider;

  constructor() {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      throw new Error("GEMINI_API_KEY missing");
    }

    this.provider = new GeminiProvider(key);
  }

  async think(
    message: string,
    history: AIMessage[] = [],
    image?: ContentImage
  ): Promise<BrainResponse> {
    const providerHistory = history
      .filter(
        (
          item
        ): item is AIMessage & {
          role: "user" | "assistant";
        } =>
          item.role === "user" ||
          item.role === "assistant"
      )
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    const response = await this.provider.generate({
      message,
      history: providerHistory,
      image,
    });

    return {
      reply: response.reply,
      emotion: "neutral",
      confidence: 1,
    };
  }
}

import { GoogleGenAI } from "@google/genai";

import {
  buildSystemPrompt,
} from "../prompts/systemprompt";

import {
  buildContents,
} from "../prompts/content";

import type {
  AIProvider,
  AIProviderRequest,
  AIProviderResponse,
} from "./provider";

export class GeminiProvider
  implements AIProvider {

  readonly name = "gemini";

  private readonly client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client =
      new GoogleGenAI({
        apiKey,
      });
  }

  async generate(
    request: AIProviderRequest
  ): Promise<AIProviderResponse> {

    const result =
      await this.client.models.generateContent({

        model:
          "gemini-2.5-flash",

        config: {
          systemInstruction:
            buildSystemPrompt({
              assistantName:
                "Sweety AI Ultimate",

              developer:
                "Jay",

              personality:
                "Professional, intelligent, friendly, helpful, and honest.",
            }),

          tools: [
            {
              googleSearch: {},
            },
          ],
        },

        contents:
          buildContents(
            request.history ?? [],
            request.message
          ),
      });

    return {
      reply:
        result.text?.trim() ||
        "I couldn't generate a response.",
    };
  }
}

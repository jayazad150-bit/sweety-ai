import { MediaProvider } from "../types";

export const fallbackImageProvider: MediaProvider = {

  id: "fallback",

  name: "Fallback Image Provider",

  async generateImage(prompt: string) {

    return {

      success: true,

      provider: "fallback",

      prompt,

      fallback: true,

      message:
        "AI image generation is currently unavailable. A fallback preview was returned.",

      imageUrl:
        `https://placehold.co/1024x1024?text=${encodeURIComponent(prompt)}`

    };

  }

};

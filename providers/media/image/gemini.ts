import { GoogleGenAI } from "@google/genai";
import { MediaProvider } from "../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const geminiImageProvider: MediaProvider = {

  id: "gemini",

  name: "Gemini Image",

  async generateImage(prompt: string) {

    const response = await ai.models.generateImages({

      model: "gemini-2.5-flash-image",

      prompt,

      config: {
        numberOfImages: 1,
        imageSize: "1K",
      },

    });


    const image =
      response.generatedImages?.[0]?.image?.imageBytes;


    if (!image) {

      return {

        success: false,
        provider: "gemini",
        prompt,
        error: "No image generated"

      };

    }


    return {

      success: true,

      provider: "gemini",

      prompt,

      imageBase64: image,

    };

  }

};
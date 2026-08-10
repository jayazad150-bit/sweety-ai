import { GoogleGenAI } from "@google/genai";
import { MediaProvider } from "../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const geminiImageProvider: MediaProvider = {

  id: "gemini",

  name: "Gemini Image",

  async generateImage(prompt: string) {

    try {

    const response =
      await ai.models.generateContent({

        model: "gemini-3.1-flash-image",

        config: {

          responseModalities: ["IMAGE"],

        },

        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]

      });


    const parts =
      response.candidates?.[0]
        ?.content
        ?.parts ?? [];


    const imagePart =
      parts.find(
        (part:any) =>
          part.inlineData
      );


    if (!imagePart) {

      return {

        success:false,

        provider:"gemini",

        prompt,

        error:
          "No image generated."

      };

    }


    return {

      success:true,

      provider:"gemini",

      prompt,

      imageBase64:
        imagePart.inlineData?.data

    };

    }

    catch(error){

      return {

        success:false,

        provider:"gemini",

        prompt,

        error:
          error instanceof Error
          ? error.message
          : "Image generation failed."

      };

    }

  }

};





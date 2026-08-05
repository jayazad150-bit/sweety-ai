import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateImage(prompt: string) {

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
    throw new Error("Image generation failed");
  }

  return {
    mimeType: "image/png",
    data: image,
  };
}
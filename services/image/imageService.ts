import { getProvider, registerProvider } from "../../providers/media/manager";
import { geminiImageProvider } from "../../providers/media/image/gemini";

let initialized = false;

function ensureProviders() {
  if (!initialized) {
    registerProvider(geminiImageProvider);
    initialized = true;
  }
}

export interface ImageGenerationResult {
  success: boolean;
  provider: string;
  prompt: string;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
}

export async function generateImage(
  prompt: string
): Promise<ImageGenerationResult> {

  ensureProviders();

  const provider = getProvider("gemini");

  if (!provider) {
    return {
      success: false,
      provider: "none",
      prompt,
      error: "Image provider not found."
    };
  }

  const result =
    await provider.generateImage(prompt);

  return result as ImageGenerationResult;

}

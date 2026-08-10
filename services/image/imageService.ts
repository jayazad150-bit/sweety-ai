import { getProvider } from "../../providers/media/manager";
import { loadMediaProviders } from "../../providers/media/loader";

let initialized = false;

function ensureProviders() {
  if (!initialized) {
    loadMediaProviders();
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
  fallback?: boolean;
  message?: string;
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
      error: "Image provider not found.",
    };
  }

  const result = await provider.generateImage(prompt);

  if (!result.success) {
    const error = result.error?.toLowerCase() ?? "";

    const shouldFallback =
      error.includes("quota") ||
      error.includes("429") ||
      error.includes("503") ||
      error.includes("unavailable") ||
      error.includes("not found") ||
      error.includes("fetch failed") ||
      error.includes("network") ||
      error.includes("timeout");

    if (shouldFallback) {
      const fallback = getProvider("fallback");

      if (fallback) {
        return (await fallback.generateImage(
          prompt
        )) as ImageGenerationResult;
      }
    }

    return result as ImageGenerationResult;
  }

  return result as ImageGenerationResult;
}

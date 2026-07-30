import { ProviderManager } from "./provider";
import { GeminiProvider } from "./gemini";

let manager: ProviderManager | null = null;

export function getProviderManager() {

  if (manager) {
    return manager;
  }

  manager = new ProviderManager();

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {

    manager.register(
      new GeminiProvider(apiKey)
    );

  }

  return manager;
}

export async function generateWithProvider(

  request: Parameters<ProviderManager["generate"]>[1],

  provider = "gemini"

) {

  const mgr = getProviderManager();

  return mgr.generate(
    provider,
    request
  );

}

import { AIProvider } from "./types";
import { searchProvider } from "./search";
import { imageProvider } from "./image";
import { videoProvider } from "./video";

const providers = new Map<string, AIProvider>();

export function registerProvider(
  provider: AIProvider
) {
  providers.set(provider.id, provider);
}

export function registerDefaultProviders() {

  registerProvider(searchProvider);

  registerProvider(imageProvider);

  registerProvider(videoProvider);

}

export function getProvider(
  id:string
) {
  return providers.get(id);
}

export function getProviders() {
  return Array.from(providers.values());
}

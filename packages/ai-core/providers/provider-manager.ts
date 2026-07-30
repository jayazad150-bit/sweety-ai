import { AIProvider } from "./types";
import { searchProvider } from "./search";

const providers = new Map<string, AIProvider>();

export function registerProvider(
  provider: AIProvider
) {
  providers.set(provider.id, provider);
}

export function registerDefaultProviders() {
  registerProvider(searchProvider);
}

export function getProvider(
  id: string
) {
  return providers.get(id);
}

export function getProviders() {
  return Array.from(providers.values());
}

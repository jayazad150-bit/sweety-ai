import { MediaProvider } from "./types";

const providers =
  new Map<string, MediaProvider>();

export function registerProvider(
  provider: MediaProvider
){
  providers.set(
    provider.id,
    provider
  );
}

export function getProvider(
  id: string
){
  return providers.get(
    id
  );
}

export function listProviders(){
  return Array.from(
    providers.values()
  );
}




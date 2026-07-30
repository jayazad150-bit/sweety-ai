import {
  getProvider,
  registerDefaultProviders
} from "./provider-manager";

let initialized = false;

function init() {
  if (!initialized) {
    registerDefaultProviders();
    initialized = true;
  }
}

export async function executeProvider(
  providerId: string,
  input: string,
  context?: unknown
) {

  init();

  const provider =
    getProvider(providerId);

  if (!provider) {
    return {
      success: false,
      provider: providerId,
      error: "Provider not found."
    };
  }

  try {

    const result =
      await provider.execute(
        input,
        context
      );

    return {
      success: true,
      provider: provider.id,
      result
    };

  } catch (error) {

    return {
      success: false,
      provider: provider.id,
      error:
        error instanceof Error
          ? error.message
          : "Unknown provider error"
    };

  }

}

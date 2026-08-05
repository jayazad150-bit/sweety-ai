export interface AIProviderRequest {
  message: string;

  history?: {
    role: "user" | "assistant";
    content: string;
  }[];

  image?: {
    mimeType: string;
    data: string;
  };

  video?: {
    mimeType: string;
    data: string;
  };
}

export interface AIProviderResponse {
  reply: string;
}

export interface AIProvider {
  readonly name: string;

  generate(
    request: AIProviderRequest
  ): Promise<AIProviderResponse>;
}

export class ProviderManager {
  private providers = new Map<string, AIProvider>();

  register(provider: AIProvider) {
    this.providers.set(
      provider.name.toLowerCase(),
      provider
    );
  }

  unregister(name: string) {
    this.providers.delete(
      name.toLowerCase()
    );
  }

  get(name: string): AIProvider | undefined {
    return this.providers.get(
      name.toLowerCase()
    );
  }

  list(): AIProvider[] {
    return [...this.providers.values()];
  }

  async generate(
    providerName: string,
    request: AIProviderRequest
  ): Promise<AIProviderResponse> {
    const provider =
      this.get(providerName);

    if (!provider) {
      throw new Error(
        `Provider "${providerName}" not found.`
      );
    }

    return provider.generate(request);
  }
}


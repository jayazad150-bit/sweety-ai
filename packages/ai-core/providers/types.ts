export interface AIProvider {

  id: string;

  name: string;

  supports: string[];

  execute(
    input: string,
    context?: unknown
  ): Promise<unknown>;

}

export interface ProviderResult {

  success: boolean;

  provider: string;

  result?: unknown;

  error?: string;

}

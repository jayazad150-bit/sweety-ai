export interface AIConfig {
  provider: "gemini";

  model: string;

  temperature: number;

  maxOutputTokens: number;

  enableGoogleSearch: boolean;

  enableVision: boolean;

  enableFunctionCalling: boolean;

  enableThinking: boolean;

  timeout: number;
}

export const DefaultAIConfig: AIConfig = {
  provider: "gemini",

  model: "gemini-2.5-flash",

  temperature: 0.7,

  maxOutputTokens: 4096,

  enableGoogleSearch: true,

  enableVision: true,

  enableFunctionCalling: true,

  enableThinking: true,

  timeout: 60000,
};

export class AIConfiguration {
  private config: AIConfig = {
    ...DefaultAIConfig,
  };

  get(): AIConfig {
    return {
      ...this.config,
    };
  }

  update(
    values: Partial<AIConfig>
  ) {
    this.config = {
      ...this.config,
      ...values,
    };
  }

  reset() {
    this.config = {
      ...DefaultAIConfig,
    };
  }
}
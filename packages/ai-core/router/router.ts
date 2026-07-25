import { SkillManager } from "../skill-manager/skillManager";
import { ReasoningResult } from "../reasoning/reasoning";

export interface RouteResult {
  handled: boolean;
  response: string;
}

export class Router {
  constructor(private readonly skillManager: SkillManager) {}

  async route(
    reasoning: ReasoningResult,
    input: string
  ): Promise<RouteResult> {
    switch (reasoning.intent) {
      case "weather":
      case "coding":
      case "email":
      case "calendar":
      case "search":
      case "trading":
      case "vision": {
        const response = await this.skillManager.execute(
          reasoning.intent,
          input
        );

        return {
          handled: true,
          response,
        };
      }

      default:
        return {
          handled: false,
          response: "",
        };
    }
  }
}
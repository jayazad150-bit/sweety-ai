import { SkillManager } from "../skill-manager/skillManager";
import { ReasoningResult } from "../reasoning/reasoning";
import { mediaRouter } from "../media/router";

export interface RouteResult {
  handled: boolean;
  response: string;
}

export class Router {

  constructor(
    private readonly skillManager: SkillManager
  ) {}

  async route(
    reasoning: ReasoningResult,
    input: string
  ): Promise<RouteResult> {

    /*
     * Media requests are checked first.
     * This preserves the existing media pipeline.
     */
    const mediaResult = await mediaRouter(input);

    if (mediaResult) {
      return {
        handled: true,
        response: JSON.stringify(mediaResult),
      };
    }

    /*
     * Normal conversation stays with the main AI provider.
     */
    if (!reasoning.shouldUseTool) {
      return {
        handled: false,
        response: "",
      };
    }

    /*
     * Reasoning decides which skill/tool should handle
     * the request.
     */
    const skillName =
      reasoning.toolName ?? reasoning.intent;

    const skill = this.skillManager.get(skillName);

    /*
     * If the reasoning engine detected an intent but there
     * is no installed skill, allow the normal AI pipeline
     * to handle the request instead of returning a hard error.
     */
    if (!skill) {
      return {
        handled: false,
        response: "",
      };
    }

    try {
      const response =
        await this.skillManager.execute(
          skillName,
          input
        );

      return {
        handled: true,
        response,
      };

    } catch (error) {

      console.error(
        `Router failed for skill "${skillName}":`,
        error
      );

      return {
        handled: false,
        response: "",
      };
    }
  }
}

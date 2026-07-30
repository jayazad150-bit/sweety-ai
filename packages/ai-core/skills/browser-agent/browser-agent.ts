import { Skill } from "../types";
import { executeProvider } from "../../providers/router";

export const browserAgentSkill: Skill = {

  id: "browser-agent",

  name: "Browser Agent",

  description: "Searches the web and opens websites.",

  intents: [
    "browser",
    "search"
  ],

  async execute(input: string) {

    const response =
      await executeProvider(
        "search",
        input
      );

    if (!response.success) {

      return {

        skill: "browser-agent",

        success: false,

        message:
          response.error ??
          "Search provider unavailable."

      };

    }

    return {

      skill: "browser-agent",

      success: true,

      provider:
        response.provider,

      result:
        response.result

    };

  }

};

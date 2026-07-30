import { Skill } from "../types";

export const browserSkill: Skill = {

  id: "browser",

  name: "Browser",

  description:
    "Browse the internet and retrieve information.",

  intents: [
    "browser",
    "search",
    "web"
  ],

  async execute(input: string) {

    return {

      success: true,

      action: "browser",

      query: input,

      message:
        "Browser skill executed."

    };

  }

};

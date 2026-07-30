import { Skill } from "../types";

export const imageSkill: Skill = {

  id: "image",

  name: "Image",

  description: "Generate and edit images",

  intents: [
    "create image",
    "generate image",
    "edit image",
    "modify image"
  ],

  async execute(
    input: string,
    context?: unknown
  ){

    const text = input.toLowerCase();

    if(
      text.includes("edit") ||
      text.includes("modify")
    ){

      return {

        skill:"image",

        action:"edit",

        message:"Image editing request detected.",

        instruction: input,

        context

      };

    }


    return {

      skill:"image",

      action:"generate",

      message:"Image generation request detected.",

      prompt: input,

      context

    };

  }

};

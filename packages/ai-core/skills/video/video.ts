import { Skill } from "../types";

export const videoSkill: Skill = {

  id: "video",

  name: "Video",

  description: "Generate and edit videos",

  intents: [
    "create video",
    "generate video",
    "text to video",
    "make video",
    "edit video",
    "modify video"
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

        skill:"video",

        action:"edit",

        message:"Video editing request detected.",

        instruction: input,

        context

      };

    }


    return {

      skill:"video",

      action:"generate",

      message:"Text to video request detected.",

      prompt: input,

      context

    };

  }

};

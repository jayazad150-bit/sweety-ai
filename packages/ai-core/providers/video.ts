import { AIProvider } from "./types";

export const videoProvider: AIProvider = {

  id: "video",

  name: "Video Provider",

  supports: [
    "video",
    "generate video",
    "edit video"
  ],

  async execute(
    input:string,
    context?:unknown
  ){

    return {

      type:"video",

      prompt: input,

      context,

      status:"ready"

    };

  }

};

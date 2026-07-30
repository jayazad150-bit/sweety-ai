import { AIProvider } from "../types";

export const imageProvider: AIProvider = {

  id: "image",

  name: "Image Provider",

  supports: [
    "image",
    "generate image",
    "edit image"
  ],

  async execute(
    input:string,
    context?:unknown
  ){

    return {

      type:"image",

      prompt: input,

      context,

      status:"ready"

    };

  }

};

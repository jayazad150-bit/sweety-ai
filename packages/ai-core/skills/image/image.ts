import { Skill } from "../types";

export const imageSkill: Skill = {

  id: "image",

  name: "Image",

  description: "image skill",

  async execute(input:string){

    return {

      skill:"image",

      message:"image module is ready.",

      input

    };

  }

};

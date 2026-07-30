import { Skill } from "../types";

export const videoSkill: Skill = {

  id: "video",

  name: "Video",

  description: "video skill",

  async execute(input:string){

    return {

      skill:"video",

      message:"video module is ready.",

      input

    };

  }

};

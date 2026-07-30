import { Skill } from "../types";

export const searchSkill: Skill = {

  id: "search",

  name: "Search",

  description: "search skill",

  async execute(input:string){

    return {

      skill:"search",

      message:"search module is ready.",

      input

    };

  }

};

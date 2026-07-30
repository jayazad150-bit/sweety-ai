import { Skill } from "../types";

export const codingSkill: Skill = {

  id: "coding",

  name: "Coding",

  description: "coding skill",

  async execute(input:string){

    return {

      skill:"coding",

      message:"coding module is ready.",

      input

    };

  }

};

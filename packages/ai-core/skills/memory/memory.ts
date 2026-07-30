import { Skill } from "../types";

export const memorySkill: Skill = {

  id: "memory",

  name: "Memory",

  description: "memory skill",

  async execute(input:string){

    return {

      skill:"memory",

      message:"memory module is ready.",

      input

    };

  }

};

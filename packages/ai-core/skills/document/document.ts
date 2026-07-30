import { Skill } from "../types";

export const documentSkill: Skill = {

  id: "document",

  name: "Document",

  description: "document skill",

  async execute(input:string){

    return {

      skill:"document",

      message:"document module is ready.",

      input

    };

  }

};

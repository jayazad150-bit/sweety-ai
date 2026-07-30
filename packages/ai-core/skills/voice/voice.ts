import { Skill } from "../types";

export const voiceSkill: Skill = {

  id: "voice",

  name: "Voice",

  description: "voice skill",

  async execute(input:string){

    return {

      skill:"voice",

      message:"voice module is ready.",

      input

    };

  }

};

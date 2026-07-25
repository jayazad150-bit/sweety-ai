import { SkillRegistry } from "./registry";
import { executeSkill } from "./executor";

export class SkillManager {
  registry = new SkillRegistry();

  async execute(
    skill: string,
    input: string
  ) {
    return executeSkill(skill, input);
  }
}
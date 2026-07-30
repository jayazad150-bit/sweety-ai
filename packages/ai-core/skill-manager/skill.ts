import type { SkillResult } from "./types";

export interface ISkill {
  execute(input: string): Promise<SkillResult>;
}
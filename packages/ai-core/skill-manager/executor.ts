import type { SkillResult } from "./types";

export async function executeSkill(
  skill: string,
  input: string
): Promise<SkillResult> {
  return {
    success: true,
    message: `${skill} executed with "${input}"`,
  };
}
export interface Skill {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}

export interface SkillResult {
  success: boolean;
  message: string;
}
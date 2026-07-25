import type { Skill } from "./types";

export class SkillRegistry {
  private skills: Skill[] = [];

  register(skill: Skill) {
    this.skills.push(skill);
  }

  getAll() {
    return this.skills;
  }

  find(id: string) {
    return this.skills.find(skill => skill.id === id);
  }
}
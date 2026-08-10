import {
  getSkill,
  getSkills,
  registerSkill,
  unregisterSkill,
  registerDefaultSkills,
} from "../skills/registry";

import type {
  Skill as RegisteredSkill,
} from "../skills/types";

export interface Skill {
  id: string;
  name: string;
  description: string;
  execute(input: string): Promise<unknown>;
}

export class SkillManager {

  constructor() {
    registerDefaultSkills();
  }

  register(skill: Skill) {
    registerSkill(
      skill as RegisteredSkill
    );
  }

  unregister(name: string): boolean {
    return unregisterSkill(name);
  }

  get(name: string): Skill | undefined {
    return getSkill(name) as Skill | undefined;
  }

  list(): Skill[] {
    return getSkills() as Skill[];
  }

  async execute(
    name: string,
    input: string
  ): Promise<string> {

    const skill = this.get(name);

    if (!skill) {
      return `Skill "${name}" is not installed.`;
    }

    try {

      const result =
        await skill.execute(input);

      if (typeof result === "string") {
        return result;
      }

      if (
        result &&
        typeof result === "object" &&
        "message" in result &&
        typeof (
          result as {
            message?: unknown;
          }
        ).message === "string"
      ) {
        return (
          result as {
            message: string;
          }
        ).message;
      }

      return JSON.stringify(
        result,
        null,
        2
      );

    } catch (error) {

      console.error(
        `Skill "${name}" failed:`,
        error
      );

      return `Skill "${name}" failed to execute.`;
    }
  }
}

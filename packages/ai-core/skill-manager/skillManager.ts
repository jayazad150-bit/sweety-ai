export interface Skill {
  id: string;
  name: string;
  description: string;
  execute(input: string): Promise<string>;
}

export class SkillManager {
  private skills = new Map<string, Skill>();

  register(skill: Skill) {
    this.skills.set(skill.name.toLowerCase(), skill);
  }

  unregister(name: string) {
    this.skills.delete(name.toLowerCase());
  }

  get(name: string): Skill | undefined {
    return this.skills.get(name.toLowerCase());
  }

  list(): Skill[] {
    return [...this.skills.values()];
  }

  async execute(name: string, input: string): Promise<string> {
    const skill = this.get(name);

    if (!skill) {
      return `Skill "${name}" is not installed.`;
    }

    try {
      return await skill.execute(input);
    } catch (error) {
      console.error(error);
      return `Skill "${name}" failed to execute.`;
    }
  }
}
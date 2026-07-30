export class SkillLoader {
  async load(name: string) {
    return {
      loaded: true,
      name,
    };
  }
}
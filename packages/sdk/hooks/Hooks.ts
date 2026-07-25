type Hook = () => void;

export class Hooks {
  private hooks = new Map<string, Hook[]>();

  register(name: string, hook: Hook) {
    const current = this.hooks.get(name) ?? [];
    current.push(hook);
    this.hooks.set(name, current);
  }

  run(name: string) {
    const current = this.hooks.get(name) ?? [];
    current.forEach((hook) => hook());
  }
}
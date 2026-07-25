import { Tool } from "./base";

export class ToolRegistry {
  private readonly tools = new Map<string, Tool>();

  register(tool: Tool): void {
    this.tools.set(tool.name.toLowerCase(), tool);
  }

  unregister(name: string): boolean {
    return this.tools.delete(name.toLowerCase());
  }

  has(name: string): boolean {
    return this.tools.has(name.toLowerCase());
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name.toLowerCase());
  }

  list(): Tool[] {
    return [...this.tools.values()];
  }

  clear(): void {
    this.tools.clear();
  }

  count(): number {
    return this.tools.size;
  }
}
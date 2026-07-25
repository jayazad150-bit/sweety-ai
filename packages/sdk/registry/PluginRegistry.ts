import type { Plugin } from "../types";

export class PluginRegistry {
  private plugins = new Map<string, Plugin>();

  register(plugin: Plugin) {
    this.plugins.set(plugin.manifest.id, plugin);
  }

  get(id: string) {
    return this.plugins.get(id);
  }

  all() {
    return [...this.plugins.values()];
  }
}
import { MemoryManager } from "../memory/memory";

export class ContextBuilder {
  constructor(private memory: MemoryManager) {}

  build() {
    return {
      history: this.memory.latest()
    };
  }
}
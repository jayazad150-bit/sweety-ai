import { Memory } from "../memory/memory";

export class ContextBuilder {
  constructor(private memory: Memory) {}

  build() {
    return {
      history: this.memory.recent(),
    };
  }
}

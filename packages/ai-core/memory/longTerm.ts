import type {
  AIMessage
} from "../types";


export class LongTermMemory {

  private memories: AIMessage[] = [];


  async add(message: AIMessage) {

    this.memories.push(message);

  }


  async get(): Promise<AIMessage[]> {

    return [
      ...this.memories
    ];

  }


  async clear(): Promise<void> {

    this.memories = [];

  }

}

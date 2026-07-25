import type { MemoryItem } from "./types";

export class MemoryStorage {
  private items: MemoryItem[] = [];

  save(item: MemoryItem) {
    this.items.push(item);
  }

  getAll() {
    return this.items;
  }
}
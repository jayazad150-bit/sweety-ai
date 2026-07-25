import type { MemoryItem } from "./types";

export function updateMemory(
  memory: MemoryItem[],
  item: MemoryItem
) {
  memory.push(item);

  return memory;
}
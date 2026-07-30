import type { MemoryItem } from "./types";

export function retrieve(
  memory: MemoryItem[],
  query: string
) {
  return memory.filter(item =>
    item.content
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
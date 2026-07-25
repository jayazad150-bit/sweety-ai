import type { MemoryItem } from "./types";

export function rank(
  items: MemoryItem[]
) {
  return [...items].sort(
    (a, b) => b.createdAt - a.createdAt
  );
}
import type { Task } from "./types";

export function createTask(
  title: string
): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
}

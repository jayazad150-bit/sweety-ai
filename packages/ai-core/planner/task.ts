import type { Task } from "./types";

export function createTask(name: string): Task {
  return {
    id: crypto.randomUUID(),
    name,
    status: "pending",
  };
}
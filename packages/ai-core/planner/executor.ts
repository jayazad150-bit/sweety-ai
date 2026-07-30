import type { Task } from "./types";

export async function execute(tasks: Task[]) {
  return tasks.map(task => ({
    ...task,
    status: "completed" as const,
  }));
}
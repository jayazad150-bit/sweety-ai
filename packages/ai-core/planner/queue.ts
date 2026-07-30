import type { Task } from "./types";

export class TaskQueue {
  private tasks: Task[] = [];

  add(tasks: Task[]) {
    this.tasks.push(...tasks);
  }

  getAll() {
    return this.tasks;
  }

  clear() {
    this.tasks = [];
  }
}
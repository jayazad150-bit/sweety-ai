import type { Task } from "./types";

export class Planner {
  private tasks: Task[] = [];

  createPlan(goal: string): Task[] {
    this.tasks = [
      {
        id: crypto.randomUUID(),
        title: `Analyze "${goal}"`,
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Collect information",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Generate solution",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Verify result",
        completed: false,
      },
    ];

    return this.tasks;
  }

  completeTask(id: string): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? { ...task, completed: true }
        : task
    );
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  clear(): void {
    this.tasks = [];
  }
}

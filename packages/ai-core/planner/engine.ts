import { Planner } from "./planner";
import { execute } from "./executor";

export class PlannerEngine {
  private readonly planner =
    new Planner();

  async run(intent: string) {
    const tasks =
      this.planner.createPlan(
        intent
      );

    const completed =
      await execute(tasks);

    return completed;
  }
}

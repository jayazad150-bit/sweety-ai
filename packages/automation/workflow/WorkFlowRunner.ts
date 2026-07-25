export interface WorkflowStep {

  action: string;

  data?: unknown;

}

export class WorkflowRunner {

  async run(steps: WorkflowStep[]) {

    for (const step of steps) {

      console.log(step.action);

    }

  }

}
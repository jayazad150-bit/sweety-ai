export type AutomationAction = {
  name: string;
  description: string;
  execute: (input?: unknown) => Promise<unknown>;
};


class AutomationEngine {
  private actions: Map<string, AutomationAction> = new Map();


  register(action: AutomationAction) {
    this.actions.set(action.name, action);
  }


  async run(
    actionName: string,
    input?: unknown
  ) {

    const action = this.actions.get(actionName);

    if (!action) {
      return {
        success: false,
        error: `Automation ${actionName} not found`
      };
    }


    try {

      const result = await action.execute(input);

      return {
        success: true,
        result
      };

    } catch(error) {

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown automation error"
      };

    }
  }


  listActions() {
    return Array.from(
      this.actions.keys()
    );
  }

}


export const automationEngine =
  new AutomationEngine();
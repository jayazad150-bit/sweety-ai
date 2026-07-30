import { executePlan } from "./executor";


export async function executeAutomation(
  command: string
) {

  try {

    return await executePlan(command);

  } catch (error) {

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Automation failed"
    };

  }

}
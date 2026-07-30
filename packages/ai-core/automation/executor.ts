import { automationEngine } from "./automation";


export async function executePlan(
  action: string,
  input?: unknown
) {

  return await automationEngine.run(
    action,
    input
  );

}
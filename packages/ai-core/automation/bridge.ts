import { automationRouter } from "./router";
import { registerAutomationSkills } from "./registry";

let initialized = false;

function initAutomation() {
  if (!initialized) {
    registerAutomationSkills();
    initialized = true;
  }
}

export async function runAutomation(
  command: string
) {
  initAutomation();

  return await automationRouter(command);
}
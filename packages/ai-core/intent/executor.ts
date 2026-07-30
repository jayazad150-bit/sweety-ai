import { detectIntent } from "../intent";
import {
  executeSkill,
  registerDefaultSkills
} from "../skills";

let initialized = false;

function init() {
  if (!initialized) {
    registerDefaultSkills();
    initialized = true;
  }
}

export async function executeIntent(
  message: string,
  context?: unknown
) {

  init();

  const intent =
    detectIntent(message);

  if (!intent.skillId) {

    return {
      handled: false
    };

  }

  const result =
    await executeSkill(
      intent.skillId,
      message,
      context
    );

  return {
    handled: result.success,
    intent,
    result
  };

}

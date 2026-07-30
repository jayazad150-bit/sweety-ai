import {
  registerAutomationSkills
} from "./registry";

import {
  automationEngine
} from "./automation";


async function testAutomation() {

  registerAutomationSkills();

  const result =
    await automationEngine.run(
      "system_status"
    );

  console.log(result);

}


testAutomation();
import { createTask } from "./task";

export function buildWorkflow(intent: string) {
  switch (intent) {
    case "code":
      return [
        createTask("Analyze Code"),
        createTask("Generate Solution"),
      ];

    case "vision":
      return [
        createTask("Analyze Image"),
        createTask("Generate Response"),
      ];

    case "automation":
      return [
        createTask("Execute Automation"),
      ];

    default:
      return [
        createTask("Generate AI Reply"),
      ];
  }
}
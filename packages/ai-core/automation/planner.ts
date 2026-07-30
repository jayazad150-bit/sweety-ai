export type AutomationPlan = {
  action: string;
  input?: unknown;
};


export function createAutomationPlan(
  command: string
): AutomationPlan | null {

  const text =
    command.toLowerCase();


  if (
    text.includes("server") ||
    text.includes("system status")
  ) {
    return {
      action: "system_status"
    };
  }


  if (
    text.includes("open") &&
    text.includes("http")
  ) {
    return {
      action: "open_website",
      input: command
    };
  }


  return null;
}
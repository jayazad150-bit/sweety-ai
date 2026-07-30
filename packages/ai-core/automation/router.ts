import { automationEngine } from "./automation";


export async function automationRouter(
  command: string
) {

  const text =
    command.toLowerCase();


  if (
    text.includes("server") ||
    text.includes("system status")
  ) {

    return await automationEngine.run(
      "system_status"
    );

  }


  if (
    text.includes("open") &&
    text.includes("http")
  ) {

    return await automationEngine.run(
      "open_website",
      command
    );

  }


  return {
    success: false,
    message:
      "No matching automation found"
  };

}
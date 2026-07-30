import { runAgent } from "./agents";

export async function orchestrateRequest(
  message: string,
  context?: unknown
) {

  const agentResult =
    await runAgent(
      message,
      context
    );

  if (agentResult.handled) {
    return agentResult;
  }

  return {
    handled: false,
    agent: "chat"
  };
}

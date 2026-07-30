import { executeIntent } from "../intent";

export async function runAgent(
  message: string,
  context?: unknown
) {

  const result =
    await executeIntent(
      message,
      context
    );

  if (
    !result.handled ||
    !result.intent
  ) {

    return {
      handled: false,
      agent: "chat"
    };

  }

  return {

    handled: true,

    agent:
      result.intent.intent,

    result:
      result.result

  };

}

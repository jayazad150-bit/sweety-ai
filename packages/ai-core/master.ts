import { orchestrateRequest } from "./orchestrator";
import { AIEngine } from "./engine/engine";

const engine = new AIEngine();

type ImageInput = {
  mimeType: string;
  data: string;
};

export async function runSweety(
  message: string,
  image?: ImageInput
) {

  const agent =
    await orchestrateRequest(message);

  if (agent.handled) {

    return {
      reply: JSON.stringify(agent.result),
      confidence: 1,
      handled: true,
      source: agent.agent
    };

  }

  const ai =
    await engine.process(
      message,
      image
    );

  return {
    reply: ai.reply,
    confidence: ai.confidence,
    handled: ai.handled,
    source: "gemini"
  };

}


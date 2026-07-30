import { SWEETY_PERSONALITY } from "./personality";
import { AI_TOOLS } from "./tools";
import { getMemory } from "./memory";

type HistoryMessage = {
  role: "user" | "ai";
  text: string;
};

export function buildSystemPrompt() {
  const memory = getMemory();

  const enabledTools = AI_TOOLS.filter(
    (tool) => tool.enabled
  );

  return `
${SWEETY_PERSONALITY}

-------------------------
User Memory
-------------------------

Name: ${memory.name || "Unknown"}

Preferred Language:
${memory.preferredLanguage || "Unknown"}

Current Project:
${memory.currentProject || "None"}

Favorite Programming Language:
${memory.favoriteProgrammingLanguage || "Unknown"}

Interests:
${memory.interests.join(", ") || "None"}

Notes:
${memory.notes.join(", ") || "None"}

-------------------------
Available Tools
-------------------------

${enabledTools
  .map(
    (tool) =>
      `• ${tool.name}: ${tool.description}`
  )
  .join("\n")}
`;
}

export function buildContents(
  history: HistoryMessage[],
  message: string
) {
  const contents = history.map((item) => ({
    role: item.role === "ai" ? "model" : "user",
    parts: [{ text: item.text }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}
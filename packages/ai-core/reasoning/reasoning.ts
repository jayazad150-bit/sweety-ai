export interface ReasoningResult {
  intent: string;
  confidence: number;
  entities: string[];
  summary: string;
  shouldUseTool: boolean;
  toolName: string | null;
}

type IntentRule = {
  intent: string;
  keywords: string[];
  toolName?: string;
};

const INTENT_RULES: IntentRule[] = [
  {
    intent: "image",
    keywords: [
      "generate image",
      "create image",
      "create an image",
      "make an image",
      "draw an image",
      "create picture",
      "create a picture",
      "generate picture",
      "generate a picture",
    ],
    toolName: "image",
  },

  {
    intent: "video",
    keywords: [
      "generate video",
      "create video",
      "create a video",
      "make a video",
      "animation",
      "generate animation",
    ],
    toolName: "video",
  },

  {
    intent: "search",
    keywords: [
      "search",
      "look up",
      "find information",
      "find info",
      "latest news",
      "latest information",
      "research",
      "browse",
      "web search",
      "search the web",
    ],
    toolName: "search",
  },

  {
    intent: "weather",
    keywords: [
      "weather",
      "temperature",
      "forecast",
      "rain",
      "storm",
    ],
    toolName: "weather",
  },

  {
    intent: "email",
    keywords: [
      "email",
      "mail",
      "send an email",
      "write an email",
      "reply to email",
    ],
    toolName: "email",
  },

  {
    intent: "calendar",
    keywords: [
      "calendar",
      "schedule",
      "meeting",
      "appointment",
      "reminder",
    ],
    toolName: "calendar",
  },

  {
    intent: "vision",
    keywords: [
      "analyze image",
      "analyze this image",
      "look at this image",
      "what is in this image",
      "describe this image",
    ],
    toolName: "vision",
  },

  {
    intent: "trading",
    keywords: [
      "trade",
      "trading",
      "stock",
      "stocks",
      "market",
      "forex",
    ],
    toolName: "trading",
  },

  {
    intent: "coding",
    keywords: [
      "write code",
      "code",
      "coding",
      "program",
      "programming",
      "typescript",
      "javascript",
      "python",
      "react",
      "nextjs",
      "next.js",
      "debug",
      "debugging",
      "refactor",
      "function",
      "api",
      "git",
      "github",
      "powershell",
    ],
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractEntities(text: string): string[] {
  return text
    .split(/\s+/)
    .map((word) =>
      word.replace(/^[^\w]+|[^\w]+$/g, "")
    )
    .filter((word) => word.length > 3)
    .slice(0, 30);
}

function scoreRule(
  text: string,
  rule: IntentRule
): number {
  let score = 0;

  for (const keyword of rule.keywords) {
    if (text.includes(keyword)) {
      score += keyword.includes(" ")
        ? 2
        : 1;
    }
  }

  return score;
}

export class Reasoning {

  analyze(input: string): ReasoningResult {
    const text = input.trim();

    if (!text) {
      return {
        intent: "chat",
        confidence: 1,
        entities: [],
        summary: "",
        shouldUseTool: false,
        toolName: null,
      };
    }

    const normalized = normalize(text);

    let bestRule: IntentRule | null = null;
    let bestScore = 0;

    for (const rule of INTENT_RULES) {
      const score = scoreRule(
        normalized,
        rule
      );

      if (score > bestScore) {
        bestScore = score;
        bestRule = rule;
      }
    }

    if (!bestRule) {
      return {
        intent: "chat",
        confidence: 0.85,
        entities: extractEntities(text),
        summary: text,
        shouldUseTool: false,
        toolName: null,
      };
    }

    const confidence = Math.min(
      0.98,
      0.55 + bestScore * 0.1
    );

    const toolName =
      bestRule.toolName ??
      bestRule.intent;

    return {
      intent: bestRule.intent,
      confidence,
      entities: extractEntities(text),
      summary: text,
      shouldUseTool: true,
      toolName,
    };
  }

  shouldUseTool(intent: string): boolean {
    return intent !== "chat";
  }

  getToolName(
    result: ReasoningResult
  ): string | null {
    if (!result.shouldUseTool) {
      return null;
    }

    return result.toolName;
  }

  explain(
    result: ReasoningResult
  ): string {
    return [
      `Intent: ${result.intent}`,
      `Confidence: ${Math.round(
        result.confidence * 100
      )}%`,
      `Tool: ${result.toolName ?? "none"}`,
      `Entities: ${
        result.entities.length
          ? result.entities.join(", ")
          : "none"
      }`,
    ].join(" | ");
  }
}

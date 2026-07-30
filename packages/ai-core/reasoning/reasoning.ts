export interface ReasoningResult {
  intent: string;
  confidence: number;
  entities: string[];
  summary: string;
}

export class Reasoning {
  analyze(input: string): ReasoningResult {

    const text = input.trim();
    const lower = text.toLowerCase();

    let intent = "chat";


    if (lower.includes("weather")) 
      intent = "weather";

    else if (lower.includes("code")) 
      intent = "coding";

    else if (lower.includes("email")) 
      intent = "email";

    else if (lower.includes("calendar")) 
      intent = "calendar";

    else if (
      lower.includes("generate image") ||
      lower.includes("create image") ||
      lower.includes("make image") ||
      lower.includes("image")
    )
      intent = "image";


    else if (
      lower.includes("generate video") ||
      lower.includes("create video") ||
      lower.includes("make video") ||
      lower.includes("animation")
    )
      intent = "video";


    else if (lower.includes("search")) 
      intent = "search";

    else if (lower.includes("trade")) 
      intent = "trading";


    else if (
      lower.includes("run test") ||
      lower.includes("test tool") ||
      lower.includes("execute test")
    ) {
      intent = "test";
    }


    const entities = text
      .split(/\s+/)
      .filter((word) => word.length > 3);


    return {
      intent,
      confidence: 0.95,
      entities,
      summary: text,
    };
  }


  shouldUseTool(intent: string): boolean {
    return intent !== "chat";
  }


  getToolName(result: ReasoningResult): string | null {

    switch (result.intent) {

      case "test":
        return "test";

      case "search":
        return "search";

      default:
        return null;
    }

  }


  explain(result: ReasoningResult): string {

    return `Intent: ${result.intent} | Confidence: ${Math.round(
      result.confidence * 100
    )}%`;

  }

}

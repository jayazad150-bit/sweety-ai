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
    let confidence = 0.95;

    // Image requests
    if (
      lower.includes("generate image") ||
      lower.includes("create image") ||
      lower.includes("make image") ||
      lower.includes("draw image") ||
      lower.includes("create a picture") ||
      lower.includes("generate a picture")
    ) {
      intent = "image";
    }

    // Video requests
    else if (
      lower.includes("generate video") ||
      lower.includes("create video") ||
      lower.includes("make video") ||
      lower.includes("generate animation") ||
      lower.includes("create animation")
    ) {
      intent = "video";
    }

    // Coding / software-development requests
    else if (
      // General coding
      lower.includes("code") ||
      lower.includes("coding") ||
      lower.includes("programming") ||
      lower.includes("program")

      // Debugging / errors
      || lower.includes("debug")
      || lower.includes("debugging")
      || lower.includes("fix this error")
      || lower.includes("fix the error")
      || lower.includes("fix my error")
      || lower.includes("error in my")
      || lower.includes("why is my code")
      || lower.includes("why does my code")

      // Code operations
      || lower.includes("write a function")
      || lower.includes("write code")
      || lower.includes("generate code")
      || lower.includes("explain this code")
      || lower.includes("review this code")
      || lower.includes("review my code")
      || lower.includes("refactor")
      || lower.includes("optimize this code")
      || lower.includes("modify this code")

      // Programming languages
      || lower.includes("typescript")
      || lower.includes("javascript")
      || lower.includes("python")
      || lower.includes("java ")
      || lower.includes(" c++")
      || lower.includes("c#")
      || lower.includes("golang")
      || lower.includes("rust")

      // Frameworks / technologies
      || lower.includes("react")
      || lower.includes("next.js")
      || lower.includes("nextjs")
      || lower.includes("node.js")
      || lower.includes("nodejs")
      || lower.includes("tailwind")
      || lower.includes("html")
      || lower.includes("css")
      || lower.includes("sql")
      || lower.includes("api")

      // Development tools
      || lower.includes("powershell")
      || lower.includes("terminal command")
      || lower.includes("npm")
      || lower.includes("npx")
      || lower.includes("git ")
      || lower.includes("github")
      || lower.includes("repository")
      || lower.includes("package.json")

      // Software-development concepts
      || lower.includes("software development")
      || lower.includes("developer")
      || lower.includes("programming language")
      || lower.includes("function")
      || lower.includes("class")
      || lower.includes("component")
      || lower.includes("typescript error")
      || lower.includes("build error")
      || lower.includes("compile error")
    ) {
      intent = "coding";
      confidence = 0.98;
    }

    // Weather
    else if (
      lower.includes("weather") ||
      lower.includes("temperature forecast") ||
      lower.includes("rain today")
    ) {
      intent = "weather";
    }

    // Email
    else if (
      lower.includes("email") ||
      lower.includes("mail")
    ) {
      intent = "email";
    }

    // Calendar
    else if (
      lower.includes("calendar") ||
      lower.includes("schedule a meeting") ||
      lower.includes("appointment")
    ) {
      intent = "calendar";
    }

    // Search
    else if (
      lower.includes("search") ||
      lower.includes("look up") ||
      lower.includes("find information")
    ) {
      intent = "search";
    }

    // Trading
    else if (
      lower.includes("trade") ||
      lower.includes("trading") ||
      lower.includes("stock market")
    ) {
      intent = "trading";
    }

    // Test tool
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
      confidence,
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

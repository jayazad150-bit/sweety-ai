import { ToolContext, ToolResult } from "./base";
import { ToolRegistry } from "./registry";

export class ToolExecutor {
  constructor(
    private readonly registry: ToolRegistry
  ) {}

  async execute(
    toolName: string,
    input: string,
    context?: ToolContext
  ): Promise<ToolResult> {
    const tool = this.registry.get(toolName);

    if (!tool) {
      return {
        success: false,
        output: `Tool "${toolName}" not found.`,
      };
    }

    try {
      return await tool.execute(input, context);
    } catch (error) {
      console.error(error);

      return {
        success: false,
        output: `Tool "${toolName}" failed.`,
        metadata: {
          error:
            error instanceof Error
              ? error.message
              : String(error),
        },
      };
    }
  }

  async executeMany(
    tools: string[],
    input: string,
    context?: ToolContext
  ): Promise<ToolResult[]> {
    return Promise.all(
      tools.map((tool) =>
        this.execute(tool, input, context)
      )
    );
  }
}
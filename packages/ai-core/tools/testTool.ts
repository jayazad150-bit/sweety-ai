import type {
  Tool,
  ToolContext,
  ToolResult,
} from "./base";

export class TestTool implements Tool {
  readonly name = "test";

  readonly description =
    "A simple test tool used to verify the Tool Registry and Tool Executor.";

  async execute(
    input: string,
    context?: ToolContext
  ): Promise<ToolResult> {
    return {
      success: true,
      output: `Test tool executed successfully. Input: ${input}`,
      metadata: {
        sessionId: context?.sessionId,
        userId: context?.userId,
      },
    };
  }
}
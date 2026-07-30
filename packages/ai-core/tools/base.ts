export interface ToolContext {
  sessionId?: string;
  userId?: string;
  memory?: unknown;
  variables?: Record<string, unknown>;
}

export interface ToolResult {
  success: boolean;
  output: string;
  metadata?: Record<string, unknown>;
}

export interface Tool {
  readonly name: string;
  readonly description: string;

  execute(
    input: string,
    context?: ToolContext
  ): Promise<ToolResult>;
}

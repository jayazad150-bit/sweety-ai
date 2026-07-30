import type {
  Tool,
  ToolContext,
  ToolResult,
} from "./base";

import type {
  WebSearchProvider,
} from "../providers/webSearch";

export class SearchTool implements Tool {
  readonly name = "search";

  readonly description =
    "Search tool used to find information from the web.";

  constructor(
    private readonly provider: WebSearchProvider
  ) {}

  async execute(
    input: string,
    context?: ToolContext
  ): Promise<ToolResult> {
    const query = input.trim();

    if (!query) {
      return {
        success: false,
        output: "Search query is required.",
      };
    }

    try {
      const response =
        await this.provider.search(query);

      if (response.results.length === 0) {
        return {
          success: true,
          output:
            `No search results found for: ${response.query}`,
          metadata: {
            sessionId: context?.sessionId,
            userId: context?.userId,
            query: response.query,
            resultCount: 0,
          },
        };
      }

      const output =
        response.results
          .map(
            (result, index) =>
              `${index + 1}. ${result.title}\n` +
              `${result.url}\n` +
              `${result.snippet}`
          )
          .join("\n\n");

      return {
        success: true,
        output,
        metadata: {
          sessionId: context?.sessionId,
          userId: context?.userId,
          query: response.query,
          resultCount:
            response.results.length,
        },
      };
    } catch (error) {
      return {
        success: false,
        output:
          error instanceof Error
            ? error.message
            : "Search failed.",
        metadata: {
          sessionId: context?.sessionId,
          userId: context?.userId,
        },
      };
    }
  }
}
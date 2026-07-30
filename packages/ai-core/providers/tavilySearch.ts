import {
  tavily,
} from "@tavily/core";

import type {
  WebSearchProvider,
  WebSearchResponse,
} from "./webSearch";

export class TavilySearchProvider
  implements WebSearchProvider {

  private readonly client;

  constructor() {
    const apiKey =
      process.env.TAVILY_API_KEY;

    if (!apiKey) {
      throw new Error(
        "TAVILY_API_KEY is not configured."
      );
    }

    this.client = tavily({
      apiKey,
    });
  }

  async search(
    query: string
  ): Promise<WebSearchResponse> {
    const cleanedQuery = query.trim();

    if (!cleanedQuery) {
      return {
        query: "",
        results: [],
      };
    }

    const response =
      await this.client.search(
        cleanedQuery,
        {
          maxResults: 5,
          searchDepth: "basic",
        }
      );

    return {
      query: cleanedQuery,
      results:
        response.results.map(
          (result) => ({
            title:
              result.title ?? "",
            url:
              result.url ?? "",
            snippet:
              result.content ?? "",
          })
        ),
    };
  }
}
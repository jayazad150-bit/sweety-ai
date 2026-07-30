import {
  WebSearchProvider,
  WebSearchResponse,
} from "./webSearch";

export class PlaceholderSearchProvider
  implements WebSearchProvider {

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

    return {
      query: cleanedQuery,
      results: [],
    };
  }
}
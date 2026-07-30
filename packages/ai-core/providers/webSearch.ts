export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface WebSearchResponse {
  query: string;
  results: WebSearchResult[];
}

export interface WebSearchProvider {
  search(
    query: string
  ): Promise<WebSearchResponse>;
}
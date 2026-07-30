import { AIProvider } from "../types";

export const searchProvider: AIProvider = {

  id: "search",

  name: "Search Provider",

  supports: [
    "browser",
    "search"
  ],

  async execute(input: string) {

    return {

      query: input,

      message:
        "Real web search provider will be connected here.",

      status: "ready"

    };

  }

};

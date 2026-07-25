import type { Plugin } from "../../packages/sdk";

const WeatherPlugin: Plugin = {
  manifest: {
    id: "weather",
    name: "Weather",
    version: "1.0.0",
    author: "Sweety",
    description: "Weather information plugin",
    permissions: [],
  },

  async activate() {
    console.log("Weather plugin activated");
  },

  async deactivate() {
    console.log("Weather plugin deactivated");
  },
};

export default WeatherPlugin;
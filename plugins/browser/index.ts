import type { Plugin } from "../../packages/sdk";

const BrowserPlugin: Plugin = {
  manifest: {
    id: "browser",
    name: "Browser",
    version: "1.0.0",
    author: "Sweety",
    description: "Browser automation plugin",
    permissions: ["browser"],
  },

  async activate() {
    console.log("Browser plugin activated");
  },

  async deactivate() {
    console.log("Browser plugin deactivated");
  },
};

export default BrowserPlugin;
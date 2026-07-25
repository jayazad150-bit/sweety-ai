import type { Plugin } from "../../packages/sdk";

const CodingPlugin: Plugin = {
  manifest: {
    id: "coding",
    name: "Coding",
    version: "1.0.0",
    author: "Sweety",
    description: "Code generation and analysis",
    permissions: [],
  },

  async activate() {
    console.log("Coding plugin activated");
  },

  async deactivate() {
    console.log("Coding plugin deactivated");
  },
};

export default CodingPlugin;
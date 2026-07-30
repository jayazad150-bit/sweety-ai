import { AIEngine } from "./engine";

async function main() {
  const engine = new AIEngine();

  console.log("=== AIEngine Search Tool Test ===");

  console.log(
    "Registered tools:",
    engine.getTools().map((tool) => tool.name)
  );

  const result = await engine.process(
    "Search the web for latest AI news"
  );

  console.log("Engine response:");
  console.log(result);
}

main().catch((error) => {
  console.error("Search tool test failed:", error);
  process.exit(1);
});
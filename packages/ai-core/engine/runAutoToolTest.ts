import { AIEngine } from "./engine";

async function main() {
  const engine = new AIEngine();

  console.log("=== AIEngine Automatic Tool Test ===");

  console.log(
    "Registered tools:",
    engine.getTools().map((tool) => tool.name)
  );

  const result = await engine.process(
    "Run the test tool with Hello Sweety Ultimate"
  );

  console.log("Engine response:");
  console.log(result);
}

main().catch((error) => {
  console.error("Automatic tool test failed:", error);
  process.exit(1);
});
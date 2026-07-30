import { AIEngine } from "./engine";

async function main() {
  const engine = new AIEngine();

  console.log("Registered tools:", engine.getTools().map((tool) => tool.name));
  console.log("Has test tool:", engine.hasTool("test"));

  const result = await engine.executeTool(
    "test",
    "Hello from AIEngine",
    {
      sessionId: "engine-test-session",
      userId: "engine-test-user",
    }
  );

  console.log("AIEngine tool result:", result);
}

main().catch((error) => {
  console.error("AIEngine tool test failed:", error);
  process.exit(1);
});
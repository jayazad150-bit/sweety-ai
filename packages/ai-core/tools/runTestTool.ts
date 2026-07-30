import {
  ToolRegistry,
  ToolExecutor,
  TestTool,
} from "./index";

async function main() {
  const registry = new ToolRegistry();
  const executor = new ToolExecutor(registry);

  registry.register(new TestTool());

  console.log("Tool count:", registry.count());
  console.log("Has test tool:", registry.has("test"));

  const result = await executor.execute(
    "test",
    "Hello Sweety Ultimate",
    {
      sessionId: "test-session",
      userId: "test-user",
    }
  );

  console.log("Tool result:", result);
}

main().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
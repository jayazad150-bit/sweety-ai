import { Brain } from "../brain/brain";
import { Memory } from "../memory/memory";
import { Planner } from "../planner/planner";
import { Reasoning } from "../reasoning/reasoning";
import { Router } from "../router/router";
import { SkillManager } from "../skill-manager/skillManager";
import { ContextManager } from "../context/context";
import {
  Tool,
  ToolContext,
  ToolExecutor,
  ToolRegistry,
  ToolResult,
  TestTool,
  SearchTool,
} from "../tools";

import {
  TavilySearchProvider,
} from "../providers/tavilySearch";

export interface EngineResponse {
  reply: string;
  handled: boolean;
  confidence: number;
}

export class AIEngine {
  private brain: Brain | null;
  private readonly memory: Memory;
  private readonly planner: Planner;
  private readonly reasoning: Reasoning;
  private readonly router: Router;
  private readonly skills: SkillManager;
  private readonly context: ContextManager;

  private readonly toolRegistry: ToolRegistry;
  private readonly toolExecutor: ToolExecutor;

  constructor() {
    this.memory = new Memory();
    this.planner = new Planner();
    this.reasoning = new Reasoning();
    this.skills = new SkillManager();
    this.router = new Router(this.skills);
    this.brain = null;
    this.context = new ContextManager();

    this.toolRegistry = new ToolRegistry();
    this.toolExecutor = new ToolExecutor(
      this.toolRegistry
    );

    this.toolRegistry.register(
      new TestTool()
    );

    this.toolRegistry.register(
      new SearchTool(
        new TavilySearchProvider()
      )
    );
  }

  async process(
    message: string,
    image?: {
      mimeType: string;
      data: string;
    }
  ): Promise<EngineResponse> {
    this.context.addMessage(
      "user",
      message
    );

    this.memory.add(
      "user",
      message
    );

    const analysis =
      this.reasoning.analyze(
        message
      );

    this.planner.createPlan(
      message
    );

    const toolName =
      this.reasoning.getToolName(
        analysis
      );

    if (
      toolName &&
      this.toolRegistry.has(
        toolName
      )
    ) {
      const toolResult =
        await this.executeTool(
          toolName,
          message,
          {
            sessionId:
              this.context
                .getContext()
                .sessionId,
          }
        );

      const reply =
        toolResult.success
          ? toolResult.output
          : `Tool execution failed: ${toolResult.output}`;

      this.memory.add(
        "assistant",
        reply
      );

      this.context.addMessage(
        "assistant",
        reply
      );

      return {
        reply,
        handled: true,
        confidence:
          toolResult.success
            ? 1
            : 0,
      };
    }

    const routed = image
      ? {
          handled: false,
          response: "",
        }
      : await this.router.route(
          analysis,
          message
        );

    let reply: string;
    let handled = false;
    let confidence = 1;

    if (routed.handled) {
      reply = routed.response;
      handled = true;
    } else {
      const context =
        this.context.getContext();

      const history =
        context.messages.map(
          (
            item,
            index
          ) => ({
            id:
              `${context.sessionId}-${index}`,

            role:
              item.role,

            content:
              item.content,

            timestamp:
              item.timestamp,
          })
        );

      if (!this.brain) {
        this.brain = new Brain();
      }

      const response =
        await this.brain.think(
          message,
          history,
          image
        );

      reply =
        response.reply;

      confidence =
        response.confidence ?? 1;
    }

    this.memory.add(
      "assistant",
      reply
    );

    this.context.addMessage(
      "assistant",
      reply
    );

    return {
      reply,
      handled,
      confidence,
    };
  }

  getContext() {
    return this.context.getContext();
  }

  getMemory() {
    return this.memory.export();
  }

  getTasks() {
    return this.planner.getTasks();
  }

  getSkills() {
    return this.skills.list();
  }

  registerSkill(
    skill: Parameters<
      SkillManager["register"]
    >[0]
  ) {
    this.skills.register(
      skill
    );
  }

  registerTool(
    tool: Tool
  ): void {
    this.toolRegistry.register(
      tool
    );
  }

  unregisterTool(
    name: string
  ): boolean {
    return this.toolRegistry.unregister(
      name
    );
  }

  getTools(): Tool[] {
    return this.toolRegistry.list();
  }

  hasTool(
    name: string
  ): boolean {
    return this.toolRegistry.has(
      name
    );
  }

  async executeTool(
    name: string,
    input: string,
    context?: ToolContext
  ): Promise<ToolResult> {
    return this.toolExecutor.execute(
      name,
      input,
      context
    );
  }

  clearMemory() {
    this.memory.clear();
    this.context.clear();
  }
}
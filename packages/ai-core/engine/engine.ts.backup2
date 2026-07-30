import { Brain } from "../brain/brain";
import { Memory } from "../memory/memory";
import { Planner } from "../planner/planner";
import { Reasoning } from "../reasoning/reasoning";
import { Router } from "../router/router";
import { SkillManager } from "../skill-manager/skillManager";
import { ContextManager } from "../context/context";

export interface EngineResponse {
  reply: string;
  handled: boolean;
  confidence: number;
}

export class AIEngine {
  private readonly brain: Brain;
  private readonly memory: Memory;
  private readonly planner: Planner;
  private readonly reasoning: Reasoning;
  private readonly router: Router;
  private readonly skills: SkillManager;
  private readonly context: ContextManager;

  constructor() {
    this.memory = new Memory();
    this.planner = new Planner();
    this.reasoning = new Reasoning();
    this.skills = new SkillManager();
    this.router = new Router(this.skills);
    this.brain = new Brain();
    this.context = new ContextManager();
  }

  async process(
    message: string
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

    const routed =
      await this.router.route(
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

      const history =
        this.context
          .getContext()
          .messages
          .map(
            (
              item,
              index
            ) => ({
              id:
                `${this.context.getContext().sessionId}-${index}`,

              role:
                item.role,

              content:
                item.content,

              timestamp:
                item.timestamp,
            })
          );

      const response =
        await this.brain.think(
          message,
          history
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
    this.skills.register(skill);
  }

  clearMemory() {
    this.memory.clear();
    this.context.clear();
  }
}

import { Skill } from "./types";

import { browserSkill } from "./browser";
import { browserAgentSkill } from "./browser-agent";
import { imageSkill } from "./image";
import { videoSkill } from "./video";
import { memorySkill } from "./memory";
import { searchSkill } from "./search";
import { codingSkill } from "./coding";
import { documentSkill } from "./document";
import { voiceSkill } from "./voice";
import { automationSkill } from "./automation";

const skills = new Map<string, Skill>();

export function registerSkill(skill: Skill): void {
  skills.set(skill.id.toLowerCase(), skill);
}

export function unregisterSkill(id: string): boolean {
  return skills.delete(id.toLowerCase());
}

export function registerDefaultSkills(): void {
  registerSkill(browserSkill);
  registerSkill(browserAgentSkill);
  registerSkill(imageSkill);
  registerSkill(videoSkill);
  registerSkill(memorySkill);
  registerSkill(searchSkill);
  registerSkill(codingSkill);
  registerSkill(documentSkill);
  registerSkill(voiceSkill);
  registerSkill(automationSkill);
}

export function getSkill(id: string): Skill | undefined {
  return skills.get(id.toLowerCase());
}

export function getSkills(): Skill[] {
  return Array.from(skills.values());
}

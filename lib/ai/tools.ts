export interface AITool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const AI_TOOLS: AITool[] = [
  {
    id: "chat",
    name: "Conversation",
    description: "Answer questions and have natural conversations.",
    enabled: true,
  },
  {
    id: "vision",
    name: "Image Analysis",
    description: "Analyze uploaded images and describe their contents.",
    enabled: true,
  },
  {
    id: "web",
    name: "Web Search",
    description: "Search the internet for current information.",
    enabled: true,
  },
  {
    id: "code",
    name: "Programming Assistant",
    description: "Write, explain, debug and improve code.",
    enabled: true,
  },
  {
    id: "memory",
    name: "Memory",
    description: "Remember important user information.",
    enabled: false,
  },
  {
    id: "voice",
    name: "Voice Assistant",
    description: "Talk naturally with the user.",
    enabled: true,
  },
  {
    id: "automation",
    name: "Automation",
    description: "Control applications and perform tasks.",
    enabled: false,
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Create reminders and manage events.",
    enabled: false,
  },
  {
    id: "email",
    name: "Email",
    description: "Read and compose emails.",
    enabled: false,
  },
];
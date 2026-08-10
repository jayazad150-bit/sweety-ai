import { generateWithProvider } from "../../providers/manager";
import { Skill } from "../types";

export const codingSkill: Skill = {
  id: "coding",

  name: "Coding",

  description:
    "Helps with programming, debugging, code generation, code review, refactoring, and software development.",

  intents: [
    "coding",
    "code",
    "programming",
    "debug",
    "debugging",
    "code-review",
    "refactor",
    "software-development",
  ],

  async execute(context?: unknown) {
    const input =
      typeof context === "string"
        ? context
        : typeof context === "object" &&
            context !== null &&
            "message" in context &&
            typeof (context as { message?: unknown }).message === "string"
          ? (context as { message: string }).message
          : "";

    if (!input.trim()) {
      return {
        skill: "coding",
        message: "Please provide a coding question or code to work with.",
      };
    }

    const codingPrompt = `
You are Sweety AI Ultimate's Coding Skill.

Your job is to act as a highly capable software-development assistant.

Handle requests involving:

- Writing code
- Explaining code
- Debugging
- Fixing errors
- Refactoring
- Code review
- TypeScript
- JavaScript
- React
- Next.js
- Node.js
- Python
- HTML/CSS
- SQL
- PowerShell
- Git and GitHub
- APIs
- Software architecture
- Project structure

Rules:

1. Understand the user's actual programming goal before answering.
2. Provide working, production-quality code when code is requested.
3. Preserve the user's existing architecture when modifying a project.
4. Do not invent files, APIs, packages, or project structures.
5. When fixing an error, explain the cause briefly and then provide the fix.
6. When modifying code, clearly identify the file being changed.
7. Use fenced code blocks with the correct language.
8. Avoid unnecessary rewrites of unrelated code.
9. If important information is missing, state what is missing instead of guessing.
10. Prefer simple, maintainable solutions.
11. For PowerShell commands, make them safe and explicit.
12. Never expose API keys, passwords, tokens, or other secrets.

User's coding request:

${input}
`.trim();

    const result = await generateWithProvider({
      message: codingPrompt,
      history: [],
    });

    return {
      skill: "coding",
      message: result.reply,
    };
  },
};

import { GoogleGenAI } from "@google/genai";
import {
  buildSystemPrompt,
  buildContents,
} from "@/lib/ai/prompt";

type HistoryMessage = {
  role: "user" | "ai";
  text: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          reply: "GEMINI_API_KEY is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await req.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return Response.json(
        {
          reply: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const history: HistoryMessage[] =
      Array.isArray(body.history)
        ? body.history
        : [];

    const recentHistory = history.slice(-10);

    const ai = new GoogleGenAI({
      apiKey,
    });

    const result =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        config: {
          systemInstruction:
            buildSystemPrompt(),

          tools: [
            {
              googleSearch: {},
            },
          ],
        },

        contents: buildContents(
          recentHistory,
          message
        ),
      });

    return Response.json({
      reply:
        result.text?.trim() ??
        "Sorry, I couldn't generate a response.",
      sources: [],
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        reply:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
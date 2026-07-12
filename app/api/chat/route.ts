import { GoogleGenAI } from "@google/genai";

type HistoryMessage = { role: "user" | "ai"; text: string };

function isHistoryMessage(value: unknown): value is HistoryMessage {
  if (typeof value !== "object" || value === null) return false;

  const item = value as { role?: unknown; text?: unknown };

  return (
    (item.role === "user" || item.role === "ai") &&
    typeof item.text === "string"
  );
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { reply: "GEMINI_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const body: unknown = await req.json();
    const data =
      typeof body === "object" && body !== null
        ? (body as { message?: unknown; history?: unknown; image?: unknown })
        : {};

    const message =
      typeof data.message === "string" ? data.message.trim() : "";

    if (!message) {
      return Response.json({ reply: "Message is required." }, { status: 400 });
    }

    const history: HistoryMessage[] = Array.isArray(data.history)
      ? data.history.filter(
          (item: unknown): item is HistoryMessage => isHistoryMessage(item)
        )
      : [];

    const recentHistory = history.slice(-10);
    const lastMessage = recentHistory[recentHistory.length - 1];

    if (
      !lastMessage ||
      lastMessage.role !== "user" ||
      lastMessage.text !== message
    ) {
      recentHistory.push({ role: "user", text: message });
    }

    const imageDataUrl =
      typeof data.image === "string" ? data.image : "";

    const imageMatch = imageDataUrl.match(
      /^data:(image\/(?:png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=]+)$/
    );

    const image = imageMatch
      ? { mimeType: imageMatch[1], base64Data: imageMatch[2] }
      : null;

    const contents = recentHistory.map((item, index) => {
      const parts = [{ text: item.text }];

      if (
        image &&
        index === recentHistory.length - 1 &&
        item.role === "user"
      ) {
        parts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.base64Data,
          },
        } as never);
      }

      return {
        role: item.role === "ai" ? "model" : "user",
        parts,
      };
    });

    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
      config: {
        systemInstruction:
          "You are Sweety AI, a warm and helpful AI chatbot and voice assistant. Use Google Search for current information. Analyze uploaded images carefully. Keep answers clear and respectful.",
        tools: [{ googleSearch: {} }],
      },
      contents,
    });

    const groundingMetadata = (
      result.candidates?.[0] as
        | {
            groundingMetadata?: {
              groundingChunks?: Array<{
                web?: { title?: string; uri?: string };
              }>;
            };
          }
        | undefined
    )?.groundingMetadata;

    const sources =
      groundingMetadata?.groundingChunks
        ?.map((chunk) => ({
          title: chunk.web?.title || "Web source",
          uri: chunk.web?.uri || "",
        }))
        .filter((source) => source.uri) || [];

    return Response.json({
      reply: result.text?.trim() || "Sorry, I could not generate a response.",
      sources,
    });
  } catch (error: unknown) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        reply:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
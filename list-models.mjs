import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const models = await ai.models.list();

for await (const model of models) {
  console.log("------------------------------------------------");
  console.log(model.name);
  console.log("Display:", model.displayName);
  console.log("Methods:", model.supportedActions);
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
}

export const Models: AIModel[] = [
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
  },
];
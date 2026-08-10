import { Skill } from "../types";
import { generateImage } from "../../../../services/image/imageService";

export const imageSkill: Skill = {

  id: "image",

  name: "Image",

  description: "Generate and edit images",

  intents: [
    "create image",
    "generate image",
    "edit image",
    "modify image"
  ],

  async execute(
    input: string,
    context?: unknown
  ) {

    const text = input.toLowerCase();

    if (
      text.includes("edit") ||
      text.includes("modify")
    ) {

      return {

        skill: "image",

        action: "edit",

        message: "Image editing request detected.",

        instruction: input,

        context

      };

    }

    const result =
      await generateImage(input);

    if (!result.success) {

      return {

        skill: "image",

        action: "generate",

        error:
          result.error ??
          "Image generation failed."

      };

    }

    return {

      skill: "image",

      action: "generate",

      imageUrl:
        result.imageUrl ??
        (
          result.imageBase64
            ? `data:image/png;base64,${result.imageBase64}`
            : undefined
        ),

      caption:
        result.fallback
          ? (
              result.message ??
              "AI image generation is currently unavailable. A fallback preview was returned."
            )
          : "Image generated successfully.",

      provider:
        result.provider,

      fallback:
        result.fallback ?? false

    };

  }

};

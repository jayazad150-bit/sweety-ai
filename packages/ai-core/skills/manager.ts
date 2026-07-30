import { getSkill } from "./registry";

export async function executeSkill(
  id: string,
  input: string,
  context?: unknown
) {

  const skill = getSkill(id);

  if (!skill) {
    return {
      success: false,
      error: `Skill '${id}' not found.`
    };
  }

  try {

    const result =
      await skill.execute(input, context);

    return {
      success: true,
      result
    };

  } catch (error) {

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown skill error"
    };

  }

}

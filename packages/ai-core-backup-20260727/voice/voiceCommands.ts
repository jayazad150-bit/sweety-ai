export type VoiceCommand =
  | {
      type: "stop-speaking";
    }
  | {
      type: "repeat";
    }
  | {
      type: "clear";
    }
  | {
      type: "stop-voice-mode";
    }
  | {
      type: "unknown";
      text: string;
    };

export function detectVoiceCommand(
  text: string
): VoiceCommand {
  const command =
    text
      .trim()
      .toLowerCase();

  if (!command) {
    return {
      type: "unknown",
      text: "",
    };
  }

  if (
    command === "stop speaking" ||
    command === "stop talking" ||
    command === "be quiet"
  ) {
    return {
      type: "stop-speaking",
    };
  }

  if (
    command === "repeat that" ||
    command === "say that again" ||
    command === "repeat"
  ) {
    return {
      type: "repeat",
    };
  }

  if (
    command === "clear conversation" ||
    command === "clear chat" ||
    command === "clear everything"
  ) {
    return {
      type: "clear",
    };
  }

  if (
    command === "stop voice mode" ||
    command === "stop listening" ||
    command === "exit voice mode"
  ) {
    return {
      type: "stop-voice-mode",
    };
  }

  return {
    type: "unknown",
    text,
  };
}

export interface ContentHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export function buildContents(
  history: ContentHistoryMessage[] = [],
  message: string
) {
  const contents = history
    .filter(
      (item) =>
        item.content &&
        item.content.trim()
    )
    .map((item) => ({
      role:
        item.role === "assistant"
          ? "model"
          : "user",

      parts: [
        {
          text: item.content,
        },
      ],
    }));

  contents.push({
    role: "user",

    parts: [
      {
        text: message,
      },
    ],
  });

  return contents;
}

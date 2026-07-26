export interface ContentHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ContentImage {
  mimeType: string;
  data: string;
}

type ContentPart =
  | {
      text: string;
    }
  | {
      inlineData: {
        mimeType: string;
        data: string;
      };
    };

type ContentItem = {
  role: "user" | "model";
  parts: ContentPart[];
};

export function buildContents(
  history: ContentHistoryMessage[] = [],
  message: string,
  image?: ContentImage
): ContentItem[] {
  const contents: ContentItem[] = history
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

  const userParts: ContentPart[] = [];

  if (message.trim()) {
    userParts.push({
      text: message,
    });
  }

  if (image) {
    userParts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.data,
      },
    });
  }

  contents.push({
    role: "user",
    parts: userParts,
  });

  return contents;
}

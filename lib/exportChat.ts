import type { Message } from "../types/chat";

export function exportChat(messages: Message[]) {
  if (messages.length === 0) {
    alert("No chat to export.");
    return;
  }

  const content = messages
    .map((message) => {
      const sender = message.role === "user" ? "You" : "Sweety AI";

      return `[${new Date(message.timestamp).toLocaleString()}]
${sender}:
${message.text}

----------------------------------------

`;
    })
    .join("");

  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `SweetyAI-${new Date()
    .toISOString()
    .slice(0, 10)}.txt`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
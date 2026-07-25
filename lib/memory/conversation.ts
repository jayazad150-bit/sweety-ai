export interface ConversationMessage {
  role: "user" | "ai";
  text: string;
  timestamp: number;
}

let conversations: ConversationMessage[] = [];

export function getConversation() {
  return conversations;
}

export function addMessage(
  message: ConversationMessage
) {
  conversations.push(message);
}

export function clearConversation() {
  conversations = [];
}
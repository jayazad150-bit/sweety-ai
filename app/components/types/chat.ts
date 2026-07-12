export interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Source {
  title: string;
  uri: string;
}

export interface ChatResponse {
  reply: string;
  sources?: Source[];
}
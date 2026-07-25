export interface Conversation {

  role: "user" | "assistant";

  text: string;

  created: number;

}

export class ConversationManager {

  private history: Conversation[] = [];

  add(role: "user" | "assistant", text: string) {

    this.history.push({

      role,

      text,

      created: Date.now(),

    });

  }

  all() {

    return this.history;

  }

  clear() {

    this.history = [];

  }

}
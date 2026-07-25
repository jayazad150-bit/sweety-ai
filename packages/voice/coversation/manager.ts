export class ConversationManager {
  history: string[] = [];

  add(text: string) {
    this.history.push(text);
  }
}
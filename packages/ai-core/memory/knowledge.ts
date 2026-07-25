export class KnowledgeMemory {
  private knowledge: string[] = [];

  add(entry: string) {
    this.knowledge.push(entry);
  }

  getAll() {
    return this.knowledge;
  }
}
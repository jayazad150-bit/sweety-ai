export interface MemoryEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export class Memory {
  private history: MemoryEntry[] = [];

  add(role: "user" | "assistant", content: string) {
    this.history.push({
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    });

    // Keep only the latest 100 messages
    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  recent(limit = 10): MemoryEntry[] {
    return this.history.slice(-limit);
  }

  clear() {
    this.history = [];
  }

  search(keyword: string): MemoryEntry[] {
    const q = keyword.toLowerCase();

    return this.history.filter((item) =>
      item.content.toLowerCase().includes(q)
    );
  }

  export(): MemoryEntry[] {
    return [...this.history];
  }
}
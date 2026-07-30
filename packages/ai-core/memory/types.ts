export interface MemoryItem {
  id: string;
  content: string;
  createdAt: number;
}

export interface MemorySearchResult {
  items: MemoryItem[];
}
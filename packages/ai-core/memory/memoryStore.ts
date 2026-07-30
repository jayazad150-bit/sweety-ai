import { ShortTermMemory } from "./shortTerm";
import { LongTermMemory } from "./longTerm";
import { ProfileMemory } from "./profile";

export class MemoryStore {
  short = new ShortTermMemory();

  long = new LongTermMemory();

  profile = new ProfileMemory();
}
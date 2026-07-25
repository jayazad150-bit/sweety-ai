import { decide } from "./decision";

export class ReasoningEngine {
  run(message: string) {
    return decide(message);
  }
}
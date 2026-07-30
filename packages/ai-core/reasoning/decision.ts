import { analyze } from "./analyzer";
import { validateDecision } from "./validator";

export function decide(message: string) {
  const result = analyze(message);

  return {
    ...result,
    valid: validateDecision(result.confidence),
  };
}
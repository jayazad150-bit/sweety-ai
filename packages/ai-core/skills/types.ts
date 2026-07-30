export interface Skill {

  id: string;

  name: string;

  description: string;

  intents?: string[];

  execute(
    input: string,
    context?: unknown
  ): Promise<unknown>;

}

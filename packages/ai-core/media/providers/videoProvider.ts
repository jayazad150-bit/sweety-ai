export interface VideoProvider {

  id: string;

  name: string;

  generate(
    prompt: string
  ): Promise<unknown>;

  edit(
    video: string,
    instruction: string
  ): Promise<unknown>;

}

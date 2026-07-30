export interface ImageProvider {

  id: string;

  name: string;

  generate(
    prompt: string
  ): Promise<unknown>;

  edit(
    image: string,
    instruction: string
  ): Promise<unknown>;

}

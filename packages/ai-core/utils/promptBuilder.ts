export interface PromptSection {
  title: string;
  content: string;
}

export interface PromptBuilderOptions {
  system?: string;
  history?: string[];
  user: string;
  context?: string[];
}

export class PromptBuilder {
  build(options: PromptBuilderOptions): string {
    const sections: string[] = [];

    if (options.system) {
      sections.push(
        `SYSTEM\n${options.system}`
      );
    }

    if (
      options.context &&
      options.context.length > 0
    ) {
      sections.push(
        `CONTEXT\n${options.context.join("\n")}`
      );
    }

    if (
      options.history &&
      options.history.length > 0
    ) {
      sections.push(
        `HISTORY\n${options.history.join("\n")}`
      );
    }

    sections.push(
      `USER\n${options.user}`
    );

    return sections.join("\n\n");
  }

  buildSections(
    sections: PromptSection[]
  ): string {
    return sections
      .map(
        (section) =>
          `${section.title}\n${section.content}`
      )
      .join("\n\n");
  }
}
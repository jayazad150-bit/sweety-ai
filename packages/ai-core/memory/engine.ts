import { ShortTermMemory } from "./shortTerm";
import { LongTermMemory } from "./longTerm";
import { SessionMemory } from "./session";

import type { AIMessage } from "../types";


export class MemoryEngine {

  shortTerm: ShortTermMemory;

  longTerm: LongTermMemory;

  session: SessionMemory;


  constructor() {

    this.shortTerm =
      new ShortTermMemory();

    this.longTerm =
      new LongTermMemory();

    this.session =
      new SessionMemory();

  }


  async remember(
    message: AIMessage
  ): Promise<void> {

    await this.shortTerm.add(
      message
    );


    await this.session.add(
      message
    );


    await this.longTerm.add(
      message
    );

  }


  async recall(): Promise<AIMessage[]> {

    const shortMemory =
      await this.shortTerm.get();


    const sessionMemory =
      await this.session.get();


    const longMemory =
      await this.longTerm.get();


    return [
      ...longMemory,
      ...sessionMemory,
      ...shortMemory,
    ];

  }


  async clear(): Promise<void> {

    await this.shortTerm.clear();

    await this.session.clear();

    await this.longTerm.clear();

  }

}

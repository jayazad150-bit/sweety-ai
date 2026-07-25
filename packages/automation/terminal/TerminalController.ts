export class TerminalController {

  async execute(command: string) {

    console.log("Execute:", command);

    return {
      success: true,
      output: "",
    };

  }

}
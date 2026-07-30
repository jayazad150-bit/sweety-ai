import { automationEngine } from "./automation";
import { checkServerStatus } from "./skills/server";
import { openWebsite } from "./skills/browser";
import { writeFile, readFile } from "./skills/files";


export function registerAutomationSkills() {

  automationEngine.register({

    name: "system_status",

    description:
      "Check Sweety system status",

    execute: async () => {

      return await checkServerStatus();

    }

  });


  automationEngine.register({

    name: "open_website",

    description:
      "Open a website",

    execute: async (input) => {

      const url =
        typeof input === "string"
          ? input
          : "";

      return await openWebsite(url);

    }

  });


  automationEngine.register({

    name: "write_file",

    description:
      "Create or save a file",

    execute: async (input) => {

      const data = input as {
        path: string;
        content: string;
      };

      return await writeFile(
        data.path,
        data.content
      );

    }

  });


  automationEngine.register({

    name: "read_file",

    description:
      "Read a file",

    execute: async (input) => {

      const data = input as {
        path: string;
      };

      return await readFile(
        data.path
      );

    }

  });

}
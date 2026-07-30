import fs from "fs/promises";


export async function writeFile(
  path: string,
  content: string
) {

  await fs.writeFile(
    path,
    content,
    "utf-8"
  );


  return {
    success: true,
    action: "write_file",
    path
  };

}


export async function readFile(
  path: string
) {

  const content =
    await fs.readFile(
      path,
      "utf-8"
    );


  return {
    success: true,
    action: "read_file",
    path,
    content
  };

}
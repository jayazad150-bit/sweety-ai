import { existsSync, readFileSync, writeFileSync } from "fs";

const DB_PATH = "./memory.json";

export function readDatabase<T>(defaultValue: T): T {
  try {
    if (!existsSync(DB_PATH)) {
      writeFileSync(
        DB_PATH,
        JSON.stringify(defaultValue, null, 2)
      );

      return defaultValue;
    }

    const file = readFileSync(DB_PATH, "utf8");

    return JSON.parse(file);
  } catch {
    return defaultValue;
  }
}

export function writeDatabase<T>(data: T) {
  writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2)
  );
}
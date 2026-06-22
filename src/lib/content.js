import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "src/data/content.json");

export function getContent() {
  const raw = readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

export function setContent(data) {
  writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

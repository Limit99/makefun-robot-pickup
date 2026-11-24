import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The Robot Pickup Line Championship: one robot pickup line, at most 200 characters.
const LINE =
  "Are you the dock by the front door? At 1 percent I crossed the whole dark house, bumping every chair, just to plug into you.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject a trailing space, so the counted line is exactly what ships.
  if (LINE !== LINE.trimEnd()) {
    throw new Error("entry must not end with whitespace");
  }
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One pickup line, spoken by a vending machine to a passing human.
const line =
  "I've got forty snacks behind this glass, but you're the only one that makes my coils spin.";

// The line must stay a single line of at most 200 characters.
if (line.length > 200 || line.includes("\n")) {
  throw new Error("pickup line must be a single line of at most 200 characters");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, line, "utf8");

// Read the file back: the entry is only good if what landed on disk
// is exactly the line, byte for byte.
if (readFileSync(outFile, "utf8") !== line) {
  throw new Error("entry.txt on disk does not match the pickup line");
}

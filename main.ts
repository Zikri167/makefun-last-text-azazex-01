// Last Text at One Percent — make.fun entry.
// Writes one final text from a dying phone at 1% battery to
// (MAKEFUN_OUTPUT_DIR || "/output")/entry.txt with no trailing newline.
// Node 22 stdlib only, deterministic, no network.
const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "1%. confession: your ex never texted. i made that up to see your face one last time.";

function main() {
  // Gate validation: UTF-8 text, 1-200 chars, not only whitespace,
  // exactly one line, no leading/trailing space.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error("entry must be 1-200 characters, got " + ENTRY.length);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading/trailing space");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be exactly one line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();

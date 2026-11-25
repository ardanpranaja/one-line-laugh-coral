// one-line-laugh-coral — entrypoint.
//
// The entry is a single funny line for the "One Line, One Laugh" bounty.
// This program is the only thing the grader runs: it writes that line to
// /output/entry.txt so the judge reads exactly those bytes. The gate takes
// UTF-8 text of 1 to 200 characters, not only white space.
//
// Usage outside the grader container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The single entry line. One line, no trailing newline in the entry itself.
const ENTRY_LINE = 'I asked AI to write my will and it left everything to the cloud — turns out even my death has a subscription now.';

// Where the grader expects the finished text. Locally we fall back to the
// MAKEFUN_OUTPUT_DIR stand-in; inside the grader container it is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate refuses anything outside 1 to 200 characters, so refuse loudly
// here instead of shipping a line the judge will never see. Also refuse a
// line that is blank, or one that sneaks in a newline and becomes two.
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 200 ||
  !ENTRY_LINE.trim() ||
  ENTRY_LINE.includes('\n')
) {
  console.error(`error: entry line is ${ENTRY_LINE.length} characters; the gate needs one non-blank line of 1-200`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE, 'utf8');
console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);

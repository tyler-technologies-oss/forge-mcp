#!/usr/bin/env node
// PreToolUse hook for Edit/Write/MultiEdit. Blocks Forge UI writes that skip
// get_forge_blocks so the model grounds markup in an existing block instead
// of inventing structure.
// Exit 2 = block (message on stderr surfaces to the model); exit 0 = allow.
import { readFileSync } from 'node:fs';

// MCP tool name used to fetch Forge blocks; matched against transcript entries.
const BLOCK_TOOL_NAME = 'mcp__plugin_forge_forge__get_forge_blocks';
const FORGE_TAG_RE = /<forge-[a-z0-9-]+\b/i;

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

// Pull the tool name + the text being written across Write (content),
// Edit (new_string), and MultiEdit (edits[].new_string).
function extractWriteContent(payload) {
  const tool = payload.tool_name || payload.tool || '';
  const input = payload.tool_input || payload.input || {};
  const parts = [];

  if (typeof input.content === 'string') parts.push(input.content);
  if (typeof input.new_string === 'string') parts.push(input.new_string);
  if (Array.isArray(input.edits)) {
    for (const edit of input.edits) {
      if (edit && typeof edit.new_string === 'string')
        parts.push(edit.new_string);
    }
  }
  return { tool, text: parts.join('\n') };
}

// "This turn" = since the most recent user message in the transcript.
// Walk the JSONL backward to find that boundary, then scan forward for any
// mention of the blocks tool. Substring match on the raw line is intentional —
// tool_use entries embed the name as a plain string, so parsing every line
// isn't worth the cost.
function scanTranscriptForBlocksCall(transcriptPath) {
  if (!transcriptPath) return false;
  let raw;
  try {
    raw = readFileSync(transcriptPath, 'utf8');
  } catch {
    return false;
  }

  const lines = raw.split('\n');
  let lastUserIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const role = entry.role || entry.message?.role || entry.type;
    if (role === 'user' || entry.type === 'user') {
      lastUserIdx = i;
      break;
    }
  }
  const searchStart = lastUserIdx >= 0 ? lastUserIdx : 0;

  for (let i = searchStart; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (line.includes(BLOCK_TOOL_NAME) || line.includes('get_forge_blocks')) {
      return true;
    }
  }
  return false;
}

function block(message) {
  process.stderr.write(message + '\n');
  process.exit(2);
}

function allow() {
  process.exit(0);
}

function main() {
  // Fail-open on unusable input: better to let a benign write through than to
  // wedge the tool call on a malformed payload from a future harness change.
  const raw = readStdin();
  if (!raw.trim()) allow();

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    allow();
    return;
  }

  const { tool, text } = extractWriteContent(payload);
  if (!/^(Edit|Write|MultiEdit)$/.test(tool)) allow();
  if (!text) allow();

  // Only Forge-touching writes are in scope for the rule below.
  const hasForgeMarkup = FORGE_TAG_RE.test(text);
  if (!hasForgeMarkup) allow();

  // Require a get_forge_blocks call earlier this turn so Forge markup is
  // grounded in an existing block instead of invented from memory.
  const transcriptPath = payload.transcript_path || payload.transcriptPath;
  const blocksFetched = scanTranscriptForBlocksCall(transcriptPath);
  if (!blocksFetched) {
    block(
      [
        "Forge UI rule violation: you're writing <forge-*> markup without first calling get_forge_blocks this turn.",
        '',
        'Before writing Forge UI, call get_forge_blocks to ground the markup in an existing block. Extract the specific pattern you need — do not reinvent structure.',
        'For layouts inside components (cards, drawers, dialogs), also consider fetching a scaffold-based block rather than writing custom CSS.',
      ].join('\n'),
    );
  }

  allow();
}

main();

#!/usr/bin/env node
/**
 * 深度遍历 generate_from_figma 返回的 AST：任一节点 `type` 为字符串且以 `UI` 开头，
 * 即认定需要安装 `@xybot/ui` 与 `antd@5.27.4`。stdout 输出一行 JSON，供对齐 package.json。
 *
 * 用法:
 *   node analyze_figma_ast_dependencies.mjs --file ./mcp-result.json
 *   cat mcp-result.json | node analyze_figma_ast_dependencies.mjs
 *
 * 无外部依赖。
 */

import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const XYBOT_UI_VERSION = '*';
const ANTD_VERSION = '5.27.4';

function extractAst(root) {
  if (root == null || typeof root !== 'object') return null;
  if (root.processed != null && root.processed.ast != null)
    return root.processed.ast;
  if (root.ast != null) return root.ast;
  if (typeof root.type === 'string' || Array.isArray(root.children))
    return root;
  return null;
}

/** @param {unknown} node @param {Set<string>} out */
function collectUiTypes(node, out) {
  if (node == null || typeof node !== 'object') return;
  const t = node.type;
  if (typeof t === 'string' && t.startsWith('UI')) out.add(t);
  const kids = node.children;
  if (!Array.isArray(kids)) return;
  for (const c of kids) collectUiTypes(c, out);
}

function readInputJson(filePath) {
  const raw =
    filePath != null ? readFileSync(filePath, 'utf8') : readFileSync(0, 'utf8');
  return JSON.parse(raw);
}

function main() {
  const { values } = parseArgs({
    options: {
      file: { type: 'string', short: 'f' },
    },
    allowPositionals: true,
  });

  let payload;
  try {
    payload = readInputJson(values.file);
  } catch (e) {
    console.error(String(e?.message || e));
    process.exit(2);
  }

  const ast = extractAst(payload);
  if (ast == null) {
    console.error(
      'analyze_figma_ast_dependencies: 无法解析 AST（需要 processed.ast、ast 或根节点）',
    );
    process.exit(2);
  }

  const matched = new Set();
  collectUiTypes(ast, matched);
  const matchedTypes = [...matched].sort();
  const needsXybotUi = matchedTypes.length > 0;

  const dependencies = needsXybotUi
    ? { '@xybot/ui': XYBOT_UI_VERSION, antd: ANTD_VERSION }
    : {};

  console.log(
    JSON.stringify({
      needsXybotUi,
      dependencies,
      matchedTypes,
    }),
  );
}

main();

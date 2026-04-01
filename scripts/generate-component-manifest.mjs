/**
 * Build-time: scan src/components and emit dist/component-manifest.json
 * for the xybotui CLI (props from react-docgen-typescript, demo sources from example/).
 *
 * react-docgen 常把 `type?: UIButtonType` 显示成别名本身；这里用 TS checker 再解析一遍，
 * 把类型别名展开成字面量联合等更可读的形式。
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);
const docgen = require('react-docgen-typescript');

/** peer: react-docgen-typescript；未安装时仅走 docgen，不做别名展开 */
let ts = null;
try {
  ts = require('typescript');
} catch {
  console.warn(
    '[xybotui manifest] 未安装 typescript，props 类型将仅使用 react-docgen 结果（别名可能未展开）。请安装 devDependency: typescript',
  );
}

const COMPONENTS_INDEX = path.join(root, 'src/components/index.ts');
const COMPONENTS_ROOT = path.join(root, 'src/components');
const BLOCKS_INDEX = path.join(root, 'src/blocks/index.ts');
const BLOCKS_ROOT = path.join(root, 'src/blocks');
const OUT = path.join(root, 'dist/component-manifest.json');

/** @type {Record<string, string>} filename relative to component dir */
const DOCGEN_ENTRY_COMPONENTS = {
  UITag: 'tag.tsx',
  UITable: 'UITable.tsx',
  UIInput: 'input.tsx',
};

function parseExportNamesFromIndex(indexPath) {
  const src = fs.readFileSync(indexPath, 'utf8');
  const re = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g;
  const names = [];
  let m;
  while ((m = re.exec(src))) {
    names.push(m[1]);
  }
  return names;
}

function getDocgenEntryPath(componentDirName, baseRoot, overrides) {
  const dir = path.join(baseRoot, componentDirName);
  const override = overrides[componentDirName];
  if (override) {
    const p = path.join(dir, override);
    if (fs.existsSync(p)) return p;
  }
  const indexTsx = path.join(dir, 'index.tsx');
  if (fs.existsSync(indexTsx)) return indexTsx;
  const indexTs = path.join(dir, 'index.ts');
  if (fs.existsSync(indexTs)) return indexTs;
  return null;
}

function pickComponentDoc(parsed, componentDirName) {
  if (!parsed?.length) return null;
  const exact = parsed.find((d) => d.displayName === componentDirName);
  if (exact) return exact;
  const ui = parsed.find((d) => /^UI[A-Z]/.test(d.displayName || ''));
  if (ui) return ui;
  return parsed[0];
}

/** @param {import('typescript').TypeChecker} checker */
function expandTypeForDisplay(checker, type, depth = 0) {
  if (depth > 24 || !type) {
    return checker.typeToString(type);
  }

  if (type.isUnion()) {
    return type.types
      .map((t) => expandTypeForDisplay(checker, t, depth + 1))
      .join(' | ');
  }

  if (type.isIntersection()) {
    return type.types
      .map((t) => expandTypeForDisplay(checker, t, depth + 1))
      .join(' & ');
  }

  const sym = type.aliasSymbol;
  if (sym && sym.flags & ts.SymbolFlags.TypeAlias) {
    const resolved = checker.getDeclaredTypeOfSymbol(sym);
    if (resolved && resolved !== type) {
      return expandTypeForDisplay(checker, resolved, depth + 1);
    }
  }

  return checker.typeToString(type);
}

/**
 * @param {import('typescript').SourceFile} sourceFile
 * @param {string} componentDirName
 */
function findExportedFunctionNamed(sourceFile, componentDirName) {
  if (!ts) return undefined;
  /** @type {import('typescript').FunctionDeclaration | undefined} */
  let found;
  function visit(node) {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name?.text === componentDirName &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

/**
 * @param {import('typescript').SourceFile} sourceFile
 * @param {string} componentDirName
 */
function pickPropsTypeDeclaration(sourceFile, componentDirName) {
  if (!ts) return null;
  /** @type {(import('typescript').TypeAliasDeclaration | import('typescript').InterfaceDeclaration)[]} */
  const candidates = [];
  function visit(node) {
    if (ts.isTypeAliasDeclaration(node) && /Props$/.test(node.name.text)) {
      candidates.push(node);
    }
    if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
      candidates.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (candidates.length === 0) return null;
  const exact = candidates.find((d) => d.name.text === `${componentDirName}Props`);
  if (exact) return exact;
  const prefix = candidates.find((d) => d.name.text.startsWith(componentDirName));
  if (prefix) return prefix;
  if (candidates.length === 1) return candidates[0];
  return null;
}

/**
 * @param {import('typescript').Program} program
 * @param {string} entryPath
 * @param {string} componentDirName
 * @returns {Record<string, string> | null}
 */
function getExpandedPropTypesFromTs(program, entryPath, componentDirName) {
  if (!ts) return null;
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryPath);
  if (!sourceFile) return null;

  const func = findExportedFunctionNamed(sourceFile, componentDirName);
  const param = func?.parameters?.[0];

  /** @type {import('typescript').Type | undefined} */
  let propsType;

  if (param) {
    propsType = checker.getTypeAtLocation(param);
  } else {
    const decl = pickPropsTypeDeclaration(sourceFile, componentDirName);
    if (!decl) return null;
    if (ts.isTypeAliasDeclaration(decl)) {
      propsType = checker.getTypeAtLocation(decl.type);
    } else if (ts.isInterfaceDeclaration(decl)) {
      propsType = checker.getDeclaredTypeOfSymbol(decl.symbol);
    }
  }

  if (!propsType) return null;

  const map = {};
  for (const sym of checker.getPropertiesOfType(propsType)) {
    const name = sym.getName();
    const decls = sym.getDeclarations();
    const node = decls?.[0];
    if (!node) continue;
    const propType = checker.getTypeOfSymbolAtLocation(sym, node);
    map[name] = expandTypeForDisplay(checker, propType);
  }
  return Object.keys(map).length ? map : null;
}

function createProgramOnce() {
  if (!ts) return null;
  const configPath = path.join(root, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    root,
  );
  return ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options,
  });
}

/** docgen 在 union 展开为 enum 时的结构 */
function formatDocgenTypeProp(info) {
  const t = info.type;
  if (!t) return '';
  if (t.name === 'enum' && Array.isArray(t.value)) {
    if (t.raw) return t.raw;
    return t.value
      .map((v) =>
        v && typeof v === 'object' && 'value' in v ? String(v.value) : '',
      )
      .filter(Boolean)
      .join(' | ');
  }
  return t.name ?? '';
}

/** 从 HTMLAttributes / DOMAttributes 继承的噪音，manifest 中默认剔除 */
function isInheritedDomNoiseProp(name) {
  return name.startsWith('aria-') || name.startsWith('data-');
}

/**
 * React 从 DOM 继承的合成事件 on*（onClick、onCopyCapture 等），类型多为 *EventHandler / *Event。
 * 业务回调如 onValuesChange、onSearch 通常不含这些类型字样，予以保留。
 * @param {string} name
 * @param {string} typeStr
 */
function isReactDomEventHandlerNoise(name, typeStr) {
  if (!/^on[A-Z]/.test(name)) return false;
  const t = typeStr || '';
  return (
    /EventHandler/.test(t) ||
    /EventListener/.test(t) ||
    /\bSyntheticEvent\b/.test(t) ||
    /\bReact\.(Mouse|Pointer|Keyboard|Focus|Form|Change|Clipboard|Composition|Drag|Touch|UI|Wheel|Animation|Toggle|Input)Event\b/i.test(
      t,
    )
  );
}

/**
 * react-docgen 的 defaultValue 多为 { value: ... }，直接 String() 会得到 [object Object]
 * @param {unknown} dv
 * @returns {string | null}
 */
function formatDocgenDefaultValue(dv) {
  if (dv === undefined || dv === null) return null;
  let inner = dv;
  if (typeof dv === 'object' && dv !== null && 'value' in dv) {
    inner = /** @type {{ value?: unknown }} */ (dv).value;
  }
  if (inner === undefined) return null;
  if (inner === null) return 'null';
  const t = typeof inner;
  if (t === 'string') return inner;
  if (t === 'number' || t === 'boolean' || t === 'bigint') return String(inner);
  if (t === 'function') {
    const s = String(inner);
    return s.length > 80 ? `${s.slice(0, 77)}…` : s;
  }
  try {
    return JSON.stringify(inner);
  } catch {
    return String(inner);
  }
}

function propsToArray(doc, expandedMap) {
  if (!doc?.props) return [];
  return Object.entries(doc.props)
    .filter(([name, info]) => {
      if (isInheritedDomNoiseProp(name)) return false;
      const expanded = expandedMap?.[name];
      const fromDocgen = formatDocgenTypeProp(info);
      const typeStr =
        expanded && expanded.trim().length > 0 ? expanded : fromDocgen;
      if (isReactDomEventHandlerNoise(name, typeStr)) return false;
      return true;
    })
    .map(([name, info]) => {
      const expanded = expandedMap?.[name];
      const fromDocgen = formatDocgenTypeProp(info);
      const typeStr =
        expanded && expanded.trim().length > 0 ? expanded : fromDocgen;

      return {
        name,
        type: typeStr,
        required: !!info.required,
        defaultValue: formatDocgenDefaultValue(info.defaultValue),
        description: info.description ? String(info.description).trim() : '',
      };
    });
}

/**
 * components 使用 example/；blocks 多为 examples/，个别为 example/
 * @returns {{ file: string, content: string }[]} file 为相对模块目录的路径，如 examples/demo1.tsx
 */
function readDemos(componentDirName, baseRoot) {
  const base = path.join(baseRoot, componentDirName);
  /** @type {{ file: string, content: string }[]} */
  const out = [];
  for (const sub of ['example', 'examples']) {
    const dir = path.join(base, sub);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => /^demo.*\.tsx$/.test(f));
    for (const file of files) {
      const rel = path.join(sub, file).replace(/\\/g, '/');
      out.push({
        file: rel,
        content: fs.readFileSync(path.join(dir, file), 'utf8'),
      });
    }
  }
  out.sort((a, b) =>
    a.file.localeCompare(b.file, undefined, { numeric: true }),
  );
  return out;
}

/**
 * 拆分 dumi 风格 frontmatter
 * @returns {{ front: string, body: string }}
 */
function splitFrontmatter(raw) {
  const trimmed = raw.replace(/^\uFEFF/, '');
  if (!trimmed.startsWith('---')) {
    return { front: '', body: trimmed };
  }
  const rest = trimmed.slice(3).replace(/^\r?\n/, '');
  const endMatch = rest.match(/\r?\n---\r?\n/);
  if (!endMatch || endMatch.index === undefined) {
    return { front: '', body: trimmed };
  }
  const front = rest.slice(0, endMatch.index);
  const body = rest.slice(endMatch.index + endMatch[0].length);
  return { front, body };
}

/**
 * 只解析顶层的 xybotuiDescription / description 单行字符串（避免引入 yaml 依赖）
 * @param {string} front
 * @returns {{ xybotuiDescription?: string, description?: string }}
 */
function parseMdFrontmatterStrings(front) {
  /** @type {{ xybotuiDescription?: string, description?: string }} */
  const out = {};
  if (!front) return out;
  for (const line of front.split(/\r?\n/)) {
    const m = line.match(/^(xybotuiDescription|description):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (!v || v === '|' || v === '>' || v === '|-' || v === '>-') continue;
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

/**
 * 去掉 GFM 表格（与 xybotui info 下方 props 表重复，且占终端版面）
 * @param {string} text
 */
function stripMarkdownPipeTables(text) {
  return text.replace(
    /(?:^|\r?\n)(\|[^\n]+\|\r?\n\|[\s\-:|]+\|\r?\n(?:\|[^\n]+\|\r?\n)+)/g,
    '\n',
  );
}

/** 去掉 dumi 嵌入 demo、admonition 等，保留可读正文 */
function normalizeIndexMdBody(body) {
  if (!body || !body.trim()) return null;
  let t = body;
  t = t.replace(/<code\s[^/>]*\/>/gi, '');
  t = t.replace(/<code\s[^>]*>[\s\S]*?<\/code>/gi, '');
  t = t.replace(/:::+\s*[\w-]*\s*\r?\n([\s\S]*?)\r?\n:::+\s*/gm, '$1\n');
  t = stripMarkdownPipeTables(t);
  t = t.replace(/\r?\n{3,}/g, '\n\n').trim();
  return t || null;
}

/**
 * @returns {{ text: string | null, indexMdPath: string | null }}
 */
function readDescriptionFromIndexMd(baseRoot, dirName) {
  const mdPath = path.join(baseRoot, dirName, 'index.md');
  if (!fs.existsSync(mdPath)) {
    return { text: null, indexMdPath: null };
  }
  const raw = fs.readFileSync(mdPath, 'utf8');
  const { front, body } = splitFrontmatter(raw);
  const fm = parseMdFrontmatterStrings(front);
  const fromFm =
    (fm.xybotuiDescription && fm.xybotuiDescription.trim()) ||
    (fm.description && fm.description.trim()) ||
    '';
  const fromBody = normalizeIndexMdBody(body);
  const text = fromFm || fromBody || null;
  return {
    text,
    indexMdPath: path.relative(root, mdPath).replace(/\\/g, '/'),
  };
}

function main() {
  const parser = docgen.withCustomConfig(
    path.join(root, 'tsconfig.json'),
    {
      savePropValueAsString: true,
      shouldExtractValuesFromUnion: true,
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  );

  const program = createProgramOnce();

  /** @type {Record<string, unknown>} */
  const manifest = {};

  const sections = [
    {
      indexPath: COMPONENTS_INDEX,
      baseRoot: COMPONENTS_ROOT,
      docgenOverrides: DOCGEN_ENTRY_COMPONENTS,
      kind: 'component',
    },
    {
      indexPath: BLOCKS_INDEX,
      baseRoot: BLOCKS_ROOT,
      docgenOverrides: {},
      kind: 'block',
    },
  ];

  for (const section of sections) {
    const names = parseExportNamesFromIndex(section.indexPath);
    for (const dirName of names) {
      if (manifest[dirName]) {
        console.warn(
          `[xybotui manifest] 名称 "${dirName}" 已存在，跳过重复导出（${section.kind}）`,
        );
        continue;
      }

      const entry = getDocgenEntryPath(
        dirName,
        section.baseRoot,
        section.docgenOverrides,
      );
      let props = [];
      let description = '';
      let displayName = dirName;

      let expandedMap = null;
      if (entry && program) {
        try {
          expandedMap = getExpandedPropTypesFromTs(program, entry, dirName);
        } catch (e) {
          console.warn(
            `[xybotui manifest] TS expand failed for ${dirName}:`,
            e.message,
          );
        }
      }

      if (entry) {
        try {
          const parsed = parser.parse(entry);
          const doc = pickComponentDoc(parsed, dirName);
          if (doc) {
            props = propsToArray(doc, expandedMap);
            description = doc.description ? String(doc.description).trim() : '';
            displayName = doc.displayName || dirName;
          }
        } catch (e) {
          console.warn(`[xybotui manifest] docgen failed for ${dirName}:`, e.message);
        }
      }

      const mdDoc = readDescriptionFromIndexMd(section.baseRoot, dirName);

      manifest[dirName] = {
        kind: section.kind,
        displayName,
        description,
        descriptionFromIndexMd: mdDoc.text,
        indexMd: mdDoc.indexMdPath,
        props,
        demos: readDemos(dirName, section.baseRoot),
        docgenEntry: entry ? path.relative(root, entry) : null,
      };
    }
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(manifest));
  const n = Object.keys(manifest).length;
  console.log(
    `[xybotui manifest] wrote ${n} entries (components + blocks) -> ${path.relative(root, OUT)}`,
  );
}

main();

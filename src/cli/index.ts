import { Command } from 'commander';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

type ManifestProp = {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
};

type ManifestDemo = {
  file: string;
  content: string;
};

type ManifestEntry = {
  /** 通用 UI 组件为 component，src/blocks 下为 block */
  kind?: 'component' | 'block';
  displayName: string;
  /** react-docgen / JSDoc */
  description: string;
  /** dumi index.md：frontmatter 的 xybotuiDescription 或 description，否则为清理后的正文 */
  descriptionFromIndexMd?: string | null;
  /** 相对仓库根的 index.md 路径 */
  indexMd?: string | null;
  props: ManifestProp[];
  demos: ManifestDemo[];
  docgenEntry: string | null;
};

type ComponentManifest = Record<string, ManifestEntry>;

function getManifestPath(): string {
  return join(__dirname, 'component-manifest.json');
}

function loadManifest(): ComponentManifest {
  const p = getManifestPath();
  if (!existsSync(p)) {
    console.error(
      '未找到 component-manifest.json。请先在本包根目录执行 npm run build 生成清单。',
    );
    process.exit(1);
  }
  const raw = readFileSync(p, 'utf8');
  return JSON.parse(raw) as ComponentManifest;
}

function resolveComponentKey(
  input: string,
  manifest: ComponentManifest,
): string | null {
  const keys = Object.keys(manifest);
  const lower = input.trim().toLowerCase();
  const hit = keys.find((k) => k.toLowerCase() === lower);
  return hit ?? null;
}

function formatPropsTable(props: ManifestProp[]): string {
  if (!props.length) {
    return '（未能解析到 props，可能为薄封装；类型定义请查看源码或 antd 对应组件文档。）\n';
  }
  const lines = ['name\trequired\tdefault\ttype', '----\t--------\t-------\t----'];
  for (const p of props) {
    const def = p.defaultValue ?? '—';
    const req = p.required ? 'yes' : 'no';
    lines.push(`${p.name}\t${req}\t${def}\t${p.type}`);
  }
  return lines.join('\n');
}

const program = new Command();

function readPackageVersion(): string {
  try {
    const pkgPath = join(__dirname, '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: string };
    return pkg.version ?? '0.0.0';
  } catch {
    return process.env.npm_package_version ?? '0.0.0';
  }
}

program
  .name('xybotui')
  .description('@xybot/ui 组件库命令行')
  .version(readPackageVersion());

program
  .command('list')
  .description('列出全部组件（含 src/blocks 业务块）')
  .option('--json', '以 JSON 输出 { components, blocks }')
  .action((opts: { json?: boolean }) => {
    const manifest = loadManifest();
    const names = Object.keys(manifest);
    const components = names
      .filter((n) => (manifest[n].kind ?? 'component') === 'component')
      .sort();
    const blocks = names
      .filter((n) => (manifest[n].kind ?? 'component') === 'block')
      .sort();
    if (opts.json) {
      console.log(JSON.stringify({ components, blocks }, null, 2));
    } else {
      if (components.length) {
        console.log('## components');
        for (const n of components) {
          console.log(n);
        }
      }
      if (blocks.length) {
        if (components.length) console.log('');
        console.log('## blocks');
        for (const n of blocks) {
          console.log(n);
        }
      }
    }
  });

program
  .command('info')
  .description('查看组件 / block 的 props（来自构建期 TS 解析）')
  .argument('<name>', '名称，如 UIButton、CustomModal')
  .option('--json', '以 JSON 输出')
  .action((name: string, opts: { json?: boolean }) => {
    const manifest = loadManifest();
    const key = resolveComponentKey(name, manifest);
    if (!key) {
      console.error(`未找到「${name}」。执行 xybotui list 查看可用名称。`);
      process.exit(1);
    }
    const entry = manifest[key];
    if (opts.json) {
      console.log(JSON.stringify(entry, null, 2));
    } else {
      const kind = entry.kind ?? 'component';
      console.log(`${kind === 'block' ? 'block' : '组件'}: ${key}`);
      if (entry.displayName && entry.displayName !== key) {
        console.log(`displayName: ${entry.displayName}`);
      }
      if (entry.description) {
        console.log(`说明（源码/JSDoc）: ${entry.description}`);
      }
      if (entry.indexMd) {
        console.log(`index.md: ${entry.indexMd}`);
      }
      if (entry.descriptionFromIndexMd) {
        console.log(`说明（index.md）:\n${entry.descriptionFromIndexMd}`);
      }
      if (entry.docgenEntry) {
        console.log(`解析入口: ${entry.docgenEntry}`);
      }
      console.log('');
      console.log(formatPropsTable(entry.props));
    }
  });

program
  .command('demo')
  .description('输出 example(s) 目录下 demo*.tsx 源码（components 为 example/，blocks 多为 examples/）')
  .argument('<name>', '名称，如 UISwitch、TipTapEditor')
  .option('-f, --file <name>', '仅输出某个文件，如 demo1 或 demo1.tsx')
  .option('--json', '以 JSON 输出')
  .action(
    (
      name: string,
      opts: { file?: string; json?: boolean },
    ) => {
      const manifest = loadManifest();
      const key = resolveComponentKey(name, manifest);
      if (!key) {
      console.error(`未找到「${name}」。执行 xybotui list 查看可用名称。`);
      process.exit(1);
    }
      const demos = manifest[key].demos;
      if (!demos.length) {
        console.error(
          `「${key}」没有 example(s)/demo*.tsx 示例文件。`,
        );
        process.exit(1);
      }

      let list = demos;
      if (opts.file) {
        const raw = opts.file.trim();
        let want = raw;
        if (!want.endsWith('.tsx')) {
          want = `${want}.tsx`;
        }
        list = demos.filter((d) => {
          if (d.file === want || d.file === raw) return true;
          const base = d.file.split('/').pop() ?? d.file;
          return base === want;
        });
        if (!list.length) {
          console.error(
            `未找到文件「${opts.file}」。可用: ${demos.map((d) => d.file).join(', ')}`,
          );
          process.exit(1);
        }
      }

      if (opts.json) {
        console.log(JSON.stringify(list, null, 2));
        return;
      }

      for (const d of list) {
        console.log(`// --- ${d.file} ---\n`);
        console.log(d.content);
        if (list.length > 1) {
          console.log('');
        }
      }
    },
  );

program.parse();

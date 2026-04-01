import esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

await esbuild.build({
  entryPoints: [path.join(root, 'src/cli/index.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: path.join(root, 'dist/xybotui.cjs'),
  banner: {
    js: '#!/usr/bin/env node\n',
  },
});

console.log('[xybotui] built dist/xybotui.cjs');
